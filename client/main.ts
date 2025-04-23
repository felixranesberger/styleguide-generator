import { animate } from 'motion'
import { highlightCode } from './code-highlight'
import { useDialog } from './hooks/use-dialog.ts'
import { useElementHorizontalOverflow } from './hooks/use-overflow.ts'
import { renderAlert } from './lib/alerts.ts'
import initPreviewIframes, { removeDocumentLoadingClass } from './lib/iframe.ts'
import initTabs from './lib/tabs.ts'
import initThemeSelect from './lib/theme-select.ts'
import './accessibility.ts'
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

const styleguideSections = document.querySelectorAll<HTMLElement>('.styleguide-section')
styleguideSections.forEach((section) => {
  new ResizeObserver(() => {
    const isLargeSection = section.scrollHeight > 600
    section.classList.toggle('styleguide-section--large', isLargeSection)
  }).observe(section)
})

const tabs = document.querySelectorAll<HTMLElement>('.tabs')
if (tabs.length > 0) {
  initTabs(tabs)
}

const codeDetails = document.querySelectorAll<HTMLDetailsElement>('details:has(.code-highlight)')
if (codeDetails.length > 0) {
  codeDetails.forEach((detail) => {
    const codeElement = detail.querySelector<HTMLElement>('.code-highlight')
    if (!codeElement)
      throw new Error('No code element found')

    highlightCode(codeElement).catch(console.error)
  })
}

const codeAuditButtons = document.querySelectorAll<HTMLButtonElement>('[data-code-audit-iframe]')
const codeAuditDialog = document.querySelector<HTMLDialogElement>('#code-audit-dialog')
const dialogBackdrop = document.querySelector<HTMLElement>('.dialog-backdrop')
if (codeAuditButtons.length > 0 && codeAuditDialog && dialogBackdrop) {
  (async () => {
    const { createHtmlValidator, auditCode } = await import('./lib/html-validator.ts')
    const { show: showDialog, close: closeDialog } = useDialog(codeAuditDialog, dialogBackdrop)

    codeAuditButtons.forEach(button => button.addEventListener('click', async () => {
      codeAuditButtons.forEach(button => button.setAttribute('aria-expanded', 'false'))
      button.setAttribute('disabled', '')

      const { isValid } = await auditCode(button, codeAuditDialog, closeDialog)
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
        await showDialog(
          undefined,
          () => {
            codeAuditButtons.forEach((button) => {
              button.setAttribute('aria-expanded', 'false')
              setTimeout(() => button.classList.remove('text-red-500'), 2500)
            })
          },
        )
      }
    }))

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

const markdownFolded = document.querySelectorAll<HTMLElement>('.markdown-container-folded')
if (markdownFolded.length > 0) {
  markdownFolded.forEach((container) => {
    const markdownContainer = container.querySelector<HTMLElement>('.markdown-container')
    if (!markdownContainer)
      throw new Error('No markdown container found')

    const showMoreContainer = container.querySelector('.markdown-show-more-container')
    if (!showMoreContainer)
      throw new Error('No show more container found')

    const showMoreButton = container.querySelector<HTMLButtonElement>('.markdown-show-more')
    if (!showMoreButton)
      throw new Error('No show more button found')

    const { $isOverflowingVertically } = useElementHorizontalOverflow(container)
    const handleOverflow = () => {
      // detect if content inside markdownContainer is larger than maxWidth
      const newIsOverflowing = markdownContainer.scrollHeight > markdownContainer.clientHeight
      showMoreContainer.classList.toggle('hidden', !newIsOverflowing)
    }

    handleOverflow()
    const cleanup = $isOverflowingVertically.effect(handleOverflow)

    showMoreButton.addEventListener('click', async () => {
      cleanup()

      const markdownContainerHeight = markdownContainer.scrollHeight
      animate(markdownContainer, {
        maxHeight: `${markdownContainerHeight}px`,
      }, { duration: 0.5 })
        .then(() => {
          markdownContainer.classList.remove('max-h-[400px]')
          markdownContainer.style.maxHeight = ''
        })

      animate(showMoreContainer, {
        opacity: 0,
      }, { duration: 0.5 })
        .then(() => showMoreContainer.classList.add('hidden'))
    })
  })
}

let isScrollingTimeout: Timer | undefined
window.addEventListener('scroll', () => {
  if (isScrollingTimeout) {
    clearTimeout(isScrollingTimeout)
    isScrollingTimeout = undefined
  }

  if (!document.body.classList.contains('is-scrolling'))
    document.body.classList.add('is-scrolling')

  isScrollingTimeout = setTimeout(() => {
    document.body.classList.remove('is-scrolling')
  }, 250)
})
