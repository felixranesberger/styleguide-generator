const MAX_WAIT_TIME = 5000

async function waitForIframes(iframes: HTMLIFrameElement[]) {
  const getIsIframeLoaded = (iframe: HTMLIFrameElement) => {
    const doc = iframe.contentWindow?.document
    if (!doc)
      return false

    const hasBody = doc.body && doc.body.children.length > 0
    const isComplete = doc.readyState === 'complete'

    return hasBody && isComplete && doc.body.children.length > 0
  }

  await Promise.allSettled(
    iframes.map((iframe) => {
      return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          const isIframeReady = getIsIframeLoaded(iframe)
          if (isIframeReady) {
            clearInterval(interval)
            return resolve()
          }
        }, 100)

        // resolve after some time, even if iframe is not loaded
        setTimeout(() => {
          clearInterval(interval)
          return resolve()
        }, MAX_WAIT_TIME)
      })
    }),
  )
}

function calculateIframeHeight(iframe: HTMLIFrameElement) {
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

  iframe.style.height = `${contentHeight}px`
}

export function removeDocumentLoadingClass() {
  document.body.classList.add('js-loaded')
}

export default async (iframes: HTMLIFrameElement[]) => {
  await waitForIframes(iframes)

  iframes.forEach(calculateIframeHeight)

  // calculate new when window size changes
  window.addEventListener('resize', () => {
    iframes.forEach(iframe => calculateIframeHeight(iframe))
  })

  // calculate new when iframe content inside changes
  iframes.forEach((iframe) => {
    const iframeWindow = iframe.contentWindow
    if (!iframeWindow)
      return

    const observer = new ResizeObserver(() => calculateIframeHeight(iframe))
    observer.observe(iframeWindow.document.documentElement)
    observer.observe(iframeWindow.document.body)
  })

  removeDocumentLoadingClass()
}
