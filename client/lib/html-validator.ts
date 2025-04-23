import type { HtmlValidate } from 'html-validate/browser'

interface ConsoleStyles {
  header: string
  elementStyle: string
  messageStyle: string
}

const styles: ConsoleStyles = {
  header: [
    'background: #ff5757',
    'color: white',
    'padding: 8px 12px',
    'border-radius: 4px 4px 0 0',
    'font-weight: bold',
    'font-size: 14px',
  ].join(';'),

  elementStyle: [
    'color: #d32f2f',
    'font-weight: bold',
    'font-family: monospace',
  ].join(';'),

  messageStyle: [
    'color: #333',
    'font-style: italic',
  ].join(';'),
}

let validator: HtmlValidate

function prettyValidationError<T extends HTMLElement>(error: string, element: T): void {
  console.group('%cValidation Error', styles.header)

  console.info(
    '%c%o',
    styles.elementStyle,
    element,
  )

  console.info(
    '%c%s',
    styles.messageStyle,
    error,
  )

  console.groupEnd()
}

export async function createHtmlValidator() {
  const { HtmlValidate, StaticConfigLoader } = await import('html-validate/browser')

  if (validator)
    return validator

  const loader = new StaticConfigLoader()
  validator = new HtmlValidate(loader)
  return validator
}

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function auditCode(codeAuditTrigger: HTMLButtonElement, auditResultDialog: HTMLDialogElement, closeDialog: () => Promise<void>) {
  const codeAuditIframeSelector = codeAuditTrigger.getAttribute('data-code-audit-iframe')
  if (!codeAuditIframeSelector)
    throw new Error('No code audit template selector provided')

  const codeAuditIFrame = document.querySelector<HTMLIFrameElement>(`#${codeAuditIframeSelector}`)
  if (!codeAuditIFrame)
    throw new Error('Code audit template not found')

  const validator = await createHtmlValidator()

  const htmlResponse = await fetch(codeAuditIFrame.src)
  const html = await htmlResponse.text()

  const resultsList = auditResultDialog.querySelector<HTMLUListElement>('.audit-results')
  if (!resultsList)
    throw new Error('No audit results list found')

  const { results: validatorResults, valid: isHTMLValid } = await validator.validateString(html, {
    rules: {
      'no-trailing-whitespace': 'off',
      'no-inline-style': 'off',
    },
  })

  if (isHTMLValid || validatorResults.length === 0) {
    return { isValid: true }
  }

  const result = validatorResults[0].messages
    // sort by severity
    .sort((a, b) => a.severity - b.severity)
    .reduce<{
    ruleId: string
    message: string
    ruleUrl: string
    selectors: string[]
    context: any
  }[]>((acc, error) => {
      // Find existing group for this rule ID
      const existingGroup = acc.find(group => group.ruleId === error.ruleId)

      if (existingGroup) {
        // Add selector to existing group if not already present and exists
        if (error.selector && !existingGroup.selectors.includes(error.selector)) {
          existingGroup.selectors.push(error.selector)
        }
        return acc
      }

      // Create new group if one doesn't exist
      acc.push({
        // escape possible html entities
        ruleId: error.ruleId.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        message: error.message,
        ruleUrl: error.ruleUrl || `https://html-validate.org/rules/${error.ruleId}.html`,
        selectors: error.selector ? [error.selector] : [],
        context: error.context,
      })

      return acc
    }, [])

  resultsList.innerHTML = `
    ${result.map(message => `
        <li class="border-b border-styleguide-border first:border-t last:border-none">
            <details class="group">
                <summary class="flex cursor-pointer justify-start items-center px-6 py-4 text-sm bg-styleguide-bg transition hover:bg-[rgb(242,242,242)] focus:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)] dark:focus:bg-[rgb(26,26,26)]">
                    <svg class="h-4 w-4 group-open:rotate-90 transition-transform mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                    </svg>
                    <span>
                        <span class="font-semibold mr-1">${message.ruleId}:</span><span>${escapeHtml(message.message)}</span>
                    </span>
                </summary>
                
                <div class="border-t pl-12 pr-6 py-6 text-sm bg-styleguide-bg-highlight border-styleguide-border">
                     <p class="mb-3 pb-3 border-b border-styleguide-border">
                        <a class="flex gap-1 group/link items-center text-sm text-blue-600" href="${message.ruleUrl}" target="_blank">
                            Learn more about the rule
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-3 w-3">
                                <path class="transition group-hover/link:translate-x-px group-hover/link:-translate-y-px group-focus/link:translate-x-px group-focus/link:-translate-y-px" d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path>
                                <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path>
                            </svg>
                        </a>
                    </p>
                    
                    <h3 class="font-bold text-sm text-styleguide-highlight">Selectors</h3>
                    <ul>
                        ${message.selectors.map(selector => `
                            <li>
                                <button 
                                    class="block font-mono py-1.5 text-[13px] text-blue-600 text-sm cursor-pointer text-left"
                                    data-iframe-selector="${escapeHtml(`${message.ruleId}: ${message.message}`)}"
                                  >
                                    ${selector}
                                </button>
                            </li>
                        `).join('\n')}
                    </ul>
                </div>
            </details>
        </li>
    `).join('\n')}
  `

  const iframeSelectors = resultsList.querySelectorAll<HTMLButtonElement>('[data-iframe-selector]')
  iframeSelectors.forEach((selector) => {
    const message = selector.getAttribute('data-iframe-selector')
    if (!message)
      throw new Error('No message found')

    selector.addEventListener('click', async () => {
      await closeDialog()

      const selectorContent = selector.textContent
      if (!selectorContent)
        throw new Error('No selector found')

      const elements = codeAuditIFrame.contentDocument?.querySelectorAll<HTMLElement>(selectorContent)
      if (!elements)
        throw new Error('No elements found')

      elements.forEach((element) => {
        prettyValidationError(message, element)
        element.style.outline = '2px solid red'
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => element.style.outline = '', 5000)
      })
    })
  })

  return { isValid: isHTMLValid }
}
