import type { StyleguideConfiguration } from '../index'
import path from 'node:path'
import { parentPort } from 'node:worker_threads'
import { Biome, Distribution } from '@biomejs/js-api'
import pug from 'pug'

let biomeInstance: Biome
let biomePromise: Promise<Biome>
let projectKey: number

async function getBiome(): Promise<{ biome: Biome, projectKey: number }> {
  if (biomeInstance && projectKey !== undefined) {
    return { biome: biomeInstance, projectKey }
  }

  if (biomePromise) {
    const biome = await biomePromise
    return { biome, projectKey }
  }

  biomePromise = (async () => {
    const instance = await Biome.create({
      distribution: Distribution.NODE,
    })

    projectKey = instance.openProject('.').projectKey

    instance.applyConfiguration(projectKey, {
      html: {
        formatter: {
          lineWidth: 100,
        },
      },
    })

    biomeInstance = instance

    return instance
  })()

  const biome = await biomePromise
  return { biome, projectKey }
}

async function biomeFormat(content: string): Promise<string> {
  try {
    const { biome, projectKey } = await getBiome()

    // Try to format with Biome HTML support (experimental)
    const result = biome.formatContent(projectKey, content, {
      filePath: 'example.html',
    })

    // Check if there are any fatal errors in diagnostics
    const hasFatalErrors = result.diagnostics?.some(
      (diag: any) => diag.severity === 'fatal' || diag.severity === 'error',
    )

    if (hasFatalErrors) {
      console.warn('Biome HTML formatting has errors, falling back to original content')
      return content
    }

    return result.content
  }
  catch (error) {
    console.warn('Biome HTML formatting not supported or failed:', error)
    return content // Fallback to original content
  }
}

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

  let result = html

  const needsFormatting = (mode === 'development' && !result.includes('<insert-vite-pug'))
    || mode === 'production'

  result = await compilePug(contentDir, mode, html)

  if (needsFormatting) {
    result = await biomeFormat(result)
  }

  parentPort!.postMessage({ id, html: result } satisfies PugWorkerOutput)
})
