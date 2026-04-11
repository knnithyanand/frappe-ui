/**
 * @vitest-environment node
 */

import { getWeekDateRange } from './calendarUtils'

describe('getWeekDateRange', () => {
  it('returns the earliest and latest date from a week', () => {
    const range = getWeekDateRange([
      new Date('2026-04-11T00:00:00'),
      new Date('2026-04-05T00:00:00'),
      new Date('2026-04-08T00:00:00'),
    ])

    expect(range).toEqual({
      start: new Date('2026-04-05T00:00:00'),
      end: new Date('2026-04-11T00:00:00'),
    })
  })

  it('returns null for an empty week', () => {
    expect(getWeekDateRange([])).toBe(null)
  })
})
