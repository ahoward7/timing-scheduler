<script setup lang="ts">
import type { ValentinesEvent } from '~/interfaces'
import EVENTS from '~/events'

const events = ref(EVENTS)

const currentTime = ref(new Date().toLocaleTimeString())

watch([currentTime], ([newTime]: [string]) => {
  setActiveTime(newTime)
})

function setActiveTime(newTime: string) {
  events.value.forEach((event: ValentinesEvent) => {
    const start = event.start?.toLocaleTimeString() || 0
    let end = event.end?.toLocaleTimeString()

    if (end) {
      const endArr = end.split(':')
      endArr[2] = '59'
      end = endArr.join(':')
    }

    end = end ? end : '0'

    if (start <= newTime && end >= newTime) {
      event.active = true
    } else {
      event.active = false
    }
  })
}

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
  }, 1000)
})

const secondsToIncrement = ref(1)

function inc() {
  const increment = 1000 * secondsToIncrement.value * 60
  events.value.forEach((event: ValentinesEvent) => {
    if (event.start) event.start = new Date(event.start.getTime() + increment)
    if (event.end) event.end = new Date(event.end.getTime() + increment)
  })
  setActiveTime(currentTime.value)
}

function dec() {
  const decrement = 1000 * secondsToIncrement.value * 60
  events.value.forEach((event: ValentinesEvent) => {
    if (event.start) event.start = new Date(event.start.getTime() - decrement)
    if (event.end) event.end = new Date(event.end.getTime() - decrement)
  })
  setActiveTime(currentTime.value)
}

function formatTime(date: Date) {
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours % 12}:${minutes}`
}

function calculateProgress(start: Date, end: Date): number {
  if (!start || !end) return 0

  const startTime = start.getHours() * 3600000 + start.getMinutes() * 60000 + start.getSeconds() * 1000
  const endTime = end.getHours() * 3600000 + end.getMinutes() * 60000 + end.getSeconds() * 1000

  const now = new Date()
  const currentTime = (now.getHours() % 12) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000

  const totalDuration = endTime - startTime
  const elapsedTime = currentTime - startTime

  if (elapsedTime <= 0) return 0
  if (elapsedTime >= totalDuration) return 100

  return (elapsedTime / totalDuration) * 100
}

</script>

<template>
  <div class="flex flex-col gap-8 w-full h-full">
    <div class="grow flex flex-col justify-around bg-slate-800 py-4 px-8 rounded-md">
      <div v-for="event in events" :key="event.id" class="relative w-full text-4xl font-fancy flex p-4">
        <div 
          v-if="event.active" 
          class="absolute top-0 left-0 h-full bg-red-500 duration-1000 ease-linear rounded-md" 
          :style="{ width: calculateProgress(event.start, event.end) + '%' }"
        />
        <div class="relative z-1 flex">
          <div class="w-[96px]">
            {{ formatTime(event.start) }}
          </div>
          |
          <div class="grow ml-4">
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="relative h-28 flex justify-between items-center bg-slate-800 rounded-md px-8">
      <div class="flex gap-4">
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
        <input v-model="secondsToIncrement" type="text" class="w-40 bg-slate-900 text-white text-3xl pl-4 rounded-md" />
      </div>
      <div class="right-4 flex justify-center items-center text-6xl font-fancy px-4 select-none">
        {{ currentTime }}
      </div>
    </div>
  </div>
</template>