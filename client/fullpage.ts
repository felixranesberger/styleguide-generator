interface ModifierReplacerConfig {
  modifier: string
  placeholder?: string
}

class ModifierReplacer {
  private readonly modifier: string
  private readonly placeholder: string

  constructor(config: ModifierReplacerConfig) {
    this.modifier = config.modifier
    this.placeholder = config.placeholder || '{{modifier_class}}'
  }

  public initialize(targetDocument: Document = document): void {
    if (!this.modifier) {
      return
    }
    this.replaceInDocument(targetDocument)
  }

  public static fromIframe(targetDocument: Document = document): ModifierReplacer | null {
    if (!window.frameElement)
      throw new Error('ModifierReplacer can only be initialized from an iframe context.')

    const modifier = window.frameElement.getAttribute('data-modifier')

    if (!modifier) {
      return null
    }

    const computedModifier = modifier.split('.').filter(x => x.length > 0).join(' ')
    const replacer = new ModifierReplacer({ modifier: computedModifier })
    replacer.initialize(targetDocument)
    return replacer
  }

  public static fromUrl(targetDocument: Document = document): ModifierReplacer | null {
    const params = new URLSearchParams(window.location.search)
    const modifier = params.get('modifier')

    if (!modifier) {
      return null
    }

    const computedModifier = modifier.split('.').filter(x => x.length > 0).join(' ')
    const replacer = new ModifierReplacer({ modifier: computedModifier })
    replacer.initialize(targetDocument)
    return replacer
  }

  private replaceAll(text: string): string {
    // Handle the regular placeholder
    const encodedPlaceholder = encodeURIComponent(JSON.stringify(this.placeholder))

    // Handle the specific encoded case
    const jsonObject = JSON.stringify({ modifierClass: this.placeholder })
    const encodedJsonObject = encodeURIComponent(jsonObject)

    return text
      .replace(new RegExp(this.escapeRegExp(this.placeholder), 'g'), this.modifier)
      .replace(new RegExp(this.escapeRegExp(encodedPlaceholder), 'g'), this.modifier)
      .replace(new RegExp(this.escapeRegExp(encodedJsonObject), 'g'), this.modifier)
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  private replaceInDocument(targetDocument: Document): void {
    const walker = targetDocument.createTreeWalker(
      targetDocument.body,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (): number => NodeFilter.FILTER_ACCEPT,
      },
    )

    while (walker.nextNode()) {
      const node = walker.currentNode
      if (node.nodeType === Node.TEXT_NODE) {
        this.replaceInTextNode(node as Text)
      }
      else if (node.nodeType === Node.ELEMENT_NODE) {
        this.replaceInElementAttributes(node as Element)
      }
    }
  }

  private replaceInTextNode(node: Text): void {
    if (node.textContent) {
      const originalText = node.textContent
      const newText = this.replaceAll(originalText)
      if (originalText !== newText) {
        node.textContent = newText
      }
    }
  }

  private replaceInElementAttributes(element: Element): void {
    Array.from(element.attributes).forEach((attr) => {
      const originalValue = attr.value
      const newValue = this.replaceAll(originalValue)
      if (originalValue !== newValue) {
        attr.value = newValue
      }
    })
  }
}

// add styleguide preview class when in iframe preview mode
if (window.frameElement) {
  if (window.frameElement.getAttribute('data-preview') === 'true') {
    document.documentElement.classList.add('styleguide-preview')
  }

  if (window.frameElement.hasAttribute('data-modifier')) {
    ModifierReplacer.fromIframe()
  }
}
else {
  const params = new URLSearchParams(window.location.search)
  const modifier = params.get('modifier')
  if (modifier) {
    ModifierReplacer.fromUrl()
  }
}
