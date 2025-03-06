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

  iframes.forEach((iframe) => {
    calculateIframeHeight(iframe)

    const iframeWindow = iframe.contentWindow
    if (!iframeWindow)
      return

    const observer = new ResizeObserver(() => calculateIframeHeight(iframe))
    observer.observe(iframeWindow.document.body)

    // when user presses cmd+k or ctrl+k inside iframe,
    // dispatch event to open search in parent window
    iframeWindow.addEventListener('keydown', (event) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        window.dispatchEvent(new Event('styleguideOpenSearch'))
      }

      // right arrow key
      if (event.key === 'ArrowRight') {
        window.dispatchEvent(new Event('styleguideNext'))
      }

      // left arrow key
      if (event.key === 'ArrowLeft') {
        window.dispatchEvent(new Event('styleguidePrevious'))
      }
    })
  })

  // calculate new when window size changes
  window.addEventListener('resize', () => {
    iframes.forEach(iframe => calculateIframeHeight(iframe))
  })

  // jump to anchor links when iframes are calculated
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash)
    if (target) {
      // TODO: check if we somehow can improve this dumb setTimeout functionality
      // wait till iframes are resized, so we can jump to anchor links
      await new Promise(resolve => setTimeout(resolve, 200))

      target.scrollIntoView()
    }
  }

  removeDocumentLoadingClass()
}
