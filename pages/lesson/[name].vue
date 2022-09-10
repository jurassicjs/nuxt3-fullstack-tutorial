<script setup lang="ts">
import getParam from "~/composables/getParam";

const lessonName = getParam('name') as string

const route =  useRoute()



interface ILesson {
  title: string,
  name: string,
  link: string
  message: string,
  tags: ITag[]
}

interface ITag {
  title: string,
  link: string
}

const { data: lesson, error, pending } = await useFetch<ILesson>(
  `/api/lesson/${lessonName}`,
  {key: route.fullPath}
  )
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-400">
    <div class=" text-white font-bold rounded-lg bg-white dark:bg-slate-800 border shadow-lg p-10">
      {{ lesson.name }}
      <div class="flex-1 p-6 flex flex-col">
        <div>
          <div class='w-128 mb-2 ml-2 float-right 5xl:w-40'>
            <div class="aspect-w-16 aspect-h-9">
              <iframe width="560" height="315" :src="lesson.link" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class='inline'>
            <div>
              <a href="#" class="inline-block">
                <span
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-green-300 text-green-800">
                  Lesson
                </span>
              </a>
            </div>
            <a href="#" class="block">
              <h3 class="mt-4 text-xl leading-7 font-semibold text-gray-900 dark:text-white">
                {{ lesson.title }}
              </h3>

              <p class="mt-3 text-base leading-6 text-gray-500">
                {{ lesson.message }}
              </p>
            </a>
          </div>
        </div>

        <div class="mt-3 flex items-center space-x-3">
          <nuxt-link :to="tag.link" v-for="tag in lesson.tags" href='#'
            class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs leading-4 font-medium bg-gray-100 rounded-full">
            {{ tag.link }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>


</template>
