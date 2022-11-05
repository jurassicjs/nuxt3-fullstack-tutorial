<template>
  <div class="flex justify-center gap-x-12">
    <main
    class="container text-white lg:flex justify-center overflow-hidden dark:text-white py-16 px-4"
  >
  <div>
   <nuxt-link
   class="block cursor-pointer max-w-2xl "
   href="/articles/overview"
 >
   <svg
     xmlns="http://www.w3.org/2000/svg"
     class="inline h-6 w-6"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor"
     stroke-width="2"
   >
     <path
       stroke-linecap="round"
       stroke-linejoin="round"
       d="M11 17l-5-5m0 0l5-5m-5 5h12"
     />
   </svg>
   Back
 </nuxt-link>
 <ContentDoc v-slot="{ doc }">
   <h2 class="text-4xl font-semibold text-black dark:text-white">{{ doc.title }}</h2>
   <p class="text-gray-500 dark:text-white">
     by {{ doc.author }}, {{ doc.date }}
   </p>
   <div class="max-w-4xl"
   >
     <ContentRenderer class="mt-4  max-w-none prose lg:prose-xl dark:prose-invert" :value="doc" />
   </div>
 </ContentDoc>
  </div>
    
  </main>
  </div>

</template>
