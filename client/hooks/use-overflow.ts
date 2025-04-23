import { signal } from '../lib/signal.ts'

/**
 * Reactive hook to detect horizontal overflow of an element.
 */
export function useElementHorizontalOverflow<T extends HTMLElement>(element: T) {
  const $isOverflowingVertically = signal(false)

  new ResizeObserver(() => {
    const newIsOverflowingStatus = element.scrollHeight > element.clientHeight
    if ($isOverflowingVertically.value === newIsOverflowingStatus)
      return

    $isOverflowingVertically.value = newIsOverflowingStatus
  }).observe(element)

  return { $isOverflowingVertically }
}
