<script setup lang="ts">
import { defineProps, PropType } from "@vue/runtime-core";
import { ICategory } from "~/types/ICategory";

defineProps({
  category: Object as PropType<ICategory>
})

</script>

<template>
  <nuxt-link v-if="category" :to="category.link">
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700  pb-12 mr-5">
      <img class="h-16" :src="category.image" alt="nuxt 3 logo">
      <div class="flex items-start justify-between w-full">
        <div class="pl-3 w-full">
          <div tabindex="0" class="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white ">
            <div class="mt-5 ">
              {{category.title}}
            </div>
          </div>
          <p tabindex="0" class="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-200 ">
            <!--              {{category.lessonQuantity}}-->
          </p>
        </div>
        <div role="img" aria-label="bookmark">
          <svg class="focus:outline-none dark:text-white text-gray-800" width="28" height="28" viewBox="0 0 28 28"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z"
              stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>
    <div class="px-2">
      <p tabindex="0" class="focus:outline-none text-sm leading-5 py-4 dark:text-white">
        {{category.message}}
      </p>
      <div tabindex="0" class="focus:outline-none flex">
        <nuxt-link :to="tag.link" v-for="tag in category.tags"
          class="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
          #{{ tag.title }}
        </nuxt-link>
      </div>
    </div>
  </nuxt-link>
</template>
