<script setup lang="ts">
import { Series, Video, Topic } from ".prisma/client";
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
  topic: Topic
}

const topicName = getParam('name') as string
const { data, pending } = await useFetch<topicData>(`/api/topic/${topicName}`, { key: route.fullPath })
const videoWrapper: Ref<HTMLElement | null> = ref(null)
const loading = ref(true)
const activeVideo = ref(data.value?.videos[0])

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

function isActive(video: Video) {
  return video.host_id == activeVideo?.value?.host_id
}

function createIframe(vidId: string) {
  const url = 'https://www.youtube.com/embed/' + vidId + '?autoplay=1'
  const htmlString = `<iframe class="mt-5 block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0" src="${url}" allowfullscreen allow="autoplay"></iframe>`

  if (videoWrapper.value) {
    videoWrapper.value.innerHTML = htmlString;
  }
}

onMounted(() => {
  if (data.value?.videos[0]) {
    setActive(data.value?.videos[0])
    loading.value = false
    console.log('is loading: ', loading.value)
  }
})

</script>

<template>

  <div v-if="data" class="md:flex  dark:bg-black">
    <aside class=" hidden md:block  pl-10 pr-10 text-left h-screen w-1/4 dark:bg-black">
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
        <div class="my-2 bg-black h-[1px]"></div>
      </div>
      <div>
        <img class="h-16" :src="data?.topic.image ?? undefined" v-if="data?.topic.image !== '/img/nuxt3.svg'" alt="nuxt 3 logo">
        <svg v-if="data?.topic.image == '/img/nuxt3.svg'" viewBox="0 0 221 65" fill="none"
          xmlns="http://www.w3.org/2000/svg" class="h-26 mr-5">
          <g clip-path="url(#a)">
            <path fill="currentColor"
              d="M82.5623 18.5705h7.3017l15.474 24.7415V18.5705h6.741v35.0576h-7.252L89.3025 28.938v24.6901h-6.7402V18.5705ZM142.207 53.628h-6.282v-3.916c-1.429 2.7559-4.339 4.3076-8.015 4.3076-5.822 0-9.603-4.1069-9.603-10.0175V28.3847h6.282v14.3251c0 3.4558 2.146 5.8592 5.362 5.8592 3.524 0 5.974-2.7044 5.974-6.4099V28.3847h6.282V53.628ZM164.064 53.2289l-6.026-8.4144-6.027 8.4144h-6.69l9.296-13.1723-8.58-12.0709h6.843l5.158 7.2641 5.106-7.2641h6.895l-8.632 12.0709 9.295 13.1723h-6.638ZM183.469 20.7726v7.6116h7.149v5.1593h-7.149v12.5311c0 .4208.17.8245.473 1.1223.303.2978.715.4654 1.144.4661h5.532v5.9547h-4.137c-5.617 0-9.293-3.2062-9.293-8.8109V33.5484h-5.056v-5.1642h3.172c1.479 0 2.34-.8639 2.34-2.2932v-5.3184h5.825Z">
            </path>
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M30.1185 11.5456c-1.8853-3.24168-6.5987-3.24169-8.484 0L1.08737 46.8747c-1.885324 3.2417.47133 7.2938 4.24199 7.2938H21.3695c-1.6112-1.4081-2.2079-3.8441-.9886-5.9341l15.5615-26.675-5.8239-10.0138Z"
              fill="#80EEC0"></path>
            <path
              d="M43.1374 19.2952c1.5603-2.6523 5.461-2.6523 7.0212 0l17.0045 28.9057c1.5603 2.6522-.39 5.9676-3.5106 5.9676h-34.009c-3.1206 0-5.0709-3.3154-3.5106-5.9676l17.0045-28.9057ZM209.174 53.8005H198.483c0-1.8514.067-3.4526 0-6.0213h10.641c1.868 0 3.353.1001 4.354-.934 1-1.0341 1.501-2.3351 1.501-3.9029 0-1.8347-.667-3.2191-2.002-4.1532-1.301-.9674-2.985-1.4511-5.054-1.4511h-2.601v-5.2539h2.652c1.701 0 3.119-.4003 4.253-1.2009 1.134-.8006 1.701-1.9849 1.701-3.5527 0-1.301-.434-2.3351-1.301-3.1023-.834-.8007-2.001-1.201-3.503-1.201-1.634 0-2.918.4837-3.853 1.4511-.9.9674-1.401 2.1517-1.501 3.5527h-6.254c.133-3.2358 1.251-5.7877 3.352-7.6558 2.135-1.868 4.887-2.8021 8.256-2.8021 2.402 0 4.42.4337 6.055 1.301 1.668.834 2.919 1.9515 3.753 3.3525.867 1.4011 1.301 2.9523 1.301 4.6536 0 1.9681-.551 3.636-1.651 5.0037-1.068 1.3344-2.402 2.235-4.004 2.7021 1.969.4003 3.57 1.3677 4.804 2.9022 1.234 1.5011 1.852 3.4025 1.852 5.7043 0 1.9347-.468 3.7028-1.402 5.304-.934 1.6012-2.301 2.8855-4.103 3.8529-1.768.9674-3.953 1.4511-6.555 1.4511Z"
              fill="#00DC82"></path>
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h221v65H0z"></path>
            </clipPath>
          </defs>
        </svg>
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
        <li class="cursor-pointer p-2 hover:bg-green-400 rounded-md mt-1" :class="{ 'bg-green-600': isActive(video) }"
          @click="setActive(video)" v-for="video in data?.videos">
          {{ video.title }}
        </li>
      </ul>
    </aside>
    <div class="w-screen pt-0 mt-0" v-if="!pending && data">

      <section v-if="activeVideo" class="overflow-hidden text-gray-700">
        <div class=" w-full min-w-200 ">
          <div class="clickable" @click="createIframe(activeVideo?.host_id ?? '')" ref="videoWrapper">
            <div class="video__youtube" :id="activeVideo.host_id">
              <img src="https://i.ytimg.com/vi/${activeVideo.value.host_id}/maxresdefault.jpg"
                class="block object-cover object-center lg:rounded-lg w-full min-w-200 aspect-video mb-10 p-0"
                alt="video thumbnail" />
            </div>
          </div>
        </div>
      </section>
      <!-- <section v-else>
        loading. . . . {{loading}}
      </section> -->

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