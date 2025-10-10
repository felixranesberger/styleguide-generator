import HighlightWorker from './worker.ts?worker'

const cache = new Map<string, string>()

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

async function runShiki(lang: 'text' | 'html', text: string) {
  const workerEntry = await getFreeWorker()
  workerEntry.isBusy = true

  return new Promise<string>((resolve) => {
    workerEntry.worker.onmessage = (event) => {
      workerEntry.isBusy = false
      resolve(event.data)
    }

    workerEntry.worker.postMessage({ lang, text })
  })
}

export async function highlightCode(element: HTMLElement, modifierClass?: string) {
  const isAlreadyHighlighted = element.getAttribute(CODE_HIGHLIGHTED_ATTRIBUTE) === 'true'
  if (isAlreadyHighlighted)
    return

  let source = element.getAttribute('data-source-code')
  if (!source)
    throw new Error('No source code provided')

  const lang = (element.getAttribute('data-source-lang') || 'html') as 'text' | 'html'
  if (!lang)
    throw new Error('No source code language provided')

  source = decodeURIComponent(source).trim()

  // if modifier is provided, replace the modifier class
  if (modifierClass) {
    source = source.replaceAll('{{modifier_class}}', modifierClass)
  }

  let code = ''
  const cacheKey = `${lang}:::${source}`

  if (cache.has(cacheKey)) {
    code = cache.get(cacheKey)!
  }
  else {
    code = await runShiki(lang, source)
    cache.set(cacheKey, code)
  }

  // add code to the element
  element.insertAdjacentHTML('beforeend', code)

  // mark as highlighted
  element.setAttribute(CODE_HIGHLIGHTED_ATTRIBUTE, 'true')
}
