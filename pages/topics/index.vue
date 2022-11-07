<script setup lang="ts">
import TopicCard from "~~/components/elements/TopicCard.vue";
const route = useRoute()
const { data: rows } = await useFetch('/api/topics', { key: route.fullPath })
</script>

<template>
  <div>
    <div v-if="rows">
      <div aria-label="group of cards" tabindex="0" class="py-8 w-full ">
        <div v-for="row in rows" class="lg:flex items-center justify-center w-full">
          <div v-for="topic in row" aria-label=""
            class="lg:w-4/12 lg:m-7 md:h-108  lg:mb-0 mb-7 dark:bg-gray-900 bg-white  
                p-6 shadow rounded  transition duration-500 hover:scale-110   dark:hover:shadow-xl hover:shadow-xl" :class="
                {
                  'hover:dark:shadow-green-400  hover:shadow-green-400': topic.accentColor == 'green',
                  'hover:dark:shadow-red-400  hover:shadow-red-400': topic.accentColor == 'red',
                  'hover:dark:shadow-indigo-400  hover:shadow-indigo-400': topic.accentColor == 'indigo',
                }">
            <TopicCard :topic="topic" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
