<template>
  <section>
    <strong> Novidades </strong>

    <Carousel :items-to-show="4.2" class="carousel_wappper">
      <Slide v-for="product in productsFormatted" :key="product.id">
        <div class="carousel__item">
          <div>
            <img :src="product.image" />
          </div>
          <div class="product_information">
            <span>{{ product.title }}</span>
            <div class="product_rate">
              <div>
                <img
                  src="@/assets/iconStart.svg"
                  v-for="star in product.startRateList"
                  :key="star"
                />
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

    <a>Ver Todos</a>
  </section>
</template>

<style scoped>
section {
  @apply mt-16  flex flex-col;
}
section strong {
  @apply text-center
    font-bold
    text-5xl;
}
section .carousel_wappper {
  @apply mt-14
        px-24;
}
.carousel__item {
  @apply w-full
 px-5;
}
.carousel__item > div:first-of-type {
  @apply bg-gray-300
        p-8
        rounded-[20px]
        flex
        items-center
        h-80
        justify-center;
}

.carousel__item div img {
  border-radius: 16px;
  width: 100%;
  height: 100%;
}
.product_information {
  @apply mt-4
   
    items-start
    flex
    flex-col;
}
.product_information > span {
  @apply font-bold
    text-xl;
}

.product_information > span:last-of-type {
  @apply text-2xl
    mt-2;
}
.product_rate {
  @apply flex
  mt-2
    items-center;
}
.product_rate > div {
  @apply flex
    items-center
    gap-1;
}
.product_rate img {
  @apply w-8
    h-8;
}

.product_information .product_rate > span {
  @apply block
      ml-3
      text-sm
      font-normal;
}

a {
  @apply bg-transparent
            rounded-full
            mx-auto
            flex
            items-center
            justify-center
            py-4
            px-12
            border-[3px]
            border-gray-300
            max-w-[218px]
            mt-9
            transition-all;
}
a:hover {
  @apply opacity-80;
}
</style>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import { PRICE_FORMATTER } from '@/utils/priceFormatter'
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
      const productsResponse = await axios.get('https://fakestoreapi.com/products')
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

        const formatTitle = product.title.slice(0, 28).concat('...')
        const productRatingInteger = Math.floor(Number(product.rating.rate))
        const hasHalfStar = Number(product.rating.rate) - productRatingInteger > 0
        const startRateList = Array.from(
          {
            length: productRatingInteger
          },
          (_, index) => index
        )

        return {
          ...product,
          price: priceFormatted,
          title: formatTitle,
          hasHalfStar: hasHalfStar,
          startRateList
        }
      })

      return productsFormatted
    }
  }
})
</script>
