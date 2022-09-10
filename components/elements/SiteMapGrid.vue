<template>
  <div class="mt-10">
    <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
      <div class="relative">

        <dt>
          <a href="https://www.youtube.com/channel/UCFDF_U_uoKc6MhIZPZKo5CA" target="_blank">
            <div class="absolute flex items-center justify-center h-12 w-12 rounded-md  text-white">
              <!-- Heroicon name: outline/globe-alt -->
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 461.001 461.001" style="enable-background:new 0 0 461.001 461.001;" xml:space="preserve">

	<path style="fill:#F61C0D;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728   c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137   C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607   c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
</svg>
            </div>
          </a>
          <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Full Stack Jack YouTube Channel</p>
        </dt>
        <dd class="mt-2 ml-16 text-base text-gray-500">
          There you will find videos about nuxt and other full stack web dev topics
        </dd>
      </div>


      <nuxt-link to="/">
        <div class="relative">
          <dt>
            <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p class="ml-16 text-lg leading-6 font-medium dark:text-white text-gray-900">up next</p>
          </dt>
          <dd class="mt-2 ml-16 text-base text-gray-500">
            middleware
          </dd>
        </div>
      </nuxt-link>

      <nuxt-link to="/ask-jack/search">
        <div class="relative">
          <dt>
            <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Ask Jack</p>
          </dt>
          <dd class="mt-2 ml-16 text-base text-gray-500">
            A Question Board with a strict no assholes policy.
          </dd>
        </div>
      </nuxt-link>

      <nuxt-link to="/">
        <div class="relative">
          <dt>
            <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
              </svg>
            </div>
            <p class="ml-16 text-lg leading-6 font-medium dark:text-white text-gray-900">video requests</p>
          </dt>
          <dd class="mt-2 ml-16 text-base text-gray-500">
            Let me know what topics you'd like me to make videos for.
          </dd>
        </div>
      </nuxt-link>
    </dl>
  </div>
</template>
