import { useDialog } from '../hooks/use-dialog.ts'

const dialog = document.querySelector<HTMLDialogElement>('#search-dialog')
if (!dialog)
  throw new Error('No search dialog found')

const dialogBackdrop = document.querySelector<HTMLElement>('.dialog-backdrop')
if (!dialogBackdrop)
  throw new Error('No dialog backdrop found')

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

const { show, close } = useDialog(dialog, dialogBackdrop)

async function showDialog() {
  await show(
    (isMobileScreen) => {
      if (isMobileScreen) {
        searchInput!.setAttribute('inert', '') // avoid focusing search input directly
      }
    },
    (isMobileScreen) => {
      if (isMobileScreen) {
        searchInput!.removeAttribute('inert')
      }

      openSearchTriggers.forEach(trigger => trigger.ariaExpanded = 'true')
      searchInput!.ariaExpanded = 'true'

      handleSearchFilter()
    },
  )
}

async function closeDialog() {
  await close(
    undefined,
    () => {
      openSearchTriggers.forEach(trigger => trigger.ariaExpanded = 'false')
      searchInput!.ariaExpanded = 'false'
    },
  )
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

// detect custom event to open search
window.addEventListener('styleguideOpenSearch', showDialog)
