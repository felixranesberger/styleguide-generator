import type { StyleguideConfiguration } from '../index'
import path from 'node:path'
import { parentPort } from 'node:worker_threads'
import { format } from 'prettier'
import pug from 'pug'

// eslint-disable-next-line regexp/no-super-linear-backtracking
const regexModifierLine = /<insert-vite-pug src="(.+?)".*(?:[\n\r\u2028\u2029]\s*)?(modifierClass="(.+?)")? *><\/insert-vite-pug>/g

/**
 * Replaces all <insert-vite-pug src="path/to/file.pug" modifierClass="modifier"> tags with the pug file content
 * depending on the mode provided
 */
export async function compilePug(contentDir: `${string}/`, mode: StyleguideConfiguration['mode'], html: string) {
  const vitePugTags = html.match(regexModifierLine)
  if (!vitePugTags) {
    return html
  }

  let markupOutput = html

  await Promise.all(vitePugTags.map(async (vitePugTag) => {
    const pugSourcePath = vitePugTag.match(/src="(.+?)"/)?.[1]
    if (!pugSourcePath) {
      return undefined
    }

    const pugModifierClass = vitePugTag.match(/modifierClass="(.+?)"/)
    let pugLocals = {}

    if (pugModifierClass && pugModifierClass[1]) {
      pugLocals = {
        modifierClass: pugModifierClass[1],
      }
    }

    const pugFilePath = path.join(contentDir, pugSourcePath)

    if (mode === 'production') {
      const isPugFile = path.extname(pugSourcePath) === '.pug'
      if (!isPugFile) {
        throw new Error(`${pugSourcePath} is not a valid .pug file`)
      }

      const pugFn = pug.compileFile(pugFilePath, {
        pretty: true,
        // define doctype to avoid self-closing tags on wrong places
        doctype: 'html',
      })

      const pugOutput = pugFn(pugLocals)
      markupOutput = markupOutput.replaceAll(vitePugTag, pugOutput)

      // prettify html output only in production mode,
      // since the function breaks the vite <pug> tag detection
      console.log(1745328029899, 'called')
      markupOutput = await format(markupOutput, {
        parser: 'html',
        singleAttributePerLine: true,
        bracketSameLine: false,
        htmlWhitespaceSensitivity: 'ignore', // This can help force more line breaks
      })
    }
    // Vite requires no Pug compilation in development mode, since we can use a Pug plugin
    else {
      const pugTag = pugModifierClass && pugModifierClass[1]
        ? `<pug src="${pugFilePath}" locals="${encodeURIComponent(JSON.stringify(pugLocals))}"></pug>`
        : `<pug src="${pugFilePath}"></pug>`

      markupOutput = markupOutput.replaceAll(vitePugTag, pugTag)
    }
  }))

  return markupOutput
}

export interface PugWorkerInput {
  id: string
  mode: StyleguideConfiguration['mode']
  contentDir: `${string}/`
  html: string
}

interface PugWorkerSuccess { id: string, html: string }
interface PugWorkerError { error: string }
export type PugWorkerOutput = PugWorkerSuccess | PugWorkerError

if (!parentPort) {
  throw new Error('This file must be run as a worker thread')
}

parentPort.on('message', async (data: PugWorkerInput) => {
  const { id, mode, html, contentDir } = data

  try {
    const result = await compilePug(contentDir, mode, html)
    parentPort!.postMessage({ id, html: result } satisfies PugWorkerOutput)
  }
  catch (error) {
    parentPort!.postMessage({
      error: error instanceof Error ? error.message : 'Unknown error',
    } satisfies PugWorkerOutput)
  }
})
