function detectOS(): 'mac' | 'linux' | 'windows' | 'unknown' {
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.includes('mac')) {
    return 'mac'
  }

  if (userAgent.includes('linux')) {
    return 'linux'
  }

  if (userAgent.includes('win')) {
    return 'windows'
  }

  return 'unknown'
}

/**
 * Detect arrow key navigation and navigate to the previous/next page
 */
function detectPageArrowNavigation() {
  const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe')
  const previousLink = document.querySelector<HTMLButtonElement>('#styleguide-previous')
  const nextLink = document.querySelector<HTMLButtonElement>('#styleguide-next')

  const handleKeydown = (event: KeyboardEvent) => {
    if (previousLink && event.key === 'ArrowLeft') {
      event.preventDefault()
      previousLink.click()
    }

    if (nextLink && event.key === 'ArrowRight') {
      event.preventDefault()
      nextLink.click()
    }
  }

  // detect arrow navigation in iframes
  iframes.forEach((iframe) => {
    const iframeWindow = iframe.contentWindow
    if (!iframeWindow)
      return

    iframeWindow.addEventListener('keydown', handleKeydown)
  })

  // detect arrow navigation in parent window
  window.addEventListener('keydown', handleKeydown)
}

/**
 * Open search using cmd+k or ctrl+k
 */
function openSearchShortcut() {
  const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe')

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      window.dispatchEvent(new Event('styleguideOpenSearch'))
    }
  }

  // detect open search in iframes
  iframes.forEach((iframe) => {
    const iframeWindow = iframe.contentWindow
    if (!iframeWindow)
      return

    iframeWindow.addEventListener('keydown', handleKeydown)
  })

  // detect open search in parent window
  window.addEventListener('keydown', handleKeydown)
}

// set system specific class
const os = detectOS()
document.body.setAttribute('data-os', os)

// detect if the device is a mobile device
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
document.body.setAttribute('data-is-mobile', String(isMobile))

// navigate using arrow left and right keys
detectPageArrowNavigation()

// open search using cmd+k or ctrl+k
openSearchShortcut()
