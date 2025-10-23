import type { RenderFunction } from '../custom-component-renderer.ts'

/**
 * Accordion Component Renderer
 *
 * Usage:
 * :::accordion{type="info" title="What is this?"}
 * Content here
 * :::
 *
 * Props:
 * - type: 'info' (default: 'info')
 * - title: Title text for the accordion summary
 * - open: boolean - Whether the accordion should be open by default
 */
export const accordionRenderer: RenderFunction = (bodyContent, props) => {
  const type = props.type || 'info'
  const title = props.title || 'Click to expand'
  const open = props.open || false

  const accordionStyles = {
    info: {
      container: 'border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10',
      summary: 'text-blue-900 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-900/20',
    },
  } as const

  const styles = accordionStyles[type as keyof typeof accordionStyles] || accordionStyles.info

  const openAttr = open ? ' open' : ''

  return `
    <details class="group rounded-lg overflow-hidden ${styles.container}"${openAttr}>
      <summary class="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none transition-colors ${styles.summary}">
        <span class="font-bold text-sm flex-grow-1">${title}</span>
        <span class="shrink-0">
          <svg class="h-4 w-4 group-open:rotate-90 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
          </svg>
        </span>
      </summary>
      <div class="p-4">
        ${bodyContent}
      </div>
    </details>
  `
}
