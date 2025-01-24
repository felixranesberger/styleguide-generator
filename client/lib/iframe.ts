const MAX_WAIT_TIME = 5000
const IFRAME_MIN_HEIGHT = 10
const IFRAME_BUFFER_HEIGHT = 5

async function waitForIframes(iframes: NodeListOf<HTMLIFrameElement>) {
  const getIsIframeLoaded = (iframe: HTMLIFrameElement) => iframe.contentWindow?.document.readyState === 'complete'

  await Promise.allSettled(
    Array.from(iframes).map((iframe) => {
      return new Promise((resolve) => {
        const resolveWithTimeout = () => setTimeout(resolve, 100)

        const isIframeAlreadyLoaded = getIsIframeLoaded(iframe)
        if (isIframeAlreadyLoaded) {
          resolveWithTimeout()
          return
        }

        iframe.addEventListener('load', resolveWithTimeout, { once: true })

        // resolve after some time, even if iframe is not loaded
        setTimeout(resolve, MAX_WAIT_TIME)
      })
    }),
  )
}

async function calculateIframeHeight(iframe: HTMLIFrameElement) {
  const doc = iframe.contentWindow?.document
  if (!doc)
    throw new Error('iFrame was not fully loaded yet')

  iframe.style.height = '0px'
  // eslint-disable-next-line ts/no-unused-expressions
  iframe.offsetHeight // Force reflow

  const contentHeight = Math.max(
    doc.documentElement.scrollHeight,
    doc.body.scrollHeight,
    doc.documentElement.offsetHeight,
    doc.body.offsetHeight,
    doc.documentElement.clientHeight,
    doc.body.clientHeight,
  )

  const finalHeight = Math.max(contentHeight, IFRAME_MIN_HEIGHT)
  iframe.style.height = `${finalHeight + IFRAME_BUFFER_HEIGHT}px`
}

export function removeDocumentLoadingClass() {
  document.body.classList.add('js-loaded')
}

export default async (iframes: NodeListOf<HTMLIFrameElement>) => {
  await waitForIframes(iframes)

  await Promise.allSettled(Array.from(iframes).map(iframe => calculateIframeHeight(iframe)))

  // calculate height for each iframe reactive
  const iframeHeightResizeObserver = new ResizeObserver(
    entries => entries.forEach(entry => calculateIframeHeight(entry.target as HTMLIFrameElement)),
  )
  iframes.forEach(iframe => iframeHeightResizeObserver.observe(iframe))

  removeDocumentLoadingClass()
}
