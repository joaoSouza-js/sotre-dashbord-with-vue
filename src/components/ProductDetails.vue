<template>
  <div id="productDetailsContainer" v-if="isFetchingProductDetails === false">
    <div>
      <img :src="productDetails?.image" alt="" />
    </div>
    <section>
      <h1>{{ productDetails?.title }}</h1>

      <div class="product_rate">
        <div>
          <img src="@/assets/iconStart.svg" v-for="star in startRateList" :key="star" />
          <img v-if="hasHalfStar" src="@/assets/iconHalfStar.svg" />
        </div>
        <span> {{ productDetails?.rating?.rate ?? 0 }}/5 </span>
      </div>
      <span class="product-price">{{ productPriceFormatted }}</span>
      <p>
        {{ productDetails?.description }}
      </p>

      <div id="product_card">
        <div id="product_amount_selector">
          <button v-on:click="decreaseProductAmountSelected" title="diminuir mais uma unidade">
            <img src="@/assets/iconMinus.svg" alt="" />
          </button>
          <span>{{ productAmountSelected }}</span>
          <button v-on:click="increaseProductAmountSelected" title="adicionar mais uma unidade">
            <img src="@/assets/iconPlus.svg" alt="" />
          </button>
        </div>
        <button v-on:click="addProductsInCard" :disabled="productAmountSelected <= 0 || isSubmittingCard">
            <span v-if="isSubmittingCard === false ">Adicionar ao Carrinho</span>
            <span  v-if="isSubmittingCard " class="loader"></span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
div#productDetailsContainer {
  @apply flex
        pt-10
        justify-center
        max-w-[1280px]
        mx-auto
       
        gap-10;
}

div#productDetailsContainer > div img {
  @apply h-96
    
    rounded-[18px];
}
div#productDetailsContainer > div {
  @apply bg-slate-900 
    p-8 rounded-[20px] 
    flex items-center  
    justify-center
    w-[27.75rem]
    h-[33.125rem];
}

.loader {
    width: 1rem;
    height: 1rem;
    border: 2px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

.product_rate {
  @apply flex mt-2 items-center gap-4;
}

.product_rate > div {
  @apply flex items-center gap-[2px];
}

.product_rate img {
  @apply w-6 h-6;
}

.product_rate span {
  @apply block;
}

div#productDetailsContainer section {
  @apply pt-6
    flex-1;
}
div#productDetailsContainer section h1 {
  @apply font-bold
        text-4xl;
}

section .product-price {
  @apply font-bold
        text-3xl
        block
        mt-3;
}

section p {
  @apply text-gray-800
        mt-4
        text-base;
}

div#product_card {
  @apply flex
        items-center
        mt-6
        border-t
        border-t-gray-200
        pt-6
        gap-5;
}
div#product_card div#product_amount_selector {
  @apply flex
        items-center
        gap-9
        rounded-full
        bg-gray-300
        px-5
        py-4;
}

div#product_card > button {
  @apply bg-black
            rounded-full
            h-14
            items-center
            justify-center
            w-52
   
            text-white
            transition-all;
}
div#product_card > button:not(:disabled):hover {
  @apply bg-black/90 w-[210px];
}

div#product_card > button:disabled {
  @apply bg-black/70 cursor-not-allowed;
  
}
</style>

<script>
import axios from 'axios'
import { productRate } from '@/utils/productRate'
import { PRICE_FORMATTER } from '@/utils/priceFormatter'

export default {
  data() {
    let productDetails = null
    return {
      productDetails,
      id: this.$route.params.id,
      productAmountSelected: 0,
      isSubmittingCard: false,
      isFetchingProductDetails: true
    }
  },
  async mounted() {
    try {
      const productDetailsResponse = await axios.get(`https://fakestoreapi.com/products/${this.id}`)
      console.log(productDetailsResponse.data)
      this.productDetails = productDetailsResponse.data
    } catch (error) {
      console.error(error)
    } finally {
      this.isFetchingProductDetails = false
    }
  },
  computed: {
    productPriceFormatted() {
      const priceFormatted = PRICE_FORMATTER.format(this.productDetails?.price ?? 0)
      return priceFormatted
    },
    startRateList() {
      if (this.isFetchingProductDetails) return
      const { startRateList } = productRate(this.productDetails.rating.rate ?? 0)
      return startRateList
    },
    hasHalfStar() {
      if (this.isFetchingProductDetails) return
      const { hasHalfStar } = productRate(this.productDetails.rating.rate ?? 0)
      return hasHalfStar
    },
    increaseProductAmountSelected() {
      this.productAmountSelected++
    },
    decreaseProductAmountSelected() {
      if (this.productAmountSelected === 0) return
      this.productAmountSelected--
    },
    async addProductsInCard(){
        try {
            this.isSubmittingCard = true
            const card = {
                userId:5,
                date: String(new Date()),
                products: [
                    {productId: this.id, quantity: this.productAmountSelected}
                ]

            }
            await axios.post("https://fakestoreapi.com/carts", card)

        } catch (error) {
            console.error(error)
           
        }
        finally {
            this.isSubmittingCard = false
        }
    }
  }
}
</script>
