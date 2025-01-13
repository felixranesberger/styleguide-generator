import fs from 'fs-extra'
import { createServer } from 'vite'
import { buildStyleguide } from './lib';

(async () => {
  // clear the output directory
  await fs.remove('./styleguide-export')

  await buildStyleguide({
    mode: 'production',
    outDir: './styleguide-export',
    contentDir: './test/',
    projectTitle: 'Project name',
    deactivateDarkMode: true,
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
      port: 3000,
      host: true,
    },
  })
  await server.listen()
  server.printUrls()
  server.bindCLIShortcuts({ print: true })
})()
