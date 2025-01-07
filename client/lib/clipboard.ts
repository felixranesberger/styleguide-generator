export default (buttons: NodeListOf<HTMLButtonElement>, attribute: string) => {
  buttons.forEach((button) => {
    const value = button.getAttribute(attribute)
    if (!value)
      return

    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(value).catch(console.error)

      const buttonText = button.textContent
      button.style.width = `${button.offsetWidth <= 80 ? 80 : button.offsetWidth}px`
      button.textContent = 'Copied!'

      setTimeout(() => {
        button.style.width = ''
        button.textContent = buttonText
      }, 1500)
    })
  })
}
