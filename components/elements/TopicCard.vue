<script setup lang="ts">
import { Topic } from ".prisma/client";
import { defineProps, PropType } from "@vue/runtime-core";

defineProps({
  topic: Object as PropType<Topic>
})

</script>

<template>
  <nuxt-link :to="topic.url">
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700  pb-12 mr-5">
      <img class="h-16" :src="topic.image" alt="nuxt 3 logo">
      <div class="flex items-start justify-between w-full">
        <div class="pl-3 w-full">
          <div tabindex="0" class="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white ">
            <div v-if="topic.showName" class="mt-5 ">
              {{topic.displayName}}
            </div>
          </div>
          <p tabindex="0" class="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-200 ">
            <!--              {{category.lessonQuantity}}-->
          </p>
        </div>
        <div role="img" aria-label="bookmark">
          
        </div>
      </div>
    </div>
    <div class="px-2">
      <p tabindex="0" class="focus:outline-none text-sm leading-5 py-4 dark:text-white">
      
      </p>
      <div tabindex="0" class="focus:outline-none flex">
      </div>
    </div>
  </nuxt-link>
</template>
