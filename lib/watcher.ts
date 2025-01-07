import { readFileSync } from 'node:fs'
import chokidar from 'chokidar'

/**
 * Type definition for the file watcher callback function
 */
type WatchCallback = () => void

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
  }

  // Set up file watcher
  chokidar.watch(path)
    .on('add', registerFileContentMatches)
    .on('change', handleContentChanges)
    .on('unlink', handleFileRemoval)
}

/**
 * Watch for changes in KSS section comment blocks
 * @param path - File path or glob pattern to watch
 * @param callback - Function to call when KSS sections change
 */
export function watchStyleguideForChanges(path: string | string[], callback: WatchCallback): void {
  // Matches the KSS section comment block
  // (file must start with "/*", end with "*/" and contain "Styleguide"
  const kssSectionRegex = /\/\*[^*]*Styleguide.*?\*\//gs

  watchForFileContentChanges(
    path,
    kssSectionRegex,
    callback,
  )
}
