import path from 'node:path';
import { parentPort } from 'node:worker_threads';
import toDiffableHtml from 'diffable-html';
import pug from 'pug-monorepo/packages/pug/lib/index.js';

const regexModifierLine = /<insert-vite-pug src="(.+?)".*(?:[\n\r\u2028\u2029]\s*)?(modifierClass="(.+?)")? *><\/insert-vite-pug>/g;
function compilePug(contentDir, mode, html) {
  const vitePugTags = html.match(regexModifierLine);
  if (!vitePugTags) {
    return html;
  }
  let markupOutput = html;
  vitePugTags.forEach((vitePugTag) => {
    const pugSourcePath = vitePugTag.match(/src="(.+?)"/)?.[1];
    if (!pugSourcePath) {
      return;
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
      markupOutput = toDiffableHtml(markupOutput);
    } else {
      const pugTag = pugModifierClass && pugModifierClass[1] ? `<pug src="${pugFilePath}" locals="${encodeURIComponent(JSON.stringify(pugLocals))}"></pug>` : `<pug src="${pugFilePath}"></pug>`;
      markupOutput = markupOutput.replaceAll(vitePugTag, pugTag);
    }
  });
  return markupOutput;
}
if (!parentPort) {
  throw new Error("This file must be run as a worker thread");
}
parentPort.on("message", (data) => {
  const { id, mode, html, contentDir } = data;
  try {
    const result = compilePug(contentDir, mode, html);
    parentPort.postMessage({ id, html: result });
  } catch (error) {
    parentPort.postMessage({
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export { compilePug };
