<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Header from "@/components/Header.vue"

import Presentation from "@/components/Presentation.vue"
</script>

<template>
  <Header></Header>
  <div class="routeViewWrapper">
    <RouterView />

  </div>
</template>

<style scoped>
.routeViewWrapper{
  padding-top: 5.7rem;
}
</style>