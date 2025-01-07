function handleHeader() {
  const header = document.querySelector('header')
  if (!header)
    throw new Error('No header found')

  const getHeaderHeight = () => header.getBoundingClientRect().height

  // set header-height css variable
  document.documentElement.style.setProperty('--header-height', `${getHeaderHeight()}px`)

  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--header-height', `${getHeaderHeight()}px`)
  })
}

function handleMenuScrollbar() {
  const asideMenu = document.querySelector<HTMLElement>('aside')
  if (!asideMenu) {
    throw new Error('No aside menu found')
  }

  // Save scroll position as a percentage when user scrolls
  asideMenu.addEventListener('scroll', (): void => {
    const scrollPercentage = (asideMenu.scrollTop / (asideMenu.scrollHeight - asideMenu.clientHeight)) * 100
    sessionStorage.setItem('asideScrollPercentage', scrollPercentage.toString())
  })

  // Restore scroll position on page load and window resize
  function restoreScrollPosition(): void {
    const savedScrollPercentage = sessionStorage.getItem('asideScrollPercentage')
    if (savedScrollPercentage) {
      const percentage = Number.parseFloat(savedScrollPercentage)
      const scrollTop = ((asideMenu.scrollHeight - asideMenu.clientHeight) * percentage) / 100
      asideMenu.scrollTop = scrollTop
    }
  }

  // Listen for window resize events
  window.addEventListener('resize', restoreScrollPosition)

  // Initial restore on page load
  restoreScrollPosition()
}

handleHeader()
handleMenuScrollbar()
