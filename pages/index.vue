<script setup lang="ts">
import type { ValentinesEvent } from '~/interfaces'
import EVENTS from '~/events'

const events = ref(EVENTS)
const currentTime = ref(formatCurrentTime(new Date()))

watch([currentTime], ([newTime]: [string]) => {
  setActiveTime(newTime)
})

function setActiveTime(newTime: string) {
  let activeHit = false

  events.value.forEach((event: ValentinesEvent) => {
    const start = Number.parseInt((event.start ? formatTimeWithSeconds(event.start) : '0:0:0').replaceAll(':', ''))
    const end = Number.parseInt((event.end ? formatTimeWithSeconds(event.end, true) : '0:0:0').replaceAll(':', ''))
    const newTimeInt = Number.parseInt(newTime.replaceAll(':', ''))

    if (newTimeInt > end && !activeHit) {
      event.finished = true
    }
    else {
      event.finished = false
    }

    if (start <= newTimeInt && end >= newTimeInt) {
      event.active = true
      activeHit = true
    } else {
      event.active = false
    }
  })
}

onMounted(() => {
  setInterval(() => {
    currentTime.value = formatCurrentTime(new Date())
  }, 1000)
})

const secondsToIncrement = ref(1)

function inc() {
  const increment = secondsToIncrement.value * 60 * 1000
  events.value.forEach((event: ValentinesEvent) => {
    if (event.start) {
      event.start = adjustTime(event.start, increment)
    }
    if (event.end) {
      event.end = adjustTime(event.end, increment)
    }
  })
  setActiveTime(currentTime.value)
}

function dec() {
  const decrement = secondsToIncrement.value * 60 * 1000
  events.value.forEach((event: ValentinesEvent) => {
    if (event.start) {
      event.start = adjustTime(event.start, -decrement)
    }
    if (event.end) {
      event.end = adjustTime(event.end, -decrement)
    }
  })
  setActiveTime(currentTime.value)
}

function formatCurrentTime(date: Date): string {
  const hours = (date.getHours() % 12) || 12 // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

function formatTime(date: Date): string {
  const hours = (date.getHours() % 12) || 12 // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatTimeWithSeconds(date: Date, isEnd = false): string {
  const hours = (date.getHours() % 12) || 12
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = isEnd ? '59' : date.getSeconds().toString().padStart(2, '0')
  return `${hours === 12 ? 0 : hours}:${minutes}:${seconds}`
}

function adjustTime(date: Date, offset: number): Date {
  const adjustedDate = new Date(date.getTime() + offset)
  const hours = adjustedDate.getHours() % 12 || 12 // Stay in 12-hour format
  const minutes = adjustedDate.getMinutes()
  return new Date(2000, 0, 1, hours, minutes) // Date-agnostic
}

function calculateProgress(start: Date, end: Date): number {
  if (!start || !end) return 0

  const startTime = (start.getHours() % 12) * 3600000 + start.getMinutes() * 60000
  const endTime = (end.getHours() % 12) * 3600000 + end.getMinutes() * 60000

  const now = new Date()
  const currentTime = (now.getHours() % 12) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000

  const totalDuration = endTime - startTime
  const elapsedTime = currentTime - startTime

  if (elapsedTime <= 0) return 0
  if (elapsedTime >= totalDuration) return 100

  return (elapsedTime / totalDuration) * 100
}

function calculateTimeLeft(end: Date): string {
  const endTime = (end.getHours() % 12) * 3600000 + end.getMinutes() * 60000
  const now = new Date()
  const currentTime = (now.getHours() % 12) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000

  const timeLeft = endTime - currentTime + 60000

  const hours = Math.floor(timeLeft / 3600000)
  const minutes = Math.floor((timeLeft % 3600000) / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  const hoursStr = hours > 0 ? `${hours}:` : ''
  return `${hoursStr}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col gap-8 w-full h-full">    
      <div class="relative grow flex flex-col justify-around py-4 px-8">
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-black/60 rounded-md" />
        <div v-for="event in events" :key="event.id" class="relative w-full text-3xl flex p-2 duration-1000" :class="event.finished ? 'opacity-50' : 'opacity-100'">
          <div 
            v-if="event.active" 
            class="absolute top-0 left-0 h-full flex justify-end bg-orange-500/80 duration-1000 ease-linear rounded-md" 
            :style="{ width: calculateProgress(event.start || new Date(), event.end || new Date()) + '%' }"
          />
          <div v-if="event.active" class="absolute right-0">
            <span>Time Left: </span>
            <span class="font-fancy">{{ calculateTimeLeft(event.end || new Date()) }}</span>
          </div>
          <div class="relative z-1 flex items-center">
            <div class="absolute left-[-20px] border-t-2 border-white duration-1000" :class="event.finished ? 'right-[-20px] opacity-100' : 'right-full opacity-0'" />
            <div class="w-[80px] font-fancy">
              {{ formatTime(event.start || new Date()) }}
            </div>
            <span class="font-fancy">
              |
            </span>
            <div class="grow ml-4">
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="relative h-28 flex justify-between items-center px-8">
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-black/60 rounded-md" />
        <div class="relative z-10 flex gap-4">
          <ActionButton @click="dec">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
              <rect x="23" y="48" width="60" height="6" rx="5" ry="5" fill="white"/>
            </svg>
          </ActionButton>
          <ActionButton @click="inc">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
              <rect x="48" y="20" width="6" height="60" rx="5" ry="5" fill="white"/>
              <rect x="20" y="48" width="60" height="6" rx="5" ry="5" fill="white"/>
            </svg>
          </ActionButton>
          <input v-model="secondsToIncrement" type="number" class="w-[100px] bg-black/60 text-white text-3xl hover:bg-black/80  pl-4 rounded-md border-none outline-none ring-none duration-300 font-fancy" />
        </div>
        <div class="relative z-10 right-4 flex justify-center items-center gap-4 px-4 select-none">
          <span class="text-5xl">
            Current Time:
          </span>
          <span class="w-[240px] font-fancy text-6xl mt-2 flex justify-end">
            {{ currentTime }}
          </span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>