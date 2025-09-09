/**
 * Waits until the network is idle (no network requests for a certain period).
 * @param idleNetworkTimeout - The duration (in milliseconds) to consider the network idle after the last request.
 */
export function waitForIdleNetwork(idleNetworkTimeout = 500) {
  function isNetworkQuiet() {
    const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const recentEntries = entries.filter(entry =>
      (performance.now() - entry.responseEnd) < idleNetworkTimeout,
    )
    return recentEntries.length === 0
  }

  return new Promise<void>((resolve) => {
    const checkNetwork = () => {
      if (isNetworkQuiet()) {
        resolve()
      }
      else {
        setTimeout(checkNetwork, 250)
      }
    }

    checkNetwork()
  })
}
