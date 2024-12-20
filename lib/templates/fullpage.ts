import { logicalWriteFile } from '../utils.ts'

export function generateFullPageFile(data: {
  filePath: string
  page: {
    title: string
    description?: string
    lang: string
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
<html lang="${data.page.lang}">
<head>
    <title>${data.page.title}</title>
    <meta name="description" content="${data.page.description || ''}">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="generator" content="styleguide">
    ${data.css.map(css => `<link rel="stylesheet" type="text/css" href="${css}" />`).join('\n')}
    <script type="module" src="/fullpage.js"></script>
</head>
<body>
    ${data.html}
    ${computedScriptTags.join('\n')}
</body>
</html>
`.trim()

  logicalWriteFile(data.filePath, content)
}
