export class Door {
  private opened = false

  open() {
    this.opened = true
  }

  close() {
    this.opened = false
  }

  isOpen() {
    return this.opened
  }
}
