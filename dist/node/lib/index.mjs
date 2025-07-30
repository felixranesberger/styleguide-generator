import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import { glob } from 'tinyglobby';
import { fromAsyncCodeToHtml } from '@shikijs/markdown-it/async';
import MarkdownItAsync from 'markdown-it-async';
import { codeToHtml } from 'shiki';
import { objectEntries } from '@antfu/utils';
import os from 'node:os';
import { Worker } from 'node:worker_threads';
import { readFileSync } from 'node:fs';
import chokidar from 'chokidar';

function isValidHexColor(hexCode) {
  return /^#[0-9A-F]{6}$/i.test(hexCode);
}
function shadeColor(hexColor, percent) {
  let color = hexColor;
  color = color.replace(/^\s*#|\s*$/g, "");
  if (color.length === 3) {
    color = color.replace(/(.)/g, "$1$1");
  }
  const hexR = color.substring(0, 2);
  const hexG = color.substring(2, 4);
  const hexB = color.substring(4, 6);
  let r = Number.parseInt(hexR, 16);
  let g = Number.parseInt(hexG, 16);
  let b = Number.parseInt(hexB, 16);
  if (Number.isNaN(r))
    r = 0;
  if (Number.isNaN(g))
    g = 0;
  if (Number.isNaN(b))
    b = 0;
  const lightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  const adjust = lightness > 0.4 ? -1 : 1;
  const newR = Math.min(255, Math.max(0, r + adjust * (percent * 255 / 100)));
  const newG = Math.min(255, Math.max(0, g + adjust * (percent * 255 / 100)));
  const newB = Math.min(255, Math.max(0, b + adjust * (percent * 255 / 100)));
  const newHexRColor = `${newR.toString(16)}`.padStart(2, "0");
  const newHexGColor = `${newG.toString(16)}`.padStart(2, "0");
  const newHexBColor = `${newB.toString(16)}`.padStart(2, "0");
  return `#${newHexRColor}${newHexGColor}${newHexBColor}`;
}
async function createFaviconPreviewFile(outputPath, theme) {
  const faviconFilePath = path.resolve(outputPath, `favicon/preview.svg`);
  const doesFileExist = await fs.pathExists(faviconFilePath);
  if (doesFileExist)
    return;
  const faviconContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <style>
        .fill-theme-color { fill: ${theme.light}; }
        .fill-theme-color-20 { fill: ${shadeColor(theme.light, 20)}; }
        .fill-theme-color-40 { fill: ${shadeColor(theme.light, 40)}; }
        
        ${theme.dark ? `
            @media (prefers-color-scheme: dark) {
              .fill-theme-color { fill: ${theme.dark}; }
              .fill-theme-color-20 { fill: ${shadeColor(theme.dark, 20)}; }
              .fill-theme-color-40 { fill: ${shadeColor(theme.dark, 40)}; }
            }
          ` : ""}
      </style>
    
      <g fill="none" fill-rule="nonzero">
        <path class="fill-theme-color" d="M4.5 0C5.32842712 0 6 .67157287 6 1.5V13c0 1.6568542-1.34314575 3-3 3s-3-1.3431458-3-3V1.5C0 .67157287.67157287 0 1.5 0ZM3 11c-1.1045695 0-2 .8954305-2 2s.8954305 2 2 2 2-.8954305 2-2-.8954305-2-2-2Z" />
        <path class="fill-theme-color-20" d="M7.5 12.743V4.257l1.51-1.51c.28133215-.28151251.6630087-.43967977 1.061-.43967977.3979913 0 .7796678.15816726 1.061.43967977l2.121 2.121c.2815125.28133215.4396798.6630087.4396798 1.061 0 .3979913-.1581673.77966785-.4396798 1.061L7.5 12.743Z" />
        <path class="fill-theme-color-40" d="M6.364 16H14.5c.8284271 0 1.5-.6715729 1.5-1.5v-3c0-.8284271-.6715729-1.5-1.5-1.5h-2.136l-6 6Z" />
      </g>
    </svg>
  `;
  await fs.outputFile(faviconFilePath, faviconContent);
}
async function createFaviconFullPageFile(outputPath, theme) {
  const faviconFilePath = path.resolve(outputPath, `favicon/fullpage.svg`);
  const doesFileExist = await fs.pathExists(faviconFilePath);
  if (doesFileExist)
    return;
  const faviconContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="fill-icon">
      <style>
        .fill-icon {
          fill: ${theme.light};
        }
        
        ${theme.dark ? `
            @media (prefers-color-scheme: dark) {
              .fill-icon { fill: ${theme.dark}; }
            }
          ` : ""}
      </style>
    
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" />
    </svg>
  `;
  await fs.outputFile(faviconFilePath, faviconContent);
}
async function generateFaviconFiles(outputPath, theme) {
  await fs.ensureDir(path.resolve(outputPath, "favicon"));
  const hasLightDarkTheme = typeof theme === "object" && theme.light && theme.dark;
  if (hasLightDarkTheme) {
    const isValidLightColor = isValidHexColor(theme.light);
    if (!isValidLightColor) {
      throw new Error(`Invalid light theme color ${theme.light} provided. Please provide a valid hex color code.`);
    }
    const isValidDarkColor = isValidHexColor(theme.dark);
    if (!isValidDarkColor) {
      throw new Error(`Invalid dark theme color ${theme.dark} provided. Please provide a valid hex color code.`);
    }
    await Promise.all([
      createFaviconPreviewFile(outputPath, theme),
      createFaviconFullPageFile(outputPath, theme)
    ]);
  } else {
    const color = theme;
    const isValidThemeColor = isValidHexColor(color);
    if (!isValidThemeColor) {
      throw new Error(`Invalid theme color ${color} provided. Please provide a valid hex color code or an object with light and dark theme colors.`);
    }
    await Promise.all([
      createFaviconPreviewFile(outputPath, { light: color }),
      createFaviconFullPageFile(outputPath, { light: color })
    ]);
  }
}

function log(message, style = "important") {
  const computedMessage = style === "important" ? `\x1B[38;2;63;94;90m${(/* @__PURE__ */ new Date()).toLocaleTimeString()} \x1B[38;2;32;252;143m[Styleguide]\x1B[0m ${message}` : `\x1B[38;2;63;94;90m${(/* @__PURE__ */ new Date()).toLocaleTimeString()} \x1B[38;2;32;252;143m[Styleguide]\x1B[0m \x1B[38;2;63;94;90m${message}`;
  console.log(computedMessage);
}
async function logicalWriteFile(filepath, content) {
  const dir = path.dirname(filepath);
  await fs.ensureDir(dir);
  const isFileExisting = await fs.exists(filepath);
  if (isFileExisting) {
    const oldContent = await fs.readFile(filepath, "utf-8");
    if (oldContent === content) {
      return;
    }
  }
  await fs.writeFile(filepath, content);
}
function fixAccessibilityIssues(html) {
  let parsedMarkup = html;
  const omitValue = ["required", "disabled", "checked", "selected", "multiple", "readonly"];
  omitValue.forEach((value) => {
    parsedMarkup = parsedMarkup.replaceAll(`${value}="${value}"`, value).replaceAll(`${value}=""`, value);
  });
  return parsedMarkup;
}
function sanitizeSpecialCharacters(text) {
  return text.replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function ensureStartingSlash(input) {
  return input.startsWith("/") ? input : `/${input}`;
}
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}
const idGen = idGenerator();
function generateId() {
  const { value } = idGen.next();
  return value;
}

const defaultOptions = {
  types: ["info", "warning", "success", "error", "tip", "note"]};
function infoBlock(state, start, end, silent) {
  const pos = state.bMarks[start] + state.tShift[start];
  const max = state.eMarks[start];
  if (pos + 3 > max)
    return false;
  if (state.src.charCodeAt(pos) !== 58)
    return false;
  if (state.src.charCodeAt(pos + 1) !== 58)
    return false;
  if (state.src.charCodeAt(pos + 2) !== 58)
    return false;
  const markup = state.src.slice(pos, pos + 3);
  const params = state.src.slice(pos + 3, max).trim();
  const spaceIndex = params.indexOf(" ");
  const type = spaceIndex === -1 ? params : params.slice(0, spaceIndex);
  const title = spaceIndex === -1 ? "" : params.slice(spaceIndex + 1).trim();
  if (!type || !defaultOptions.types.includes(type)) {
    return false;
  }
  let nextLine = start + 1;
  let foundClosing = false;
  while (nextLine < end) {
    const linePos = state.bMarks[nextLine] + state.tShift[nextLine];
    const lineMax = state.eMarks[nextLine];
    const line = state.src.slice(linePos, lineMax).trim();
    if (line === ":::") {
      foundClosing = true;
      break;
    }
    nextLine++;
  }
  if (!foundClosing) {
    return false;
  }
  if (silent) {
    return true;
  }
  const openToken = state.push("info_open", "div", 1);
  openToken.info = type;
  openToken.markup = markup;
  openToken.map = [start, nextLine + 1];
  openToken.meta = { type, title };
  const contentStart = start + 1;
  const contentEnd = nextLine;
  if (contentStart < contentEnd) {
    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;
    state.parentType = "info";
    state.lineMax = contentEnd;
    state.md.block.tokenize(state, contentStart, contentEnd);
    state.parentType = oldParent;
    state.lineMax = oldLineMax;
  }
  const closeToken = state.push("info_close", "div", -1);
  closeToken.markup = markup;
  closeToken.map = [nextLine, nextLine + 1];
  state.line = nextLine + 1;
  return true;
}
function renderInfoOpen(tokens, idx) {
  const token = tokens[idx];
  const { type, title } = token.meta;
  const alertStyles = {
    info: {
      container: "bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/40",
      title: "text-blue-800 dark:text-blue-200",
      content: "[&_*]:!text-blue-700 [&_*]:dark:!text-blue-300"
    },
    warning: {
      container: "bg-yellow-50 border border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-900/40",
      title: "text-yellow-800 dark:text-yellow-200",
      content: "[&_*]:!text-yellow-700 [&_*]:dark:!text-yellow-300"
    },
    error: {
      container: "bg-red-100 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40",
      title: "text-red-800 dark:text-red-200",
      content: "[&_*]:!text-red-700 [&_*]:dark:!text-red-300"
    }
  };
  const alertIcons = {
    info: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5 text-blue-500"><path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" fill-rule="evenodd" /></svg>`,
    warning: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5 text-yellow-500"><path d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" fill-rule="evenodd" /></svg>`,
    error: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5 text-red-500"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" fill-rule="evenodd" /></svg>`
  };
  const styles = alertStyles[type] || alertStyles.info;
  const iconHtml = alertIcons[type] || alertIcons.info;
  return `
    <div class="flex rounded-md p-4 ${styles.container}" role="alert">
      <div class="shrink-0">
          ${iconHtml}
      </div>
      <div class="ml-3">
        <p class="!text-sm !font-bold ${styles.title}">${title}</p>
        <div class="mt-1 !text-sm ${styles.content}">
  `;
}
function renderInfoClose() {
  return `
    </div>
      </div>
        </div>
  `;
}
function markdownItComponentInfo(md) {
  md.block.ruler.before("fence", "info", infoBlock, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules.info_open = renderInfoOpen;
  md.renderer.rules.info_close = renderInfoClose;
}

let md;
function shiftHeadingLevels(markdownContent, rootHeadingLevel) {
  const getHasHeadingLevel = (level) => new RegExp(`^#{${level}} `, "m").test(markdownContent);
  const shiftDown = (shiftAmount) => {
    return markdownContent.replace(/^(#{1,6}) (.*)$/gm, (_, hashes, text) => {
      const newLevel = Math.min(hashes.length + shiftAmount, 6);
      return `${"#".repeat(newLevel)} ${text}`;
    });
  };
  const hasH1 = getHasHeadingLevel(1);
  const hasH2 = getHasHeadingLevel(2);
  if (rootHeadingLevel === 1 && hasH1) {
    return shiftDown(1);
  }
  if (rootHeadingLevel === 2 && (hasH1 || hasH2)) {
    const shiftDownLevel = hasH1 ? 2 : 1;
    return shiftDown(shiftDownLevel);
  }
  return markdownContent;
}
async function parseMarkdown(data) {
  if (!md) {
    md = MarkdownItAsync({ linkify: true, typographer: true });
    md.use(markdownItComponentInfo);
    md.use(
      fromAsyncCodeToHtml(
        codeToHtml,
        {
          themes: {
            light: "github-light-default",
            dark: "aurora-x"
          }
        }
      )
    );
  }
  if ("filePath" in data) {
    const doesFileExist = fs.existsSync(data.filePath);
    if (!doesFileExist) {
      log(`Error: Markdown file not found: "${data.filePath}"`, "important");
      return '<p class="font-bold text-red-600">Error: Markdown file not found!</p>';
    }
    let fileContent = await fs.readFile(data.filePath, "utf8");
    fileContent = shiftHeadingLevels(fileContent, data.rootHeadingLevel);
    const parsedMarkdown = await md.renderAsync(fileContent);
    return parsedMarkdown;
  } else {
    let fileContent = data.markdownContent.replace("Markdown:", "");
    fileContent = shiftHeadingLevels(fileContent, data.rootHeadingLevel);
    return await md.renderAsync(fileContent);
  }
}

function parseColors(text) {
  text = text.trim();
  const colors = [];
  const regex = /^(\S+)\s*:\s*(var\(--[a-z0-9-]+\)|[a-z]+|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(?:rgb|hsl)a?\((?:-?\d+%?[,\s]+){2,3}[\d.]+%?\))(?:\s*-\s*(.*))?$/gim;
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
  const regex = /^([^:]+):\s*(<svg[^>]*>[\s\S]*?<\/svg>|<i[^>]*><\/i>)$/gm;
  let match = regex.exec(text);
  while (match !== null) {
    const icon = {
      name: match[1].trim(),
      svg: match[2]
    };
    icons.push(icon);
    match = regex.exec(text);
  }
  icons.forEach((icon, index) => {
    const isValidSvg = icon.svg.startsWith("<svg") && icon.svg.endsWith("</svg>");
    const isValidI = icon.svg.startsWith("<i") && icon.svg.endsWith("</i>");
    if (!isValidSvg && !isValidI) {
      console.warn(`Warning: Icon "${icon.name}" at index ${index} may have malformed content`);
    }
  });
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
      processProperty.call(newSection, paragraphs, "Wrapper", (x) => x.trim());
      processProperty.call(newSection, paragraphs, "htmlclass", (x) => x.trim());
      processProperty.call(newSection, paragraphs, "bodyclass", (x) => x.trim());
      processProperty.call(newSection, paragraphs, "Icons", parseIcons);
      processProperty.call(newSection, paragraphs, "Figma", (x) => x.trim());
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
function extractMarkdownPath(input) {
  const normalizedInput = input.trim();
  const markdownPrefix = /^Markdown:\s*/i;
  if (!markdownPrefix.test(normalizedInput)) {
    return null;
  }
  const path2 = normalizedInput.replace(markdownPrefix, "").trim();
  if (!path2.endsWith(".md")) {
    return null;
  }
  return path2;
}
async function parse(text, config) {
  const data = kssParser(text).sections.filter((section) => Boolean(section.reference));
  const overwrittenSectionsIds = [];
  const sortedData = data.sort((a, b) => {
    return a.reference.localeCompare(b.reference);
  });
  let output = [];
  async function computeDescription(description, rootHeadingLevel) {
    if (!description || !description.includes("Markdown:"))
      return { description, hasMarkdownDescription: false };
    const markdownPath = extractMarkdownPath(description);
    if (!markdownPath) {
      return {
        description: await parseMarkdown({ markdownContent: description, rootHeadingLevel }),
        hasMarkdownDescription: true
      };
    }
    return {
      description: await parseMarkdown({ filePath: path.join(config.contentDir, markdownPath), rootHeadingLevel }),
      hasMarkdownDescription: true
    };
  }
  for await (const section of sortedData) {
    if (!section.reference)
      return;
    const sectionIds = section.reference.split(".");
    const isFirstLevelSection = sectionIds.length === 1 || sectionIds.length === 2 && sectionIds[1] === "0";
    if (isFirstLevelSection) {
      const { description, hasMarkdownDescription } = await computeDescription(section.description, 1);
      const isSectionIdDuplicated = !!output[sectionIds[0]];
      if (isSectionIdDuplicated) {
        overwrittenSectionsIds.push(section.reference);
      }
      output[sectionIds[0]] = {
        id: section.reference,
        sectionLevel: "first",
        header: section.header,
        description,
        hasMarkdownDescription,
        markup: section.markup,
        sections: [],
        modifiers: section.modifiers.map((modifier) => ({
          value: modifier.name,
          description: modifier.description
        })),
        colors: section.colors,
        icons: section.icons,
        figma: section.figma,
        wrapper: section.wrapper,
        htmlclass: section.htmlclass,
        bodyclass: section.bodyclass,
        sourceFileName: section.source.filename,
        previewFileName: `preview-${section.reference}.html`,
        fullpageFileName: `fullpage-${section.reference}.html`
      };
    } else {
      const firstLevelParentSection = output[sectionIds[0]];
      if (!firstLevelParentSection)
        throw new Error(`First level parent section ${firstLevelParentSection} not found for section ${section.reference}`);
      const isThirdLevelSection = sectionIds.length >= 3;
      if (isThirdLevelSection) {
        const secondLevelParentSection = firstLevelParentSection.sections[sectionIds[1]];
        if (!secondLevelParentSection)
          throw new Error(`Second level parent section ${sectionIds[0]}.${sectionIds[1]} not found for section ${section.reference}`);
        const { description, hasMarkdownDescription } = await computeDescription(section.description, 2);
        const isSectionIdDuplicated = secondLevelParentSection.sections.some((s) => s.id === section.reference);
        if (isSectionIdDuplicated) {
          overwrittenSectionsIds.push(section.reference);
        }
        secondLevelParentSection.sections.push({
          id: section.reference,
          sectionLevel: "third",
          header: section.header,
          description,
          hasMarkdownDescription,
          markup: section.markup,
          modifiers: section.modifiers.map((modifier) => ({
            value: modifier.name,
            description: modifier.description
          })),
          colors: section.colors,
          icons: section.icons,
          figma: section.figma,
          wrapper: section.wrapper,
          htmlclass: section.htmlclass,
          bodyclass: section.bodyclass,
          sourceFileName: section.source.filename,
          previewFileName: `preview-${section.reference}.html`,
          fullpageFileName: `fullpage-${section.reference}.html`
        });
      } else {
        const { description, hasMarkdownDescription } = await computeDescription(section.description, 1);
        const isSectionIdDuplicated = !!firstLevelParentSection.sections[sectionIds[1]];
        if (isSectionIdDuplicated) {
          overwrittenSectionsIds.push(section.reference);
        }
        firstLevelParentSection.sections[sectionIds[1]] = {
          id: section.reference,
          sectionLevel: "second",
          header: section.header,
          description,
          hasMarkdownDescription,
          markup: section.markup,
          modifiers: section.modifiers.map((modifier) => ({
            value: modifier.name,
            description: modifier.description
          })),
          colors: section.colors,
          icons: section.icons,
          figma: section.figma,
          wrapper: section.wrapper,
          htmlclass: section.htmlclass,
          bodyclass: section.bodyclass,
          sections: [],
          sourceFileName: section.source.filename,
          previewFileName: `preview-${section.reference}.html`,
          fullpageFileName: `fullpage-${section.reference}.html`
        };
      }
    }
  }
  output = output.filter((section) => Boolean(section));
  output.forEach((firstLevelSection) => {
    firstLevelSection.sections = firstLevelSection.sections.filter((section) => Boolean(section));
    firstLevelSection.sections.forEach((secondLevelSection) => {
      secondLevelSection.sections = secondLevelSection.sections.filter((section) => Boolean(section)).sort((a, b) => a.id.localeCompare(b.id));
    });
  });
  return {
    content: output,
    overwrittenSectionsIds
  };
}

async function generateFullPageFile(data) {
  const computedScriptTags = data.js.filter((entry) => entry.type !== "overwriteStyleguide").map((js) => {
    const additionalAttributes = js.additionalAttributes ? Object.entries(js.additionalAttributes).map(([key, value]) => `${key}="${value}"`).join(" ") : "";
    return `<script src="${js.src}" ${additionalAttributes}><\/script>`;
  }).join("\n");
  const computedStyleTags = data.css.filter((entry) => entry.type !== "overwriteStyleguide").map((css) => {
    return `<link rel="stylesheet" type="text/css" href="${css.src}">`;
  }).join("\n");
  const content = `
<!DOCTYPE html>
<html lang="${data.page.lang}"${data.page.htmlclass ? ` class="${data.page.htmlclass}"` : ""}>
<head>
    <title>${sanitizeSpecialCharacters(data.page.title)}</title>
    ${data.page.description ? `<meta name="description" content="${sanitizeSpecialCharacters(data.page.description)}">` : ""}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="generator" content="styleguide">
    ${typeof data.theme === "object" && "dark" in data.theme && "light" in data.theme ? `
          <link rel="icon" type="image/svg+xml" href="/styleguide-assets/favicon/fullpage.svg?raw">
      ` : `
        <meta name="theme-color" content="${data.theme}">
        <link rel="icon" type="image/svg+xml" href="/styleguide-assets/favicon/fullpage-light.svg?raw">
      `}
    ${data.ogImageUrl ? `<meta property="og:image" content="${data.ogImageUrl}">` : ""}
    <script type="module" src="/styleguide-assets/client-fullpage.js?raw"><\/script>
    ${computedStyleTags}
</head>
<body${data.page.bodyclass ? ` class="${data.page.bodyclass}"` : ""}>
    ${data.html}
    ${computedScriptTags}
</body>
</html>
`.trim();
  await logicalWriteFile(data.filePath, content);
}

const sanitizeId = (id) => id.toLowerCase().replaceAll(".", "-");
function getHasSectionExternalFullpage(section) {
  return section.markup.length > 0 && (section.icons === void 0 || section.icons.length === 0) && (section.colors === void 0 || section.colors.length === 0);
}
function getHeaderHtml() {
  return `
<header class="sticky top-0 z-10 mx-auto flex w-full min-[1222px]:border-x border-b pr-6 max-w-[1600px] border-styleguide-border bg-styleguide-bg-highlight">
    <a class="mr-4 flex items-center border-r py-4 pr-4 pl-6 border-styleguide-border w-[260px] font-semibold tracking-tight text-styleguide-theme-highlight" href="/">
        ${globalThis.styleguideConfiguration.projectTitle}
    </a>

    <div class="flex grow items-center justify-end py-4 md:justify-between">
        <button
            class="inline-flex items-center cursor-pointer justify-between gap-2 rounded-full border p-2 text-sm transition border-styleguide-border hover:text-styleguide-highlight focus:text-styleguide-highlight active:scale-[0.96] md:py-1.5 md:rounded-md md:px-2"
            type="button"
            aria-controls="search-dialog"
            aria-expanded="false"
            data-open-search=""
        >
            <span class="sr-only md:not-sr-only">Search page</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 md:hidden">
                <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>

            <kbd class="relative hidden items-center gap-1 rounded-md border font-semibold text-[10px] border-styleguide-border px-1.5 pt-[4px] pb-[3px] md:inline-flex">
                <span class="winlinux-only inline-block text-[10px] leading-[10px]">Ctrl</span>
                <span class="mac-only inline-block text-[12px] leading-[12px]">\u2318</span>
                <span class="leading-[10px]">K</span>
            </kbd>
        </button>

        ${!(globalThis.styleguideConfiguration.deactivateDarkMode ?? false) ? `
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
        ` : ``}
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
            <span class="block rounded-md px-3 text-sm font-semibold text-styleguide-theme-highlight">
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
function getCodeAuditDialog() {
  return `
    <dialog 
        id="code-audit-dialog"
        class="fixed -inset-x-0 top-auto bottom-0 z-30 pt-6 -mb-px w-full max-w-none overflow-y-auto rounded-t-2xl border search bg-styleguide-bg border-styleguide-border text-styleguide md:max-w-[640px] md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl mx-0"
      >
          <h2 class="flex items-center gap-2 mb-4 px-6">
            <svg class="-mt-0.5 h-4 transition duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" aria-hidden="true"><title>accessibility</title><path fill="currentcolor" d="M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0Zm-.39,74.18L52.1,98.91a4.94,4.94,0,0,1-2.58,2.83A5,5,0,0,1,42.7,95.5l6.24-17.28a26.3,26.3,0,0,0,1.17-4,40.64,40.64,0,0,0,.54-4.18c.24-2.53.41-5.27.54-7.9s.22-5.18.29-7.29c.09-2.63-.62-2.8-2.73-3.3l-.44-.1-18-3.39A5,5,0,0,1,27.08,46a5,5,0,0,1,5.05-7.74l19.34,3.63c.77.07,1.52.16,2.31.25a57.64,57.64,0,0,0,7.18.53A81.13,81.13,0,0,0,69.9,42c.9-.1,1.75-.21,2.6-.29l18.25-3.42A5,5,0,0,1,94.5,39a5,5,0,0,1,1.3,7,5,5,0,0,1-3.21,2.09L75.15,51.37c-.58.13-1.1.22-1.56.29-1.82.31-2.72.47-2.61,3.06.08,1.89.31,4.15.61,6.51.35,2.77.81,5.71,1.29,8.4.31,1.77.6,3.19,1,4.55s.79,2.75,1.39,4.42l6.11,16.9a5,5,0,0,1-6.82,6.24,4.94,4.94,0,0,1-2.58-2.83L63,74.23,62,72.4l-1,1.78Zm.39-53.52a8.83,8.83,0,1,1-6.24,2.59,8.79,8.79,0,0,1,6.24-2.59Zm36.35,4.43a51.42,51.42,0,1,0,15,36.35,51.27,51.27,0,0,0-15-36.35Z"/></svg>
            <span class="text-lg font-semibold text-styleguide-highlight leading-[1]">
                Code Audit Results
            </span>
          </h2>
          
          <ul class="audit-results"></ul>
    </dialog>
  `;
}
function renderTab(data) {
  const tabId = generateId();
  return `
    <div class="tabs">
        <div
            class="inline-flex relative justify-start flex-wrap rounded-md p-0.5 bg-styleguide-bg-highlight" 
            role="tablist"
        >
            <div
                class="tab-trigger-background absolute inset-y-0.5 left-0 bg-[rgb(242,242,242)] dark:bg-[rgb(26,26,26)] rounded"
            ></div>
        
            ${data.map((tab, index) => `
                <button 
                    id="tab-trigger-${tabId}-${index}"
                    role="tab"
                    aria-selected="${(index === 0).toString()}"
                    aria-controls="tab-panel-${tabId}-${index}" 
                    class="inline-flex gap-1 items-center relative px-4 py-2 text-sm cursor-pointer aria-selected:text-styleguide-highlight transition duration-400"
                >
                    ${tab.icon ?? ""}
                    ${tab.title}
                </button>
            `).join("\n")}
        </div>
        
        ${data.map((tab, index) => `
            <div
                id="tab-panel-${tabId}-${index}"
                class="${index === 0 ? "" : "hidden"}"
                role="tabpanel"
                aria-labelledby="tab-trigger-${tabId}-${index}"
                tabindex="${index === 0 ? "0" : "-1"}"
              >
                ${tab.content}
            </div>
        `).join("\n")}
    </div>
  `;
}
function getMainContentHtml(secondLevelSection, config) {
  let output = "";
  function renderSection(section) {
    if (section.colors && section.colors.length > 0) {
      output += getMainContentSectionWrapper(section, getMainContentColors(section));
    } else if (section.icons && section.icons.length > 0) {
      output += getMainContentSectionWrapper(section, getMainContentIcons(section));
    } else {
      const content = section.markup ? getMainContentRegular(section, config) : void 0;
      output += getMainContentSectionWrapper(section, content);
    }
  }
  renderSection(secondLevelSection);
  secondLevelSection.sections.forEach(renderSection);
  return output;
}
function getMainContentSectionWrapper(section, html) {
  let headingTag = "";
  let headingClass = "";
  if (section.sectionLevel === "second") {
    headingTag = "h1";
    headingClass = "text-4xl";
  } else if (section.sectionLevel === "third") {
    const isDeeplyNested = section.id.split(".").length > 3;
    headingTag = isDeeplyNested ? "h3" : "h2";
    headingClass = isDeeplyNested ? "text-xl" : "text-2xl";
  }
  const computeDescription = () => {
    if (!section.description)
      return "";
    if (section.hasMarkdownDescription) {
      return `
        <div class="markdown-container-folded relative mb-8">
            <div class="markdown-container mt-2 max-h-[400px] overflow-hidden">
                ${section.description}
            </div>
            
            <div class="markdown-show-more-container hidden absolute inset-x-0 bottom-0 flex justify-center max-w-[65ch] after:absolute after:inset-x-0 after:bottom-0 after:h-[120px] after:bg-gradient-to-t after:from-styleguide-bg after:to-transparent after:pointer-events-none">
                <button
                    type="button" 
                    class="markdown-show-more px-2 py-1 bg-styleguide-bg-highlight rounded-2xl cursor-pointer border border-styleguide-border hover:text-styleguide-highlight active:scale-[0.96] md:min-w-[150px] z-10"
                >
                    Show more
                </button>
            </div>
        </div>
      `;
    }
    return `<p class="mt-2${section.sectionLevel === "second" ? " text-xl" : ""}">${section.description}</p>`;
  };
  return `
<section 
  id="section-${sanitizeId(section.id)}" 
  class="styleguide-section border-b px-4 py-10 border-b-styleguide-border scroll-mt-[50px] md:px-10"
>
    <div class="flex items-center justify-between gap-6">
        <a class="relative group" href="#section-${sanitizeId(section.id)}">
            <svg class="absolute top-1/2 -left-6 -translate-y-1/2 opacity-0 transition size-[18px] group-hover:opacity-100 group-focus:opacity-100"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"/>
                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"/>
            </svg>
            <${headingTag} class="${headingClass} font-semibold text-styleguide-theme-highlight">${section.header}</${headingTag}>
        </a>

        ${getHasSectionExternalFullpage(section) ? `
          <a 
            class="p-2 group hover:text-styleguide-highlight focus:text-styleguide-highlight" 
            href="/${section.fullpageFileName}" 
            target="_blank" 
            title="Open ${section.header} in fullpage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
                <path class="transition group-hover:translate-x-px group-hover:-translate-y-px group-focus:translate-x-px group-focus:-translate-y-px" d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"/>
                <path class="transition" d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"/>
            </svg>
          </a>
        ` : ""}
    </div>
    ${computeDescription()}
${html ?? ""}
</section>
  `;
}
function getMainContentRegular(section, config) {
  let sourceFilePath = "";
  if (config.mode === "development" && config.launchInEditor && section.markup.includes('<pug src="')) {
    const regexModifierLine = /<pug src="(.+?)".*(?:[\n\r\u2028\u2029]\s*)?(modifierClass="(.+?)")? *><\/pug>/g;
    const vitePugTags = section.markup.match(regexModifierLine);
    if (!vitePugTags)
      throw new Error("No Vite Pug tags found");
    vitePugTags.forEach((vitePugTag) => {
      const pugSourcePath = vitePugTag.match(/src="(.+?)"/)?.[1];
      if (!pugSourcePath || !pugSourcePath.endsWith(".pug")) {
        throw new Error("No or invalid Pug source path found");
      }
      sourceFilePath = pugSourcePath;
    });
  } else if (config.mode === "development" && section.sourceFileName) {
    sourceFilePath = path.join(config.contentDir, section.sourceFileName);
  }
  const shouldLaunchInEditor = config.mode === "development" && config.launchInEditor && sourceFilePath;
  let openInEditorPathPhpStorm = "";
  let openInEditorPathVscode = "";
  if (shouldLaunchInEditor) {
    const computedRootPath = config.launchInEditor && typeof config.launchInEditor === "object" && "rootDir" in config.launchInEditor ? config.launchInEditor.rootDir : process.cwd();
    const computedFilePath = ensureStartingSlash(path.join(computedRootPath, sourceFilePath));
    openInEditorPathPhpStorm = shouldLaunchInEditor ? `phpstorm://open?file=${computedFilePath}` : "";
    openInEditorPathVscode = shouldLaunchInEditor ? `vscode://file//${computedFilePath}` : "";
  }
  const codePreviewMarkup = `
    <!-- Preview Box -->
    <div class="mt-4 overflow-hidden rounded-2xl border border-styleguide-border">
        <div class="w-full border-b p-6 bg-styleguide-bg-highlight border-styleguide-border">
            <iframe
                  id="preview-fullpage-${sanitizeId(section.id)}"
                  src="/${section.fullpageFileName}?preview=true"
                  class="preview-iframe"
                  title="${section.header} Preview"
                  scrolling="no"
            ></iframe>
        </div>

        <!-- Code -->
        <details class="group @container">
           <summary class="flex cursor-pointer justify-between items-center rounded-b-2xl px-6 text-sm font-light bg-styleguide-bg">
                <span class="flex gap-2 items-center py-4 select-none">
                    <svg class="h-4 w-4 group-open:rotate-90 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>
                    </svg>

                    <span class="group-open:hidden">Show code</span>
                    <span class="group-open:block hidden">Hide code</span>
                </span>
                
                <span class="flex items-center"> 
                    ${openInEditorPathPhpStorm ? `<a
                            class="inline-flex items-center group/phpstorm gap-1.5 p-4 desktop-device-only cursor-pointer active:scale-90 transition hover:text-styleguide-highlight duration-200" 
                            href="${openInEditorPathPhpStorm}"
                        >
                            <span class="hidden @2xl:inline-block">Open in</span>
                            <span class="sr-only">PHPStorm</span>
                            <img 
                                src="styleguide-assets/icons/phpstorm.svg"
                                width="70" 
                                height="70" 
                                class="size-4 saturate-0 group-hover/phpstorm:saturate-100 transition" 
                                alt="PHPStorm Logo" 
                                aria-hidden="true" 
                            >
                        </a>
                      ` : ""}
                    
                    ${openInEditorPathVscode ? `<a
                            class="inline-flex items-center group/vscode gap-1.5 p-4 desktop-device-only cursor-pointer active:scale-90 transition hover:text-styleguide-highlight duration-200" 
                            href="${openInEditorPathVscode}"
                        >
                            <span class="hidden @2xl:inline-block">Open in</span>
                            <span class="sr-only">VsCode</span>
                            <img 
                                src="styleguide-assets/icons/vscode.svg"
                                width="100" 
                                height="100" 
                                class="size-4 saturate-0 group-hover/vscode:saturate-100 transition" 
                                alt="VsCode Logo" 
                                aria-hidden="true" 
                            >
                        </a>
                      ` : ""}

                    <button
                        class="inline-flex items-center gap-1.5 p-4 cursor-pointer active:scale-90 transition hover:text-styleguide-highlight duration-200" 
                        type="button"
                        data-clipboard-value="${encodeURIComponent(section.markup)}"
                        data-clipboard-uri-encoded="true"
                    >
                        <svg class="h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <title>Clipboard</title>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>

                        <span class="hidden @2xl:inline-block">Copy</span>
                        <span class="sr-only"> Code</span>
                    </button>

                    <button
                        class="inline-flex items-center gap-1.5 p-4 cursor-pointer active:scale-90 transition hover:text-styleguide-highlight duration-200" 
                        type="button"
                        data-code-audit-iframe="preview-fullpage-${sanitizeId(section.id)}"
                        aria-controls="code-audit-dialog"
                        aria-expanded="false"
                    >
                        <svg class="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" aria-hidden="true"><title>accessibility</title><path fill="currentcolor" d="M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0Zm-.39,74.18L52.1,98.91a4.94,4.94,0,0,1-2.58,2.83A5,5,0,0,1,42.7,95.5l6.24-17.28a26.3,26.3,0,0,0,1.17-4,40.64,40.64,0,0,0,.54-4.18c.24-2.53.41-5.27.54-7.9s.22-5.18.29-7.29c.09-2.63-.62-2.8-2.73-3.3l-.44-.1-18-3.39A5,5,0,0,1,27.08,46a5,5,0,0,1,5.05-7.74l19.34,3.63c.77.07,1.52.16,2.31.25a57.64,57.64,0,0,0,7.18.53A81.13,81.13,0,0,0,69.9,42c.9-.1,1.75-.21,2.6-.29l18.25-3.42A5,5,0,0,1,94.5,39a5,5,0,0,1,1.3,7,5,5,0,0,1-3.21,2.09L75.15,51.37c-.58.13-1.1.22-1.56.29-1.82.31-2.72.47-2.61,3.06.08,1.89.31,4.15.61,6.51.35,2.77.81,5.71,1.29,8.4.31,1.77.6,3.19,1,4.55s.79,2.75,1.39,4.42l6.11,16.9a5,5,0,0,1-6.82,6.24,4.94,4.94,0,0,1-2.58-2.83L63,74.23,62,72.4l-1,1.78Zm.39-53.52a8.83,8.83,0,1,1-6.24,2.59,8.79,8.79,0,0,1,6.24-2.59Zm36.35,4.43a51.42,51.42,0,1,0,15,36.35,51.27,51.27,0,0,0-15-36.35Z"/></svg>
                        <span class="hidden md:inline-block">Audit</span>
                    </button>
                    
                    ${getHasSectionExternalFullpage(section) ? `
                       <a
                            class="hidden [.styleguide-section--large_&]:inline-block -mr-2 px-2 py-4 group/externallink hover:text-styleguide-highlight focus:text-styleguide-highlight"
                            href="/${section.fullpageFileName}"
                            target="_blank"
                            title="Open ${section.header} in fullpage"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
                            <path class="transition group-hover/externallink:translate-x-px group-hover/externallink:-translate-y-px group-focus/externallink:translate-x-px group/externallink-focus:-translate-y-px" d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"/>
                            <path class="transition" d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"/>
                        </svg>
                      </a>
                    ` : ""}
                </span>
            </summary>

            <div class="border-t p-6 text-sm bg-styleguide-bg-highlight border-styleguide-border">
                <div 
                  id="code-fullpage-${sanitizeId(section.id)}" 
                  class="overflow-x-auto w-full code-highlight"
                  data-source-code="${encodeURIComponent(section.markup)}"
                ></div>
            </div>
        </details>
    </div>
    
    ${section.modifiers?.length > 0 ? `
       <!-- Modifiers List -->
      <h3 class="mt-6 flex items-center text-xl font-semibold text-styleguide-theme-highlight gap-1.5">
          ${section.header} Modifiers
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-styleguide">
              <path d="M7.25 1.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0v-1.5ZM11.536 2.904a.75.75 0 1 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061ZM14.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM4.464 9.975a.75.75 0 0 1 1.061 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061ZM4.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM5.525 3.964a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06ZM8.779 7.438a.75.75 0 0 0-1.368.366l-.396 5.283a.75.75 0 0 0 1.212.646l.602-.474.288 1.074a.75.75 0 1 0 1.449-.388l-.288-1.075.759.11a.75.75 0 0 0 .726-1.165L8.78 7.438Z" />
          </svg>
      </h3>
      <ul class="mt-4 grid gap-6 overflow-hidden rounded-2xl border p-6 border-styleguide-border bg-styleguide-bg-highlight md:gap-x-10 md:gap-y-14">
          ${section.modifiers?.map((modifier) => `
              <li>
                <div>
                    <div class="flex items-center justify-between gap-6">
                        <div class="flex items-center gap-3">
                            <h4 class="font-semibold text-styleguide-theme-highlight">${modifier.description}</h4>
    
                            <button
                                class="inline-block rounded-md cursor-copy border py-1 font-mono font-semibold transition duration-500 text-[10px] border-styleguide-border px-2.5 bg-styleguide-bg-highlight hover:text-styleguide-highlight focus:text-styleguide-highlight"
                                type="button"
                                title="Copy content"
                                data-clipboard-value="${modifier.value}"
                                data-clipboard-alert-message="${modifier.value.split(".").length === 0 ? "Copied class name to clipboard!" : "Copied class names to clipboard!"}"
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
                          src="/${section.fullpageFileName}?preview=true&modifier=${modifier.value}"
                          class="preview-iframe mt-2"
                          title="${section.header} Preview - Modifier: ${modifier.value}"
                          scrolling="no"
                    ></iframe>
                </div>
            </li>
          `).join("\n")}
      </ul>
    ` : ""}
  `;
  if (section.figma) {
    const computedFigmaUrl = new URL(section.figma);
    computedFigmaUrl.searchParams.append("theme", "system");
    computedFigmaUrl.searchParams.append("footer", "false");
    computedFigmaUrl.searchParams.append("mode", "dev");
    computedFigmaUrl.searchParams.append("page-selector", "false");
    return `
      <div class="mt-4">
        ${renderTab([
      {
        title: "Preview",
        content: codePreviewMarkup
      },
      {
        title: "Design",
        icon: `<img src="styleguide-assets/icons/figma.svg" width="600" height="600" alt="Figma Logo" class="size-3">`,
        content: `
              <div class="mt-4 overflow-hidden rounded-2xl border border-styleguide-border">
                  <div class="w-full border-b p-6 bg-styleguide-bg-highlight border-styleguide-border">
                      <iframe 
                        width="800" 
                        height="450" 
                        src="${computedFigmaUrl.href}"
                        class="aspect-video size-full"
                        title="${section.header} Figma Design Preview" 
                        allowfullscreen
                        loading="lazy"
                      ></iframe>
                  </div>
              </div>
            `
      }
    ])}
      </div>
    `;
  }
  return codePreviewMarkup;
}
function getMainContentColors(section) {
  return `
    <ul class="my-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        ${section.colors?.map(
    (color) => `<li>
            <button 
                class="relative w-full rounded-2xl px-4 py-6 cursor-copy" 
                type="button"
                style="background-color: ${color.color}"
                data-clipboard-value="${color.color}"
                data-clipboard-alert-message="Copied color to clipboard!"
              >
                <span class="sr-only">Copy color to clipboard</span>  
              </button>
          </li>`
  ).join("\n")}
    </ul>
  `;
}
function getAlerts() {
  return `
    <div id="alerts"></div>
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
            class="grow bg-transparent icon-search-input h-[28px] focus:outline-hidden"
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

    <div class="@container min-h-[400px] md:min-h-[250px]">
        <ul
            id="icon-search-list"
            class="grid grid-cols-2 gap-4 @lg:grid-cols-3 @xl:grid-cols-4"
        >
            ${section.icons?.map((icon) => `
              <li class="relative grid gap-4 rounded-2xl border border-transparent px-4 py-6 items icon-search-list__item bg-styleguide-bg-highlight transition hover:border-styleguide-border focus:border-styleguide-border">
                  <div class="relative flex w-full justify-center size-6 text-styleguide-highlight [&>svg]:h-full [&>svg]:w-auto [&>i]:size-[24px] [&>i]:text-[24px] [&>i]:leading-[1em]">
                      ${icon.svg}
  
                      <!-- Successfully copied icon -->
                      <svg class="pointer-events-none icon-search-list__item-copy-icon size-5 text-styleguide-highlight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                      </svg>
                  </div>
                  <p class="text-center font-mono text-sm font-semibold hyphens-auto break-all">${icon.name}</p>
                  <button
                    class="absolute inset-0 cursor-copy bg-transparent icon-search-list__item-copy"
                    type="button"
                    title="Copy svg content"
                  ></button>
              </li>
            `).join("\n")}
        </ul>
    </div>
  `;
}
function getNextPageControlsHtml(data) {
  return `
<nav class="flex w-full justify-between px-4 py-10 md:px-10">
    <div>    
        ${data.before ? `
          <a id="styleguide-previous" class="flex items-center gap-1 group" href="${data.before.href}">
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
                <a id="styleguide-next" class="flex items-center gap-1 group" href="${data.after.href}">
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
    class="fixed -inset-x-px top-auto bottom-0 z-30 -mb-px w-full opacity-0 max-w-none overflow-y-auto rounded-t-2xl border search bg-styleguide-bg border-styleguide-border text-styleguide md:max-w-[640px] md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl mx-0"
>
    <h2 class="sr-only">Search</h2>
    <div class="border-b px-4 py-3 border-styleguide-border">
        <label for="search-input" class="sr-only">Search styleguide</label>
        <input
            id="search-input"
            class="w-full bg-transparent text-[18px] h-[28px] focus:outline-hidden"
            placeholder="Search..."
            aria-autocomplete="list"
            autocomplete="off"
            role="combobox"
            spellcheck="false"
            type="text"
            value=""
            aria-expanded="false"
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

<div class="dialog-backdrop"></div>
`.trim();
}
async function generatePreviewFile(data) {
  const computedScriptTags = data.js.filter((entry) => entry.type === "overwriteStyleguide").map((js) => {
    const additionalAttributes = js.additionalAttributes ? objectEntries(js.additionalAttributes).map(([key, value]) => `${key}="${value}"`).join(" ") : "";
    return `<script src="${js.src}" ${additionalAttributes}><\/script>`;
  }).join("\n");
  const computedStyleTags = data.css.filter((entry) => entry.type === "overwriteStyleguide").map((css) => {
    return `<link rel="stylesheet" type="text/css" href="${css.src}">`;
  }).join("\n");
  const computedPreloadIframes = data.html.preloadIframes.map((url) => `<link rel="preload" href="${url}" as="document">`).join("\n");
  const shouldRenderMetaDescription = data.page.description && data.page.description.length > 0 && !(data.page.description.includes("<") && data.page.description.includes(">"));
  const content = `
<!DOCTYPE html>
<html lang="${data.page.lang}">
<head>
    <title>${sanitizeSpecialCharacters(data.page.title)}</title>
    ${data.page.description && shouldRenderMetaDescription ? `<meta name="description" content="${data.page.description.replaceAll(`'`, "").replaceAll(`"`, "")}">` : ""}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="generator" content="styleguide">
    ${typeof data.theme === "object" && "dark" in data.theme && "light" in data.theme ? `
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="${data.theme.light}">
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="${data.theme.dark}">
          <link rel="icon" type="image/svg+xml" href="/styleguide-assets/favicon/preview.svg?raw">
      ` : `
        <meta name="theme-color" content="${data.theme}">
        <link rel="icon" type="image/svg+xml" href="/styleguide-assets/favicon/preview-light.svg?raw">
      `}
    <link rel="stylesheet" type="text/css" href="/styleguide-assets/styleguide.css?raw">
    <script type="module" src="/styleguide-assets/client.js?raw"><\/script>
    <link rel="preload" href="/styleguide-assets/fonts/geist-mono-latin-400-normal.woff2?raw" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/styleguide-assets/fonts/geist-mono-latin-600-normal.woff2?raw" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/styleguide-assets/fonts/geist-mono-latin-300-normal.woff2?raw" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/styleguide-assets/fonts/geist-mono-latin-400-normal.woff2?raw" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/styleguide-assets/fonts/geist-mono-latin-600-normal.woff2?raw" as="font" type="font/woff2" crossorigin="anonymous">
    ${computedPreloadIframes}
    ${data.ogImageUrl ? `<meta property="og:image" content="${data.ogImageUrl}">` : ""}
    ${computedStyleTags}
    <style>
        :root {
            --styleguide-color-theme-highlight: ${typeof data.theme === "string" ? data.theme : `light-dark(${data.theme.light}, ${data.theme.dark})`};
        }
    </style>
</head>
<body class="relative min-h-screen antialiased text-styleguide${globalThis.styleguideConfiguration.deactivateDarkMode ? " theme-light" : ""}">
    ${data.html.header}
  
    <main class="relative flex h-full min-h-screen min-[1222px]:border-x min-[1220px]:mx-auto max-w-[1600px] border-styleguide-border">
      <aside
          class="sticky order-1 hidden flex-col overflow-y-auto border-r z-100 w-[260px] border-styleguide-border shrink-0 md:flex"
          style="top: var(--header-height); max-height: calc(100vh - var(--header-height))"
      >
        <nav>
            ${data.html.sidebarMenu}
        </nav>
      </aside>
      
      <div class="order-2 w-full md:w-[calc(100%-260px)]">
        ${data.html.mainContent}
        ${data.html.nextPageControls}
      </div>
    </main>
   
    ${data.html.alerts}
    ${data.html.search}
    ${data.html.codeAuditDialog}
    
    <script type="speculationrules">
    {
      "prerender": [{
        "where": {
          "href_matches": "/*"
        },
        "eagerness": "moderate"
      }]
    }
    <\/script>
    
    ${computedScriptTags}
</body>
</html>
`.trim();
  await logicalWriteFile(data.filePath, content);
}

const MAX_POOL_SIZE = os.cpus().length;
let workerPool = [];
async function terminateAllWorkers() {
  await Promise.all(workerPool.map(({ worker }) => worker.terminate));
}
const processCache = /* @__PURE__ */ new Map();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerFilePath = __dirname.includes("dist/") ? "./vite-pug/worker.mjs" : "./worker.ts";
const workerFilePathResolved = path.resolve(__dirname, workerFilePath);
const signals = ["SIGINT", "SIGTERM", "SIGQUIT"];
signals.forEach((signal) => process.on(signal, async () => await terminateAllWorkers()));
async function compilePugMarkup(mode, contentDir, repository) {
  const clonedRepository = structuredClone(repository);
  const needsProcessingIds = Array.from(clonedRepository.entries()).map(([id]) => id);
  if (needsProcessingIds.length === 0)
    return clonedRepository;
  if (mode === "production") {
    needsProcessingIds.forEach((id) => {
      const cachedMarkup = processCache.get(id);
      if (!cachedMarkup)
        return;
      clonedRepository.set(id, { markup: cachedMarkup });
      needsProcessingIds.splice(needsProcessingIds.indexOf(id), 1);
    });
  }
  workerPool = Array.from({ length: Math.min(needsProcessingIds.length, MAX_POOL_SIZE) }, (_, index) => ({
    worker: new Worker(workerFilePathResolved, {
      name: `pug-worker-${index}`
    }),
    busy: false,
    currentTaskId: void 0
  }));
  workerPool.forEach((workerNode) => {
    workerNode.worker.on("message", (result) => {
      if ("error" in result) {
        console.error(result.error);
        workerNode.busy = false;
        return;
      }
      const { id, html } = result;
      clonedRepository.set(id, { markup: fixAccessibilityIssues(html) });
      workerNode.busy = false;
    });
  });
  while (needsProcessingIds.length > 0 || workerPool.some((worker) => worker.busy)) {
    if (needsProcessingIds.length === 0 && workerPool.some((worker) => worker.busy)) {
      await new Promise((resolve) => setTimeout(resolve, 25));
      continue;
    }
    const availableWorker = workerPool.find((worker) => !worker.busy);
    if (availableWorker) {
      const id = needsProcessingIds.pop();
      const { markup } = clonedRepository.get(id);
      availableWorker.busy = true;
      availableWorker.currentTaskId = id;
      availableWorker.worker.postMessage({
        id,
        mode,
        html: markup,
        contentDir
      });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  await terminateAllWorkers();
  return clonedRepository;
}

function watchForFileContentChanges(path, regex, callback) {
  if (typeof callback !== "function") {
    throw new TypeError("styleguide watch requires a callback function");
  }
  const regexFileContents = /* @__PURE__ */ new Map();
  const registerCSSFileContentMatches = (filePath) => {
    const currentFileContent = readFileSync(filePath, "utf8");
    const currentFileMatches = currentFileContent.match(regex);
    if (currentFileMatches === null) {
      return;
    }
    regexFileContents.set(filePath, currentFileMatches);
    callback();
  };
  const handleCSSContentChanges = (filePath) => {
    const previousFileMatches = regexFileContents.get(filePath);
    const hasFileBeenReadBefore = previousFileMatches !== void 0;
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
  const handleCSSFileRemoval = (filePath) => {
    regexFileContents.delete(filePath);
    callback();
  };
  const validCSSFileTypes = [".css", ".scss", ".sass", ".less"];
  chokidar.watch(path, {
    ignoreInitial: true,
    // @ts-expect-error - chokidar types seem to be incomplete, ignore
    ignored: (path2, stats) => {
      return stats?.isFile() && !validCSSFileTypes.some((type) => path2.endsWith(type));
    }
  }).on("add", registerCSSFileContentMatches).on("change", handleCSSContentChanges).on("unlink", handleCSSFileRemoval);
  chokidar.watch(path, {
    ignoreInitial: true,
    // @ts-expect-error - chokidar types seem to be incomplete, ignore
    ignored: (path2, stats) => {
      return stats?.isFile() && !path2.endsWith(".md");
    }
  }).on("add", callback).on("change", callback).on("unlink", callback);
}
function watchStyleguideForChanges(path, callback) {
  const kssSectionRegex = /\/\*{1,2}[\s\S]*?Styleguide[\s\S]*?\*\//g;
  watchForFileContentChanges(
    path,
    kssSectionRegex,
    callback
  );
}

globalThis.isWatchMode = false;
async function buildStyleguide(config) {
  globalThis.styleguideConfiguration = config;
  const styleguideContentPaths = await glob(`${config.contentDir}/**/*.{css,scss}`);
  const styleguideContent = (await Promise.all(styleguideContentPaths.map((file) => fs.readFile(file, "utf-8")))).join("\n");
  const rawParsedOutput = await parse(styleguideContent, config);
  if (!rawParsedOutput)
    throw new Error("Could not parse content");
  const { content: parsedContent, overwrittenSectionsIds } = rawParsedOutput;
  if (config.mode === "production" && await fs.exists(config.outDir)) {
    const files = await glob(`${config.outDir}/**/*.html`);
    await Promise.all(files.map((file) => fs.unlink(file)));
  }
  const baseDirectory = path.relative(process.cwd(), config.outDir);
  const getFullPageFilePath = (fileName) => path.join(baseDirectory, fileName);
  const getPreviewPageFilePath = (fileName, isHtmlIndexPage = false) => {
    return isHtmlIndexPage ? path.join(baseDirectory, "index.html") : path.join(baseDirectory, fileName);
  };
  const handleGenerateFullPage = async (data) => {
    if (data.markup === void 0 || data.markup.length === 0)
      return;
    let htmlMarkup = data.markup;
    if (data.wrapper) {
      htmlMarkup = data.wrapper.replace("<wrapper-content/>", htmlMarkup);
    }
    await generateFullPageFile({
      id: data.id,
      filePath: getFullPageFilePath(data.fullpageFileName),
      page: {
        title: data.header,
        description: !data.hasMarkdownDescription ? data.description : void 0,
        lang: config.html.lang,
        htmlclass: data.htmlclass,
        bodyclass: data.bodyclass
      },
      css: config.html.assets.css,
      js: config.html.assets.js,
      html: htmlMarkup,
      theme: config.theme,
      ogImageUrl: config.plugins?.ogImage ? config.plugins.ogImage(data) : void 0
    });
  };
  const searchSectionMapping = [];
  const menuSectionMapping = [];
  const fileWriteTasks = [];
  let markupRepository = /* @__PURE__ */ new Map();
  parsedContent.forEach((firstLevelSection) => {
    firstLevelSection.sections.forEach((secondLevelSection) => {
      if (secondLevelSection.markup)
        markupRepository.set(secondLevelSection.id, { markup: secondLevelSection.markup });
      secondLevelSection.sections.forEach((thirdLevelSection) => {
        if (thirdLevelSection.markup)
          markupRepository.set(thirdLevelSection.id, { markup: thirdLevelSection.markup });
      });
    });
  });
  markupRepository = await compilePugMarkup(config.mode, config.contentDir, markupRepository);
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
        fileWriteTasks.push(
          (async () => {
            try {
              secondLevelSection.markup = markupRepository.get(secondLevelSection.id).markup;
              await handleGenerateFullPage(secondLevelSection);
            } catch (error) {
              console.error(`Error processing section ${secondLevelSection.id}:`, error);
            }
          })()
        );
      }
      secondLevelSection.sections.forEach((thirdLevelSection) => {
        if (!thirdLevelSection.markup)
          return;
        fileWriteTasks.push(
          (async () => {
            try {
              thirdLevelSection.markup = markupRepository.get(thirdLevelSection.id).markup;
              await handleGenerateFullPage(thirdLevelSection);
            } catch (error) {
              console.error(`Error processing section ${thirdLevelSection.id}:`, error);
            }
          })()
        );
      });
    });
  });
  const headerHtml = getHeaderHtml();
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
      const preloadIframes = [];
      if (secondLevelSection.markup) {
        preloadIframes.push(secondLevelSection.fullpageFileName);
      }
      secondLevelSection.sections.forEach((thirdLevelSection) => {
        if (thirdLevelSection.markup) {
          preloadIframes.push(thirdLevelSection.fullpageFileName);
        }
      });
      fileWriteTasks.push(
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
            mainContent: getMainContentHtml(secondLevelSection, config),
            nextPageControls: getNextPageControlsHtml(nextPageControlsData),
            search: searchHtml,
            codeAuditDialog: getCodeAuditDialog(),
            alerts: getAlerts(),
            preloadIframes
          },
          theme: config.theme,
          ogImageUrl: config.plugins?.ogImage ? config.plugins.ogImage(secondLevelSection) : void 0
        })
      );
    });
  });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const findAssetsDirectoryPath = () => {
    const isLibraryDevelopmentIndexTs = __filename.endsWith("/lib/index.ts");
    if (isLibraryDevelopmentIndexTs)
      return path.resolve(process.cwd(), "dist/styleguide-assets");
    return path.resolve(__dirname, "../../styleguide-assets");
  };
  const assetsDirectoryPath = findAssetsDirectoryPath();
  const assetsDirectoryOutputPath = path.join(config.outDir, "styleguide-assets");
  const isAssetsDirectoryAlreadyCopied = await fs.exists(assetsDirectoryOutputPath) && (await fs.readdir(assetsDirectoryOutputPath)).length > 0;
  if (!isAssetsDirectoryAlreadyCopied) {
    await fs.copy(assetsDirectoryPath, assetsDirectoryOutputPath);
    await generateFaviconFiles(assetsDirectoryOutputPath, config.theme);
  }
  await Promise.all(fileWriteTasks);
  const errors = {};
  if (overwrittenSectionsIds.length > 0) {
    errors.overwrittenSectionsIds = overwrittenSectionsIds;
  }
  return {
    errors: Object.keys(errors).length > 0 ? errors : void 0
  };
}
async function watchStyleguide(config, onChange, onError) {
  globalThis.isWatchMode = true;
  const initialBuild = await buildStyleguide(config);
  if (onError && initialBuild.errors) {
    onError(initialBuild.errors);
  }
  const contentDirPath = config.contentDir.endsWith("/") ? config.contentDir : `${config.contentDir}/`;
  watchStyleguideForChanges(contentDirPath, () => {
    (async () => {
      const localBuild = await buildStyleguide(config);
      if (onChange)
        onChange();
      if (onError && localBuild.errors) {
        onError(localBuild.errors);
      }
    })();
  });
}

export { buildStyleguide, watchStyleguide };
