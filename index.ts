import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import { glob } from 'glob'
import { type in2Section, parse } from './lib/parser.ts'
import { generateFullPageFile } from './lib/templates/fullpage.ts'
import {
  generatePreviewFile,
  getHeaderHtml,
  getNextPageControlsHtml,
  getSearchHtml,
  getSidebarMenuHtml,
} from './lib/templates/preview.ts'
import { watchStyleguideForChanges } from './lib/watcher.ts'

interface StyleguideConfiguration {
  mode: 'development' | 'production'
  outDir: string
  contentDir: string
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

export async function buildStyleguide(config: StyleguideConfiguration) {
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
  const getPreviewPageFilePath = (fileName: string) => path.join(baseDirectory, fileName)

  const handleGenerateFullpage = (data: in2Section) => {
    if (data.markup === undefined || data.markup.length === 0)
      return

    generateFullPageFile({
      filePath: getFullPageFilePath(data.fullpageFileName),
      page: {
        title: data.header,
        description: data.description,
        lang: config.html.lang,
      },
      css: config.html.assets.css,
      js: config.html.assets.js,
      html: data.markup,
    })
  }

  const searchSectionMapping: {
    title: string
    items: { label: string, searchKeywords: string[] }[]
  }[] = []

  const menuSectionMapping: {
    title: string
    items: { label: string, href: string }[]
  }[] = []

  // generate all full-pages and collect data for preview generation
  parsedContent.forEach((firstLevelSection, index) => {
    searchSectionMapping[index] = {
      title: firstLevelSection.header,
      items: [],
    }

    menuSectionMapping[index] = {
      title: firstLevelSection.header,
      items: [],
    }

    firstLevelSection.sections.forEach((secondLevelSection) => {
      searchSectionMapping[index].items.push({
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
      })

      menuSectionMapping[index].items.push({
        label: secondLevelSection.header,
        href: `/${getFullPageFilePath(secondLevelSection.previewFileName)}`,
      })

      secondLevelSection.sections.forEach((thirdLevelSection) => {
        handleGenerateFullpage(thirdLevelSection)
      })
    })
  })

  // generate all preview pages
  const headerHtml = getHeaderHtml({ projectTitle: config.projectTitle })
  const searchHtml = getSearchHtml(searchSectionMapping)
  parsedContent.forEach((firstLevelSections) => {
    firstLevelSections.sections.forEach((secondLevelSection, indexSecondLevel) => {
      const sectionBefore = firstLevelSections.sections[indexSecondLevel - 1]
      const sectionAfter = firstLevelSections.sections[indexSecondLevel + 1]
      const nextPageControlsData: {
        before: {
          label: string
          href: string
        }
        after: {
          label: string
          href: string
        }
      } = {}

      if (sectionBefore) {
        nextPageControlsData.before = {
          label: sectionBefore.header,
          href: getPreviewPageFilePath(sectionBefore.previewFileName),
        }
      }

      if (sectionAfter) {
        nextPageControlsData.after = {
          label: sectionAfter.header,
          href: getPreviewPageFilePath(sectionAfter.previewFileName),
        }
      }

      generatePreviewFile({
        filePath: getPreviewPageFilePath(secondLevelSection.previewFileName),
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
          mainContent: '',
          nextPageControls: getNextPageControlsHtml(nextPageControlsData),
          search: searchHtml,
        },
      })
    })
  })
}

export async function watchStyleguide(config: StyleguideConfiguration) {
  await buildStyleguide(config)

  await watchStyleguideForChanges(config.contentDir, () => {
    (async () => await buildStyleguide(config))()
  })
}

(async () => {
  await buildStyleguide({
    mode: 'development',
    outDir: './dist',
    contentDir: './test/src',
    projectTitle: 'Universität zu Köln',
    html: {
      lang: 'de',
      assets: {
        css: ['/main.css'],
        js: [
          {
            src: '/main.js',
            additionalAttributes: {
              type: 'module',
              defer: '',
            },
          },
        ],
      },
    },
  })
})()
