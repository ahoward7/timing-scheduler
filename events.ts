import type { ValentinesEvent } from './interfaces'

const parseTime = (time: string | null): Date | null => {
  if (!time) return null
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours < 12 ? hours + 12 : hours, minutes, 0, 0) // Convert to PM
  return date
}

const events: ValentinesEvent[] = [
  {
    id: 1,
    start: parseTime('5:55'),
    end: parseTime('6:09'),
    title: 'Fill Waters',
    active: false,
    finished: false
  },
  {
    id: 2,
    start: parseTime('6:10'),
    end: parseTime('6:24'),
    title: 'Appetizer',
    active: false,
    finished: false
  },
  {
    id: 3,
    start: parseTime('6:25'),
    end: parseTime('6:34'),
    title: 'Clear Bowls, Fill Waters',
    active: false,
    finished: false
  },
  {
    id: 4,
    start: parseTime('6:35'),
    end: parseTime('6:49'),
    title: 'Serve Entree, Start Live Music',
    active: false,
    finished: false
  },
  {
    id: 5,
    start: parseTime('6:50'),
    end: parseTime('6:59'),
    title: 'Fill Waters',
    active: false,
    finished: false
  },
  {
    id: 6,
    start: parseTime('7:00'),
    end: parseTime('7:09'),
    title: 'Clear Plates, Set Desserts & Drinks',
    active: false,
    finished: false
  },
  {
    id: 7,
    start: parseTime('7:10'),
    end: parseTime('7:59'),
    title: 'Dessert & Drinks Ready',
    active: false,
    finished: false
  },
  {
    id: 8,
    start: parseTime('8:00'),
    end: parseTime('10:00'),
    title: 'Clear Dessert Plates, Start Cleaning',
    active: false,
    finished: false
  },
]

export default events