class IframeManager {
  private iframes: HTMLIFrameElement[]
  private options: {
    minHeight: number | null
    bufferHeight: number
  }

  private initialLoadPromises: Promise<void>[]
  private isInitialLoad: boolean = true
  private readyStateCheckInterval: number = 50 // ms to check readyState
  private maxWaitTime: number = 10000 // 10 seconds maximum wait time

  constructor(
        className: string = 'preview-iframe',
        options = { minHeight: null, bufferHeight: 5 },
  ) {
    this.iframes = Array.from(
      document.getElementsByClassName(className),
    ) as HTMLIFrameElement[]
    this.options = options
    this.initialLoadPromises = []

    // Safety timeout
    setTimeout(() => {
      if (!document.body.classList.contains('js-loaded')) {
        console.warn('Safety timeout triggered - forcing page to show')
        this.handleUrlFragment()
        this.isInitialLoad = false
        document.body.classList.add('js-loaded')
      }
    }, this.maxWaitTime)

    // Start initialization only when document is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init())
    }
    else {
      this.init()
    }

    window.addEventListener('resize', () => {
      if (!this.isInitialLoad) {
        this.updateAllIframes()
      }
    })
  }

  private init(): void {
    this.iframes.forEach((iframe, index) => {
      iframe.style.cssText = `
                width: 100%;
                overflow: hidden;
                min-height: 0;
                border: none;
                opacity: 0;
                transition: opacity 0.2s ease-in-out;
            `

      const loadPromise = new Promise<void>((resolve) => {
        const startTime = Date.now()

        const handleLoad = async () => {
          try {
            await this.setupIframe(iframe)
            iframe.style.opacity = '1'
            resolve()
          }
          catch (e) {
            console.warn(`Error setting up iframe ${index}:`, e)
            resolve()
          }
        }

        const checkIframeReady = () => {
          if (Date.now() - startTime > this.maxWaitTime) {
            console.warn(`Iframe ${index} timed out waiting for load`)
            resolve()
            return
          }

          const iframeWindow = iframe.contentWindow
          if (!iframeWindow) {
            setTimeout(checkIframeReady, this.readyStateCheckInterval)
            return
          }

          try {
            const doc = iframeWindow.document

            if (doc && doc.readyState === 'complete') {
              handleLoad()
            }
            else if (doc) {
              iframe.addEventListener('load', handleLoad, { once: true })
            }
            else {
              setTimeout(checkIframeReady, this.readyStateCheckInterval)
            }
          }
          catch (e) {
            console.warn(`Error accessing iframe ${index}:`, e)
            resolve()
          }
        }

        checkIframeReady()

        iframe.addEventListener('load', () => {
          checkIframeReady()
        }, { once: true })
      })

      this.initialLoadPromises.push(loadPromise)
    })

    Promise.all(this.initialLoadPromises)
      .then(() => new Promise(resolve => setTimeout(resolve, 100)))
      .then(() => {
        return Promise.all(this.iframes.map(iframe => this.adjustHeight(iframe)))
      })
      .then(() => {
        this.handleUrlFragment()
        this.isInitialLoad = false
        document.body.classList.add('js-loaded')
      })
      .catch((error) => {
        console.error('Error during iframe initialization:', error)
        this.handleUrlFragment()
        setTimeout(() => {
          this.isInitialLoad = false
          document.body.classList.add('js-loaded')
        }, this.maxWaitTime)
      })
  }

  private handleUrlFragment(): void {
    const hash = window.location.hash
    if (hash) {
      try {
        const element = document.querySelector(hash)
        if (element) {
          // Most immediate way to scroll, with explicit instant behavior
          window.scrollTo({
            top: window.scrollY + element.getBoundingClientRect().top,
            left: 0,
            behavior: 'instant', // Force instant scroll
          })
        }
      }
      catch (e) {
        console.warn('Error handling URL fragment:', e)
      }
    }
  }

  private async setupIframe(iframe: HTMLIFrameElement): Promise<void> {
    const iframeWindow = iframe.contentWindow
    if (!iframeWindow)
      return

    const iframeDocument = iframeWindow.document

    const styleReset = iframeDocument.createElement('style')
    styleReset.textContent = `
            html, body {
                margin: 0;
                padding: 0;
                min-height: 0 !important;
            }
        `
    iframeDocument.head.appendChild(styleReset)

    await new Promise<void>((resolve) => {
      const checkResources = () => {
        const resources = Array.from(iframeDocument.getElementsByTagName('*'))
        const pendingImages = resources.filter(
          (el): el is HTMLImageElement =>
            el instanceof HTMLImageElement && !el.complete,
        )
        const pendingStylesheets = Array.from(iframeDocument.styleSheets).filter(
          (sheet) => {
            try {
              return sheet.cssRules === null
            }
            catch {
              return true
            }
          },
        )

        if (pendingImages.length === 0 && pendingStylesheets.length === 0) {
          resolve()
        }
        else {
          setTimeout(checkResources, this.readyStateCheckInterval)
        }
      }

      checkResources()
    })

    if (!this.isInitialLoad) {
      const resizeObserver = new ResizeObserver(() => {
        this.adjustHeight(iframe)
      })

      resizeObserver.observe(iframeDocument.documentElement)
      resizeObserver.observe(iframeDocument.body)

      const mutationObserver = new MutationObserver(() => {
        this.adjustHeight(iframe)
      })

      mutationObserver.observe(iframeDocument.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })
    }

    await this.adjustHeight(iframe)
  }

  private adjustHeight(iframe: HTMLIFrameElement): Promise<void> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const doc = iframe.contentWindow?.document
        if (!doc) {
          resolve()
          return
        }

        iframe.style.height = '0px'
        iframe.offsetHeight // Force reflow

        const contentHeight = Math.max(
          doc.documentElement.scrollHeight,
          doc.body.scrollHeight,
          doc.documentElement.offsetHeight,
          doc.body.offsetHeight,
          doc.documentElement.clientHeight,
          doc.body.clientHeight,
        )

        const finalHeight = this.options.minHeight
          ? Math.max(contentHeight, this.options.minHeight)
          : contentHeight

        iframe.style.height = `${finalHeight + this.options.bufferHeight}px`

        requestAnimationFrame(() => {
          resolve()
        })
      })
    })
  }

  public updateAllIframes(): void {
    if (!this.isInitialLoad) {
      this.iframes.forEach((iframe) => {
        this.adjustHeight(iframe)
      })
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line no-new
    new IframeManager('preview-iframe')
  })
}
else {
  // eslint-disable-next-line no-new
  new IframeManager('preview-iframe')
}
