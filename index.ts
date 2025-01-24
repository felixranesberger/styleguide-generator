import fs from 'fs-extra'
import { createServer } from 'vite'
import { buildStyleguide } from './lib/index';

(async () => {
  // clear the output directory
  await fs.remove('./styleguide-export')

  const buildStyleguideStart = Date.now()
  await buildStyleguide({
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
  console.log(`Built styleguide in ${Date.now() - buildStyleguideStart}ms`)

  const server = await createServer({
    root: './styleguide-export',
    server: {
      host: true,
    },
    logLevel: 'info',
  })
  await server.listen()
  server.printUrls()
  server.bindCLIShortcuts({ print: true })
})()
