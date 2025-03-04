import path from 'node:path'
import fs from 'fs-extra'

/**
 * Write a file only if the content has changed
 */
export async function logicalWriteFile(filepath: string, content: string) {
  // ensure directory exists
  const dir = path.dirname(filepath)
  await fs.ensureDir(dir)

  const isFileExisting = await fs.exists(filepath)
  if (isFileExisting) {
    const oldContent = await fs.readFile(filepath, 'utf-8')
    if (oldContent === content) {
      return
    }
  }

  await fs.writeFile(filepath, content)
}

/**
 * Pug outputs some semantic issues that throw accessibility errors.
 * This function fixes them.
 */
export function fixAccessibilityIssues(html: string): string {
  let parsedMarkup = html

  const omitValue = ['required', 'disabled', 'checked', 'selected', 'multiple', 'readonly']
  omitValue.forEach((value) => {
    parsedMarkup = parsedMarkup
      .replaceAll(`${value}="${value}"`, value)
      .replaceAll(`${value}=""`, value)
  })

  return parsedMarkup
}

/**
 * Convert special characters to HTML entities
 */
export function sanitizeSpecialCharacters(text: string): string {
  return text
    .replaceAll('>', '&gt;')
    .replaceAll('<', '&lt;')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#039;')
}
