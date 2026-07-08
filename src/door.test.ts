import { describe, expect, it } from 'vitest'
import { Door } from './door'

describe('Door', () => {
  it('is closed when built', () => {
    const door = new Door()

    expect(door.isOpen()).toBe(false)
  })

  it('opens', () => {
    const door = new Door()

    door.open()

    expect(door.isOpen()).toBe(true)
  })

  it('closes', () => {
    const door = new Door()
    door.open()

    door.close()

    expect(door.isOpen()).toBe(false)
  })

  it('stays open when opened again', () => {
    const door = new Door()
    door.open()

    door.open()

    expect(door.isOpen()).toBe(true)
  })
})
