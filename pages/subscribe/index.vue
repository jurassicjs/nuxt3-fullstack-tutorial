<script setup lang="ts">
import TestingPhaseDialog from '~~/components/elements/TestingPhaseDialog.vue';

const router = useRouter();
const user = await useUser()

function goToRegister() {
  router.push('/register')
}

</script>

<template>
  <div>
    <TestingPhaseDialog class="z-30"/>
    <div
    class="min-h-screen bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-600">
    <div class="container m-auto px-6 py-20 md:px-12 lg:px-20">
      <div class="m-auto text-center lg:w-8/12 xl:w-7/12">
        <h2 class="text-2xl text-gray-800 dark:text-gray-200 font-bold md:text-4xl">Full Stack Jack Pro.
        </h2>
      </div>
      <div class="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12">
        <div class="relative -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12 z-20">
          <div aria-hidden="true"
            class="absolute top-0 w-full h-full dark:bg-slate-800 border-2  border-indigo-500/50 rounded-2xl bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110">
          </div>
          <div class="relative p-6 space-y-6 lg:p-8">
            <h3 class="text-3xl text-gray-700 font-semibold text-center">Pro Membership</h3>
            <div>
              <div class="relative flex justify-around">
                <div class="flex items-end">
                  <span class="text-8xl text-gray-800 dark:text-gray-500 font-bold leading-0">10</span>
                  <div class="pb-2">
                    <span class="block text-2xl text-gray-700 dark:text-gray-500 font-bold">&euro;</span>
                  </div>
                </div>
              </div>
            </div>
            <ul role="list" class="w-max space-y-4 py-6 m-auto text-gray-600">
              <li class="space-x-2">
                <span class="text-purple-500 font-semibold">&check;</span>
                <span>Early access to content</span>
              </li>
              <li class="space-x-2">
                <span class="text-purple-500 font-semibold">&check;</span>
                <span>Access to newsletter</span>
              </li>
              <li class="space-x-2">
                <span class="text-purple-500 font-semibold">&check;</span>
                <span>Support Full Stack Jack</span>
              </li>
            </ul>
            <button v-if="user == null" @click="goToRegister"
              class="block w-full py-3 px-6 text-center rounded-xl transition duration-500 hover:scale-110  bg-purple-600 hover:bg-purple-700 active:bg-purple-800 focus:bg-indigo-600">
              <span class="text-white font-semibold">
                Sign Up and Subscribe
              </span>
            </button>
            <form v-else action="/api/subscribe" method="POST">
              <input type="hidden" name="lookup_key" value="price_1LF0X8I0Q2oyFm8MCanW0XI1" />
              <input type="hidden" name="user_id" :value="user.id" />
              <button type="submit" title="Submit"
                class="block w-full py-3 px-6 text-center rounded-xl transition duration-500 hover:scale-110  bg-purple-600 hover:bg-purple-700 active:bg-purple-800 focus:bg-indigo-600">
                <span class="text-white font-semibold">
                  Subscribe Now
                </span>
              </button>
            </form>
          </div>
        </div>

        <div class="relative group md:w-6/12 lg:w-7/12 z-10">
          <div aria-hidden="true"
            class="absolute top-0 w-full h-full dark:bg-slate-800 border-2 border-indigo-500/50 rounded-2xl bg-white shadow-lg transition duration-500 group-hover:scale-105">
          </div>
          <div class="relative p-6 pt-16 md:p-8 md:pl-12  md:rounded-r-2xl lg:pl-20 lg:p-16">
            <ul role="list" class="space-y-4 py-6 text-gray-600">
              <li class="space-x-2">
                <span class="text-purple-500 font-semibold">&check;</span>
                <span>Get Listed as Supporter</span>
              </li>
              <li class="space-x-2">
                <span class="text-purple-500 font-semibold">&check;</span>
                <span>Influence future content</span>
              </li>
              <li class="space-x-2">
                <span class="text-purple-500 font-semibold">&check;</span>
                <span>Access to virtual meetups</span>
              </li>
            </ul>
            <p class="text-gray-700">Cancel anytime.</p>
            <div class="mt-6 flex justify-between gap-6">
              <img class="w-16 lg:w-24" src="/img/nuxt3.svg" loading="lazy" alt="airbnb">
              <img class="w-8 lg:w-16" src="/img/laravel.svg" loading="lazy" alt="bissell">
              <img class="w-6 lg:w-12" src="/img/linux.svg" loading="lazy" alt="ge">
              <img class="w-20 lg:w-28" src="/img/docker.svg" loading="lazy" alt="microsoft">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
