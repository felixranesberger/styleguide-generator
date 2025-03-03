import { animate } from 'motion'

const dialog = document.querySelector<HTMLDialogElement>('#search-dialog')
if (!dialog)
  throw new Error('No search dialog found')

const searchBackdrop = document.querySelector<HTMLElement>('.search-backdrop')
if (!searchBackdrop)
  throw new Error('No search backdrop found')

const openSearchTriggers = document.querySelectorAll<HTMLButtonElement>('[data-open-search]')
if (openSearchTriggers.length === 0)
  throw new Error('No open search buttons found')

const searchInput = document.querySelector<HTMLInputElement>('#search-input')
if (!searchInput)
  throw new Error('No search input found')

const searchList = document.querySelector<HTMLElement>('#search-list')
if (!searchList)
  throw new Error('No search list found')

const searchResults = document.querySelectorAll<HTMLElement>('.search-category__item--active')
if (!searchResults)
  throw new Error('No search results found')

const searchNoResults = document.querySelector('#search-no-results')
if (!searchNoResults)
  throw new Error('No search no results element found')

const getIsMobileScreen = () => window.matchMedia('(max-width: 768px)').matches

async function closeDialogOnOutsideClick(event: MouseEvent) {
  // Use closest() to check if the click target is inside the dialog
  const clickedElement = event.target
  if (!(clickedElement instanceof HTMLElement))
    throw new Error('Clicked element is not an HTMLElement')

  const isClickInsideDialog = clickedElement.closest('dialog') !== null

  if (!isClickInsideDialog) {
    await closeDialog()
  }
}

async function showDialog() {
  const yScrollPos = window.scrollY
  dialog!.showModal()

  await new Promise(resolve => setTimeout(resolve, 50))

  // reset scroll position to avoid jumping
  window.scrollTo(0, yScrollPos)
  setTimeout(() => window.scrollTo(0, yScrollPos), 0)
  setTimeout(() => window.scrollTo(0, yScrollPos), 50)

  searchBackdrop!.style.display = 'block'

  const isMobileScreen = getIsMobileScreen()
  if (isMobileScreen) {
    dialog!.style.overflowY = 'hidden' // avoid showing ugly scrollbar directly
    searchInput!.inert = true // avoid focusing search input directly

    animate(dialog!, { opacity: [0, 1], y: [250, 0] }, { duration: 0.3, ease: 'easeOut' })
    await animate(searchBackdrop!, { opacity: [0, 1] }, { duration: 0.3, ease: 'easeOut' })

    dialog!.style.overflowY = 'auto'
    searchInput!.inert = false
  }
  else {
    animate(dialog!, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, ease: 'easeOut' })
    animate(searchBackdrop!, { opacity: [0, 1] }, { duration: 0.3, ease: 'easeOut' })
  }

  openSearchTriggers.forEach(trigger => trigger.ariaExpanded = 'true')
  searchInput!.ariaExpanded = 'true'

  handleSearchFilter()

  // wrap in timeout to prevent immediate closing of dialog
  setTimeout(() => document.addEventListener('click', closeDialogOnOutsideClick), 0)
}

async function closeDialog() {
  if (!dialog!.open)
    return

  document.removeEventListener('click', closeDialogOnOutsideClick)

  const isMobileScreen = getIsMobileScreen()
  if (isMobileScreen) {
    animate(dialog!, { opacity: 0, y: [0, 250] }, { duration: 0.3, ease: 'easeOut' })
    await animate(searchBackdrop!, { opacity: 0 }, { duration: 0.3, ease: 'easeOut' })
  }
  else {
    animate(dialog!, { opacity: 0 }, { duration: 0.3, ease: 'easeOut' })
    await animate(searchBackdrop!, { opacity: 0 }, { duration: 0.4, ease: 'easeOut' })
      .then(() => searchBackdrop!.style.display = 'none')
  }

  openSearchTriggers.forEach(trigger => trigger.ariaExpanded = 'false')
  searchInput!.ariaExpanded = 'false'

  dialog!.close()
}

function handleSearchFilter() {
  const searchValue = searchInput!.value.toLowerCase().trim()
  let hasSearchResults = false

  searchResults.forEach((result) => {
    let isValidResult: boolean

    const searchKeywords = result.getAttribute('data-search-keywords')?.split(',') || []
    if (searchKeywords.length > 0) {
      isValidResult = searchKeywords.some(keyword => keyword.toLowerCase().includes(searchValue))
    }
    else {
      const resultText = result.textContent?.toLowerCase() ?? ''
      isValidResult = resultText?.includes(searchValue)
    }

    result.classList.toggle('search-category__item--active', isValidResult)

    if (isValidResult)
      hasSearchResults = true
  })

  searchList!.classList.toggle('hidden', !hasSearchResults)
  searchNoResults!.classList.toggle('hidden', hasSearchResults)
}

searchInput.addEventListener('input', handleSearchFilter)
openSearchTriggers.forEach(button => button.addEventListener('click', showDialog))

// open modal with cmd + k
document.addEventListener('keydown', async (event) => {
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    await showDialog()
  }
})

// detect custom event dispatched from iframe
// when cmd + k is pressed inside iframe
window.addEventListener('styleguideOpenSearch', showDialog)

// detect closes using escape and execute custom animation sequence instead
dialog!.addEventListener('keydown', async (event) => {
  if (event.key !== 'Escape')
    return

  event.preventDefault()
  await closeDialog()
})
