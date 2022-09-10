<script setup lang="ts">

 definePageMeta({
   middleware: 'auth'
 })
 
 const user = await useUser()
 
 </script>
 
 <template>
 
   <div class="flex py-60 flex-col h-screen my-auto items-center bgimg bg-cover bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-400">
     <div class="mt-2 bg-white font-bold text-7xl py-1 px-8 rounded m-2 dark:bg-slate-800 dark:text-white">
      blog
     </div>
   </div>
 
 </template>