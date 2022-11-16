<script setup lang="ts">

const props = defineProps(['questionId'])

const addAnswer = 'addAnswer';
const emit = defineEmits<{ (e: typeof addAnswer, answer: IAnswer): void }>()

const questionId = props.questionId

const data: IAnswerPost = reactive({
  text: '',
  questionId: parseInt(questionId)
})

const showAnswerForm = useState('showAnswerForm' + questionId)

async function postAnswer() {
  const answer = await $fetch(`/api/ask-jack/answer`, { method: 'post', body: { data } });

  const newAnswer = useState('newAnswer')
  newAnswer.value = answer

  emit('addAnswer', answer)

  data.text = ''
  console.log('&&&&&&&&&  end post answer')
}

</script>


<template>
  <form @submit.preventDefault="postAnswer">
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Answer</label>
    <textarea v-model="data.text" id="message" rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      placeholder="Be specific and kind">
        </textarea>
    <div>
    </div>
    <div class="flex justify-end">
      <button @click="postAnswer" type="button"
        class="mt-5 px-6 py-3.5 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Submit
      </button>
      <button @click="showAnswerForm = !showAnswerForm" type="button"
        class="mt-5 px-6 py-3.5 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Cancel
      </button>
    </div>
  </form>
</template>