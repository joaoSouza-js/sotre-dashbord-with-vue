<script setup>

import Presentation from "@/components/Presentation.vue"
import NewClothesArrivalsCarrousel from "@/components/NewClothesArrivalsCarrousel.vue"
import TopSellingClothesCarrousel from "@/components/TopSellingClothesCarrousel.vue"
</script>

<template> 
  <div id="HomeContainer"> 
    <Presentation/>
    <NewClothesArrivalsCarrousel/>
    <TopSellingClothesCarrousel/>
  </div>
</template>

<style  scoped>
#HomeContainer {
  @apply 
    pb-6
  
}
</style>
