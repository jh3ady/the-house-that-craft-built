import { describe, expect, it } from 'vitest'
import { House } from './house'

describe('House', () => {
  it('has a closed door when built', () => {
    const house = new House()

    expect(house.isDoorOpen()).toBe(false)
  })

  it('opens its door', () => {
    const house = new House()

    house.openDoor()

    expect(house.isDoorOpen()).toBe(true)
  })

  it('closes its door', () => {
    const house = new House()
    house.openDoor()

    house.closeDoor()

    expect(house.isDoorOpen()).toBe(false)
  })

  it('keeps its door open when opened again', () => {
    const house = new House()
    house.openDoor()

    house.openDoor()

    expect(house.isDoorOpen()).toBe(true)
  })

  it('keeps its door closed when closed again', () => {
    const house = new House()
    house.closeDoor()

    house.closeDoor()

    expect(house.isDoorOpen()).toBe(false)
  })

  it('has an unlocked door when built', () => {
    const house = new House()

    expect(house.isDoorLocked()).toBe(false)
  })

  it('locks its door', () => {
    const house = new House()

    house.lockDoor()

    expect(house.isDoorLocked()).toBe(true)
  })
})
