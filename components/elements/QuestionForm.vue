<script setup lang="ts">

 definePageMeta({
  middleware: 'auth'
})

interface Props {
  data: IQuestionPost
  endpoint?: String
}
 
const props = defineProps<Props>()
const data = props.data
const router = useRouter()


async function postQuestion() {
  const { data: question } = await useFetch<IQuestion>(
    () => `${props.endpoint}`, { method: 'post', body: { data }, pick: ['id'] }
  );

  router.push(`/ask-jack/question/${question.value.id}`)
}

</script>
  
  <template>
  <form @submit.preventDefault="postQuestion">
    <div class="mb-6">
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Short
        Description</label>
      <input v-model="data.title" type="title" id="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        placeholder="short description">
    </div>

    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Question</label>
    <textarea v-model="data.description" id="message" rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      placeholder="Be specific and kind">
          </textarea>
    <div>
    </div>
    <div class="flex justify-end">
      <button @click="postQuestion" type="button"
        class="mt-5 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Ask Question
      </button>
      <!-- todo: make button text dynamic -->
    </div>
  </form>
</template>