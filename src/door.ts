export class DoorIsLockedError extends Error {
  constructor() {
    super('A locked door cannot be opened.')
    this.name = 'DoorIsLockedError'
  }
}

export class Door {
  private opened = false
  private locked = false

  open() {
    if (this.locked) {
      throw new DoorIsLockedError()
    }

    this.opened = true
  }

  close() {
    this.opened = false
  }

  lock() {
    this.locked = true
  }

  unlock() {
    this.locked = false
  }

  isOpen() {
    return this.opened
  }

  isLocked() {
    return this.locked
  }
}
