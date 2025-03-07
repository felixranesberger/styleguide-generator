import { fromAsyncCodeToHtml } from '@shikijs/markdown-it/async'
import fs from 'fs-extra'
import MarkdownItAsync from 'markdown-it-async'
import { codeToHtml } from 'shiki'
import { log } from './utils.ts'

let md: ReturnType<typeof MarkdownItAsync> | undefined

/**
 * Parse markdown file to HTML
 */
export async function parseMarkdown(filePath: string) {
  const doesFileExist = fs.existsSync(filePath)
  if (!doesFileExist) {
    log(`Error: Markdown file not found: "${filePath}"`, 'important')
    return '<p class="font-bold text-red-600">Error: Markdown file not found!</p>'
  }

  if (!md) {
    md = MarkdownItAsync({ linkify: true, typographer: true })
    md.use(
      fromAsyncCodeToHtml(
        // @ts-expect-error - ignore
        codeToHtml,
        {
          themes: {
            light: 'github-light-default',
            dark: 'aurora-x',
          },
        },
      ),
    )
  }

  let fileContent = fs.readFileSync(filePath, 'utf8')

  // convert h1 to h2
  fileContent = fileContent.replaceAll('# ', '## ')

  return await md.renderAsync(fileContent)
}
