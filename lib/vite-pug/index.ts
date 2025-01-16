import type { StyleguideConfiguration } from '../index'
import type { PugWorkerInput, PugWorkerOutput } from './worker'

import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { Worker } from 'node:worker_threads'

const productionCache = new Map<string, string>()
let globalPool: PugWorkerPool | null = null

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class PugWorkerPool {
  private workers: Worker[] = []
  private queue: Array<{
    task: PugWorkerInput
    resolve: (html: string) => void
    reject: (error: Error) => void
  }> = []

  private isProcessing = false
  private availableWorkers: Worker[] = []

  constructor(size = os.cpus().length) {
    for (let i = 0; i < size; i++) {
      const worker = new Worker(path.resolve(__dirname, './worker.js'), {
        name: `pug-worker-${i + 1}`,
      })
      worker.on('message', result => this.handleWorkerMessage(worker, result))
      worker.on('error', error => this.handleWorkerError(worker, error))
      this.workers.push(worker)
      this.availableWorkers.push(worker)
    }
  }

  private handleWorkerMessage(worker: Worker, result: PugWorkerOutput) {
    // Add worker back to available pool
    this.availableWorkers.push(worker)

    const currentTask = this.queue[0]
    if (!currentTask)
      return

    // Remove the completed task
    this.queue.shift()

    if ('error' in result) {
      currentTask.reject(new Error(result.error))
    }
    else {
      currentTask.resolve(result.html)
    }

    // Process next task if any
    this.processNextTask().catch(console.error)
  }

  private handleWorkerError(worker: Worker, error: Error) {
    const currentTask = this.queue[0]
    if (currentTask) {
      currentTask.reject(error)
      this.queue.shift()
    }

    // Replace the crashed worker
    const workerIndex = this.workers.indexOf(worker)
    const availableIndex = this.availableWorkers.indexOf(worker)

    if (workerIndex !== -1) {
      worker.terminate().catch(console.error)
      const newWorker = new Worker(path.resolve(__dirname, './worker.js'), {
        name: `pug-worker-${workerIndex + 1}-replacement`,
      })
      newWorker.on('message', result => this.handleWorkerMessage(newWorker, result))
      newWorker.on('error', error => this.handleWorkerError(newWorker, error))

      this.workers[workerIndex] = newWorker
      if (availableIndex !== -1) {
        this.availableWorkers[availableIndex] = newWorker
      }
      else {
        this.availableWorkers.push(newWorker)
      }
    }

    // Try to process next task
    this.processNextTask().catch(console.error)
  }

  private async processNextTask() {
    if (this.isProcessing || this.queue.length === 0 || this.availableWorkers.length === 0) {
      return
    }

    this.isProcessing = true
    const worker = this.availableWorkers.pop()!
    const task = this.queue[0]

    worker.postMessage(task.task)
    this.isProcessing = false
  }

  async compile(id: string, mode: 'production' | 'development', html: string, contentDir: `${string}/`): Promise<string> {
    return new Promise((resolve, reject) => {
      const task = { id, mode, html, contentDir }
      this.queue.push({ task, resolve, reject })
      this.processNextTask()
    })
  }

  async terminate() {
    await Promise.all(this.workers.map(w => w.terminate()))
    this.workers = []
    this.queue = []
    this.availableWorkers = []
    this.isProcessing = false
    globalPool = null
  }
}

export function getPool(): PugWorkerPool {
  if (!globalPool) {
    globalPool = new PugWorkerPool()
  }
  return globalPool
}

// Setup cleanup handlers for graceful shutdown of worker threads
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) => {
  process.on(signal, async () => {
    if (globalPool) {
      await globalPool.terminate()
    }
  })
})

export async function compilePugMarkup(
  id: string,
  mode: StyleguideConfiguration['mode'],
  html: string,
) {
  const needsProcessing = html.includes('<insert-vite-pug')
  if (!needsProcessing) {
    return html
  }

  const pool = getPool()

  if (mode === 'production') {
    const cachedVersion = productionCache.get(id)
    if (cachedVersion) {
      return cachedVersion
    }
  }

  const compiledHtml = await pool.compile(
    id,
    mode,
    html,
    globalThis.styleguideConfiguration.contentDir,
  )

  if (mode === 'production') {
    productionCache.set(id, compiledHtml)
  }

  return compiledHtml
}
