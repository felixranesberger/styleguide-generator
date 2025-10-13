type HTMLContent = string

interface RawHTML {
  readonly raw: string
}

export function escape(str: unknown): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export const when = <T>(condition: T, content: () => HTMLContent): HTMLContent => condition ? content() : ''

export function ifElse(condition: unknown, truthy: HTMLContent, falsy: HTMLContent = ''): HTMLContent {
  return condition ? truthy : falsy
}

export function attrs(obj: Record<string, string | number | boolean | null | undefined>): string {
  return Object.entries(obj)
    .filter(([, value]) => value !== null && value !== undefined && value !== false)
    .map(([key, value]) => value === true ? key : `${key}="${value}"`)
    .join(' ')
}

export function each<T>(items: T[], fn: (item: T, index: number) => HTMLContent): HTMLContent {
  return items
    .map((item, index) => fn(item, index))
    .join('')
}

export function html(strings: TemplateStringsArray, ...values: (string | number | boolean | null | undefined | RawHTML)[]): HTMLContent {
  return strings.reduce((result, string, i) => {
    const value = values[i]

    if (value && typeof value === 'object' && 'raw' in value) {
      return result + string + value.raw
    }

    return result + string + (value != null ? escape(value) : '')
  }, '')
}
