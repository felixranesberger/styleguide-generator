import path from 'node:path'

interface FileObject {
  base?: string
  path?: string
  contents: string
}

interface CommentBlock {
  line: number
  text: string
  raw: string
}

interface StyleGuide {
  files: string[]
  sections: Section[]
}

interface Section {
  raw: string
  header: string
  description: string
  modifiers: Modifier[]
  parameters: Parameter[]
  markup: string
  reference?: string
  deprecated?: boolean
  experimental?: boolean
  colors?: ColorObject[]
  source: {
    filename: string
    path: string
    line: number
  }
  [key: string]: any // For custom properties
}

interface Modifier {
  name: string
  description: string
}

interface Parameter {
  name: string
  defaultValue: string
  description: string
}

interface ColorObject {
  name?: string
  color: string
  description?: string
}

interface IconObject {
  name: string
  svg: string
}

interface ParseOptions {
  markdown?: boolean
  header?: boolean
  custom?: string[]
}

interface CommentRegex {
  single: RegExp
  docblockStart: RegExp
  multiStart: RegExp
  multiFinish: RegExp
}

/**
 * Convert colors doc block to a collection of color objects
 */
function parseColors(text: string): ColorObject[] {
  text = text.trim()
  const colors: ColorObject[] = []

  // CSS4 colors regex
  const regex = /^(?:(\S+)\s*:\s*)?([a-z]+|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(?:rgb|hsl)a?\((?:-?\d+%?[,\s]+){2,3}[\d.]+%?\))(?:\s*-\s*(.*))?$/gim

  let test = regex.exec(text)

  while (test !== null) {
    const color: ColorObject = {
      color: test[2],
    }

    if (test[1]) {
      color.name = test[1]
    }

    if (test[3]) {
      color.description = test[3]
    }

    colors.push(color)
    test = regex.exec(text)
  }

  return colors
}

function parseIcons(text: string): IconObject[] {
  text = text.trim()
  const icons: IconObject[] = []

  // Updated regex to match newlines within SVG content
  const regex = /^([^:]+):\s*(<svg>[\s\S]*?<\/svg>)$/gim

  let test = regex.exec(text)

  while (test !== null) {
    const icon: IconObject = {
      name: test[1].trim(),
      svg: test[2],
    }

    icons.push(icon)
    test = regex.exec(text)
  }

  return icons
}

/**
 * Convert String to Float
 */
function toFloat(value: string): number {
  return Number.isNaN(Number(value)) ? 0 : Number.parseFloat(value)
}

/**
 * Parse an array/string of documented CSS
 */
function kssParser(input: string | (string | FileObject)[], options: ParseOptions = {}): StyleGuide {
  // Default parsing options
  options.markdown = options.markdown ?? true
  options.header = options.header ?? true
  options.custom = options.custom || []

  // Initialize files array and style guide object
  let files: FileObject[] = []
  const styleGuide: StyleGuide = {
    files: [],
    sections: [],
  }

  // Process input into files array
  if (typeof input === 'string') {
    files.push({ contents: input })
  }
  else {
    files = input.map((file) => {
      if (typeof file === 'string') {
        return { contents: file }
      }
      else {
        styleGuide.files.push(file.path as string)
        return file
      }
    })
  }

  // Process each file
  for (const file of files) {
    const comments = findCommentBlocks(file.contents)

    for (const comment of comments) {
      // Create new section
      const newSection: Section = {
        raw: comment.raw,
        header: '',
        description: '',
        modifiers: [],
        parameters: [],
        markup: '',
        source: {
          filename: file.base ? path.relative(file.base, file.path || '').replace(/\\/g, '/') : (file.path || ''),
          path: file.path || '',
          line: comment.line,
        },
      }

      // Split into paragraphs and process
      const paragraphs = comment.text.split('\n\n')

      // Find reference
      for (let i = 0; i < paragraphs.length; i++) {
        const reference = findReference(paragraphs[i])
        if (reference) {
          newSection.reference = reference
          paragraphs.splice(i, 1)
        }
      }

      if (!newSection.reference) {
        continue
      }

      // Process properties
      processProperty.call(newSection, paragraphs, 'Colors', parseColors)
      processProperty.call(newSection, paragraphs, 'Icons', parseIcons)
      processProperty.call(newSection, paragraphs, 'Markup')
      processProperty.call(newSection, paragraphs, 'Weight', toFloat)

      // Process custom properties
      for (const customProperty of options.custom) {
        processProperty.call(newSection, paragraphs, customProperty)
      }

      // Process section content
      if (paragraphs.length === 0) {
        newSection.header = newSection.reference
      }
      else if (paragraphs.length === 1) {
        newSection.header = newSection.description = paragraphs[0]
      }
      else {
        newSection.header = paragraphs[0]
        const possibleModifiers = paragraphs.pop() || ''
        newSection.modifiers = possibleModifiers.split('\n')
        newSection.description = paragraphs.join('\n\n')

        // Process modifiers
        const numModifierLines = newSection.modifiers.length
        let hasModifiers = true
        let lastModifier = 0

        for (let j = 0; j < numModifierLines; j++) {
          if (newSection.modifiers[j].match(/^\s*(?:\S.*?|[\t\v\f \xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF])\s+-\s/g)) {
            lastModifier = j
          }
          else if (j === 0) {
            hasModifiers = false
            j = numModifierLines
          }
          else {
            newSection.modifiers[lastModifier] += ` ${newSection.modifiers[j].replace(/^\s+|\s+$/g, '')}`
            newSection.modifiers[j] = ''
          }
        }

        newSection.modifiers = newSection.modifiers.filter(line => line !== '')

        if (hasModifiers) {
          if (newSection.markup) {
            newSection.modifiers = createModifiers(newSection.modifiers)
          }
          else {
            newSection.parameters = createParameters(newSection.modifiers)
            newSection.modifiers = []
          }
        }
        else {
          newSection.description += `\n\n${possibleModifiers}`
          newSection.modifiers = []
        }
      }

      // Clean up header
      newSection.header = newSection.header.replace(/\n/g, ' ')

      // Check status
      newSection.deprecated = hasPrefix(newSection.description, 'Deprecated')
      newSection.experimental = hasPrefix(newSection.description, 'Experimental')

      // Handle header option
      if (options.header) {
        if (newSection.description.match(/\n{2,}/)) {
          newSection.description = newSection.description.replace(/^.*\n{2,}/, '')
        }
        else {
          newSection.description = ''
        }
      }

      styleGuide.sections.push(newSection)
    }
  }

  return styleGuide
}

/**
 * Find comment blocks in input string
 */
function findCommentBlocks(input: string): CommentBlock[] {
  const commentRegex: CommentRegex = {
    single: /^\s*\/\/.*$/,
    docblockStart: /^\s*\/\*\*\s*$/,
    multiStart: /^\s*\/\*+\s*$/,
    multiFinish: /^\s*\*\/\s*$/,
  }

  input = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  const blocks: CommentBlock[] = []
  let block: CommentBlock = {
    line: 0,
    text: '',
    raw: '',
  }

  let indentAmount: string | false = false
  let insideSingleBlock = false
  let insideMultiBlock = false
  let insideDocblock = false

  input += '\n'
  const lines = input.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\s*$/, '')

    if (!insideMultiBlock && !insideDocblock && line.match(commentRegex.single)) {
      block.raw += `${line}\n`
      block.text += `${line.replace(/^\s*\/\/\s?/, '')}\n`
      if (!insideSingleBlock) {
        block.line = i + 1
      }
      insideSingleBlock = true
      continue
    }

    if (insideSingleBlock || (insideMultiBlock || insideDocblock) && line.match(commentRegex.multiFinish)) {
      const doneWithCurrentLine = !insideSingleBlock
      block.text = block.text.replace(/^\n+/, '').replace(/\n+$/, '')
      blocks.push({ ...block })
      insideMultiBlock = insideDocblock = insideSingleBlock = false
      indentAmount = false
      block = { line: 0, text: '', raw: '' }
      if (doneWithCurrentLine)
        continue
    }

    if (line.match(commentRegex.docblockStart)) {
      insideDocblock = true
      block.raw += `${line}\n`
      block.line = i + 1
      continue
    }

    if (insideDocblock) {
      block.raw += `${line}\n`
      block.text += `${line.replace(/^\s*\*\s?/, '')}\n`
      continue
    }

    if (line.match(commentRegex.multiStart)) {
      insideMultiBlock = true
      block.raw += `${line}\n`
      block.line = i + 1
      continue
    }

    if (insideMultiBlock) {
      block.raw += `${line}\n`
      if (indentAmount === false) {
        if (line === '')
          continue
        indentAmount = line.match(/^\s*/)![0]
      }
      block.text += `${line.replace(new RegExp(`^${indentAmount}`), '')}\n`
    }
  }

  return blocks
}

/**
 * Create modifier objects from raw modifier strings
 */
function createModifiers(rawModifiers: string[]): Modifier[] {
  return rawModifiers.map((entry) => {
    const modifier = entry.split(/\s+-\s+/, 1)[0]
    const description = entry.replace(modifier, '').replace(/^\s+-\s+/, '')

    return {
      name: modifier,
      description,
    }
  })
}

/**
 * Create parameter objects from raw parameter strings
 */
function createParameters(rawParameters: string[]): Parameter[] {
  return rawParameters.map((entry) => {
    const parameter = entry.split(/\s+-\s+/, 1)[0]
    const defaultValue = ''
    const description = entry.replace(parameter, '').replace(/^\s+-\s+/, '')

    if (/\s+=\s+/.test(parameter)) {
      const tokens = parameter.split(/\s+=\s+/)
      return {
        name: tokens[0],
        defaultValue: tokens[1],
        description,
      }
    }

    return {
      name: parameter,
      defaultValue,
      description,
    }
  })
}

/**
 * Find reference number in text
 */
function findReference(text: string): string | false {
  text = text.trim().replace(/\s+/g, ' ')
  const regex = /^style\s?guide\s?[-:]?\s?/i

  if (regex.test(text)) {
    return text.replace(regex, '')
  }
  return false
}

/**
 * Process a property in the comment block
 */
function processProperty(
  this: Section,
  paragraphs: string[],
  propertyName: string,
  processValue?: (value: string) => any,
): void {
  let indexToRemove: number | false = false
  propertyName = propertyName.toLowerCase()

  for (let i = 0; i < paragraphs.length; i++) {
    if (hasPrefix(paragraphs[i], propertyName)) {
      this[propertyName] = paragraphs[i].replace(
        new RegExp(`^\\s*${propertyName}\\:\\s+?`, 'gim'),
        '',
      )
      if (typeof processValue === 'function') {
        this[propertyName] = processValue(this[propertyName])
      }
      indexToRemove = i
      break
    }
  }

  if (indexToRemove !== false) {
    paragraphs.splice(indexToRemove, 1)
  }
}

/**
 * Check if description has a specific prefix
 */
function hasPrefix(description: string, prefix: string): boolean {
  return new RegExp(`^\\s*${prefix}\\:`, 'gim').test(description)
}

export interface in2Section {
  id: string
  sectionLevel: 'first' | 'second' | 'third'
  header: string
  description: string
  markup: string
  modifiers: {
    value: string
    description: string
  }[]
  colors?: ColorObject[]
  icons?: IconObject[]
  previewFileName: string
  fullpageFileName: string
}

export interface in2FirstLevelSection extends in2Section {
  sections: in2SecondLevelSection[]
}

export interface in2SecondLevelSection extends in2Section {
  sections: in2Section[]
}

export function parse(text: string) {
  const data = kssParser(text).sections.filter(section => Boolean(section.reference))

  // sort by reference id
  const sortedData = data.sort((a, b) => {
    return a.reference!.localeCompare(b.reference!)
  })

  let output: in2FirstLevelSection[] = []

  sortedData.forEach((section) => {
    if (!section.reference)
      return

    // first level sections always are in the format of "1.0", "2.0", etc
    const sectionIds = section.reference.split('.')
    const isFirstLevelSection = sectionIds.length < 2 || (sectionIds.length === 2 && sectionIds[1] === '0')

    if (isFirstLevelSection) {
      output[sectionIds[0]] = {
        id: section.reference,
        sectionLevel: 'first',
        header: section.header,
        description: section.description,
        markup: section.markup,
        sections: [],
        modifiers: section.modifiers.map(modifier => ({
          value: modifier.name,
          description: modifier.description,
        })),
        colors: section.colors,
        icons: section.icons,
        previewFileName: `preview-${section.reference}.html`,
        fullpageFileName: `fullpage-${section.reference}.html`,
      }
    }
    else {
      const firstLevelParentSection = output[sectionIds[0]]
      if (!firstLevelParentSection)
        throw new Error(`First level parent section ${firstLevelParentSection} not found for section ${section.reference}`)

      // e.g. components => accordion => accordion purple (6.1.1)
      const isThirdLevelSection = sectionIds.length === 3
      if (isThirdLevelSection) {
        const secondLevelParentSection = firstLevelParentSection.sections[sectionIds[1]]

        if (!secondLevelParentSection)
          throw new Error(`Second level parent section ${sectionIds[0]}.${sectionIds[1]} not found for section ${section.reference}`)

        secondLevelParentSection.sections[sectionIds[2]] = {
          id: section.reference,
          sectionLevel: 'third',
          header: section.header,
          description: section.description,
          markup: section.markup,
          modifiers: section.modifiers.map(modifier => ({
            value: modifier.name,
            description: modifier.description,
          })),
          colors: section.colors,
          icons: section.icons,
          previewFileName: `preview-${section.reference}.html`,
          fullpageFileName: `fullpage-${section.reference}.html`,
        }
      }
      // e.g. components => accordion (6.1)
      else {
        firstLevelParentSection.sections[sectionIds[1]] = {
          id: section.reference,
          sectionLevel: 'second',
          header: section.header,
          description: section.description,
          markup: section.markup,
          modifiers: section.modifiers.map(modifier => ({
            value: modifier.name,
            description: modifier.description,
          })),
          colors: section.colors,
          icons: section.icons,
          sections: [],
          previewFileName: `preview-${section.reference}.html`,
          fullpageFileName: `fullpage-${section.reference}.html`,
        }
      }
    }
  })

  // filter out empty sections
  output = output.filter(section => Boolean(section))
  output.forEach((firstLevelSection) => {
    firstLevelSection.sections = firstLevelSection.sections.filter(section => Boolean(section))
    firstLevelSection.sections.forEach((secondLevelSection) => {
      secondLevelSection.sections = secondLevelSection.sections.filter(section => Boolean(section))
    })
  })

  return output
}
