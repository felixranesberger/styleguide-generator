import type { HighlighterCore } from 'shiki'
import htmlLang from '@shikijs/langs/html'
import auroraX from '@shikijs/themes/aurora-x'
import githubLightDefault from '@shikijs/themes/github-light-default'
import { createHighlighterCore, createOnigurumaEngine } from 'shiki'
import shikiWasm from 'shiki/wasm'

const CODE_HIGHLIGHTED_ATTRIBUTE = 'data-highlighted'

let highlighter: HighlighterCore

export async function createShikiHighlighter() {
  if (highlighter)
    return

  highlighter = await createHighlighterCore({
    themes: [
      auroraX,
      githubLightDefault,
    ],
    langs: [
      htmlLang,
    ],
    engine: createOnigurumaEngine(shikiWasm),
  })
}

export async function highlightCode(element: HTMLElement, modifierClass?: string) {
  const isAlreadyHighlighted = element.getAttribute(CODE_HIGHLIGHTED_ATTRIBUTE) === 'true'
  if (isAlreadyHighlighted)
    return

  if (!highlighter) {
    await createShikiHighlighter()
  }

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

  // mark as highlighted
  element.setAttribute(CODE_HIGHLIGHTED_ATTRIBUTE, 'true')
}
