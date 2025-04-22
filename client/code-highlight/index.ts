import HighlightWorker from './worker.ts?worker'

const CODE_HIGHLIGHTED_ATTRIBUTE = 'data-highlighted'

interface WorkerEntry {
  worker: Worker
  isBusy: boolean
}

const workerPool = Array.from({ length: 5 }, (): WorkerEntry => ({
  worker: new HighlightWorker(),
  isBusy: false,
}))

function getFreeWorker(): Promise<WorkerEntry> {
  return new Promise((resolve) => {
    const freeWorker = workerPool.find(worker => !worker.isBusy)
    if (freeWorker) {
      freeWorker.isBusy = true
      resolve(freeWorker)
    }

    const interval = setInterval(() => {
      const freeWorker = workerPool.find(worker => !worker.isBusy)
      if (freeWorker) {
        freeWorker.isBusy = true
        clearInterval(interval)
        resolve(freeWorker)
      }
    }, Math.random() * 100)
  })
}

async function runShiki(html: string) {
  const workerEntry = await getFreeWorker()
  workerEntry.isBusy = true

  // send the code to the worker
  workerEntry.worker.postMessage({ html })

  // wait for the worker to finish
  return new Promise<string>((resolve) => {
    workerEntry.worker.onmessage = (event) => {
      workerEntry.isBusy = false
      resolve(event.data)
    }
  })
}

export async function highlightCode(element: HTMLElement, modifierClass?: string) {
  const isAlreadyHighlighted = element.getAttribute(CODE_HIGHLIGHTED_ATTRIBUTE) === 'true'
  if (isAlreadyHighlighted)
    return

  let source = element.getAttribute('data-source-code')
  if (!source)
    throw new Error('No source code provided')

  source = decodeURIComponent(source).trim()

  // if modifier is provided, replace the modifier class
  if (modifierClass) {
    source = source.replaceAll('{{modifier_class}}', modifierClass)
  }

  const code = await runShiki(source)

  // add code to the element
  element.insertAdjacentHTML('beforeend', code)

  // mark as highlighted
  element.setAttribute(CODE_HIGHLIGHTED_ATTRIBUTE, 'true')
}
