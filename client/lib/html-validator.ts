import type { AxeResults, Result } from 'axe-core'
import { each, when } from "../../lib/template-utils.ts";

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

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

interface AxeResultEvent extends CustomEvent {
  detail: AxeResults
}

// Add interface for iframe window
interface IFrameWindow extends Window {
  runAxe: () => Promise<void>
}

export async function auditCode(codeAuditTrigger: HTMLButtonElement, auditResultDialog: HTMLDialogElement, closeDialog: () => Promise<void>) {
  const codeAuditIframeSelector = codeAuditTrigger.getAttribute('data-code-audit-iframe')
  if (!codeAuditIframeSelector)
    throw new Error('No code audit template selector provided')

  const codeAuditIFrame = document.querySelector<HTMLIFrameElement>(`#${codeAuditIframeSelector}`)
  if (!codeAuditIFrame)
    throw new Error('Code audit template not found')

  if (!codeAuditIFrame.contentWindow)
    throw new Error('Code audit iframe has no content window')

  const resultsList = auditResultDialog.querySelector<HTMLDivElement>('.audit-results')
  if (!resultsList)
    throw new Error('No audit results list found')

  const results = await new Promise<AxeResults>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Axe audit timed out'))
    }, 30000)

    const eventHandler = (event: Event) => {
      const axeEvent = event as AxeResultEvent
      clearTimeout(timeout)
      codeAuditIFrame.removeEventListener('axe-result', eventHandler)
      resolve(axeEvent.detail)
    }

    codeAuditIFrame.addEventListener('axe-result', eventHandler)

    const iframeWindow = codeAuditIFrame.contentWindow as IFrameWindow
    if (iframeWindow.runAxe) {
      iframeWindow.runAxe()
    } else {
      clearTimeout(timeout)
      codeAuditIFrame.removeEventListener('axe-result', eventHandler)
      reject(new Error('runAxe function not found in iframe'))
    }
  })

  console.log(1759686807266, results)

  if (!results)
    throw new Error('No results from axe-core')

  type AxeImpactTypes = 'violations' | 'incomplete' | 'inapplicable' | 'passes'

  const renderSection = (
    impact: AxeImpactTypes,
    labelIcon: string,
    results: Result[],
  ) => {
    const label = impact.charAt(0).toUpperCase() + impact.slice(1)

    // sort results by severity: critical, serious, moderate, minor
    const severityOrder = ['critical', 'serious', 'moderate', 'minor'] as const
    const sortedResults = results.toSorted((a, b) => {
      const aIndex = severityOrder.indexOf(a.impact || 'minor')
      const bIndex = severityOrder.indexOf(b.impact || 'minor')
      return aIndex - bIndex
    })

    return `
    <li>
      <h3 class="px-6 py-4 text-sm font-semibold leading-[1]">
        <span class="mr-2" aria-hidden="true">${labelIcon}</span>
        <span class="text-styleguide-highlight">${label}:</span>
        <span class="ml-2">(${results.length})</span>        
      </h3>
      
      ${when(sortedResults.length > 0, `
          <ol>
            ${each(sortedResults, (result) => `
              <li class="border-b border-styleguide-border border-t last:border-none">
                <details class="group">
                  <summary 
                    class="flex cursor-pointer justify-start items-center px-6 py-4 text-sm gap-2 
                           bg-styleguide-bg transition hover:bg-[rgb(242,242,242)] 
                           focus:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)] 
                           dark:focus:bg-[rgb(26,26,26)]"
                  >
                    <svg class="h-4 w-4 group-open:rotate-90 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="font-semibold">${result.id}</span>
                    ${when(result.impact && ['violations', 'incomplete'].includes(impact), `<span>${result.impact!}</span>`)}
                  </summary>
                  
                  <div class="border-t px-6 py-6 text-sm bg-styleguide-bg-highlight border-styleguide-border">
                    <p class="mb-3">
                        ${result.description}
                    </p>
                    
                    <p class="mb-3 pb-3 border-b border-styleguide-border">
                      <a 
                        class="flex gap-1 group/link items-center text-sm text-blue-600" 
                        href="${result.helpUrl}" 
                        target="_blank"
                      >
                        Learn more about the rule
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-3 w-3">
                          <path class="transition group-hover/link:translate-x-px group-hover/link:-translate-y-px group-focus/link:translate-x-px group-focus/link:-translate-y-px" d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path>
                          <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path>
                        </svg>
                      </a>
                    </p>
                    
                    ${when(['violations', 'incomplete'].includes(impact) && result.nodes.length > 0, `
                      <ol>
                        ${each(result.nodes, (node) => `
                          <li>
                            <p>
                              <strong>Failure Summary:</strong> 
                              ${node.failureSummary}
                            </p>
                            <p>
                              <strong>Impact:</strong> ${node.impact}
                            </p>
                            
                            <p>
                              <strong>HTML:</strong>
                            </p>
                            
                            <div class="overflow-x-auto w-full code-highlight">
                              <pre
                                class="shiki shiki-themes github-light-default aurora-x"
                                style="background-color:#ffffff;--shiki-dark-bg:#07090F;color:#1f2328;--shiki-dark:#bbbbbb"
                              ><code>${escapeHtml(node.html)}</code></pre>
                            </div>
                            
                            <p>Targets</p>
                            <ol>
                              ${each(node.target, (target) => `
                                <li>
                                  <button 
                                    class="block font-mono py-1.5 text-[13px] text-blue-600 text-sm cursor-pointer text-left"
                                    data-iframe-selector="${escapeHtml(result.description)}"
                                  >
                                    ${target}
                                  </button>
                                </li>
                              `)}
                            </ol>
                          </li>
                        `)}  
                      </ol>
                    `)}
                  </div>
                </details>
              </li>
            `)}
          </ol>
        `
      )}
    </li>
  `
  }

  const violationIcon = results.violations.length > 0 ? '🔴' : '🟢'
  const incompleteIcon = results.incomplete.length > 0 ? '🟠' : '🟢'

  resultsList.innerHTML = `
    ${renderSection('violations', violationIcon, results.violations)}
    ${renderSection('incomplete', incompleteIcon, results.incomplete)}
    ${renderSection('passes', '🟢', results.passes)}
    ${renderSection('inapplicable', '⚪', results.inapplicable)}
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
        element.scrollIntoView({behavior: 'smooth', block: 'center'})
        setTimeout(() => element.style.outline = '', 5000)
      })
    })
  })
}