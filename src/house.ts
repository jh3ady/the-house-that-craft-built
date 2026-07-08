import { Door } from './door'

export class House {
  private readonly door = new Door()

  openDoor() {
    this.door.open()
  }

  isDoorOpen() {
    return this.door.isOpen()
  }
}
