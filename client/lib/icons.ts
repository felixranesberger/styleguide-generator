export default (input: HTMLInputElement, list: HTMLUListElement, inputReset: HTMLButtonElement) => {
  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase()
    const items = list.querySelectorAll('li')

    items.forEach((item) => {
      const text = item.textContent?.trim().toLowerCase()
      item.classList.toggle('hidden', !text?.includes(filter))
    })

    inputReset.classList.toggle('hidden', filter.length === 0)
  })

  inputReset.addEventListener('click', () => {
    input.value = ''
    input.dispatchEvent(new Event('input'))
    input.focus()
  })

  const listItems = list.querySelectorAll<HTMLLIElement>('.icon-search-list__item')
  listItems.forEach((item) => {
    const copyButton = item.querySelector<HTMLButtonElement>('.icon-search-list__item-copy')
    if (!copyButton)
      throw new Error('No copy button found')

    const icon = item.querySelector<SVGElement>('svg:not(.icon-search-list__item-copy-icon), i')
    if (!icon)
      throw new Error('No icon found')

    const iconContent = icon.outerHTML
    // replace new lines
      .replace(/\n/g, '')
    // replace multiple spaces
      .replace(/\s{2,}/g, ' ')
      .trim()

    const copyIcon = item.querySelector<SVGElement>('.icon-search-list__item-copy-icon')
    if (!copyIcon)
      throw new Error('No copy icon found')

    copyButton.addEventListener('click', () => {
      icon.classList.add('opacity-0', 'scale-75', 'transition', 'duration-500', 'ease-in-out')
      copyIcon.classList.add('icon-search-list__item-copy-icon--active')
      setTimeout(() => {
        copyIcon.classList.remove('icon-search-list__item-copy-icon--active')
        setTimeout(() => icon.classList.remove('opacity-0', 'scale-75'), 350)
      }, 1000)

      navigator.clipboard.writeText(iconContent).catch(console.error)
    })
  })
}
