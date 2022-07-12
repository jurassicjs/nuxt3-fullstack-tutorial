<script setup lang="ts">
import getParam from "~/composables/getParam";

// definePageMeta({
//   layout: false,
// });

const route = useRoute()

const lessonName = ref(null)
const firstLoad = ref(true)

const seriesName = getParam('name') as string
const { data: categories, pending: categoriesPending } = await useFetch(`/api/series/${seriesName}`, { key: seriesName })

if (!categoriesPending.value) {
  console.log('dude',categories)
  lessonName.value = categories.value[0]?.name
}


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

const { data: lesson, pending } = await useFetch<ILesson>(
  `/api/lesson/${lessonName.value}`,
  { key: route.fullPath+lessonName.value, server: false }
)



async function setSelectedLesson(name: String) {
  lessonName.value = name

  const { data: selected, pending: selectFectchPending, refresh: refreshSelected } = await useFetch<ILesson>(
    `/api/lesson/${name}`,
    { key: route.fullPath+name, server: false }
  )

  refreshSelected()

  if(selectFectchPending){
    lesson.value = selected.value
  }
  
}

</script>

<template>

  <div class="flex dark:bg-slate-800">
    <aside class="h-screen sticky top-0">
      <!-- // Fixed Sidebar -->

      <div class="mt-20 hidden lg:block">
        <div v-for="category in categories" aria-label="card 1"
          class="focus:outline-none  border-b border-gray-300 dark:bg-slate-800 bg-white p-6 shadow rounded transition duration-500 hover:scale-110">
          <div @click="setSelectedLesson(category?.name)"
            class="flex items-center border-b border-gray-300 dark:border-gray-700  pb-2">
            <!-- <img class="h-16" :src="category.image" alt="nuxt 3 logo"> -->
            <div class="flex items-start justify-between w-full">
              <div class="w-full">
                <div tabindex="0"
                  class="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white ">
                  <div class=" ">
                    {{category.title}}
                  </div>
                </div>
                <p tabindex="0" class="focus:outline-none text-sm leading-normal text-gray-500 dark:text-gray-200 ">
                  <!--              {{category.lessonQuantity}}-->
                </p>
              </div>

            </div>
          </div>
          <div class="">
            <p tabindex="0" class="focus:outline-none text-sm leading-5 dark:text-white">
              {{category.message}}
            </p>

          </div>
        </div>
      </div>

    </aside>
    <div v-if="!pending" class="aspect-w-16 aspect-h-9 mt-20 lg:ml-10">
      <iframe :src="lesson?.link" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
<!-- 
    <main v-if="!pending" class="aspect-w-16 aspect-h-9 mt-40 bg-slate-800 sticky top-0">
      <iframe :src="lesson.link" title="YouTube video player"  width="auto" height="100%"  frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </main> -->
  </div>
</template>
