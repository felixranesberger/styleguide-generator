import { buildStyleguide } from './lib';

(async () => {
  await buildStyleguide({
    mode: 'production',
    outDir: './styleguide-export',
    contentDir: './test/',
    projectTitle: 'Universität zu Köln',
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
})()
