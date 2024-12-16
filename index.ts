import fs from 'fs-extra'
import { parse } from "./lib/parser.ts";
import { generateFullPageFile } from "./lib/templates/fullpage.ts";
import {objectEntries} from "@antfu/utils";
import {generateMenuHTML} from "./lib/templates/menu.ts";

// Test code
const testContent = `
/*------------------------------------*\\
  #ACCORDION
\\*------------------------------------*/

/*
Test

Icons:
name: <svg><line>123</line></svg>
multi word name: <svg><line>1234</line></svg>

Styleguide 1.1
*/



`;

const result = parse(testContent);
console.log(1734344943399, result);

// ensure directory exists and is empty
await fs.ensureDir('./dist')
await fs.emptyDir('./dist')

// console.log(1734102197421, generateMenuHTML(Object.values(result)));

await Promise.all(objectEntries(result).map(async ([_, section]) => {
    const getFullpageFilePath = (id: string) => `./dist/fullpage-${id}.html`;

    await generateFullPageFile(
        getFullpageFilePath(section.id),
        `Preview ${section.header}`,
        section.markup
    );
}))
