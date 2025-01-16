import fs from 'fs-extra'
import { watchStyleguide } from './lib';

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

  // const server = await createServer({
  //   root: './styleguide-export',
  //   server: {
  //     host: true,
  //   },
  // })
  // await server.listen()
  // server.printUrls()
  // server.bindCLIShortcuts({ print: true })
})()
