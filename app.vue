s<template>
  <div class="w-screen h-screen text-white bg-slate-900 p-8">
    <div class="diner absolute top-0 left-0 bottom-0 right-0 bg-cover bg-center" />
    <NuxtPage />
  </div>
</template>

<style>
.diner {
  background-image: url('~/assets/images/french-diner.png');
  background-size: cover;
  background-position: center;
  filter: blur(2px);
}

@font-face {
  font-family: 'Fancy';
  src: url('assets/fonts/Parisienne/Parisienne-Regular.ttf');
}
</style>
