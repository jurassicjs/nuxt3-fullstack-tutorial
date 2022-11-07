<script setup lang="ts">
import SiteMapGrid from "~~/components/elements/SiteMapGrid.vue";
const show = ref(true)
</script>

<template>

  <div class="">
    <div
      class="py-12 theme-mode dark:bg-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center ">
          <img class="w-auto" src="/img/dude-type.png" alt="dude image">
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight md:text-7xl dark:text-white">
            Full Stack <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-green-500 hover:to-teal-400">Step by
              Step</span>
          </p>
         
        </div>
      </div>
      <div class="flex justify-center my-20">
        <!-- <button @click="show = !show">Toggle Slide + Fade</button> -->
      </div>

    </div>
    <div class="flex justify-center">
      <site-map-grid />
    </div>
  </div>
</template>