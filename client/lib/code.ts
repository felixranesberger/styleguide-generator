import type { HighlighterCore } from 'shiki'
import { createHighlighterCore, createOnigurumaEngine } from 'shiki'

let highlighter: HighlighterCore

/**
 * Code highlighter is pre-warmed to avoid delays on first use after some time by main.js
 */
export async function prewarmCodeHighlighter() {
  if (highlighter)
    return

  highlighter = await createHighlighterCore({
    themes: [
      import('@shikijs/themes/aurora-x'),
      import('@shikijs/themes/github-light-default'),
    ],
    langs: [
      import('@shikijs/langs/html'),
    ],
    engine: createOnigurumaEngine(import('shiki/wasm')),
  })
}

export async function highlightCode(element: HTMLDetailsElement, modifierClass?: string) {
  // make sure code highlighter is ready
  await prewarmCodeHighlighter()

  const sourceElement = element.querySelector<HTMLTemplateElement>('[data-type="code"]')
  if (!sourceElement)
    throw new Error('No source element found')

  let source = sourceElement.innerHTML.trim()

  // if modifier is provided, replace the modifier class
  if (modifierClass) {
    source = source.replaceAll('{{modifier_class}}', modifierClass)
  }

  const code = highlighter.codeToHtml(source, {
    lang: 'html',
    themes: {
      light: 'github-light-default',
      dark: 'aurora-x',
    },
  })

  // remove might pre-existing code
  const preElements = element.querySelectorAll('pre')
  preElements.forEach(pre => pre.remove())

  // add code to the element
  element.insertAdjacentHTML('beforeend', code)
}
