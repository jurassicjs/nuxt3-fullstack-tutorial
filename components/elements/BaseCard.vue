<script setup lang="ts">
import { defineProps } from "@vue/runtime-core";

defineProps({
  text: String,
  url: String,
  imagePath: String,
  showName: Boolean,
  accentColor: String,
  label: {
    required: false,
    type: String
  }
})

const getAccentColor = (accentColor: String | undefined) => accentColor ? 'shadow-xl shadow-' + accentColor + '-400' : 'shadow-xl shadow-' + 'indigo' + '-400'

</script>

<template>
  <NuxtLink :to="url">
    <div
      class="dark:bg-black  p-10 flex flex-col items-center text-center group  hover:bg-slate-50 cursor-pointer lg:rounded-lg"
      :class="getAccentColor(accentColor)">
      <span class="p-5  dark:text-white dark:bg-black"><img class="h-16" :src="imagePath" alt="nuxt 3 logo">
        {{label}}</span>
      <p class="text-xl font-medium text-slate-700 mt-6">{{text}}</p>
    </div>
  </NuxtLink>
</template>
