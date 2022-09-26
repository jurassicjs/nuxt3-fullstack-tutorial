<script setup lang="ts">

const config = useRuntimeConfig()

const releaseVersion = config.public.releaseVersion || 'not available'
const gitHash = config.public.gitHash || 'not available'

function getReleaseVersion(): String {
  return releaseVersion?.split('refs/tags/')[1] || 'not available'
}

</script>
 
<template>
  <div>
    <div class="flex justify-center py-20 text-7xl">
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400">
        Application Information</span>
    </div>
    <main>
      <div class="bg-white dark:bg-slate-700 py-12 flex">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-lg font-semibold text-indigo-600">
              Status
            </h2>
            <p class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Current Application</p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              For more information see the github respository
            </p>
          </div>
          <div class="mt-10">
            <dl class="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
              <div class="relative">
                <dt>
                  <div class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                    <svg class="h-6 w-6" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        d="M320 488c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1s14.2 12.4 14.2 21.9v40h16c35.3 0 64-28.7 64-64V153.3C371.7 141 352 112.8 352 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V320c0 70.7-57.3 128-128 128H320v40zM456 80c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM192 24c0-9.5 5.6-18.1 14.2-21.9s18.8-2.3 25.8 4.1l80 72c5.1 4.6 7.9 11 7.9 17.8s-2.9 13.3-7.9 17.8l-80 72c-7 6.3-17.2 7.9-25.8 4.1s-14.2-12.4-14.2-21.9V128H176c-35.3 0-64 28.7-64 64V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V192c0-70.7 57.3-128 128-128h16V24zM56 432c0 13.3 10.7 24 24 24s24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24z" />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white">Release Version</p>
                </dt>
                <NuxtLink v-if="getReleaseVersion() !== 'not available'" :to="'https://github.com/jurassicjs/nuxt3-fullstack-tutorial/releases/tag/'+ getReleaseVersion()">
                  <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-white">{{getReleaseVersion()}}</dd>
                </NuxtLink>
                <dd v-else class="mt-2 ml-16 text-base text-gray-500 dark:text-white">{{getReleaseVersion()}}</dd>
              
              </div>

              <div class="relative">
                <dt>
                  <div class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                    <!-- Heroicon name: outline/globe-alt -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white">Git Hash
                  </p>
                </dt>
                <NuxtLink v-if="gitHash !== 'not available'" :to="'https://github.com/jurassicjs/nuxt3-fullstack-tutorial/commit/'+ gitHash">
                  <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-white">
                    {{gitHash}}
                  </dd>
                </NuxtLink>
                <dd v-else class="mt-2 ml-16 text-base text-gray-500 dark:text-white">
                  {{gitHash}}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>