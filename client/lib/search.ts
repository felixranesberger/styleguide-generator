const dialog = document.querySelector<HTMLDialogElement>('#search-dialog')
if (!dialog)
  throw new Error('No search dialog found')

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

function handleSearchFilter() {
  const searchValue = searchInput.value.toLowerCase().trim()

  let hasSearchResults = false

  searchResults.forEach((result) => {
    let isValidResult = false

    const searchKeywords = result.getAttribute('data-search-keywords')?.split(',') || []
    if (searchKeywords.length > 0) {
      isValidResult = searchKeywords.some(keyword => keyword.toLowerCase().includes(searchValue))
    }
    else {
      const resultText = result.innerText?.toLowerCase()
      isValidResult = resultText?.includes(searchValue)
    }

    result.classList.toggle('search-category__item--active', isValidResult)

    if (isValidResult)
      hasSearchResults = true
  })

  searchList.classList.toggle('hidden', !hasSearchResults)
  searchNoResults.classList.toggle('hidden', hasSearchResults)
}

searchInput.addEventListener('input', handleSearchFilter)

openSearchTriggers.forEach((button) => {
  button.addEventListener('click', () => dialog.showModal())
})

function closeDialogOnOutsideClick(event) {
  // Use closest() to check if the click target is inside the dialog
  const clickedElement = event.target
  const isClickInsideDialog = clickedElement.closest('dialog') !== null

  if (!isClickInsideDialog) {
    dialog.close()
  }
}

// Register changes to the dialog open state
new MutationObserver(() => {
  if (!dialog.open) {
    document.removeEventListener('click', closeDialogOnOutsideClick)
    searchInput.value = ''
    handleSearchFilter()
  }
  else {
    const isMobileView = window.matchMedia('(max-width: 768px)').matches
    if (isMobileView)
      searchInput.blur()

    // Small delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener('click', closeDialogOnOutsideClick)
    }, 0)
  }
}).observe(dialog, { attributes: true, attributeFilter: ['open'] })

// open modal with cmd + k
document.addEventListener('keydown', (event) => {
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    dialog.showModal()
  }
})
