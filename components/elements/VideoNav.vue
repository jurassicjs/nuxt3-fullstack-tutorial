<script setup lang="ts">
import { Video } from ".prisma/client";
import {TopicData} from "~/types/TopicData"
import { defineProps, PropType } from "@vue/runtime-core";

defineProps({
    data: Object as PropType<TopicData>
})

const emit = defineEmits(['setActiveVideo'])

function setActive(video: Video) {
    emit('setActiveVideo', video);
}

</script>
<template>
    <div>
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
        <div
          class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
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
</template>
