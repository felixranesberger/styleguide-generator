import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'

interface InfoOptions {
  marker?: string
  types?: string[]
  className?: string
  icons?: Record<string, string>
}

const defaultOptions: InfoOptions = {
  marker: ':::',
  types: ['info', 'warning', 'success', 'error', 'tip', 'note'],
  className: 'markdown-info',
  icons: {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    error: '❌',
    tip: '💡',
    note: '📝',
  },
}

function infoBlock(state: any, start: number, end: number, silent: boolean): boolean {
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

  // Parse type and title without problematic regex
  const spaceIndex = params.indexOf(' ')
  const type = spaceIndex === -1 ? params : params.slice(0, spaceIndex)
  const title = spaceIndex === -1 ? '' : params.slice(spaceIndex + 1).trim()

  if (!type || !defaultOptions.types!.includes(type)) {
    return false
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

  const openToken = state.push('info_open', 'div', 1)
  openToken.info = type
  openToken.markup = markup
  openToken.map = [start, nextLine + 1]
  openToken.meta = { type, title }

  const contentStart = start + 1
  const contentEnd = nextLine

  if (contentStart < contentEnd) {
    const oldParent = state.parentType
    const oldLineMax = state.lineMax

    state.parentType = 'info'
    state.lineMax = contentEnd
    state.md.block.tokenize(state, contentStart, contentEnd)
    state.parentType = oldParent
    state.lineMax = oldLineMax
  }

  const closeToken = state.push('info_close', 'div', -1)
  closeToken.markup = markup
  closeToken.map = [nextLine, nextLine + 1]

  state.line = nextLine + 1
  return true
}

function renderInfoOpen(tokens: Token[], idx: number): string {
  const token = tokens[idx]
  const { type, title } = token.meta

  const alertStyles = {
    info: {
      container: 'bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/40',
      title: 'text-blue-800 dark:text-blue-200',
      content: '[&_*]:!text-blue-700 [&_*]:dark:!text-blue-300',
    },
    warning: {
      container: 'bg-yellow-50 border border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-900/40',
      title: 'text-yellow-800 dark:text-yellow-200',
      content: '[&_*]:!text-yellow-700 [&_*]:dark:!text-yellow-300',
    },
    error: {
      container: 'bg-red-100 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40',
      title: 'text-red-800 dark:text-red-200',
      content: '[&_*]:!text-red-700 [&_*]:dark:!text-red-300',
    },
  } as const

  const alertIcons = {
    info: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5 text-blue-500"><path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" fill-rule="evenodd" /></svg>`,
    warning: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5 text-yellow-500"><path d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" fill-rule="evenodd" /></svg>`,
    error: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5 text-red-500"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" fill-rule="evenodd" /></svg>`,
  } as const

  const styles = alertStyles[type as keyof typeof alertStyles] || alertStyles.info
  const iconHtml = alertIcons[type as keyof typeof alertIcons] || alertIcons.info

  return `
    <div class="flex rounded-md p-4 ${styles.container}" role="alert">
      <div class="shrink-0">
          ${iconHtml}
      </div>
      <div class="ml-3">
        <p class="!text-sm !font-bold ${styles.title}">${title}</p>
        <div class="mt-1 !text-sm ${styles.content}">
  `
}

function renderInfoClose(): string {
  return `
    </div>
      </div>
        </div>
  `
}

export function markdownItComponentInfo(md: MarkdownIt): void {
  md.block.ruler.before('fence', 'info', infoBlock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })

  md.renderer.rules.info_open = renderInfoOpen
  md.renderer.rules.info_close = renderInfoClose
}
