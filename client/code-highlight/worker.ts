import type { HighlighterCore } from 'shiki'
import htmlLang from '@shikijs/langs/html'
import auroraX from '@shikijs/themes/aurora-x'
import githubLightDefault from '@shikijs/themes/github-light-default'
import { createHighlighterCore, createOnigurumaEngine } from 'shiki'
import shikiWasm from 'shiki/wasm'

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

globalThis.addEventListener('message', async (event: MessageEvent<{ lang: 'html' | 'text', text: string }>) => {
  if (!highlighter) {
    await createShikiHighlighter()
  }

  const result = highlighter.codeToHtml(event.data.text, {
    lang: event.data.lang,
    themes: {
      light: 'github-light-default',
      dark: 'aurora-x',
    },
  })

  globalThis.postMessage(result)
})
