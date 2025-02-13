import type { StyleguideConfiguration } from '../index.ts'
import { logicalWriteFile } from '../utils.ts'

export async function generateFullPageFile(data: {
  id: string
  filePath: string
  page: {
    title: string
    description?: string
    lang: string
    htmlclass?: string
    bodyclass?: string
  }
  css: StyleguideConfiguration['html']['assets']['css']
  js: StyleguideConfiguration['html']['assets']['js']
  html: string
}) {
  const computedScriptTags = data.js
    .filter(entry => entry.type !== 'overwriteStyleguide')
    .map((js) => {
      const additionalAttributes = js.additionalAttributes ? Object.entries(js.additionalAttributes).map(([key, value]) => `${key}="${value}"`).join(' ') : ''
      return `<script src="${js.src}" ${additionalAttributes}></script>`
    })
    .join('\n')

  const computedStyleTags = data.css
    .filter(entry => entry.type !== 'overwriteStyleguide')
    .map((css) => {
      return `<link rel="stylesheet" type="text/css" href="${css.src}">`
    })
    .join('\n')

  const content = `
<!doctype html>
<html lang="${data.page.lang}"${data.page.htmlclass ? ` class="${data.page.htmlclass}"` : ''}>
<head>
    <title>${data.page.title}</title>
    ${data.page.description ? `<meta name="description" content="${data.page.description.replaceAll(`'`, '').replaceAll(`"`, '')}">` : ''}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="generator" content="styleguide">
    <link rel="icon" type="image/svg+xml" href="/assets/favicon/fullpage.svg">
    <script type="module" src="/assets/client-fullpage.js"></script>
    ${computedStyleTags}
</head>
<body${data.page.bodyclass ? ` class="${data.page.bodyclass}"` : ''}>
    ${data.html}
    ${computedScriptTags}
</body>
</html>
`.trim()

  await logicalWriteFile(data.filePath, content)
}
