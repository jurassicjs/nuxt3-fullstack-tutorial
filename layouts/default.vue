<script setup lang="ts">
import Navbar from "~/components/layout/navbar.vue";
import TheFooter from "~~/components/layout/TheFooter.vue";
</script>

<template>
  <div class="dark:bg-black">
    <a id="bb-banner" target="_blank" href="https://nuxtnation.com?friend=nuxt&amp;utm_source=nuxt&amp;utm_medium=website&amp;utm_campaign=affiliate&amp;utm_content=top_banner" class="JOIN_NUXT_NATION">
      <div class="bb-background"></div>
      <div class="bb-logo"></div>
      <div class="bb-core">
        <div class="bb-slogan">
          <div class="bb-title">Join the Largest Online Nuxt Event</div>
          <div class="bb-subtitle">16th &amp; 17th November 2022</div>
        </div>
        
        <div class="bb-button-wrapper">
          <div class="bb-button">Join for Free</div>
        </div>
      </div>
      <div id="bb-close" class="bb-close">×</div>
    </a>

    <Navbar/>
      <slot/>
      <TheFooter/>
  </div >
</template>