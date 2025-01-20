<script setup lang="ts">
const currentTime = ref(new Date().toLocaleTimeString())

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
  }, 1000)
})
</script>

<template>
  <div class="flex flex-col w-full h-full border border-white rounded-md">
    <div class="grow">
      Body
    </div>
    <div class="relative h-20 flex justify-center items-center gap-4 bg-slate-800 border-white">
      <div
        class="w-10 h-10 flex justify-center items-center text-3xl bg-white text-slate-900 rounded-md cursor-pointer">
        -
      </div>
      <div
        class="w-10 h-10 flex justify-center items-center text-3xl bg-white text-slate-900 rounded-md cursor-pointer">
        +
      </div>
      <div class="absolute right-4 flex justify-center items-center text-3xl font-bold px-4">
        {{ currentTime }}
      </div>
    </div>
  </div>
</template>