import type { StyleguideConfiguration } from '../index'
import path from 'node:path'
import { parentPort } from 'node:worker_threads'
import { prettify } from 'htmlfy'
import pug from 'pug'

// eslint-disable-next-line regexp/no-super-linear-backtracking
const regexModifierLine = /<insert-vite-pug src="(.+?)".*(?:[\n\r\u2028\u2029]\s*)?(modifierClass="(.+?)")? *><\/insert-vite-pug>/g

/**
 * Replaces all <insert-vite-pug src="path/to/file.pug" modifierClass="modifier"> tags with the pug file content
 * depending on the mode provided
 */
export function compilePug(contentDir: `${string}/`, mode: StyleguideConfiguration['mode'], html: string) {
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

    const pugFilePath = path.join(contentDir, pugSourcePath)

    if (mode === 'production') {
      const isPugFile = path.extname(pugSourcePath) === '.pug'
      if (!isPugFile) {
        throw new Error(`${pugSourcePath} is not a valid .pug file`)
      }

      const pugFn = pug.compileFile(pugFilePath, {
        pretty: false,
        cache: true,
      })

      const pugOutput = pugFn(pugLocals)
      markupOutput = markupOutput.replace(vitePugTag, pugOutput)
    }
    // Vite requires no Pug compilation in development mode, since we can use a Pug plugin
    else {
      const pugTag = pugModifierClass && pugModifierClass[1]
        ? `<pug src="${pugFilePath}" locals="${encodeURIComponent(JSON.stringify(pugLocals))}"></pug>`
        : `<pug src="${pugFilePath}"></pug>`

      markupOutput = markupOutput.replace(vitePugTag, pugTag)
    }
  })

  const prettifiedOutput = prettify(markupOutput)

  return prettifiedOutput
}

export interface PugWorkerInput {
  mode: StyleguideConfiguration['mode']
  contentDir: `${string}/`
  html: string
}

interface PugWorkerSuccess { html: string }
interface PugWorkerError { error: string }
export type PugWorkerOutput = PugWorkerSuccess | PugWorkerError

if (!parentPort) {
  throw new Error('This file must be run as a worker thread')
}

parentPort.on('message', (data: PugWorkerInput) => {
  const { mode, html, contentDir } = data

  try {
    const result = compilePug(contentDir, mode, html)
    parentPort!.postMessage({ html: result } satisfies PugWorkerOutput)
  }
  catch (error) {
    parentPort!.postMessage({
      error: error instanceof Error ? error.message : 'Unknown error',
    } satisfies PugWorkerOutput)
  }
})