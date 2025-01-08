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

    triggerButton.addEventListener('click', async () => {
      const { highlightCode } = await import('./lib/code.ts')
      await highlightCode(codeHighlight)
    })
  })

  // highlight code in when browser is not busy and some time has passed
  setTimeout(() => {
    codeHighlights.forEach((codeHighlight) => {
      requestIdleCallback(async () => {
        const { highlightCode } = await import('./lib/code.ts')
        await highlightCode(codeHighlight)
      })
    })
  }, 5000)
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
