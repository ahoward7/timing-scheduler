import type { ValentinesEvent } from './interfaces'

const parseRelativeTime = (offsetMinutes: number): Date => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + offsetMinutes)
  return date
}

const eventOffsets = [
  { id: 1, duration: 15, title: 'Fill Waters' },
  { id: 2, duration: 15, title: 'Appetizer' },
  { id: 3, duration: 10, title: 'Clear Bowls, Fill Waters' },
  { id: 4, duration: 15, title: 'Serve Entree, Start Live Music' },
  { id: 5, duration: 10, title: 'Fill Waters' },
  { id: 6, duration: 10, title: 'Clear Plates, Set Desserts & Drinks' },
  { id: 7, duration: 50, title: 'Dessert & Drinks Ready' },
  { id: 8, duration: 120, title: 'Clear Dessert Plates, Start Cleaning' },
]

let currentTimeOffset = 0
const events: ValentinesEvent[] = eventOffsets.map(({ id, duration, title }) => {
  const start = parseRelativeTime(currentTimeOffset)
  currentTimeOffset += duration
  const end = parseRelativeTime(currentTimeOffset)
  
  return {
    id,
    start,
    end,
    title,
    active: false,
    finished: false
  }
})

export default events