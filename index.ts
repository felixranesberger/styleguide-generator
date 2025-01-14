import fs from 'fs-extra'
import { createServer } from 'vite'
import { watchStyleguide } from './lib';

(async () => {
  // clear the output directory
  await fs.remove('./styleguide-export')

  await watchStyleguide({
    mode: 'production',
    outDir: './styleguide-export',
    contentDir: './test/',
    projectTitle: 'Project name',
    html: {
      lang: 'de',
      assets: {
        css: ['/main.css'],
        js: [
          {
            src: '/main.js',
            additionalAttributes: {
              type: 'module',
              defer: '',
            },
          },
        ],
      },
    },
  })

  const server = await createServer({
    root: './styleguide-export',
    server: {
      host: true,
    },
  })
  await server.listen()
  server.printUrls()
  server.bindCLIShortcuts({ print: true })
})()
