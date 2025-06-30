import path from 'node:path';
import { parentPort } from 'node:worker_threads';
import { Biome, Distribution } from '@biomejs/js-api';
import pug from 'pug';

let biomeInstance;
let biomePromise;
let projectKey;
async function getBiome() {
  if (biomeInstance && projectKey !== void 0) {
    return { biome: biomeInstance, projectKey };
  }
  if (biomePromise) {
    const biome2 = await biomePromise;
    return { biome: biome2, projectKey };
  }
  biomePromise = (async () => {
    const instance = await Biome.create({
      distribution: Distribution.NODE
    });
    projectKey = instance.openProject(".").projectKey;
    biomeInstance = instance;
    return instance;
  })();
  const biome = await biomePromise;
  return { biome, projectKey };
}
async function biomeFormat(content) {
  try {
    const { biome, projectKey: projectKey2 } = await getBiome();
    const result = biome.formatContent(projectKey2, content, {
      filePath: "example.html"
    });
    const hasFatalErrors = result.diagnostics?.some(
      (diag) => diag.severity === "fatal" || diag.severity === "error"
    );
    if (hasFatalErrors) {
      console.warn("Biome HTML formatting has errors, falling back to original content");
      return content;
    }
    return result.content;
  } catch (error) {
    console.warn("Biome HTML formatting not supported or failed:", error);
    return content;
  }
}
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
      return void 0;
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
  let result = html;
  if (mode === "production" && result.includes("<insert-vite-pug")) {
    result = await compilePug(contentDir, mode, html);
  }
  result = await biomeFormat(result);
  parentPort.postMessage({ id, html: result });
});

export { compilePug };
