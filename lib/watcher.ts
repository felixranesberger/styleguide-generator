import { readFileSync } from 'node:fs'
import chokidar from 'chokidar'

/**
 * Type definition for the file watcher callback function
 */
type WatchCallback = () => void

let isChokidarReady = false

/**
 * Watches for changes in file contents that match a specific regex pattern
 * @param path - File path or glob pattern to watch
 * @param regex - Regular expression to match file contents
 * @param callback - Function to call when matching content changes
 */
function watchForFileContentChanges(path: string | string[], regex: RegExp, callback: WatchCallback): void {
  if (typeof callback !== 'function') {
    throw new TypeError('styleguide watch requires a callback function')
  }

  // Store file contents matches in a Map
  const regexFileContents = new Map<string, RegExpMatchArray | null>()

  /**
   * Register initial file content matches
   * @param filePath - Path to the file being processed
   */
  const registerFileContentMatches = (filePath: string): void => {
    const currentFileContent = readFileSync(filePath, 'utf8')
    const currentFileMatches = currentFileContent.match(regex)

    if (currentFileMatches === null) {
      return
    }

    regexFileContents.set(filePath, currentFileMatches)

    // only execute styleguide rebuild if chokidar is ready
    // because we don't want to rebuild the styleguide on initial setup
    // everytime a file is added
    if (isChokidarReady) {
      callback()
    }
  }

  /**
   * Handle changes in file content
   * @param filePath - Path to the changed file
   */
  const handleContentChanges = (filePath: string): void => {
    const previousFileMatches = regexFileContents.get(filePath)
    const hasFileBeenReadBefore = previousFileMatches !== undefined

    const currentFileContent = readFileSync(filePath, 'utf8')
    const currentFileMatches = currentFileContent.match(regex)

    if (!hasFileBeenReadBefore) {
      regexFileContents.set(filePath, currentFileMatches)
      if (currentFileMatches === null) {
        return
      }
      callback()
      return
    }

    const haveFileMatchesChanged = JSON.stringify(previousFileMatches) !== JSON.stringify(currentFileMatches)
    if (!haveFileMatchesChanged) {
      return
    }

    regexFileContents.set(filePath, currentFileMatches)
    callback()
  }

  /**
   * Handle file removal
   * @param filePath - Path to the removed file
   */
  const handleFileRemoval = (filePath: string): void => {
    regexFileContents.delete(filePath)
    callback()
  }

  // Set up file watcher
  const validFileTypes = ['.css', '.scss', '.sass', '.less']
  chokidar.watch(path, {
    // @ts-expect-error - chokidar types seem to be incomplete, ignore
    ignored: (path, stats) => {
      return stats?.isFile() && !validFileTypes.some(type => path.endsWith(type))
    },
  })
    .on('add', registerFileContentMatches)
    .on('change', handleContentChanges)
    .on('unlink', handleFileRemoval)
    .on('ready', () => isChokidarReady = true)
}

/**
 * Watch for changes in KSS section comment blocks
 * @param path - File path or glob pattern to watch
 * @param callback - Function to call when KSS sections change
 */
export function watchStyleguideForChanges(path: string | string[], callback: WatchCallback): void {
  // Matches the KSS section comment block
  // (file must start with "/*", "/**" and end with "*/", "**/" and contain "Styleguide"
  const kssSectionRegex = /\/\*{1,2}[\s\S]*?Styleguide[\s\S]*?\*\//g

  watchForFileContentChanges(
    path,
    kssSectionRegex,
    callback,
  )
}
