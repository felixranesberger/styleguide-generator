import './style.css'
import './lib/menu.ts'
import './lib/iframe.ts'
import './lib/theme-select.ts'
import './lib/search.ts'

// import dynamically because of the large size of the code
const codeHighlights = document.querySelectorAll<HTMLElement>('.code-highlight')
if (codeHighlights.length > 0) {
  import('./lib/code.ts')
    .then(({ default: init }) => init(codeHighlights))
    .catch(console.error)
}

const iconFilterInput = document.querySelector<HTMLInputElement>('#icon-search-input')
const iconFilterReset = document.querySelector<HTMLButtonElement>('#icon-search-input-reset')
const iconList = document.querySelector<HTMLUListElement>('#icon-search-list')

if (iconFilterInput && iconList && iconFilterReset) {
  import('./lib/icons.ts')
    .then(({ default: init }) => init(iconFilterInput, iconList, iconFilterReset))
    .catch(console.error)
}

const copyAttribute = 'data-clipboard-value'
const copyButtons = document.querySelectorAll<HTMLButtonElement>(`button[${copyAttribute}]`)
if (copyButtons.length > 0) {
  import('./lib/clipboard.ts')
    .then(({ default: init }) => init(copyButtons, copyAttribute))
    .catch(console.error)
}
