import { describe, expect, it } from 'vitest'
import { Door } from './door'

describe('Door', () => {
  it('is closed when built', () => {
    const door = new Door()

    expect(door.isOpen()).toBe(false)
  })
})
