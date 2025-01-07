declare module 'pug' {
  interface Options {
    filename?: string
    basedir?: string
    doctype?: string
    pretty?: boolean | string
    filters?: Record<string, (text: string, options: any) => string>
    self?: boolean
    debug?: boolean
    compileDebug?: boolean
    globals?: string[]
    cache?: boolean
    inlineRuntimeFunctions?: boolean
    name?: string
  }

  const pug: {
    compileFile: (source: string, options?: Options) => (locals?: any) => string
  }
  export = pug
}
