import initPreviewIframes, { removeDocumentLoadingClass } from './lib/iframe.ts'
import initThemeSelect from './lib/theme-select.ts'
import './style.css'
import './lib/menu.ts'
import './lib/search.ts'

const previewIframes = Array.from(document.querySelectorAll<HTMLIFrameElement>('.preview-iframe'))
if (previewIframes.length > 0) {
  initPreviewIframes(previewIframes).catch(console.error)
}
else {
  removeDocumentLoadingClass()
}

const themeSelectForm = document.querySelector<HTMLFormElement>('.theme-select')
if (themeSelectForm) {
  initThemeSelect(themeSelectForm)
}

const codeDetails = document.querySelectorAll<HTMLDetailsElement>('details:has(.code-highlight)')
if (codeDetails.length > 0) {
  codeDetails.forEach((detail) => {
    const codeElement = detail.querySelector<HTMLElement>('.code-highlight')
    if (!codeElement)
      throw new Error('No code element found')

    const triggerButton = detail.querySelector<HTMLButtonElement>('summary')
    if (!triggerButton)
      throw new Error('No trigger button found')

    triggerButton.addEventListener('click', async () => {
      const { highlightCode } = await import('./lib/code.ts')
      await highlightCode(codeElement)
    })
  })

  // highlight code in when browser is not busy and some time has passed
  setTimeout(() => {
    codeDetails.forEach((detail) => {
      const codeElement = detail.querySelector<HTMLElement>('.code-highlight')
      if (!codeElement)
        throw new Error('No code element found')

      requestIdleCallback(async () => {
        const { highlightCode } = await import('./lib/code.ts')
        await highlightCode(codeElement)
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
