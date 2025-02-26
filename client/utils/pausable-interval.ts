/**
 * PausableInterval - A class that implements a pausable setTimeout/setInterval functionality
 * This allows for pausing and resuming timed operations
 */
export class PausableInterval {
  private callback: () => void
  private interval: number
  private isRunning: boolean
  private timeoutId: number | null
  private remaining: number
  private startTime: number | null

  /**
   * Creates a new PausableInterval instance
   * @param callback The function to call on each interval
   * @param interval The interval duration in milliseconds
   */
  constructor(callback: () => void, interval: number) {
    this.callback = callback
    this.interval = interval
    this.isRunning = false
    this.timeoutId = null
    this.remaining = interval
    this.startTime = null
  }

  /**
   * Start the interval timer
   */
  public start(): void {
    if (this.isRunning) {
      return
    }

    this.isRunning = true
    this.startTime = Date.now()
    this.timeoutId = window.setTimeout(() => {
      this.callback()
      this.remaining = this.interval

      // If still running, schedule the next iteration
      if (this.isRunning) {
        this.start()
      }
    }, this.remaining)
  }

  /**
   * Pause the interval timer
   */
  public pause(): void {
    if (!this.isRunning || this.timeoutId === null || this.startTime === null) {
      return
    }

    this.isRunning = false
    window.clearTimeout(this.timeoutId)

    // Calculate the remaining time
    this.remaining -= Date.now() - this.startTime

    // Ensure remaining time doesn't go below zero
    if (this.remaining < 0) {
      this.remaining = 0
    }
  }

  /**
   * Resume the interval timer
   */
  public resume(): void {
    this.start()
  }

  /**
   * Stop and reset the interval timer
   */
  public stop(): void {
    this.isRunning = false
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    this.remaining = this.interval
  }

  /**
   * Check if the interval is currently running
   * @returns True if the interval is running, false otherwise
   */
  public isActive(): boolean {
    return this.isRunning
  }

  /**
   * Change the interval duration
   * @param newInterval The new interval duration in milliseconds
   */
  public setInterval(newInterval: number): void {
    const wasRunning = this.isRunning

    if (wasRunning) {
      this.pause()
    }

    this.interval = newInterval
    this.remaining = newInterval

    if (wasRunning) {
      this.resume()
    }
  }
}
