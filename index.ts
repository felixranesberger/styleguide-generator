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
    theme: {
      light: '#005075',
      dark: '#ffffff',
    },
    plugins: {
      ogImage: (section) => {
        const url = new URL('https://via.placeholder.com/1200x630.png')
        url.searchParams.append('header', section.header)
        url.searchParams.append('theme', '#005075')

        if (!section.hasMarkdownDescription && section.description) {
          url.searchParams.append('description', section.description)
        }

        return url.href
      },
    },
  }, () => {
    console.log('Styleguide has been rebuilt')
  }, (error) => {
    console.log('Styleguide build error occurred', error)
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
