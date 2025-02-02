import type { ValentinesEvent } from './interfaces'

const now = new Date()
const baseHours = now.getHours()
const baseMinutes = now.getMinutes()
const baseTime = new Date()
baseTime.setHours(baseHours, baseMinutes, 0, 0)

const timeOffsets = [
  0,   // 5:55 → Start time (adjusted to current time)
  14,  // 6:09 → 6:10 (14 min gap)
  15,  // 6:24 → 6:25 (15 min gap)
  10,  // 6:34 → 6:35 (10 min gap)
  14,  // 6:49 → 6:50 (14 min gap)
  9,   // 6:59 → 7:00 (9 min gap)
  10,  // 7:09 → 7:10 (10 min gap)
  49,  // 7:59 → 8:00 (49 min gap)
]

const durations = [
  14,  // 5:55 - 6:09 (14 min)
  14,  // 6:10 - 6:24 (14 min)
  9,   // 6:25 - 6:34 (9 min)
  14,  // 6:35 - 6:49 (14 min)
  9,   // 6:50 - 6:59 (9 min)
  9,   // 7:00 - 7:09 (9 min)
  49,  // 7:10 - 7:59 (49 min)
  120, // 8:00 - 10:00 (120 min)
]

const generateTimes = () => {
  let startTime = new Date(baseTime)
  return timeOffsets.map((offset, index) => {
    startTime.setMinutes(startTime.getMinutes() + offset)
    const start = new Date(startTime)
    startTime.setMinutes(startTime.getMinutes() + durations[index])
    const end = new Date(startTime)
    return { start, end }
  })
}

const eventTimes = generateTimes()

const events: ValentinesEvent[] = [
  { id: 1, title: 'Fill Waters' },
  { id: 2, title: 'Appetizer' },
  { id: 3, title: 'Clear Bowls, Fill Waters' },
  { id: 4, title: 'Serve Entree, Start Live Music' },
  { id: 5, title: 'Fill Waters' },
  { id: 6, title: 'Clear Plates, Set Desserts & Drinks' },
  { id: 7, title: 'Dessert & Drinks Ready' },
  { id: 8, title: 'Clear Dessert Plates, Start Cleaning' },
].map((event, index) => ({
  ...event,
  start: eventTimes[index].start,
  end: eventTimes[index].end,
  active: false,
  finished: false
}))

export default events