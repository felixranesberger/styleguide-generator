import type { in2Section } from './parser.ts'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { glob } from 'tinyglobby'
import { generateFaviconFiles } from './favicon.ts'
import { parse } from './parser.ts'
import { generateFullPageFile } from './templates/fullpage.ts'
import {
  generatePreviewFile,
  getAlerts,
  getCodeAuditDialog,
  getHeaderHtml,
  getMainContentHtml,
  getNextPageControlsHtml,
  getSearchHtml,
  getSidebarMenuHtml,
} from './templates/preview.ts'
import { compilePugMarkup } from './vite-pug'
import { watchStyleguideForChanges } from './watcher.ts'

declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var isWatchMode: boolean
  // eslint-disable-next-line no-var,vars-on-top
  var styleguideConfiguration: StyleguideConfiguration
}

globalThis.isWatchMode = false

export interface StyleguideConfiguration {
  mode: 'development' | 'production'
  outDir: string
  contentDir: `${string}/`
  projectTitle: string
  deactivateDarkMode?: boolean
  launchInEditor?: boolean | {
    rootDir: string
  }
  theme: string | {
    light: string
    dark: string
  }
  html: {
    lang: string
    assets: {
      css: {
        type?: 'regular' | 'overwriteStyleguide'
        src: string
      }[]
      js: {
        type?: 'regular' | 'overwriteStyleguide'
        src: string
        additionalAttributes?: Record<string, string>
      }[]
    }
  }
  plugins?: {
    ogImage?: (section: in2Section) => string
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
  const styleguideContentPaths = await glob(`${config.contentDir}/**/*.{css,scss}`)
  const styleguideContent = (await Promise.all(styleguideContentPaths.map(file => fs.readFile(file, 'utf-8')))).join('\n')

  const parsedContent = await parse(styleguideContent, config)
  if (!parsedContent)
    throw new Error('Could not parse content')

  // ensure clean output directory and delete all html files
  if (config.mode === 'production' && await fs.exists(config.outDir)) {
    const files = await glob(`${config.outDir}/**/*.html`)
    await Promise.all(files.map(file => fs.unlink(file)))
  }

  const baseDirectory = path.relative(process.cwd(), config.outDir)
  const getFullPageFilePath = (fileName: string) => path.join(baseDirectory, fileName)
  const getPreviewPageFilePath = (fileName: string, isHtmlIndexPage = false) => {
    return isHtmlIndexPage
      ? path.join(baseDirectory, 'index.html')
      : path.join(baseDirectory, fileName)
  }

  const handleGenerateFullPage = async (data: in2Section) => {
    if (data.markup === undefined || data.markup.length === 0)
      return

    let htmlMarkup = data.markup
    if (data.wrapper) {
      htmlMarkup = data.wrapper.replace('<wrapper-content/>', htmlMarkup)
    }

    await generateFullPageFile({
      id: data.id,
      filePath: getFullPageFilePath(data.fullpageFileName),
      page: {
        title: data.header,
        description: !data.hasMarkdownDescription ? data.description : undefined,
        lang: config.html.lang,
        htmlclass: data.htmlclass,
        bodyclass: data.bodyclass,
      },
      css: config.html.assets.css,
      js: config.html.assets.js,
      html: htmlMarkup,
      theme: config.theme,
      ogImageUrl: config.plugins?.ogImage
        ? config.plugins.ogImage(data)
        : undefined,
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

  const fileWriteTasks: Promise<void>[] = []
  let markupRepository = new Map<string, { markup: string }>()
  parsedContent.forEach((firstLevelSection) => {
    firstLevelSection.sections.forEach((secondLevelSection) => {
      if (secondLevelSection.markup)
        markupRepository.set(secondLevelSection.id, { markup: secondLevelSection.markup })

      secondLevelSection.sections.forEach((thirdLevelSection) => {
        if (thirdLevelSection.markup)
          markupRepository.set(thirdLevelSection.id, { markup: thirdLevelSection.markup })
      })
    })
  })
  // compile all pug markup inside repository
  markupRepository = await compilePugMarkup(config.mode, config.contentDir, markupRepository)

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
        fileWriteTasks.push(
          (async () => {
            try {
              secondLevelSection.markup = markupRepository.get(secondLevelSection.id)!.markup
              await handleGenerateFullPage(secondLevelSection)
            }
            catch (error) {
              console.error(`Error processing section ${secondLevelSection.id}:`, error)
            }
          })(),
        )
      }

      secondLevelSection.sections.forEach((thirdLevelSection) => {
        if (!thirdLevelSection.markup)
          return

        fileWriteTasks.push(
          (async () => {
            try {
              thirdLevelSection.markup = markupRepository.get(thirdLevelSection.id)!.markup
              await handleGenerateFullPage(thirdLevelSection)
            }
            catch (error) {
              console.error(`Error processing section ${thirdLevelSection.id}:`, error)
            }
          })(),
        )
      })
    })
  })

  // generate all preview pages
  const headerHtml = getHeaderHtml()
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

      const preloadIframes: string[] = []
      if (secondLevelSection.markup) {
        preloadIframes.push(secondLevelSection.fullpageFileName)
      }

      secondLevelSection.sections.forEach((thirdLevelSection) => {
        if (thirdLevelSection.markup) {
          preloadIframes.push(thirdLevelSection.fullpageFileName)
        }
      })

      fileWriteTasks.push(
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
            mainContent: getMainContentHtml(secondLevelSection, config),
            nextPageControls: getNextPageControlsHtml(nextPageControlsData),
            search: searchHtml,
            codeAuditDialog: getCodeAuditDialog(),
            alerts: getAlerts(),
            preloadIframes,
          },
          theme: config.theme,
          ogImageUrl: config.plugins?.ogImage
            ? config.plugins.ogImage(secondLevelSection)
            : undefined,
        }),
      )
    })
  })
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const findAssetsDirectoryPath = () => {
    const isLibraryDevelopmentIndexTs = __filename.endsWith('/lib/index.ts')
    if (isLibraryDevelopmentIndexTs)
      return path.resolve(process.cwd(), 'dist/styleguide-assets')

    // this is returned when the library is run by the real user
    return path.resolve(__dirname, '../../styleguide-assets')
  }

  const assetsDirectoryPath = findAssetsDirectoryPath()
  const assetsDirectoryOutputPath = path.join(config.outDir, 'styleguide-assets')
  const isAssetsDirectoryAlreadyCopied = await fs.exists(assetsDirectoryOutputPath) && (await fs.readdir(assetsDirectoryOutputPath)).length > 0
  if (!isAssetsDirectoryAlreadyCopied) {
    await fs.copy(assetsDirectoryPath, assetsDirectoryOutputPath)
    await generateFaviconFiles(assetsDirectoryOutputPath, config.theme)
  }

  // make sure all files have been written before resolving
  await Promise.all(fileWriteTasks)
}

/**
 * Builds the styleguide and watches for changes
 * @param config - The configuration for the styleguide
 */
export async function watchStyleguide(config: StyleguideConfiguration, onChange?: () => void) {
  globalThis.isWatchMode = true
  await buildStyleguide(config)

  // marke sure content dir ends with /
  const contentDirPath = config.contentDir.endsWith('/') ? config.contentDir : `${config.contentDir}/`

  watchStyleguideForChanges(contentDirPath, () => {
    (async () => {
      await buildStyleguide(config)
      if (onChange)
        onChange()
    })()
  })
}
