import { Door } from './door'

export class House {
  private readonly door = new Door()

  openDoor() {
    this.door.open()
  }

  closeDoor() {
    this.door.close()
  }

  isDoorOpen() {
    return this.door.isOpen()
  }

  isDoorLocked() {
    return this.door.isLocked()
  }
}
