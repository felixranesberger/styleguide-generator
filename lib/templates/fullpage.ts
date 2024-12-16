import { logicalWriteFile } from "../utils.ts";

export function generateFullPageFile(filepath: string, pageTitle: string, html: string)  {
    const content = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>${pageTitle}</title>
    <link rel="stylesheet" type="text/css" href="/preview-example.css" />
</head>
<body>
    ${html}
</body>
</html>
`.trim()

   logicalWriteFile(filepath, content)
}
