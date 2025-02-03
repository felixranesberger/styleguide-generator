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
  css: string[]
  js: {
    src: string
    additionalAttributes?: Record<string, string>
  }[]
  html: string
}) {
  const computedScriptTags = data.js.map((js) => {
    const additionalAttributes = js.additionalAttributes ? Object.entries(js.additionalAttributes).map(([key, value]) => `${key}="${value}"`).join(' ') : ''
    return `<script src="${js.src}" ${additionalAttributes}></script>`
  })

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
    ${data.css.map(css => `<link rel="stylesheet" type="text/css" href="${css}">`).join('\n')}
</head>
<body${data.page.bodyclass ? ` class="${data.page.bodyclass}"` : ''}>
    ${data.html}
    ${computedScriptTags.join('\n')}
</body>
</html>
`.trim()

  await logicalWriteFile(data.filePath, content)
}
