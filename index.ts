import fs from 'fs-extra'
import { createServer } from 'vite'
import { watchStyleguide } from './lib/index';

(async () => {
  // clear the output directory
  await fs.remove('./styleguide-export')

  const buildStyleguideStart = Date.now()
  await watchStyleguide({
    mode: 'development',
    outDir: './styleguide-export',
    contentDir: './test/',
    projectTitle: 'Project name',
    html: {
      lang: 'de',
      assets: {
        css: [],
        js: [],
      },
    },
    launchInEditor: {
      rootDir: '/Users/franesberger/Documents/workspace/styleguide-rewrite/',
    },
  }, () => {
    console.log('Styleguide has been rebuilt')
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
