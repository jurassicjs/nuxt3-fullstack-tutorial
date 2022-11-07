<template>
  <div>
    <label for="message" class="block mb-2 ml-5 text-sm font-medium text-gray-900 dark:text-gray-400">{{label}}</label>
    <editor-content :editor="editor" />
  </div>
 
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  editable: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  editable: props.editable,
  content: props.modelValue,
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none rounded-lg p-5 bg-white dark:bg-gray-900 dark:text-white',
    },
  },
  extensions: [StarterKit],
  onUpdate: ({editor}) => {
    let content = editor.getHTML()
    emit('update:modelValue', content)
  }
})
</script>