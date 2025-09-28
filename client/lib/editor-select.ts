const LOCAL_STORAGE_KEY = 'in2editor'

const EDITOR_CLASSES = {
  phpstorm: 'editor-phpstorm',
  vscode: 'editor-vscode',
} as const

export default (editorSelectForm: HTMLFormElement) => {
  function getEditorFromLocalStorage(): keyof typeof EDITOR_CLASSES {
    const editor = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!editor) {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'normal')
    }

    return editor as keyof typeof EDITOR_CLASSES
  }

  function handleEditorSwitch(isInitialSetup = false) {
    let currentEditor = getEditorFromLocalStorage()
    if (!currentEditor) {
      currentEditor = 'phpstorm'
      localStorage.setItem(LOCAL_STORAGE_KEY, currentEditor)
    }

    const themeClass = EDITOR_CLASSES[currentEditor]

    Object.values(EDITOR_CLASSES).forEach(editor => document.body.classList.remove(editor))
    document.body.classList.add(themeClass)

    if (isInitialSetup) {
      const activeInput = editorSelectForm.querySelector<HTMLInputElement>(`input[value="${currentEditor}"]`)
      if (activeInput)
        activeInput.checked = true
    }
  }

  handleEditorSwitch(true)

  editorSelectForm.addEventListener('change', () => {
    const selectedThemeInput = editorSelectForm.querySelector<HTMLInputElement>('input[name="editor"]:checked')
    if (!selectedThemeInput)
      throw new Error('No checked editor theme found')

    const editor = selectedThemeInput.value
    localStorage.setItem(LOCAL_STORAGE_KEY, editor)

    handleEditorSwitch(false)
  })
}
