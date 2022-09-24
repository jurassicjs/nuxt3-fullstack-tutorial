<script setup lang="ts">
import { Series, Video } from ".prisma/client";
import getParam from "~/composables/getParam";
import BaseCard from "~~/components/elements/BaseCard.vue";


const route = useRoute()

type topicData = {
  series: Series[]
  videos: Video[]
}

const topicName = getParam('name') as string
const { data, pending } = await useFetch<topicData>(`/api/topic/${topicName}`, { key: route.fullPath })

const getAccentColor = (video: any) => video.accentColor ? 'shadow-xl shadow-' + video.accentColor + '-400' : 'shadow-xl shadow-' + 'green' + '-400'


</script>

<template>
  <div class="dark:bg-slate-800 min-h-screen" v-if="!pending && data">
    <!-- <div>
  
      <div class="lg:flex items-center justify-center w-full">
        <div class="px-3 md:lg:xl:px-40 py-20 bg-opacity-10 rounded-bl-lg">
          <div class="grid grid-cols-1 md:lg:xl:grid-cols-3 rounded-bl-lg "
          
          >
            <BaseCard v-for="series in data.series" :accentColor="series.accentColor" :text="series.name" :url="series.url" :showName="true"
          
            :class="getAccentColor(series)"
              :imagePath="series.image" label="series"></BaseCard>
          </div>
        </div>
      </div>
    </div> -->
    <div>



      <section class="overflow-hidden text-gray-700 p-0">
        <div class="container px-0 py-2 mx-auto lg:pt-12 lg:px-32">
          <div class="flex flex-wrap -m-1 md:-m-2">
            <div v-for="video in data.videos" class="flex flex-wrap w-full lg:w-1/3">
              <div class="w-full p-1 md:p-2">
              
                <iframe :src="'https://www.youtube.com/embed/'+video?.host_id"
                  class="block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0"
                  :class="'shadow-xl shadow-' + video.accentColor + '-400'"
                  frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

                  {{  video.accentColor}}
                <!-- <div class=" dark:text-white h-20 mb-3">
                  <span class="mt-3 p-5 font-bold">{{video.title}}</span>
                </div> -->

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.item:nth-child(3n) {
  page-break-after: always;
  /* CSS 2.1 syntax */
  break-after: always;
  /* CSS 3 syntax */
}
</style>