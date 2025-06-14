import { animate, spring } from 'motion'

export default function tabs(tabs: NodeListOf<HTMLElement>) {
  tabs.forEach((tab) => {
    const tabTriggers = tab.querySelectorAll<HTMLElement>('[role="tab"]')
    const tabContent = Array.from(tab.querySelectorAll<HTMLElement>('[role="tabpanel"]'))
    const tabTriggerBackground = tab.querySelector<HTMLElement>('.tab-trigger-background')
    if (!tabTriggerBackground)
      throw new Error('No tab trigger background found')

    const calculateBackgroundPosition = (activeTrigger: HTMLElement, shouldAnimate: boolean) => {
      const width = activeTrigger.offsetWidth

      if (shouldAnimate) {
        const isFirstElement = activeTrigger === tabTriggers[0]
        const offset = isFirstElement
          ? activeTrigger.offsetLeft
          : activeTrigger.offsetLeft + 1

        animate(tabTriggerBackground, {
          width,
          x: `${offset}px`,
        }, {
          duration: 0.3,
          easing: 'ease-out',
          type: spring,
          bounce: 0.1,
        })
      }
      else {
        tabTriggerBackground.style.width = `${width}px`
        tabTriggerBackground.style.transform = `translateX(2px)`
      }
    }

    const initialActiveTrigger = tabTriggers[0]
    calculateBackgroundPosition(initialActiveTrigger, false)

    tabTriggers.forEach(trigger => trigger.addEventListener('click', () => {
      tabTriggers.forEach((t) => {
        const isActive = t === trigger
        t.setAttribute('aria-selected', isActive.toString())
        const content = tabContent.find(c => c.getAttribute('aria-labelledby') === t.id)
        content?.setAttribute('tab-index', isActive ? '0' : '-1')
        content?.classList.toggle('hidden', !isActive)

        if (isActive) {
          calculateBackgroundPosition(trigger, true)
        }
      })
    }))

    // preload iframes on tab hover
    const isMobileView = window.innerWidth < 768
    if (!isMobileView) {
      tabTriggers.forEach((trigger) => {
        const content = tabContent.find(c => c.getAttribute('aria-labelledby') === trigger.id)
        if (!content)
          throw new Error(`No content found for trigger ${trigger.id}`)

        const iframe = content.querySelector<HTMLIFrameElement>('iframe')
        if (!iframe || iframe.loading !== 'lazy')
          return

        trigger.addEventListener('mouseenter', () => {
          iframe.loading = 'eager'
        })

        // lazy load everything when browser is not busy and after 5s
        setTimeout(() => {
          requestIdleCallback(() => {
            if (iframe.loading === 'lazy') {
              iframe.loading = 'eager'
            }
          })
        }, 5000)
      })
    }
  })
}
