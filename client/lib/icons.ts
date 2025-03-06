import { animate, spring } from 'motion'

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

    copyButton.addEventListener('click', async () => {
      await navigator.clipboard.writeText(iconContent).catch(console.error)

      animate(icon, { scale: [1, 0.5], opacity: [1, 0] }, { duration: 0.3 })

      animate(
        copyIcon,
        { scale: [0, 1], opacity: [0, 1] },
        { duration: 0.5, delay: 0.2, type: spring, bounce: 0.4 },
      )

      await new Promise(resolve => setTimeout(resolve, 800))

      animate(copyIcon, { scale: [1, 0.5], opacity: [1, 0] }, { duration: 0.3 })

      animate(
        icon,
        { scale: [0, 1], opacity: [0, 1] },
        { duration: 1, delay: 0.1, type: spring, bounce: 0.2 },
      )
    })
  })
}
