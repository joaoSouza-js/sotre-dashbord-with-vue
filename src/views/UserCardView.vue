<template>
  <div id="userCardViewContainer">
    <h1>vamos pagar</h1>
    <div id="userCardViewContent">
      <ul>
        <li v-for="(product, index) in productsFormatted" :key="product.id">
          <img :src="product.image" alt="" />
          <div>
            <header>
              <strong> {{ product.title }}</strong>
              <button v-on:click="removeProduct(product.id)">
                <img src="@/assets/iconTrash.svg" />
              </button>
            </header>
            <footer>
              <strong> {{ product.price }} </strong>
              <div class="product_amount_selector">
                <button v-on:click="decreaseProductAmount(product.id,index)" title="diminuir mais uma unidade">
                  <img src="@/assets/iconMinus.svg" alt="" />
                </button>
                <span>{{ product.quantity }}</span>
                <button v-on:click="increaseProductAmount(product.id,index)" title="adicionar mais uma unidade">
                  <img src="@/assets/iconPlus.svg" alt="" />
                </button>
              </div>
            </footer>
          </div>
        </li>
      </ul>
      <section>
        <h2>Resumo do Pedido</h2>
        <div id="product_information">
          <div id="product_information_header">
            <span>Subtotal</span>
            <span>{{ formatPrice(allProductsPrice) }}</span>
          </div>
          <div>
            <span>Desconto (-20%)</span>
            <span>{{ productDiscount(20) }}</span>
          </div>
          <div>
            <span>Taxa de Entrega</span>
            <span>15</span>
          </div>
          
        </div>

        <div id="product_total">
          <span>Total</span>
          <span>{{ finalPrice() }}</span>
        </div>

        <button>Finalizar compra</button>
      </section>
    </div>
  </div>
</template>

<style scoped>
div#userCardViewContainer {
  @apply pt-10
       
        max-w-[1280px]
        mx-auto;
}
div#userCardViewContainer h1 {
  @apply text-4xl
    font-bold;
}
div#userCardViewContent {
  @apply 
    gap-5
    mt-24;
  display: grid;
  grid-template-columns: 60% 40%;
    align-items: start
}
div#userCardViewContent ul {
  @apply border
        border-gray-400
       
        rounded-[20px]
        px-6;
}
div#userCardViewContent ul li {
  @apply flex
        py-6
    
        items-center;
}
div#userCardViewContent ul li:not(:first-child) {
  @apply border-t-gray-400
    border-t;
}
div#userCardViewContent ul li > img {
  @apply object-contain
        w-32
        h-32
        rounded-[20px];
}
div#userCardViewContent ul li > div {
  @apply flex
        flex-col
        justify-between
        flex-1
        h-32;
}
div#userCardViewContent ul li > div header {
  @apply flex
       
        justify-between;
}
div#userCardViewContent ul li > div header strong {
  @apply text-xl
        font-bold;
}

div.product_amount_selector {
  @apply flex
        items-center
        gap-9
        rounded-full
        bg-gray-300
        px-5
        py-4;
}

div.product_amount_selector button img {
  @apply w-5
        h-5;
}

div#userCardViewContent ul footer {
  @apply flex
    items-center
    justify-between;
}
div#userCardViewContent ul footer strong {
  @apply text-xl
        font-bold;
}

section {
  @apply border
        border-gray-400
       
        rounded-[20px]
        px-6
        pt-5
        pb-12;
}

section h2 {
  @apply text-2xl
        font-bold;
}

section div:nth-of-type(1) {
  @apply flex-col
        flex
        gap-5;
}
#product_information {
  @apply mt-6;
}

#product_information div {
  @apply text-xl
        text-gray-900;
}

#product_information > div {
  @apply flex
        justify-between
        flex-row;
}

#product_information > div span:nth-of-type(1) {
  @apply text-gray-800;
}

#product_information span:nth-of-type(2),
#product_total span:nth-of-type(2) {
  @apply font-bold;
}

#product_total {
  @apply flex
        justify-between
        border-t
        border-t-gray-400
        pt-5
        mt-5
        text-xl;
}

section button {
}

section > button {
  @apply bg-black
            rounded-full
            h-14
            mt-6
            items-center
            justify-center
          w-full
   
            text-white
            transition-all;
}
section > button:not(:disabled):hover {
  @apply bg-black/90 
}

section > button:disabled {
  @apply bg-black/70 cursor-not-allowed;
}
</style>

<script>
import {api} from "@/services/axios.js"
import { PRICE_FORMATTER } from '@/utils/priceFormatter'

export default {
  data() {
    return {
      isFetchingCard: true,
      products: [],
      allProductsPrice: 0,
      discount: 20,
      Fee: 15
    }
  },
  async mounted() {
    await this.fetchUserProducts();
    this.calculateTotalPriceAndDiscount();
    this.isFetchingCard = false;
  },
  computed: {
    productsFormatted() {
      const productsFormatted = this.products.map((product) => {
        const priceFormatted = PRICE_FORMATTER.format(Number(product.price))
        const formatTitle = product.title.length > 24 ? product.title.slice(0, 24).concat('...') : product.title
        return {
          ...product,
          title: formatTitle,
          price: priceFormatted
        }
      })
      return productsFormatted
    },
  },
  methods: {
    formatPrice(price=0) {
      const priceFormatted = PRICE_FORMATTER.format(Number(price))
      return priceFormatted
    },
    productDiscount(discount) {
      const productWithDiscount = this.allProductsPrice * (discount / 100)
      const productWithDiscountFormatted = PRICE_FORMATTER.format(productWithDiscount * -1)
      return productWithDiscountFormatted
    },
    finalPrice() {
      const productWithDiscount = this.allProductsPrice * (this.discount / 100)
      const finalPrice = this.allProductsPrice - productWithDiscount + this.Fee
      return PRICE_FORMATTER.format(finalPrice)
    },
    async removeProduct(productId) {
      this.products = this.products.filter(product => product.id !== productId)
      
      this.calculateTotalPriceAndDiscount();
    },
    async increaseProductAmount(productId, index) {
    
      this.products[index].quantity++;
      // Recalculate total price and discount
      this.calculateTotalPriceAndDiscount();
    },
    async decreaseProductAmount(productId, index = 0) {
      
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
        this.calculateTotalPriceAndDiscount();
      }
    },
    async fetchUserProducts() {
      try {
      
        const userProductsResponse = await api.get('/carts/user/2')
        const userProducts = userProductsResponse.data[0]
        const products = await Promise.all(userProducts.products.map(this.fetchProductDetails))
        
        this.products = products
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProductDetails(product) {
      const productResponse = await api.get(`/products/${product.productId}`)
      return {
        ...productResponse.data,
        quantity: product.quantity
      }
    },
    calculateTotalPriceAndDiscount() {
      this.allProductsPrice = this.products.reduce((total, product) => total + (product.price * product.quantity), 0)
    }
  }
}
</script>

