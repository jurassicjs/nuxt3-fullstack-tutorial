<script setup lang="ts">
import TopicCard from "~~/components/elements/TopicCard.vue";
const route = useRoute()
const {data: rows} = await useFetch('/api/topics', {key: route.fullPath})
 definePageMeta({
   middleware: 'auth'
 })
 
 const user = await useUser()
 
 </script>
 
 <template>
 
   <div class="">
     <div class="flex justify-center py-20 text-7xl">
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400">Dashboard</span>
       
     </div>


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

     <div class="min-h-screen bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-400 ">
      <div v-if="rows">
        <div aria-label="group of cards" tabindex="0" class="focus:outline-none py-8 w-full " >
          <div v-for="row in rows" class="lg:flex items-center justify-center w-full" >
            <div v-for="topic in row"
                 aria-label="card 1"
                 class="focus:outline-none lg:w-4/12 lg:m-7 lg:mb-0 mb-7 dark:bg-gray-800 bg-white  p-6 shadow rounded  transition duration-500 hover:scale-110">
              <TopicCard :topic="topic"/>
            </div>
          </div>
        </div>
      </div>
    </div>


   </div>
 
 </template>