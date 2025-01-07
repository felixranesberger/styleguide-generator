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
