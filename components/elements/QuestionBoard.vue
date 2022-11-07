<script setup lang="ts">
import Tiptap from "~~/components/elements/Tiptap.vue";

 const searchInput = ref("");
 
 const { data: questions, pending, refresh, error } = await useFetch<IQuestion[]>(() => `/api/ask-jack/search?search=${searchInput.value}`, {server:false})

 refresh()

 function search() {
     if (searchInput.value.length >= 3) {
         refresh()
     }
 }
 
 </script>
 
 <template>
     <div class="w-full md:w-1/3">
         <div>
             <div class="flex m-5">
                 <label for="search-dropdown"
                     class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-gray-300">Search
                     Questions</label>
                 <div class="relative w-full">
                     <input v-model="searchInput" @input="search" type="search" id="search-dropdown"
                         class="block p-2.5 w-full z-20 text-sm text-slate-900 bg-slate-50 rounded-lg border-solid border-2 border-indigo-600 dark:bg-gray-900 dark:text-gray-300"
                         placeholder="Search Questions...">
                     <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium dark:text-white"><svg
                             class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                         </svg>
                     </button>
                 </div>
             </div>
         </div>
 
 
         <Transition name="fade" v-if="!pending" v-for="question in questions">
             <NuxtLink v-if="question"
                 class="flex flex-column justify-cente hover:scale-110 tranition duration-500"
                 :to="`/ask-jack/question/${question.id}`">
                 <div class="max-w-xxl w-full p-4">
                     <div class="p-8 bg-white dark:bg-black rounded-lg shadow-md">
                        <div class="flex justify-end dark:text-gray-300">
                            {{ question.authName }}
                           </div>
                         <Tiptap v-model="question.description" label="" :editable="false" />
                     </div>
                 </div>
             </NuxtLink>
         </Transition>
     </div>
 
 
 </template>
 
