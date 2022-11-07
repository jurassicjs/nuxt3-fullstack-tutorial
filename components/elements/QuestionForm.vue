<script setup lang="ts">
import Tiptap from './Tiptap.vue';

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

const isEditable = ref(true) //todo: implement logic


async function postQuestion() {
  const { data: question } = await useFetch<IQuestion>(
    () => `${props.endpoint}`, { method: 'post', body: { data }, pick: ['id'] }
  );

  router.push(`/ask-jack/question/${question?.value?.id}`)
}

</script>
  
  <template>
  <form @submit.preventDefault="postQuestion">
    <Tiptap v-model="data.description" label="Provide any information you think would help get your question answered" :editable="isEditable" />
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