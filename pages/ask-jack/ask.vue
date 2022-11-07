<script setup lang="ts">
import QuestionForm from "~/components/elements/QuestionForm.vue";
import AskJackSidebar from "~/components/elements/AskJackSidebar.vue";

definePageMeta({
 middleware: 'auth'
})

const data: IQuestionPost = reactive({
    title: '',
    description: ''
  })

const endpoint = '/api/ask-jack/ask'
 

</script>
 
 <template>

 <div
  class="min-h-full theme-mode bg-white dark:bg-black">

  <div class="h-32 flex justify-center">
   <div class="flex m-5">
    <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="full stack jack logo" />
    <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4">
     Ask Jack
    </h1>
   </div>
  </div>
  <div class="md:flex">

   <AskJackSidebar />
   <div class="md:w-1/3 z-1 flex justify-right relative"></div>
   <div v-if="true" class="w-full md:w-1/3 h-screen">
  
    <QuestionForm  :data="data" :endpoint="endpoint" />
   </div>
  </div>
 </div>

</template>
 