<script setup lang="ts">
import SiteMapGrid from "~~/components/elements/SiteMapGrid.vue";

</script>

<template>

  <div class=""  >
    <!--    <Navbar/>-->
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="py-12 theme-mode bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <img class="w-auto" src="/img/dude-type.png" alt="dude image">
          <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Full Stack Jack</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl dark:text-white">
            Learn Full Stack Web Development By Example
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"><a href="https://github.com/jurassicjs">Thanks for
            checking out this Jurassic Js Project</a></p>
        </div>
        <site-map-grid/>
      </div>
    </div>

  </div>
</template>
