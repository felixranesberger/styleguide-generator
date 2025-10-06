type HTMLContent = string;

interface RawHTML {
  readonly raw: string;
}

const escape = (str: unknown): string =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const when = <T>(condition: T, content: HTMLContent): HTMLContent => condition ? content : '';

export const ifElse = (
  condition: unknown,
  truthy: HTMLContent,
  falsy: HTMLContent = ''
): HTMLContent => condition ? truthy : falsy;

export const attrs = (obj: Record<string, string | number | boolean | null | undefined>): string =>
  Object.entries(obj)
    .filter(([, value]) => value !== null && value !== undefined && value !== false)
    .map(([key, value]) => value === true ? key : `${key}="${value}"`)
    .join(' ');

export const each = <T>(items: T[], fn: (item: T, index: number) => HTMLContent): HTMLContent =>
  items.map(fn).join('');

export const html = (
  strings: TemplateStringsArray,
  ...values: (string | number | boolean | null | undefined | RawHTML)[]
): HTMLContent => {
  return strings.reduce((result, string, i) => {
    const value = values[i];

    if (value && typeof value === 'object' && 'raw' in value) {
      return result + string + value.raw;
    }

    return result + string + (value != null ? escape(value) : '');
  }, '');
};
