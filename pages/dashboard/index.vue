<script lang="ts" setup>
import getParam from "~/composables/getParam";
import type { Ref } from "vue"

definePageMeta({
  layout: 'dashbord',
});
</script>

<template>
  <div class="flex">
    <div class="mb-5">
      <nuxt-link class="font-semibold text-2xl" to="/">
        Dashboard
      </nuxt-link>
      <div class="text-gray-500">
        Overview & summary
      </div>
    </div>
    <div>
    <!-- card 1, card 2, card 3, card 4 -->
    </div>
 </div>
</template>
