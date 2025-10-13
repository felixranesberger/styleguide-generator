import initPreviewIframes, { removeDocumentLoadingClass } from './lib/iframe.ts'
import './lib/theme-select'

const previewIframes = Array.from(document.querySelectorAll<HTMLIFrameElement>('.preview-iframe'))
if (previewIframes.length > 0) {
  initPreviewIframes(previewIframes).catch(console.error)
}
else {
  removeDocumentLoadingClass()
}
