import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { glob } from 'glob'
import { type in2Section, parse } from './parser.ts'
import { generateFullPageFile } from './templates/fullpage.ts'
import {
  generatePreviewFile,
  getHeaderHtml,
  getMainContentHtml,
  getNextPageControlsHtml,
  getSearchHtml,
  getSidebarMenuHtml,
} from './templates/preview.ts'
import { watchStyleguideForChanges } from './watcher.ts'

declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var styleguideConfiguration: StyleguideConfiguration
}

export interface StyleguideConfiguration {
  mode: 'development' | 'production'
  outDir: string
  contentDir: `${string}/`
  projectTitle: string
  html: {
    lang: string
    assets: {
      css: string[]
      js: {
        src: string
        additionalAttributes?: Record<string, string>
      }[]
    }
  }
}

/**
 * Builds the styleguide
 * @param config - The configuration for the styleguide
 */
export async function buildStyleguide(config: StyleguideConfiguration) {
  globalThis.styleguideConfiguration = config

  // find all files in the content directory that have .css or .scss extension recursive
  // and also contain the styleguide comment
  const styleguideContent = (await glob(`${config.contentDir}/**/*.{css,scss}`))
    .map(file => fs.readFileSync(file, 'utf-8'))
    .join('\n')

  const parsedContent = parse(styleguideContent)

  // ensure clean output directory
  if (config.mode === 'production') {
    fs.emptyDirSync(config.outDir)
  }

  const baseDirectory = path.relative(process.cwd(), config.outDir)
  const getFullPageFilePath = (fileName: string) => path.join(baseDirectory, fileName)
  const getPreviewPageFilePath = (fileName: string, isHtmlIndexPage = false) => {
    return isHtmlIndexPage
      ? path.join(baseDirectory, 'index.html')
      : path.join(baseDirectory, fileName)
  }

  const handleGenerateFullpage = (data: in2Section) => {
    if (data.markup === undefined || data.markup.length === 0)
      return

    let htmlMarkup = data.markup
    if (data.wrapper) {
      htmlMarkup = data.wrapper.replace('<wrapper-content/>', htmlMarkup)
    }

    generateFullPageFile({
      filePath: getFullPageFilePath(data.fullpageFileName),
      page: {
        title: data.header,
        description: data.description,
        lang: config.html.lang,
        htmlclass: data.htmlclass,
        bodyclass: data.bodyclass,
      },
      css: config.html.assets.css,
      js: config.html.assets.js,
      html: htmlMarkup,
    })
  }

  const searchSectionMapping: {
    title: string
    items: {
      label: string
      searchKeywords: string[]
      href: string
    }[]
  }[] = []

  const menuSectionMapping: {
    title: string
    items: { label: string, href: string }[]
  }[] = []

  // generate all full-pages and collect data for preview generation
  parsedContent.forEach((firstLevelSection, indexFirstLevel) => {
    searchSectionMapping[indexFirstLevel] = {
      title: firstLevelSection.header,
      items: [],
    }

    menuSectionMapping[indexFirstLevel] = {
      title: firstLevelSection.header,
      items: [],
    }

    firstLevelSection.sections.forEach((secondLevelSection, indexSecondLevel) => {
      const menuHref = indexFirstLevel === 0 && indexSecondLevel === 0 ? '/index.html' : `/${secondLevelSection.previewFileName}`

      searchSectionMapping[indexFirstLevel].items.push({
        label: secondLevelSection.header,
        searchKeywords: [
          secondLevelSection.header,
          secondLevelSection.description,
          ...secondLevelSection.sections
            .map(thirdLevelSection => [thirdLevelSection.header, thirdLevelSection.description])
            .flat()
            .filter(Boolean),
        ]
          .filter(Boolean)
          .map(keyword => keyword.replaceAll('"', '')),
        href: menuHref,
      })

      menuSectionMapping[indexFirstLevel].items.push({
        label: secondLevelSection.header,
        href: menuHref,
      })

      if (secondLevelSection.markup) {
        handleGenerateFullpage(secondLevelSection)
      }

      secondLevelSection.sections.forEach((thirdLevelSection) => {
        handleGenerateFullpage(thirdLevelSection)
      })
    })
  })

  // generate all preview pages
  const headerHtml = getHeaderHtml({ projectTitle: config.projectTitle })
  const searchHtml = getSearchHtml(searchSectionMapping)
  parsedContent.forEach((firstLevelSection, indexFirstLevel) => {
    firstLevelSection.sections.forEach((secondLevelSection, indexSecondLevel) => {
      let sectionBefore = firstLevelSection.sections[indexSecondLevel - 1]
      if (!sectionBefore && !(indexFirstLevel === 0)) {
        sectionBefore = parsedContent[indexFirstLevel - 1].sections.at(-1)!
      }

      let sectionAfter = firstLevelSection.sections[indexSecondLevel + 1]
      if (!sectionAfter && parsedContent[indexFirstLevel + 1]) {
        sectionAfter = parsedContent[indexFirstLevel + 1].sections.at(0)!
      }

      const nextPageControlsData: {
        before?: {
          label: string
          href: string
        }
        after?: {
          label: string
          href: string
        }
      } = {}

      if (sectionBefore) {
        // TODO: calculate href correctly (index.html)
        const href = indexFirstLevel === 0 && indexSecondLevel === 0 ? '/index.html' : `/${secondLevelSection.previewFileName}`
        nextPageControlsData.before = {
          label: sectionBefore.header,
          href: sectionBefore.previewFileName,
        }
      }

      if (sectionAfter) {
        nextPageControlsData.after = {
          label: sectionAfter.header,
          href: sectionAfter.previewFileName,
        }
      }

      generatePreviewFile({
        filePath: getPreviewPageFilePath(secondLevelSection.previewFileName, indexFirstLevel === 0 && indexSecondLevel === 0),
        page: {
          title: secondLevelSection.header,
          description: secondLevelSection.description,
          lang: config.html.lang,
        },
        css: config.html.assets.css,
        js: config.html.assets.js,
        html: {
          header: headerHtml,
          sidebarMenu: getSidebarMenuHtml(
            menuSectionMapping,
            secondLevelSection.previewFileName,
          ),
          mainContent: getMainContentHtml(secondLevelSection),
          nextPageControls: getNextPageControlsHtml(nextPageControlsData),
          search: searchHtml,
        },
      })
    })
  })

  // ensure assets directory exists
  fs.ensureDirSync(path.join(config.outDir, 'assets'))

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const findAssetsDirectoryPath = () => {
    const isLibraryDevelopmentIndexTs = __filename.endsWith('/lib/index.ts')
    if (isLibraryDevelopmentIndexTs)
      return path.resolve(process.cwd(), 'dist/assets')

    // this is returned when the library is run by the real user
    return path.resolve(__dirname, '../../assets')
  }

  const assetsDirectoryPath = findAssetsDirectoryPath()
  fs.copySync(assetsDirectoryPath, path.join(config.outDir, 'assets'))
}

/**
 * Builds the styleguide and watches for changes
 * @param config - The configuration for the styleguide
 */
export async function watchStyleguide(config: StyleguideConfiguration, onChange?: () => void) {
  await buildStyleguide(config)

  await watchStyleguideForChanges(config.contentDir, () => {
    (async () => {
      await buildStyleguide(config)
      if (onChange)
        onChange()
    })()
  })
}
