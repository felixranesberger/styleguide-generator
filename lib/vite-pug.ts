import type { StyleguideConfiguration } from '../index.ts'
import path from 'node:path'
import process from 'node:process'
import pug from 'pug'

// eslint-disable-next-line regexp/no-super-linear-backtracking
const regexModifierLine = /<insert-vite-pug src="(.+?)".*(?:[\n\r\u2028\u2029]\s*)?(modifierClass="(.+?)")? *><\/insert-vite-pug>/g

/**
 * Replaces all <insert-vite-pug src="path/to/file.pug" modifierClass="modifier"> tags with the pug file content
 * depending on the mode provided
 */
export function replaceVitePugTags(mode: StyleguideConfiguration['mode'], html: string) {
  const vitePugTags = html.match(regexModifierLine)
  if (!vitePugTags) {
    return html
  }

  let markupOutput = html

  vitePugTags.forEach((vitePugTag) => {
    const pugSourcePath = vitePugTag.match(/src="(.+?)"/)?.[1]
    if (!pugSourcePath) {
      return
    }

    const pugModifierClass = vitePugTag.match(/modifierClass="(.+?)"/)
    let pugLocals = {}

    if (pugModifierClass && pugModifierClass[1]) {
      pugLocals = {
        modifierClass: pugModifierClass[1],
      }
    }

    // Vite requires no Pug compilation, since we can use a Pug plugin
    if (mode === 'development') {
      let pugTag = `<pug src="${pugSourcePath}"></pug>`

      if (pugModifierClass && pugModifierClass[1]) {
        pugTag = `<pug src="${pugSourcePath}" locals="${encodeURIComponent(JSON.stringify(pugLocals))}"></pug>`
      }

      markupOutput = markupOutput.replace(vitePugTag, pugTag)
    }

    const isPugFile = path.extname(pugSourcePath) === '.pug'
    if (!isPugFile) {
      throw new Error(`${pugSourcePath} is not a valid .pug file`)
    }

    const contentDirPath = path.join(process.cwd(), globalThis.styleguideConfiguration.contentDir)
    const pugFilePath = path.join(contentDirPath, pugSourcePath)
    const pugFn = pug.compileFile(pugFilePath, {
      pretty: true,
    })

    const pugOutput = pugFn(pugLocals)

    markupOutput = markupOutput.replace(vitePugTag, pugOutput)
  })

  return markupOutput
}
