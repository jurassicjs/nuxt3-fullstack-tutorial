<script setup lang="ts">
import TopicCard from "~~/components/elements/TopicCard.vue";
const route = useRoute()
const {data: rows} = await useFetch('/api/topics', {key: route.fullPath})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-400 ">
    <div v-if="rows">
      <div aria-label="group of cards" tabindex="0" class="focus:outline-none py-8 w-full " >
        <div v-for="row in rows" class="lg:flex items-center justify-center w-full" >
          <div v-for="topic in row"
               aria-label="card 1"
               class="focus:outline-none lg:w-4/12 lg:m-7 lg:mb-0 mb-7 dark:bg-gray-800 bg-white  p-6 shadow rounded  transition duration-500 hover:scale-110">
            <TopicCard :topic="topic"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
