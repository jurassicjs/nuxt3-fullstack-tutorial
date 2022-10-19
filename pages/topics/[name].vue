<script setup lang="ts">
import {Series, Video} from ".prisma/client";
import getParam from "~/composables/getParam";



const route = useRoute()
const videoElements = ref([])

type topicData = {
  series: Series[]
  videos: Video[]
}

const topicName = getParam('name') as string
const {data, pending} = await useFetch<topicData>(`/api/topic/${topicName}`, {key: route.fullPath})

function createIframe(vidId, index) {

  const youtubePlaceholder = videoElements.value[index]
  const url = 'https://www.youtube.com/embed/' + vidId + '?autoplay=1'
  const htmlString = `<iframe class="mt-5 block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0" src="${url}" allowfullscreen allow="autoplay"></iframe>`

  youtubePlaceholder.style.display = 'none';
  youtubePlaceholder.insertAdjacentHTML('beforebegin', htmlString);
  youtubePlaceholder.parentNode.removeChild(youtubePlaceholder);
}

</script>

<template>
  <div class="dark:bg-slate-800 min-h-screen" v-if="!pending && data">
    <div>
      <section class="overflow-hidden text-gray-700 p-0">
        <div class="container px-0 py-2 mx-auto lg:pt-12 lg:px-32">
          <div class="flex flex-wrap -m-1 md:-m-2">
            <div class="mt-5" @click="createIframe(video?.host_id, i)" :ref="(el) => videoElements[i] = el"
                 v-for="(video, i) in data.videos">
              <div class="video__youtube" :id="video?.host_id">
                <img :src="'https://i.ytimg.com/vi/'+video?.host_id+'/maxresdefault.jpg'"
                     class="block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0" alt="video thumbnail"/>
                <img src="/img/youtube_social_icon_red.png" class="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" alt="youtube play button">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>

.video__youtube {
  padding-bottom: 56.23%;
  width: 100%;
  height: 0;
  overflow: hidden;
  position: relative;
  object-fit: cover;
  background-color: black;
}

</style>