import './style.css'
import './lib/menu.ts'
import './lib/iframe.ts'
import './lib/theme-select.ts'
import './lib/search.ts'

const codeHighlights = document.querySelectorAll<HTMLDetailsElement>('details:has(.code-highlight)')
if (codeHighlights.length > 0) {
  codeHighlights.forEach((codeHighlight) => {
    const triggerButton = codeHighlight.querySelector<HTMLButtonElement>('summary')
    if (!triggerButton)
      throw new Error('No trigger button found')

    triggerButton.addEventListener('click', () => {
      import('./lib/code.ts')
        .then(({ highlightCode }) => highlightCode(codeHighlight))
        .catch(console.error)
    })
  })

  // create code highlighter after 10s to avoid delays on first use after some time
  setTimeout(() => {
    import('./lib/code.ts')
      .then(({ prewarmCodeHighlighter }) => prewarmCodeHighlighter())
      .catch(console.error)
  })
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
