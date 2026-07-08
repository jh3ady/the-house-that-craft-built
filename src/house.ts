import { Door } from './door'

export class House {
  private readonly door = new Door()

  isDoorOpen() {
    return this.door.isOpen()
  }
}
