import type { PugWorkerOutput } from './worker.ts'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { Worker } from 'node:worker_threads'

const MAX_POOL_SIZE = os.cpus().length

let workerPool: {
  worker: Worker
  busy: boolean
  currentTaskId?: string
}[] = []

async function terminateAllWorkers() {
  await Promise.all(workerPool.map(({ worker }) => worker.terminate))
}

const processCache = new Map<string, string>()

// resolve worker paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const workerFilePath = __dirname.includes('dist/') ? './vite-pug/worker.mjs' : './worker.ts'
const workerFilePathResolved = path.resolve(__dirname, workerFilePath)

// terminate workers automatically on terminal exit
const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'] as const
signals.forEach(signal => process.on(signal, async () => await terminateAllWorkers()))

export async function compilePugMarkup(
  mode: 'production' | 'development',
  contentDir: `${string}/`,
  repository: Map<string, { markup: string }>,
) {
  const clonedRepository = structuredClone(repository)

  // find all entries that have markup with <insert-vite-pug
  const needsProcessingIds = Array.from(clonedRepository.entries())
    .filter(([, { markup }]) => markup.includes('<insert-vite-pug'))
    .map(([id]) => id)

  if (needsProcessingIds.length === 0)
    return clonedRepository

  // find maybe cached files
  if (mode === 'production') {
    needsProcessingIds.forEach((id) => {
      const cachedMarkup = processCache.get(id)
      if (!cachedMarkup)
        return

      clonedRepository.set(id, { markup: cachedMarkup })
      needsProcessingIds.splice(needsProcessingIds.indexOf(id), 1)
    })
  }

  // spawn workers based on files which need processing and max number of cpu cores
  workerPool = Array.from({ length: Math.min(needsProcessingIds.length, MAX_POOL_SIZE) }, (_, index) => ({
    worker: new Worker(workerFilePathResolved, {
      name: `pug-worker-${index}`,
    }),
    busy: false,
    currentTaskId: undefined as string | undefined,
  }))

  // handle worker messages
  workerPool.forEach((workerNode) => {
    workerNode.worker.on('message', (result: PugWorkerOutput) => {
      if ('error' in result) {
        console.error(result.error)
        workerNode.busy = false
        return
      }

      const { id, html } = result
      clonedRepository.set(id, { markup: html })

      workerNode.busy = false
    })
  })

  // process all files in the queue
  // while we have items or some worker is still busy
  while (needsProcessingIds.length > 0 || workerPool.some(worker => worker.busy)) {
    if (needsProcessingIds.length === 0 && workerPool.some(worker => worker.busy)) {
      await new Promise(resolve => setTimeout(resolve, 25))
      continue
    }

    // Find available worker
    const availableWorker = workerPool.find(worker => !worker.busy)
    if (availableWorker) {
      const id = needsProcessingIds.pop()!
      const { markup } = clonedRepository.get(id)!

      availableWorker.busy = true
      availableWorker.currentTaskId = id

      availableWorker.worker.postMessage({
        id,
        mode,
        html: markup,
        contentDir,
      })
    }
    else {
      // No worker available or no tasks - wait a bit
      await new Promise(resolve => setTimeout(resolve, 25))
    }
  }

  await terminateAllWorkers()

  return clonedRepository
}
