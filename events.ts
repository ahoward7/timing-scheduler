import type { ValentinesEvent } from './interfaces'

const parseRelativeTime = (offsetMinutes: number): Date => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + offsetMinutes)
  return date
}

const eventOffsets = [
  { id: 1, duration: 14, title: 'Fill Waters' },
  { id: 2, duration: 14, title: 'Serve Appetizer' },
  { id: 3, duration: 9, title: 'Clear Appetizer, Fill Waters' },
  { id: 4, duration: 14, title: 'Serve Entree, Start Live Music' },
  { id: 5, duration: 9, title: 'Fill Waters' },
  { id: 6, duration: 9, title: 'Clear Plates, Head Servers - Desserts and Drinks' },
  { id: 7, duration: 49, title: 'Dessert & Drinks Ready' },
  { id: 8, duration: 120, title: 'Clear Dessert Plates, Start Cleaning' },
]

let currentTimeOffset = 0
const events: ValentinesEvent[] = eventOffsets.map(({ id, duration, title }) => {
  const start = parseRelativeTime(currentTimeOffset)
  currentTimeOffset += duration
  const end = parseRelativeTime(currentTimeOffset)
  currentTimeOffset += 1
  
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