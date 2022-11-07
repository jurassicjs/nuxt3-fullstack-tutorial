<script setup lang="ts">
import { Series, Video } from ".prisma/client";
import getParam from "~/composables/getParam";
import type { Ref } from "vue"

definePageMeta({
  layout: 'mobile-only',
});

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme
}


const route = useRoute()

type topicData = {
  series: Series[]
  videos: Video[]
}

const topicName = getParam('name') as string
const { data, pending } = await useFetch<topicData>(`/api/topic/${topicName}`, { key: route.fullPath })
const videoPlaceholderElement = ref(null)
const videoWrapper: Ref<HTMLElement | null> = ref(null)

const activeVideo = ref(data?.value?.videos[0])

function setActive(video: Video) {
  activeVideo.value = video

  const htmlString = `<div class="video__youtube" :id="${activeVideo.value.host_id}">
                        <img src="https://i.ytimg.com/vi/${activeVideo.value.host_id}/maxresdefault.jpg"
                          class="block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0"
                          alt="video thumbnail" />
                      </div>
                    `
  if (videoWrapper.value) {
    videoWrapper.value.innerHTML = htmlString;
  }

}

function createIframe(vidId: string) {
  const url = 'https://www.youtube.com/embed/' + vidId + '?autoplay=1'
  const htmlString = `<iframe class="mt-5 block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0" src="${url}" allowfullscreen allow="autoplay"></iframe>`

  if (videoWrapper.value) {
    videoWrapper.value.innerHTML = htmlString;
  }
}

</script>

<template>

  <div class="md:flex  dark:bg-slate-900">
    <aside class=" hidden md:block  pl-10 pr-10 text-left h-screen w-1/4 dark:bg-slate-900">
      <div class="text-gray-800 dark:text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">

          <NuxtLink to="/">
            <img class="h-20" src="/img/logo_clear_fsj.png" alt="full stack jack logo">
            <h1 class="font-bold text-gray-800 dark:text-gray-200 text-[15px]">Full Stack Jack</h1>
          </NuxtLink>


        </div>
        <div>

          <span class="hidden md:block " @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')">
            <svg v-if="$colorMode.value == 'dark'" xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-50 hidden lg:block" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg v-if="$colorMode.value == 'light'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden lg:block"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd" />
            </svg>
          </span>

        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <div>
        <img src="/img/nuxt3.svg" alt="">
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-600 text-white"
        onclick="dropdown()">
        <i class="bi bi-chat-left-text-fill"></i>
        <div class="flex justify-between w-full items-center">
          <span class="text-sm rotate-180" id="arrow">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <ul class="text-left mx-auto text-gray-800 dark:text-gray-200 font-bold">
        <li class="cursor-pointer p-2 hover:bg-green-600 rounded-md mt-1" @click="setActive(video)"
          v-for="video in data?.videos">
          {{ video.title }}
        </li>
      </ul>
    </aside>
    <div class="w-screen pt-0 mt-0" v-if="!pending && data">

      <section v-if="activeVideo" class="overflow-hidden text-gray-700">
        <div class="container ">
          <div class="clickable" @click="createIframe(activeVideo?.host_id ?? '')" ref="videoWrapper">
            <div ref="videoPlaceholderElement align-center justify-center">
              <div class="video__youtube container flex" :id="activeVideo?.host_id">
                <img :src="'https://i.ytimg.com/vi/' + activeVideo?.host_id + '/maxresdefault.jpg'" class=""
                  alt="video thumbnail" />
                <!-- <img src="/img/youtube_social_icon_red.png"
                    class="center"
                    alt="youtube play button"> -->
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    <div class="md:hidden">
      <ul class="mx-auto  text-left mx-auto text-gray-800 dark:text-gray-200 font-bold">
        <li class="cursor-pointer p-2 hover:bg-green-600 rounded-md mt-1" @click="setActive(video)"
          v-for="video in data?.videos">
          {{ video.title }}
        </li>
      </ul>
    </div>
  </div>

</template>

<style>
.clickable {
  cursor: pointer;
}
</style>