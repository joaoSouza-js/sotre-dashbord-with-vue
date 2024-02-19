<template>
  <div class="DashboardViewContainer">
    <section id="graphics_container">
      <div>
        <ProductsBarGraphic />
      </div>
      <ProductsPieGraphic />
    </section>
    <ProductTable />
  </div>
</template>

<style scoped>
.DashboardViewContainer {
  @apply pt-10
   
    pb-8
    max-w-[1280px]
    px-4
        mx-auto;
}
#graphics_container {
  @apply grid
    grid-cols-2
    items-center
    gap-10;
}
#graphics_container > div.pie_graphic {
  @apply flex
    justify-center;
}
</style>
<script>
import { PRICE_FORMATTER } from '@/utils/priceFormatter'
import {api} from "@/services/axios.js"
import ProductsBarGraphic from '@/components/Dashboard/BarGraphic.vue'
import ProductTable from '@/components/Dashboard/ProductsTable.vue'
import ProductsPieGraphic from '@/components/Dashboard/PieGraphic.vue'

export default {
  data() {
    return {
      responsive: true,
      products: [],
      loaded: true,
   
      chartOptions: {
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: false,
            text: 'rank de categoria'
          }
        }
      }
    }
  },
  async mounted() {
    await this.fetchCard()
    this.loaded = false
  },
  methods: {
    async fetchCard() {
      try {
        const usersCardProductsResponse = await api.get('/carts?limit=5')
        const usersCardProducts = usersCardProductsResponse.data

        const products = usersCardProducts.flatMap((userCard) => {
          return userCard.products
        })
        const productsWithoutReplicas = this.productsWithoutReplicas(products)
        const productsDetails = await Promise.all(
          productsWithoutReplicas.map((product) => this.fetchProductDetails(product))
        )

        this.products = productsDetails
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProductDetails(product) {
      const productResponse = await api.get(
        `/products/${product.productId}`
      )
      return {
        ...productResponse.data,
        quantity: product.quantity
      }
    },
    productsWithoutReplicas(products = []) {
      const productsWithoutReplicas = []

      for (const product of products) {
        const existingProductIndex = productsWithoutReplicas.findIndex(
          (productSaved) => productSaved.productId === product.productId
        )
        if (existingProductIndex == -1) {
          productsWithoutReplicas.push(product)
        } else {
          const productAmount =
            productsWithoutReplicas[existingProductIndex].quantity + product.quantity
          productsWithoutReplicas[existingProductIndex].quantity = productAmount
        }
      }

      return productsWithoutReplicas
    }
  },
  computed: {
    productsFormatted() {
      const productsFormatted = this.products.map((product) => {
        const priceFormatted = PRICE_FORMATTER.format(Number(product.price))

        return {
          ...product,
          price: priceFormatted
        }
      })

      return productsFormatted
    }
  },

  components: {
    ProductsBarGraphic,
    ProductsPieGraphic,
    ProductTable
  }
}
</script>
