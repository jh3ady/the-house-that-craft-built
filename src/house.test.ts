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
})
