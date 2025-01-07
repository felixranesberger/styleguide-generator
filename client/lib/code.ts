import { createHighlighterCore, createOnigurumaEngine } from 'shiki'

export default async (elements: NodeListOf<HTMLElement>, modifierClass?: string) => {
  const highlighter = await createHighlighterCore({
    themes: [
      import('@shikijs/themes/aurora-x'),
      import('@shikijs/themes/github-light-default'),
    ],
    langs: [
      import('@shikijs/langs/html'),
    ],
    engine: createOnigurumaEngine(import('shiki/wasm')),
  })

  elements.forEach((element) => {
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
  })
}
