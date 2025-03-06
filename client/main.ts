import { renderAlert } from './lib/alerts.ts'
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
      const { createShikiHighlighter, highlightCode } = await import('./lib/code.ts')
      await createShikiHighlighter()
      await highlightCode(codeElement)
    })
  })

  // highlight code in when browser is not busy and some time has passed
  setTimeout(() => {
    requestIdleCallback(async () => {
      const { createShikiHighlighter, highlightCode } = await import('./lib/code.ts')
      await createShikiHighlighter()

      codeDetails.forEach((detail) => {
        const codeElement = detail.querySelector<HTMLElement>('.code-highlight')
        if (!codeElement)
          throw new Error('No code element found')

        highlightCode(codeElement).catch(console.error)
      })
    })
  }, 5000)
}

const codeAuditButtons = document.querySelectorAll<HTMLButtonElement>('[data-code-audit-iframe]')
const codeAuditDialog = document.querySelector<HTMLDialogElement>('#code-audit-dialog')
if (codeAuditButtons.length > 0 && codeAuditDialog) {
  (async () => {
    const { createHtmlValidator, auditCode } = await import('./lib/html-validator.ts')

    codeAuditButtons.forEach(button => button.addEventListener('click', async () => {
      codeAuditButtons.forEach(button => button.setAttribute('aria-expanded', 'false'))

      button.setAttribute('disabled', '')

      const { isValid } = await auditCode(button, codeAuditDialog)
      if (isValid) {
        button.classList.add('text-green-500', '!cursor-not-allowed')
        renderAlert(
          'Scanned HTML, no issues found!',
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-green-500/50"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" /></svg>`,
        )

        setTimeout(() => {
          button.classList.remove('text-green-500', '!cursor-not-allowed')
          button.removeAttribute('disabled')
        }, 5000)
      }
      else {
        button.setAttribute('aria-expanded', 'true')
        button.removeAttribute('disabled')
        button.classList.add('text-red-500')
        codeAuditDialog.showModal()
      }
    }))

    new MutationObserver(() => {
      const closeDialogOnOutsideClick = (event: MouseEvent) => {
        // Use closest() to check if the click target is inside the dialog
        const clickedElement = event.target
        if (!(clickedElement instanceof Element))
          return

        const isClickInsideDialog = clickedElement.closest('dialog') !== null

        if (!isClickInsideDialog) {
          codeAuditDialog.close()
        }
      }

      if (codeAuditDialog.open) {
        document.addEventListener('click', closeDialogOnOutsideClick)
      }
      else {
        document.removeEventListener('click', closeDialogOnOutsideClick)
        codeAuditButtons.forEach((button) => {
          button.setAttribute('aria-expanded', 'false')
          setTimeout(() => button.classList.remove('text-red-500'), 2500)
        })
      }
    }).observe(codeAuditDialog, { attributes: true, attributeFilter: ['open'] })

    setTimeout(() => {
      requestIdleCallback(createHtmlValidator)
    }, 8000)
  })()
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

const previousLink = document.querySelector<HTMLButtonElement>('#styleguide-previous')
const nextLink = document.querySelector<HTMLButtonElement>('#styleguide-next')

if (previousLink) {
  window.addEventListener('styleguidePrevious', () => previousLink.click())
}

if (nextLink) {
  window.addEventListener('styleguideNext', () => nextLink.click())
}

if (previousLink || nextLink) {
  if (previousLink) {
    window.addEventListener('styleguidePrevious', () => previousLink.click())
  }

  if (nextLink) {
    window.addEventListener('styleguideNext', () => nextLink.click())
  }

  window.addEventListener('keydown', (event) => {
    if (previousLink && event.key === 'ArrowLeft') {
      previousLink.click()
    }

    if (nextLink && event.key === 'ArrowRight') {
      nextLink.click()
    }
  })
}
