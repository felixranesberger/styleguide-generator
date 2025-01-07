import path from 'node:path';
import process from 'node:process';
import fs from 'fs-extra';
import { glob } from 'glob';
import pug from 'pug';
import { readFileSync } from 'node:fs';
import chokidar from 'chokidar';

function parseColors(text) {
  text = text.trim();
  const colors = [];
  const regex = /^(?:(\S+)\s*:\s*)?([a-z]+|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(?:rgb|hsl)a?\((?:-?\d+%?[,\s]+){2,3}[\d.]+%?\))(?:\s*-\s*(.*))?$/gim;
  let test = regex.exec(text);
  while (test !== null) {
    const color = {
      color: test[2]
    };
    if (test[1]) {
      color.name = test[1];
    }
    if (test[3]) {
      color.description = test[3];
    }
    colors.push(color);
    test = regex.exec(text);
  }
  return colors;
}
function parseIcons(text) {
  text = text.trim();
  const icons = [];
  const regex = /^([^:]+):\s*(<svg>[\s\S]*?<\/svg>)$/gim;
  let test = regex.exec(text);
  while (test !== null) {
    const icon = {
      name: test[1].trim(),
      svg: test[2]
    };
    icons.push(icon);
    test = regex.exec(text);
  }
  return icons;
}
function toFloat(value) {
  return Number.isNaN(Number(value)) ? 0 : Number.parseFloat(value);
}
function kssParser(input, options = {}) {
  options.markdown = options.markdown ?? true;
  options.header = options.header ?? true;
  options.custom = options.custom || [];
  let files = [];
  const styleGuide = {
    files: [],
    sections: []
  };
  if (typeof input === "string") {
    files.push({ contents: input });
  } else {
    files = input.map((file) => {
      if (typeof file === "string") {
        return { contents: file };
      } else {
        styleGuide.files.push(file.path);
        return file;
      }
    });
  }
  for (const file of files) {
    const comments = findCommentBlocks(file.contents);
    for (const comment of comments) {
      const newSection = {
        raw: comment.raw,
        header: "",
        description: "",
        modifiers: [],
        parameters: [],
        markup: "",
        source: {
          filename: file.base ? path.relative(file.base, file.path || "").replace(/\\/g, "/") : file.path || "",
          path: file.path || "",
          line: comment.line
        }
      };
      const paragraphs = comment.text.split("\n\n");
      for (let i = 0; i < paragraphs.length; i++) {
        const reference = findReference(paragraphs[i]);
        if (reference) {
          newSection.reference = reference;
          paragraphs.splice(i, 1);
        }
      }
      if (!newSection.reference) {
        continue;
      }
      processProperty.call(newSection, paragraphs, "Colors", parseColors);
      processProperty.call(newSection, paragraphs, "Icons", parseIcons);
      processProperty.call(newSection, paragraphs, "Markup");
      processProperty.call(newSection, paragraphs, "Weight", toFloat);
      for (const customProperty of options.custom) {
        processProperty.call(newSection, paragraphs, customProperty);
      }
      if (paragraphs.length === 0) {
        newSection.header = newSection.reference;
      } else if (paragraphs.length === 1) {
        newSection.header = newSection.description = paragraphs[0];
      } else {
        newSection.header = paragraphs[0];
        const possibleModifiers = paragraphs.pop() || "";
        newSection.modifiers = possibleModifiers.split("\n");
        newSection.description = paragraphs.join("\n\n");
        const numModifierLines = newSection.modifiers.length;
        let hasModifiers = true;
        let lastModifier = 0;
        for (let j = 0; j < numModifierLines; j++) {
          if (newSection.modifiers[j].match(/^\s*(?:\S.*?|[\t\v\f \xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF])\s+-\s/g)) {
            lastModifier = j;
          } else if (j === 0) {
            hasModifiers = false;
            j = numModifierLines;
          } else {
            newSection.modifiers[lastModifier] += ` ${newSection.modifiers[j].replace(/^\s+|\s+$/g, "")}`;
            newSection.modifiers[j] = "";
          }
        }
        newSection.modifiers = newSection.modifiers.filter((line) => line !== "");
        if (hasModifiers) {
          if (newSection.markup) {
            newSection.modifiers = createModifiers(newSection.modifiers);
          } else {
            newSection.parameters = createParameters(newSection.modifiers);
            newSection.modifiers = [];
          }
        } else {
          newSection.description += `

${possibleModifiers}`;
          newSection.modifiers = [];
        }
      }
      newSection.header = newSection.header.replace(/\n/g, " ");
      newSection.deprecated = hasPrefix(newSection.description, "Deprecated");
      newSection.experimental = hasPrefix(newSection.description, "Experimental");
      if (options.header) {
        if (newSection.description.match(/\n{2,}/)) {
          newSection.description = newSection.description.replace(/^.*\n{2,}/, "");
        } else {
          newSection.description = "";
        }
      }
      styleGuide.sections.push(newSection);
    }
  }
  return styleGuide;
}
function findCommentBlocks(input) {
  const commentRegex = {
    single: /^\s*\/\/.*$/,
    docblockStart: /^\s*\/\*\*\s*$/,
    multiStart: /^\s*\/\*+\s*$/,
    multiFinish: /^\s*\*\/\s*$/
  };
  input = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const blocks = [];
  let block = {
    line: 0,
    text: "",
    raw: ""
  };
  let indentAmount = false;
  let insideSingleBlock = false;
  let insideMultiBlock = false;
  let insideDocblock = false;
  input += "\n";
  const lines = input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\s*$/, "");
    if (!insideMultiBlock && !insideDocblock && line.match(commentRegex.single)) {
      block.raw += `${line}
`;
      block.text += `${line.replace(/^\s*\/\/\s?/, "")}
`;
      if (!insideSingleBlock) {
        block.line = i + 1;
      }
      insideSingleBlock = true;
      continue;
    }
    if (insideSingleBlock || (insideMultiBlock || insideDocblock) && line.match(commentRegex.multiFinish)) {
      const doneWithCurrentLine = !insideSingleBlock;
      block.text = block.text.replace(/^\n+/, "").replace(/\n+$/, "");
      blocks.push({ ...block });
      insideMultiBlock = insideDocblock = insideSingleBlock = false;
      indentAmount = false;
      block = { line: 0, text: "", raw: "" };
      if (doneWithCurrentLine)
        continue;
    }
    if (line.match(commentRegex.docblockStart)) {
      insideDocblock = true;
      block.raw += `${line}
`;
      block.line = i + 1;
      continue;
    }
    if (insideDocblock) {
      block.raw += `${line}
`;
      block.text += `${line.replace(/^\s*\*\s?/, "")}
`;
      continue;
    }
    if (line.match(commentRegex.multiStart)) {
      insideMultiBlock = true;
      block.raw += `${line}
`;
      block.line = i + 1;
      continue;
    }
    if (insideMultiBlock) {
      block.raw += `${line}
`;
      if (indentAmount === false) {
        if (line === "")
          continue;
        indentAmount = line.match(/^\s*/)[0];
      }
      block.text += `${line.replace(new RegExp(`^${indentAmount}`), "")}
`;
    }
  }
  return blocks;
}
function createModifiers(rawModifiers) {
  return rawModifiers.map((entry) => {
    const modifier = entry.split(/\s+-\s+/, 1)[0];
    const description = entry.replace(modifier, "").replace(/^\s+-\s+/, "");
    return {
      name: modifier,
      description
    };
  });
}
function createParameters(rawParameters) {
  return rawParameters.map((entry) => {
    const parameter = entry.split(/\s+-\s+/, 1)[0];
    const defaultValue = "";
    const description = entry.replace(parameter, "").replace(/^\s+-\s+/, "");
    if (/\s+=\s+/.test(parameter)) {
      const tokens = parameter.split(/\s+=\s+/);
      return {
        name: tokens[0],
        defaultValue: tokens[1],
        description
      };
    }
    return {
      name: parameter,
      defaultValue,
      description
    };
  });
}
function findReference(text) {
  text = text.trim().replace(/\s+/g, " ");
  const regex = /^style\s?guide\s?[-:]?\s?/i;
  if (regex.test(text)) {
    return text.replace(regex, "");
  }
  return false;
}
function processProperty(paragraphs, propertyName, processValue) {
  let indexToRemove = false;
  propertyName = propertyName.toLowerCase();
  for (let i = 0; i < paragraphs.length; i++) {
    if (hasPrefix(paragraphs[i], propertyName)) {
      this[propertyName] = paragraphs[i].replace(
        new RegExp(`^\\s*${propertyName}\\:\\s+?`, "gim"),
        ""
      );
      if (typeof processValue === "function") {
        this[propertyName] = processValue(this[propertyName]);
      }
      indexToRemove = i;
      break;
    }
  }
  if (indexToRemove !== false) {
    paragraphs.splice(indexToRemove, 1);
  }
}
function hasPrefix(description, prefix) {
  return new RegExp(`^\\s*${prefix}\\:`, "gim").test(description);
}
function parse(text) {
  const data = kssParser(text).sections.filter((section) => Boolean(section.reference));
  const sortedData = data.sort((a, b) => {
    return a.reference.localeCompare(b.reference);
  });
  let output = [];
  sortedData.forEach((section) => {
    if (!section.reference)
      return;
    const sectionIds = section.reference.split(".");
    const isFirstLevelSection = sectionIds.length < 2 || sectionIds.length === 2 && sectionIds[1] === "0";
    if (isFirstLevelSection) {
      output[sectionIds[0]] = {
        id: section.reference,
        sectionLevel: "first",
        header: section.header,
        description: section.description,
        markup: section.markup,
        sections: [],
        modifiers: section.modifiers.map((modifier) => ({
          value: modifier.name,
          description: modifier.description
        })),
        colors: section.colors,
        icons: section.icons,
        previewFileName: `preview-${section.reference}.html`,
        fullpageFileName: `fullpage-${section.reference}.html`
      };
    } else {
      const firstLevelParentSection = output[sectionIds[0]];
      if (!firstLevelParentSection)
        throw new Error(`First level parent section ${firstLevelParentSection} not found for section ${section.reference}`);
      const isThirdLevelSection = sectionIds.length === 3;
      if (isThirdLevelSection) {
        const secondLevelParentSection = firstLevelParentSection.sections[sectionIds[1]];
        if (!secondLevelParentSection)
          throw new Error(`Second level parent section ${sectionIds[0]}.${sectionIds[1]} not found for section ${section.reference}`);
        secondLevelParentSection.sections[sectionIds[2]] = {
          id: section.reference,
          sectionLevel: "third",
          header: section.header,
          description: section.description,
          markup: section.markup,
          modifiers: section.modifiers.map((modifier) => ({
            value: modifier.name,
            description: modifier.description
          })),
          colors: section.colors,
          icons: section.icons,
          previewFileName: `preview-${section.reference}.html`,
          fullpageFileName: `fullpage-${section.reference}.html`
        };
      } else {
        firstLevelParentSection.sections[sectionIds[1]] = {
          id: section.reference,
          sectionLevel: "second",
          header: section.header,
          description: section.description,
          markup: section.markup,
          modifiers: section.modifiers.map((modifier) => ({
            value: modifier.name,
            description: modifier.description
          })),
          colors: section.colors,
          icons: section.icons,
          sections: [],
          previewFileName: `preview-${section.reference}.html`,
          fullpageFileName: `fullpage-${section.reference}.html`
        };
      }
    }
  });
  output = output.filter((section) => Boolean(section));
  output.forEach((firstLevelSection) => {
    firstLevelSection.sections = firstLevelSection.sections.filter((section) => Boolean(section));
    firstLevelSection.sections.forEach((secondLevelSection) => {
      secondLevelSection.sections = secondLevelSection.sections.filter((section) => Boolean(section));
    });
  });
  return output;
}

function logicalWriteFile(filepath, content) {
  const dir = path.dirname(filepath);
  fs.ensureDirSync(dir);
  const isFileExisting = fs.existsSync(filepath);
  if (isFileExisting) {
    const oldContent = fs.readFileSync(filepath, "utf-8");
    if (oldContent === content) {
      return;
    }
  }
  fs.writeFileSync(filepath, content);
}

const regexModifierLine = /<insert-vite-pug src="(.+?)".*(?:[\n\r\u2028\u2029]\s*)?(modifierClass="(.+?)")? *><\/insert-vite-pug>/g;
function replaceVitePugTags(mode, html) {
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
    if (mode === "development") {
      let pugTag = `<pug src="${pugSourcePath}"></pug>`;
      if (pugModifierClass && pugModifierClass[1]) {
        pugTag = `<pug src="${pugSourcePath}" locals="${encodeURIComponent(JSON.stringify(pugLocals))}"></pug>`;
      }
      markupOutput = markupOutput.replace(vitePugTag, pugTag);
    }
    const isPugFile = path.extname(pugSourcePath) === ".pug";
    if (!isPugFile) {
      throw new Error(`${pugSourcePath} is not a valid .pug file`);
    }
    const contentDirPath = path.join(process.cwd(), globalThis.styleguideConfiguration.contentDir);
    const pugFilePath = path.join(contentDirPath, pugSourcePath);
    const pugFn = pug.compileFile(pugFilePath, {
      pretty: true
    });
    const pugOutput = pugFn(pugLocals);
    markupOutput = markupOutput.replace(vitePugTag, pugOutput);
  });
  return markupOutput;
}

function generateFullPageFile(data) {
  const computedScriptTags = data.js.map((js) => {
    const additionalAttributes = js.additionalAttributes ? Object.entries(js.additionalAttributes).map(([key, value]) => `${key}="${value}"`).join(" ") : "";
    return `<script src="${js.src}" ${additionalAttributes}><\/script>`;
  });
  const content = `
<!doctype html>
<html lang="${data.page.lang}">
<head>
    <title>${data.page.title}</title>
    ${data.page.description ? `<meta name="description" content="${data.page.description}">` : ""}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="generator" content="styleguide">
    <script type="module" src="/assets/client-fullpage.js"><\/script>
    ${data.css.map((css) => `<link rel="stylesheet" type="text/css" href="${css}" />`).join("\n")}
</head>
<body>
    ${replaceVitePugTags(globalThis.styleguideConfiguration.mode, data.html)}
    ${computedScriptTags.join("\n")}
</body>
</html>
`.trim();
  logicalWriteFile(data.filePath, content);
}

function getHeaderHtml(data) {
  return `
<header class="sticky top-0 z-10 mx-auto -mx-px flex w-full border-b pr-6 max-w-[1220px] border-styleguide-border bg-styleguide-bg-highlight">
    <a class="mr-4 block flex items-center border-r py-4 pr-4 pl-6 border-styleguide-border w-[260px] xl:border-l" href="/">
        <p class="font-semibold tracking-tight text-styleguide-highlight">
            ${data.projectTitle}
        </p>
    </a>

    <div class="flex grow items-center justify-end py-4 md:justify-between">
        <button
            class="inline-flex items-center justify-between gap-2 rounded-full border p-2 text-sm transition border-styleguide-border hover:text-styleguide-highlight focus:text-styleguide-highlight md:min-w-[150px] md:py-1.5 md:rounded-md md:px-2"
            aria-controls="search-dialog"
            data-open-search=""
        >
            <span class="sr-only md:not-sr-only">Search page</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 md:hidden">
                <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>

            <kbd class="relative hidden items-center gap-1 rounded-md border font-semibold text-[10px] border-styleguide-border px-1.5 md:inline-flex">
                <span class="inline-block text-[12px]">\u2318</span>
                <span>K</span>
            </kbd>
        </button>

        <form class="hidden theme-select md:block">
            <fieldset class="flex items-center rounded-3xl border border-styleguide-border">
                <legend class="sr-only">Select a display theme:</legend>

                <input id="normal" class="sr-only" type="radio" value="normal" name="theme">
                <label for="normal" class="cursor-pointer p-2">
                    <span class="sr-only">System</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                </label>

                <input id="light" class="sr-only" type="radio" value="light" name="theme">
                <label for="light" class="cursor-pointer p-2">
                    <span class="sr-only">Light</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                </label>

                <input id="dark" class="sr-only" type="radio" value="dark" name="theme">
                <label for="dark" class="cursor-pointer p-2">
                    <span class="sr-only">Dark</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                </label>
            </fieldset>
        </form>
    </div>
</header>
`.trim();
}
function getSidebarMenuHtml(sections, activePageHref) {
  const getItemHtml = (item) => {
    if (item.href.includes(activePageHref)) {
      return `<div class="menu-item menu-item--active">${item.label}</div>`;
    }
    return `<a class="menu-item" href="${item.href}">${item.label}</a>`;
  };
  return `
<ul class="grid gap-6 px-3 py-6">
    ${sections.map((section) => `
        <li>
            <span class="block rounded-md px-3 text-sm font-semibold text-styleguide-highlight">
                ${section.title}
            </span>
            <ul class="mt-3 grid gap-2">
                ${section.items.map((item) => `
                    <li>
                       ${getItemHtml(item)}
                    </li>
                `).join("\n")}
            </ul>
        </li>
    `).join("\n")}
</ul>
`.trim();
}
function getMainContentHtml(secondLevelSection) {
  let output = "";
  function renderSection(section) {
    if (section.colors) {
      output += getMainContentSectionWrapper(section, getMainContentColors(section));
    } else if (section.icons) {
      output += getMainContentSectionWrapper(section, getMainContentIcons(section));
    } else {
      const content = section.markup ? getMainContentRegular(section) : undefined;
      output += getMainContentSectionWrapper(section, content);
    }
  }
  renderSection(secondLevelSection);
  secondLevelSection.sections.forEach(renderSection);
  return output;
}
function getMainContentSectionWrapper(section, html) {
  if (section.sectionLevel === "second") {
    const hgroupWrapperTag = section.description ? "hgroup" : "div";
    return `
      <section id="section-${section.id}" class="border-b px-4 py-10 border-b-styleguide-border md:px-10">
          <${hgroupWrapperTag} class="max-w-[800px]">
              <h1 class="text-4xl font-semibold text-styleguide-highlight">${section.header}</h1>
              ${section.description ? `<p class="mt-2 font-mono text-xl">${section.description}</p>` : ""}
          </${hgroupWrapperTag}>
${html ?? ""}
      </section>
  `;
  }
  return `
<section id="section-${section.id}" class="border-b px-4 py-10 border-b-styleguide-border md:px-10">
    <div class="flex items-center justify-between gap-6">
        <a class="relative group" href="#section-${section.id}">
            <svg class="absolute top-1/2 -left-6 -translate-y-1/2 opacity-0 transition size-[18px] group-hover:opacity-100 group-focus:opacity-100"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"/>
                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"/>
            </svg>
            <h2 class="text-2xl font-semibold text-styleguide-highlight">${section.header}</h2>
        </a>

        <a class="p-2 group" href="/${section.fullpageFileName}" target="_blank" title="Open ${section.header} in fullpage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
                <path class="transition group-hover:translate-x-px group-hover:-translate-y-px group-focus:translate-x-px group-focus:-translate-y-px"
                      d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"/>
                <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"/>
            </svg>
        </a>
    </div>
${html ?? ""}
</section>
  `;
}
function getMainContentRegular(section) {
  return `
    <!-- Preview Box -->
    <div class="mt-4 overflow-hidden rounded-2xl border border-styleguide-border">
        <div class="w-full border-b p-6 bg-styleguide-bg-highlight border-styleguide-border">
            <iframe
                    id="preview-fullpage-${section.id}"
                    src="/${section.fullpageFileName}"
                    class="w-full preview-iframe rounded-[8px]"
                    title="${section.header} Preview"
            ></iframe>
        </div>

        <!-- Code -->
        <details class="group">
           <summary class="flex cursor-pointer items-center gap-2 rounded-b-2xl px-6 py-4 text-sm font-light bg-styleguide-bg">
                <svg class="h-4 w-4 group-open:rotate-90 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>
                </svg>
  
                <span class="group-open:hidden">Show code</span>
                <span class="group-open:block hidden">Hide code</span>
            </summary>

            <div class="border-t p-6 text-sm bg-styleguide-bg-highlight border-styleguide-border">
                <div id="code-fullpage-${section.id}" class="overflow-x-auto w-full code-highlight">
                  <template data-type="code">
${replaceVitePugTags("production", section.markup)}
                  </template>
              </div>
            </div>
        </details>
    </div>
    
    ${section.modifiers?.length > 0 ? `
       <!-- Modifiers List -->
      <h3 class="mt-6 flex items-center text-xl font-semibold text-styleguide-highlight gap-1.5">
          ${section.header} Modifiers
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-styleguide">
              <path d="M7.25 1.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0v-1.5ZM11.536 2.904a.75.75 0 1 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061ZM14.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM4.464 9.975a.75.75 0 0 1 1.061 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061ZM4.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM5.525 3.964a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06ZM8.779 7.438a.75.75 0 0 0-1.368.366l-.396 5.283a.75.75 0 0 0 1.212.646l.602-.474.288 1.074a.75.75 0 1 0 1.449-.388l-.288-1.075.759.11a.75.75 0 0 0 .726-1.165L8.78 7.438Z" />
          </svg>
      </h3>
      <ul class="mt-4 grid gap-6 overflow-hidden rounded-2xl border p-6 border-styleguide-border bg-styleguide-bg-highlight md:grid-cols-2 md:gap-x-10 md:gap-y-14">
          ${section.modifiers?.map((modifier) => `
              <li>
                <div>
                    <div class="flex items-center justify-between gap-6">
                        <div class="flex items-center gap-3">
                            <h4 class="font-semibold text-styleguide-highlight">${modifier.description}</h4>
    
                            <button
                                  class="inline-block rounded-md border py-1 font-mono font-semibold transition duration-500 text-[10px] border-styleguide-border px-2.5 bg-styleguide-bg-highlight hover:text-styleguide-highlight focus:text-styleguide-highlight"
                                  title="Copy content"
                                  data-clipboard-value="${modifier.value}"
                            >
                                ${modifier.value}
                            </button>
                        </div>
    
                        <a class="p-2 group" href="/${section.fullpageFileName}?modifier=${modifier.value}" target="_blank" title="Open in fullpage">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path class="transition group-hover:translate-x-px group-hover:-translate-y-px group-focus:translate-x-px group-focus:-translate-y-px"
                                      d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"/>
                                <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"/>
                            </svg>
                        </a>
                    </div>
    
                    <iframe
                          src="/${section.fullpageFileName}?modifier=${modifier.value}"
                          class="mt-2 w-full preview-iframe rounded-[8px]"
                          title="${section.header} Preview - Modifier: ${modifier.value}"
                    ></iframe>
                </div>
            </li>
          `).join("\n")}
      </ul>      
    ` : ""}
  `;
}
function getMainContentColors(section) {
  return `
    <ul class="my-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        ${section.colors?.map(
    (color) => `<li class="relative rounded-2xl px-4 py-6" style="background-color: ${color.color}"></li>`
  ).join("\n")}
    </ul>
  `;
}
function getMainContentIcons(section) {
  return `
    <form
        id="icon-search"
        class="my-6 flex items-center overflow-hidden rounded-2xl border px-4 py-2 gap-2.5 bg-styleguide-bg-highlight border-styleguide-border"
        onsubmit="return false;"
    >
        <label for="icon-search-input">
            <span class="sr-only">Search icons</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
            </svg>
        </label>

        <input
            id="icon-search-input"
            class="flex-grow bg-transparent icon-search-input h-[28px] focus:outline-none"
            placeholder="Search icons..."
            aria-autocomplete="list"
            autocomplete="off"
            role="combobox"
            spellcheck="false"
            type="text"
            value=""
            aria-controls="icon-search"
        >

        <button
            id="icon-search-input-reset"
            class="hidden icon-search-input-reset"
            type="reset"
        >
            <span class="sr-only">Reset search input</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
        </button>
    </form>

    <div class="min-h-[400px] md:min-h-[250px]">
        <ul
            id="icon-search-list"
            class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
            ${section.icons?.map((icon) => `
              <li class="relative grid gap-4 rounded-2xl border border-transparent px-4 py-6 transition duration-700 items icon-search-list__item bg-styleguide-bg-highlight hover:border-styleguide-border focus:border-styleguide-border">
                  <div class="relative flex w-full justify-center size-6 text-styleguide-highlight">
                      ${icon.svg}
  
                      <!-- Successfully copied icon -->
                      <svg class="pointer-events-none ease-in-out icon-search-list__item-copy-icon size-5 text-styleguide-highlight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                      </svg>
                  </div>
                  <p class="text-center font-mono text-sm font-semibold">${icon.name}</p>
                  <button
                      class="absolute inset-0 cursor-pointer bg-transparent icon-search-list__item-copy"
                      title="Copy svg content"
                  ></button>
              </li>
            `)}
        </ul>
    </div>
  `;
}
function getNextPageControlsHtml(data) {
  return `
<nav class="flex w-full justify-between px-4 py-10 md:px-10">
    <div>
        ${data.before ? `
          <a class="flex items-center gap-1 group" href="${data.before.href}">
            <svg class="h-5 w-5 transition group-hover:-translate-x-0.5 group-focus:-translate-x-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"/>
            </svg>
    
            <span class="grid gap-1.5">
                <span class="text-sm font-light leading-none">Previous</span>
                <span class="font-semibold leading-none text-styleguide-highlight">${data.before.label}</span>
            </span>
        </a>
        ` : ``}
    </div>
    
    <div>
        ${data.after ? `
                    <a class="flex items-center gap-1 group" href="${data.after.href}">
                    <span class="grid text-right gap-1.5">
                        <span class="text-sm font-light leading-none">Next</span>
                        <span class="font-semibold leading-none text-styleguide-highlight">${data.after.label}</span>
                    </span>
        
                    <svg class="h-5 w-5 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>
                    </svg>
                </a>
        ` : ``}
    </div>
</nav>
`.trim();
}
function getSearchHtml(sections) {
  return `
<dialog
    id="search-dialog"
    class="fixed -inset-x-0 top-auto bottom-0 z-30 -mb-px w-full max-w-none overflow-y-auto rounded-t-2xl border search bg-styleguide-bg border-styleguide-border text-styleguide md:max-w-[640px] md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl mx-0"
>
    <h2 class="sr-only">Search</h2>
    <div class="border-b px-4 py-3 border-styleguide-border">
        <input
            id="search-input"
            class="w-full bg-transparent text-[18px] h-[28px] focus:outline-none"
            placeholder="Search..."
            aria-autocomplete="list"
            autocomplete="off"
            role="combobox"
            spellcheck="false"
            type="text"
            value=""
        >
    </div>

    <nav id="search-list" class="grid gap-4 px-4 py-3 text-sm">
        ${sections.map((section) => `
            <div class="search-category">
                <h3 class="mb-2">${section.title}</h3>
                <ul>
                    ${section.items.map((item) => `
                        <li 
                            class="search-category__item search-category__item--active" 
                            data-search-keywords="${item.searchKeywords.map((x) => x.replaceAll('"', `'`)).join(",")}"
                          >
                            <a 
                                class="flex items-center gap-4 px-1.5 py-2.5 group rounded-md hover:bg-[rgb(242,242,242)] focus:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)] dark:focus:bg-[rgb(26,26,26)] transition" 
                                href="${item.href}"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="transition-all size-5 group-hover:translate-x-0.5 group-focus:translate-x-0.5">
                                    <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-styleguide-highlight">
                                ${item.label}
                            </span>
                            </a>
                        </li>
                    `).join("\n")}
                </ul>
            </div>          
        `).join("\n")}
    </nav>

    <p id="search-no-results" class="hidden px-6 py-8 text-center text-sm">
        No results found
    </p>
</dialog>
`.trim();
}
function generatePreviewFile(data) {
  const content = `
<!doctype html>
<html lang="${data.page.lang}">
<head>
    <title>${data.page.title}</title>
    ${data.page.description ? `<meta name="description" content="${data.page.description}">` : ""}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="generator" content="styleguide">
    <link rel="stylesheet" type="text/css" href="/assets/styleguide.css" />
    <script type="module" src="/assets/client.js"><\/script>
</head>
<body class="relative min-h-screen antialiased text-styleguide">
    ${data.html.header}
    
    <main class="relative -mx-[2px] flex h-full min-h-screen border-x min-[1220px]:mx-auto max-w-[1220px] border-styleguide-border">
      <aside
          class="sticky order-1 -mx-px hidden flex-col overflow-y-auto border-r z-100 w-[260px] border-styleguide-border shrink-0 xl:flex"
          style="top: var(--header-height); max-height: calc(100vh - var(--header-height))"
      >
        ${data.html.sidebarMenu}
      </aside>
      
      <div class="order-2 w-full xl:w-[calc(100%-260px)]">
        ${data.html.mainContent}
        ${data.html.nextPageControls}
      </div>
    </main>
    ${data.html.search}
</body>
</html>
`.trim();
  logicalWriteFile(data.filePath, content);
}

function watchForFileContentChanges(path, regex, callback) {
  if (typeof callback !== "function") {
    throw new TypeError("styleguide watch requires a callback function");
  }
  const regexFileContents = /* @__PURE__ */ new Map();
  const registerFileContentMatches = (filePath) => {
    const currentFileContent = readFileSync(filePath, "utf8");
    const currentFileMatches = currentFileContent.match(regex);
    if (currentFileMatches === null) {
      return;
    }
    regexFileContents.set(filePath, currentFileMatches);
  };
  const handleContentChanges = (filePath) => {
    const previousFileMatches = regexFileContents.get(filePath);
    const hasFileBeenReadBefore = previousFileMatches !== undefined;
    const currentFileContent = readFileSync(filePath, "utf8");
    const currentFileMatches = currentFileContent.match(regex);
    if (!hasFileBeenReadBefore) {
      regexFileContents.set(filePath, currentFileMatches);
      if (currentFileMatches === null) {
        return;
      }
      callback();
      return;
    }
    const haveFileMatchesChanged = JSON.stringify(previousFileMatches) !== JSON.stringify(currentFileMatches);
    if (!haveFileMatchesChanged) {
      return;
    }
    regexFileContents.set(filePath, currentFileMatches);
    callback();
  };
  const handleFileRemoval = (filePath) => {
    regexFileContents.delete(filePath);
  };
  chokidar.watch(path).on("add", registerFileContentMatches).on("change", handleContentChanges).on("unlink", handleFileRemoval);
}
function watchStyleguideForChanges(path, callback) {
  const kssSectionRegex = /\/\*[^*]*Styleguide.*?\*\//gs;
  watchForFileContentChanges(
    path,
    kssSectionRegex,
    callback
  );
}

async function buildStyleguide(config) {
  globalThis.styleguideConfiguration = config;
  const styleguideContent = (await glob(`${config.contentDir}/**/*.{css,scss}`)).map((file) => fs.readFileSync(file, "utf-8")).join("\n");
  const parsedContent = parse(styleguideContent);
  if (config.mode === "production") {
    fs.emptyDirSync(config.outDir);
  }
  const baseDirectory = path.relative(process.cwd(), config.outDir);
  const getFullPageFilePath = (fileName) => path.join(baseDirectory, fileName);
  const getPreviewPageFilePath = (fileName, isHtmlIndexPage = false) => {
    return isHtmlIndexPage ? path.join(baseDirectory, "index.html") : path.join(baseDirectory, fileName);
  };
  const handleGenerateFullpage = (data) => {
    if (data.markup === undefined || data.markup.length === 0)
      return;
    generateFullPageFile({
      filePath: getFullPageFilePath(data.fullpageFileName),
      page: {
        title: data.header,
        description: data.description,
        lang: config.html.lang
      },
      css: config.html.assets.css,
      js: config.html.assets.js,
      html: data.markup
    });
  };
  const searchSectionMapping = [];
  const menuSectionMapping = [];
  parsedContent.forEach((firstLevelSection, indexFirstLevel) => {
    searchSectionMapping[indexFirstLevel] = {
      title: firstLevelSection.header,
      items: []
    };
    menuSectionMapping[indexFirstLevel] = {
      title: firstLevelSection.header,
      items: []
    };
    firstLevelSection.sections.forEach((secondLevelSection, indexSecondLevel) => {
      const menuHref = indexFirstLevel === 0 && indexSecondLevel === 0 ? "/index.html" : `/${secondLevelSection.previewFileName}`;
      searchSectionMapping[indexFirstLevel].items.push({
        label: secondLevelSection.header,
        searchKeywords: [
          secondLevelSection.header,
          secondLevelSection.description,
          ...secondLevelSection.sections.map((thirdLevelSection) => [thirdLevelSection.header, thirdLevelSection.description]).flat().filter(Boolean)
        ].filter(Boolean).map((keyword) => keyword.replaceAll('"', "")),
        href: menuHref
      });
      menuSectionMapping[indexFirstLevel].items.push({
        label: secondLevelSection.header,
        href: menuHref
      });
      if (secondLevelSection.markup) {
        handleGenerateFullpage(secondLevelSection);
      }
      secondLevelSection.sections.forEach((thirdLevelSection) => {
        handleGenerateFullpage(thirdLevelSection);
      });
    });
  });
  const headerHtml = getHeaderHtml({ projectTitle: config.projectTitle });
  const searchHtml = getSearchHtml(searchSectionMapping);
  parsedContent.forEach((firstLevelSection, indexFirstLevel) => {
    firstLevelSection.sections.forEach((secondLevelSection, indexSecondLevel) => {
      let sectionBefore = firstLevelSection.sections[indexSecondLevel - 1];
      if (!sectionBefore && !(indexFirstLevel === 0)) {
        sectionBefore = parsedContent[indexFirstLevel - 1].sections.at(-1);
      }
      let sectionAfter = firstLevelSection.sections[indexSecondLevel + 1];
      if (!sectionAfter && parsedContent[indexFirstLevel + 1]) {
        sectionAfter = parsedContent[indexFirstLevel + 1].sections.at(0);
      }
      const nextPageControlsData = {};
      if (sectionBefore) {
        nextPageControlsData.before = {
          label: sectionBefore.header,
          href: sectionBefore.previewFileName
        };
      }
      if (sectionAfter) {
        nextPageControlsData.after = {
          label: sectionAfter.header,
          href: sectionAfter.previewFileName
        };
      }
      generatePreviewFile({
        filePath: getPreviewPageFilePath(secondLevelSection.previewFileName, indexFirstLevel === 0 && indexSecondLevel === 0),
        page: {
          title: secondLevelSection.header,
          description: secondLevelSection.description,
          lang: config.html.lang
        },
        css: config.html.assets.css,
        js: config.html.assets.js,
        html: {
          header: headerHtml,
          sidebarMenu: getSidebarMenuHtml(
            menuSectionMapping,
            secondLevelSection.previewFileName
          ),
          mainContent: getMainContentHtml(secondLevelSection),
          nextPageControls: getNextPageControlsHtml(nextPageControlsData),
          search: searchHtml
        }
      });
    });
  });
  fs.ensureDirSync(path.join(config.outDir, "assets"));
  fs.copySync(path.join("dist", "assets"), path.join(config.outDir, "assets"));
}
async function watchStyleguide(config, onChange) {
  await buildStyleguide(config);
  const contentDirPath = config.contentDir.endsWith("/") ? config.contentDir : `${config.contentDir}/`;
  await watchStyleguideForChanges(`${contentDirPath}**/*.{css,scss,sass,less}`, () => {
    (async () => {
      await buildStyleguide(config);
      if (onChange)
        onChange();
    })();
  });
}

export { buildStyleguide, watchStyleguide };
