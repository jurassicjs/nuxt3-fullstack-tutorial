<template>
 <main class="dark:bg-slate-800">


  <ContentList path="/tutorials" v-slot="{ list }">

   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:my-20 lg:ml-20 dark:bg-slate-800 dark:bg-text-white">
    <div v-for="article in list" :key="article._path" class="max-w-xl rounded overflow-hidden shadow-xl shadow-green-400 mb-10 p-10 dark:bg-text-white">
     <NuxtLink :to="article._path">
      <img class="w-full" src="/img/nuxt3.svg" alt="nuxt 3 logo">
      <div class="px-6 py-4">
       <div class="font-bold text-xl mb-2 dark:text-white">{{ article.title }}</div>
       <p class="text-gray-700 dark:text-white text-base">
        {{ article.description }}
       </p>
      </div>
      <div class="px-6 pt-4 pb-2">
       <!-- <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> -->
      </div>
     </NuxtLink>
     
    </div>
   </div>
  </ContentList>
 </main>
</template>