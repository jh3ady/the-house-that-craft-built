export class Door {
  private opened = false
  private locked = false

  open() {
    this.opened = true
  }

  close() {
    this.opened = false
  }

  lock() {
    this.locked = true
  }

  isOpen() {
    return this.opened
  }

  isLocked() {
    return this.locked
  }
}
