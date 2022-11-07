<script setup lang="ts">
import TheMobileNav from "~/components/layout/TheMobileNav.vue";
import TheFooter from "~~/components/layout/TheFooter.vue";
</script>

<template>
  <div class="dark:bg-black">
    <TheMobileNav/>
      <slot/>
      <TheFooter/>
  </div >
</template>