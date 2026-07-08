export class Door {
  private opened = false

  open() {
    this.opened = true
  }

  isOpen() {
    return this.opened
  }
}
