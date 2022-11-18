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
    class="min-h-screen bg-white dark:bg-black">
    <div class="container m-auto px-6 py-20 md:px-12 lg:px-20">
      <div class="m-auto text-center lg:w-8/12 xl:w-7/12">
        <h2 class="text-2xl text-gray-800 dark:text-gray-200 font-bold md:text-4xl">Full Stack Jack Pro.
        </h2>
      </div>
      <div class="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12">
        <div class="relative -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12 z-20">
          <div aria-hidden="true"
            class="absolute top-0 w-full h-full dark:bg-black border-2  border-indigo-500/50 rounded-2xl bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110">
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
            class="absolute top-0 w-full h-full dark:bg-black border-2 border-indigo-500/50 rounded-2xl bg-white shadow-lg transition duration-500 group-hover:scale-105">
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
              <svg class="" viewBox="0 0 132 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1264_7346)">
                <path d="M26.8295 31.4227H44.4182C44.9769 31.4228 45.5257 31.2802 46.0095 31.0092C46.4933 30.7382 46.895 30.3485 47.1742 29.8791C47.4534 29.4098 47.6003 28.8774 47.6001 28.3355C47.5998 27.7936 47.4525 27.2614 47.1728 26.7922L35.3608 6.94689C35.0816 6.47766 34.6799 6.08799 34.1962 5.81706C33.7125 5.54614 33.1638 5.4035 32.6053 5.4035C32.0467 5.4035 31.498 5.54614 31.0143 5.81706C30.5306 6.08799 30.129 6.47766 29.8498 6.94689L26.8295 12.0246L20.9243 2.09529C20.6449 1.62609 20.2431 1.23648 19.7593 0.965601C19.2754 0.694725 18.7266 0.552124 18.168 0.552124C17.6094 0.552124 17.0606 0.694725 16.5767 0.965601C16.0929 1.23648 15.6911 1.62609 15.4117 2.09529L0.712988 26.7922C0.433357 27.2614 0.28601 27.7936 0.285767 28.3355C0.285524 28.8774 0.432393 29.4098 0.711603 29.8791C0.990813 30.3485 1.39252 30.7382 1.87631 31.0092C2.36011 31.2802 2.90894 31.4228 3.4676 31.4227H14.5083C18.8828 31.4227 22.1088 29.5589 24.3286 25.9227L29.7178 16.8696L32.6044 12.0246L41.2677 26.5778H29.7178L26.8295 31.4227ZM14.3283 26.5728L6.62332 26.5711L18.1731 7.16803L23.9361 16.8696L20.0775 23.3539C18.6034 25.7132 16.9287 26.5728 14.3283 26.5728Z" fill="#00DC82"/>
                <path d="M60.65 31.1321V19.5774C60.65 16.2709 60.3057 12.9644 60.3057 12.9644C60.3057 12.9644 61.614 15.9802 63.2665 18.8144L70.3243 31.1321H75.8673V5.69727H70.6686V17.2519C70.6686 20.5585 71.0129 23.9013 71.0129 23.9013C71.0129 23.9013 69.7046 20.8491 68.0865 18.015L60.9942 5.69727H55.4857V31.1321H60.65Z" fill="currentColor"/>
                <path d="M92.2457 12.819V22.8476C92.2457 25.1731 90.7653 26.9172 88.6652 26.9172C86.7028 26.9172 85.3256 25.3184 85.3256 23.1019V12.819H80.5401V24.2283C80.5401 28.4069 83.0878 31.4228 86.9782 31.4228C89.3538 31.4228 91.2817 30.3327 92.2457 28.5886V31.1321H97.0657V12.819H92.2457Z" fill="currentColor"/>
                <path d="M111.082 21.6122L116.901 12.819H111.633L108.466 17.6516L105.298 12.819H100.065L105.884 21.5759L99.6177 31.1321H104.748L108.5 25.5001L112.218 31.1321H117.314L111.082 21.6122Z" fill="currentColor"/>
                <path d="M122.281 12.819H118.941V17.0339H122.281V24.4827C122.281 28.7339 124.863 31.1321 128.857 31.1321H131.714V26.8808H129.511C127.962 26.8808 127.066 26.0451 127.066 24.2647V17.0339H131.714V12.819H127.066V7.40503H122.281V12.819Z" fill="currentColor"/>
                </g>
                <defs>
                <clipPath id="clip0_1264_7346">
                <rect width="131.429" height="32" fill="white" transform="translate(0.285767)"/>
                </clipPath>
                </defs>
                </svg>
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
