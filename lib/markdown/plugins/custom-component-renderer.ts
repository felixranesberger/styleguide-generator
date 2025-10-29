import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'

export type RenderFunction = (bodyContent: string, props: Record<string, any>) => string

interface ComponentOptions {
  marker?: string
  components?: Record<string, RenderFunction>
}

const defaultOptions: ComponentOptions = {
  marker: ':::',
  components: {},
}

function parseProps(propsStr: string): Record<string, any> {
  const props: Record<string, any> = {}

  // Match key="value" pairs, including support for nested quotes
  const regex = /(\w+)=(?:"([^"]*)"|'([^']*)'|(\w+))/g
  let match = regex.exec(propsStr)

  while (match !== null) {
    const key = match[1]
    const value = match[2] || match[3] || match[4]

    // Try to parse as JSON for boolean, number, etc.
    try {
      props[key] = JSON.parse(value)
    }
    catch {
      props[key] = value
    }

    match = regex.exec(propsStr)
  }

  return props
}

function componentBlock(
  options: ComponentOptions,
): (state: any, start: number, end: number, silent: boolean) => boolean {
  return (state: any, start: number, end: number, silent: boolean): boolean => {
    const pos = state.bMarks[start] + state.tShift[start]
    const max = state.eMarks[start]

    // Check if line starts with :::
    if (pos + 3 > max)
      return false
    if (state.src.charCodeAt(pos) !== 0x3A /* : */)
      return false
    if (state.src.charCodeAt(pos + 1) !== 0x3A /* : */)
      return false
    if (state.src.charCodeAt(pos + 2) !== 0x3A /* : */)
      return false

    const markup = state.src.slice(pos, pos + 3)
    const params = state.src.slice(pos + 3, max).trim()

    // Parse component name and props: :::componentName{prop="value"}
    const braceIndex = params.indexOf('{')
    const componentName = braceIndex === -1 ? params : params.slice(0, braceIndex)

    if (!componentName || !options.components![componentName]) {
      return false
    }

    // Parse props if they exist
    let props: Record<string, any> = {}
    if (braceIndex !== -1) {
      const braceEnd = params.indexOf('}', braceIndex)
      if (braceEnd !== -1) {
        const propsStr = params.slice(braceIndex + 1, braceEnd)
        props = parseProps(propsStr)
      }
    }

    // Look for closing marker
    let nextLine = start + 1
    let foundClosing = false

    while (nextLine < end) {
      const linePos = state.bMarks[nextLine] + state.tShift[nextLine]
      const lineMax = state.eMarks[nextLine]
      const line = state.src.slice(linePos, lineMax).trim()

      if (line === ':::') {
        foundClosing = true
        break
      }
      nextLine++
    }

    if (!foundClosing) {
      return false
    }

    if (silent) {
      return true
    }

    // Create a single token that contains everything
    const token = state.push('component', 'div', 0)
    token.info = componentName
    token.markup = markup
    token.map = [start, nextLine + 1]
    token.meta = { componentName, props }

    // Store the content lines for later rendering
    token.content = state.getLines(start + 1, nextLine, state.blkIndent, false)

    state.line = nextLine + 1
    return true
  }
}

function createRenderer(
  md: MarkdownIt,
  options: ComponentOptions,
): (tokens: Token[], idx: number, _options: any, env: any, renderer: any) => string {
  return (tokens: Token[], idx: number, _options: any, env: any): string => {
    const token = tokens[idx]
    const { componentName, props } = token.meta

    // Render the content as markdown
    const contentTokens = md.parse(token.content, env)
    const bodyContent = md.renderer.render(contentTokens, md.options, env)

    // Call the registered render function
    const renderFn = options.components![componentName]
    if (renderFn) {
      return renderFn(bodyContent.trim(), props)
    }

    return ''
  }
}

export function markdownItComponent(md: MarkdownIt, options?: Partial<ComponentOptions>): void {
  const opts: ComponentOptions = { ...defaultOptions, ...options }

  md.block.ruler.before('fence', 'component', componentBlock(opts), {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })

  md.renderer.rules.component = createRenderer(md, opts)
}
