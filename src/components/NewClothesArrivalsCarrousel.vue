<template>
  <section id="newClothesArrivalsContainer">
    <strong> Novidades </strong>

    <Carousel :items-to-show="4.2" class="carousel_wappper">

      <Slide v-for="product in productsFormatted" :key="product.id">
        <div class="carousel__item">

            <button v-on:click="navigateToProductDetails(product.id)" :to="/products/+product.id" :title="'Ver mais detalhes do produto ' + product.title" >
              <img :src="product.image" />

            </button>
        
          <div class="product_information">
            <RouterLink :to="/products/+product.id" >{{ product.title }}</RouterLink>
            <div class="product_rate">
              <div>
                <img src="@/assets/iconStart.svg" v-for="star in product.startRateList" :key="star" />
                <img v-if="product.hasHalfStar" src="@/assets/iconHalfStar.svg" />
              </div>
              <span> {{ product.rating.rate }}/5 </span>
            </div>
            <span>
              {{ product.price }}
            </span>
          </div>
        </div>
      </Slide>
    </Carousel>
    <RouterLink to="/" class="sell_all" >
      Ver Todos
    </RouterLink>
    
  </section>
</template>

<style scoped>
section#newClothesArrivalsContainer {
  @apply mt-16 flex flex-col max-w-[1920px] mx-auto; 
}

section strong {
  @apply text-center font-bold text-5xl;
}

section .carousel_wappper {
  @apply mt-14 px-24;
}

.carousel__item {
  @apply w-full px-5;
}

.carousel__item> button {
  @apply bg-gray-300 p-8 rounded-[20px] flex items-center h-80 justify-center;
}

.carousel__item button img {
  border-radius: 16px;
  width: 100%;
  height: 100%;
}

.product_information {
  @apply mt-4 items-start flex flex-col;
}

.product_information>span,  .product_information a {
  @apply font-bold text-xl;
}

.product_information>span:last-of-type {
  @apply text-2xl mt-2;
}

.product_rate {
  @apply flex mt-2 items-center;
}

.product_rate>div {
  @apply flex items-center gap-1;
}

.product_rate img {
  @apply w-5 h-5;
}

.product_information .product_rate>span {
  @apply block ml-3 text-sm font-normal;
}

a.sell_all {
  @apply bg-transparent rounded-full mx-auto flex items-center justify-center py-4 px-12 border-[3px] border-gray-400 max-w-[218px] mt-9 transition-all;
}

a.sell_all:hover {
  @apply opacity-80;
}
</style>

<script>

import { defineComponent } from 'vue'
import {api} from "@/services/axios.js"
import { RouterLink } from 'vue-router'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import { PRICE_FORMATTER } from '@/utils/priceFormatter'
import { productRate } from '@/utils/productRate'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Basic',
  components: { Carousel, Slide, Pagination, Navigation },
  data() {
    return {
      isLoading: true,
      products: []
    }
  },
  async mounted() {
    try {
      const productsResponse = await api.get('/products/')
      const products = productsResponse.data
     
      this.products = products
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    
    productsFormatted() {
      const productsFormatted = this.products.map((product) => {
        const priceFormatted = PRICE_FORMATTER.format(Number(product.price))

        const formatTitle = product.title.length > 24 
          ? product.title.slice(0, 24).concat('...') 
          : product.title
        const {hasHalfStar,startRateList} = productRate(Number(product.rating.rate))
        

        return {
          ...product,
          price: priceFormatted,
          title: formatTitle,
          hasHalfStar: hasHalfStar,
          startRateList
        }
      })

      return productsFormatted
    },
  
  },
  methods: {
    navigateToProductDetails(productId){
      this.$router.push({
        name: 'product',
        params: { id: productId }
      })
    }
  }
})
</script>
