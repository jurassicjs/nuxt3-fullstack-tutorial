<script setup lang="ts">
import { Series, Video } from ".prisma/client";
import getParam from "~/composables/getParam";

definePageMeta({
  layout: false,
});

const route = useRoute()

type topicData = {
  series: Series[]
  videos: Video[]
}

const topicName = getParam('name') as string
const { data, pending } = await useFetch<topicData>(`/api/topic/${topicName}`, { key: route.fullPath })
const videoPlaceholderElement = ref(null)
const videoWrapper = ref(new HTMLElement)

const activeVideo = ref(data?.value?.videos[0])

function setActive(video: Video) {
  activeVideo.value = video

  const htmlString = `<div class="video__youtube" :id="${activeVideo.value.host_id}">
                        <img src="https://i.ytimg.com/vi/${activeVideo.value.host_id}/maxresdefault.jpg"
                          class="block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0"
                          alt="video thumbnail" />
                          <img src="/img/youtube_social_icon_red.png"
                          class="absolute text-5xl text-white top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          alt="youtube play button">
                      </div>
                    `
  videoWrapper.value.innerHTML = htmlString;
}

function createIframe(vidId: string) {
  const url = 'https://www.youtube.com/embed/' + vidId + '?autoplay=1'
  const htmlString = `<iframe class="mt-5 block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0" src="${url}" allowfullscreen allow="autoplay"></iframe>`

  videoWrapper.value.innerHTML = htmlString;
}

</script>

<template>

  <div>
    <span class="absolute text-white text-4xl top-5 left-4 cursor-pointer" onclick="openSidebar()">
      <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
    </span>
    <div class="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
      <div class="text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">

          <NuxtLink to="/">
            <img class="h-20" src="/img/logo_clear_fsj.png" alt="full stack jack logo">
            <h1 class="font-bold text-gray-200 text-[15px] ml-3">Full Stack Jack</h1>
          </NuxtLink>
          

        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <div class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
        <i class="bi bi-search text-sm"></i>
        <input type="text" placeholder="Search" class="text-[15px] ml-4 w-full bg-transparent focus:outline-none" />
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i class="bi bi-house-door-fill"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i class="bi bi-bookmark-fill"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
      </div>
      <div class="my-4 bg-gray-600 h-[1px]"></div>
      <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onclick="dropdown()">
        <i class="bi bi-chat-left-text-fill"></i>
        <div class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Videos</span>
          <span class="text-sm rotate-180" id="arrow">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <ul class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold" id="submenu">
        <li class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1" @click="setActive(video)"
          v-for="video in data.videos">
          {{ video.title }}
        </li>
      </ul>
    </div>
    <div class="dark:bg-black min-h-screen" v-if="!pending && data">
      <div>
        <section class="overflow-hidden text-gray-700 p-0">
          <div class="container px-0 py-2 mx-auto lg:pt-12 lg:px-32">
            <div class="flex flex-wrap -m-1 md:-m-2 xxxxx" @click="createIframe(activeVideo?.host_id)"
              ref="videoWrapper">
              <div class="mt-5" ref="videoPlaceholderElement">
                <div class="video__youtube container" :id="activeVideo?.host_id">
                  <img :src="'https://i.ytimg.com/vi/' + activeVideo?.host_id + '/maxresdefault.jpg'"
                    class="block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0"
                    alt="video thumbnail" />
                  <img src="/img/youtube_social_icon_red.png"
                    class="absolute text-5xl text-white top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    alt="youtube play button">
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

</template>
