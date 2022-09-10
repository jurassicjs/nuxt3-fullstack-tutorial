<script setup lang="ts">
import SiteMapGrid from "~~/components/elements/SiteMapGrid.vue";

</script>

<template>

  <div class="">
    <div
      class="py-12 theme-mode bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center ">
          <img class="w-auto" src="/img/dude-type.png" alt="dude image">
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight md:text-7xl dark:text-white">
            Full Stack <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400">Step by
              Step</span>
          </p>
          
        </div>
      </div>

    </div>
    <div class="flex justify-center">
      <site-map-grid />
    </div>


  </div>
</template>
