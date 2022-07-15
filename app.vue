<script setup lang="ts">

import { IUser } from "~/types/IUser";
import { useUser } from "~/composables/useAuth";

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0)
})

await useUser()
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
