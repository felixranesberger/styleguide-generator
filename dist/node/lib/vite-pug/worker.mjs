import path from 'node:path';
import { parentPort } from 'node:worker_threads';
import { format } from 'prettier';
import prettierOrganizeAttributes from 'prettier-plugin-organize-attributes';
import pug from 'pug';

const regexModifierLine = /<insert-vite-pug src="(.+?)".*(?:[\n\r\u2028\u2029]\s*)?(modifierClass="(.+?)")? *><\/insert-vite-pug>/g;
async function compilePug(contentDir, mode, html) {
  const vitePugTags = html.match(regexModifierLine);
  if (!vitePugTags) {
    return html;
  }
  let markupOutput = html;
  await Promise.all(vitePugTags.map(async (vitePugTag) => {
    const pugSourcePath = vitePugTag.match(/src="(.+?)"/)?.[1];
    if (!pugSourcePath) {
      return undefined;
    }
    const pugModifierClass = vitePugTag.match(/modifierClass="(.+?)"/);
    let pugLocals = {};
    if (pugModifierClass && pugModifierClass[1]) {
      pugLocals = {
        modifierClass: pugModifierClass[1]
      };
    }
    const pugFilePath = path.join(contentDir, pugSourcePath);
    if (mode === "production") {
      const isPugFile = path.extname(pugSourcePath) === ".pug";
      if (!isPugFile) {
        throw new Error(`${pugSourcePath} is not a valid .pug file`);
      }
      const pugFn = pug.compileFile(pugFilePath, {
        pretty: true,
        // define doctype to avoid self-closing tags on wrong places
        doctype: "html"
      });
      const pugOutput = pugFn(pugLocals);
      markupOutput = markupOutput.replaceAll(vitePugTag, pugOutput);
      markupOutput = await format(markupOutput, {
        parser: "html",
        htmlWhitespaceSensitivity: "ignore",
        tabWidth: 2,
        plugins: [
          prettierOrganizeAttributes
        ]
      });
    } else {
      const pugTag = pugModifierClass && pugModifierClass[1] ? `<pug src="${pugFilePath}" locals="${encodeURIComponent(JSON.stringify(pugLocals))}"></pug>` : `<pug src="${pugFilePath}"></pug>`;
      markupOutput = markupOutput.replaceAll(vitePugTag, pugTag);
    }
  }));
  return markupOutput;
}
if (!parentPort) {
  throw new Error("This file must be run as a worker thread");
}
parentPort.on("message", async (data) => {
  const { id, mode, html, contentDir } = data;
  try {
    const result = await compilePug(contentDir, mode, html);
    parentPort.postMessage({ id, html: result });
  } catch (error) {
    parentPort.postMessage({
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export { compilePug };
