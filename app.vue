<script setup lang="ts">
import { useUser } from "~/composables/useAuth";

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0)
})

await useUser()
</script>
<template>
  <NuxtLayout>
    <div class="dark:bg-slate-800 min-h-screen dark:text-white">
      <NuxtPage />
    </div>
   
  </NuxtLayout>
</template>
