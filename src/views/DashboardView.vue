<template>
  <downloadExcel
    class="btn btn-default"
    :data="productsFormatted"
    :fields="json_fields"
    type="xlsx"
    worksheet="Resumo de Vendas"
    name="resumo.xlsx"
  >
    Download Data
  </downloadExcel>
</template>

<script>
import { PRICE_FORMATTER } from '@/utils/priceFormatter'
import axios from 'axios'
import JsonExcel from 'vue-json-excel3'

export default {
  data() {
    return {
      products: [],
      json_fields: {
        'id': 'id',
        "Titulo": 'title',
        "Preço": 'price',
        "Categoria": "category",
        "Vendas": "quantity",
        "Avaliação": "rating.rate"
        
      },
    
    }
  },
  async mounted() {
    await this.fetchCard()
  },
  methods: {
    async fetchCard() {
      try {
        const usersCardProductsResponse = await axios.get('https://fakestoreapi.com/carts?limit=5')
        const usersCardProducts = usersCardProductsResponse.data

        const products = usersCardProducts.flatMap((userCard) => {
          return userCard.products
        })
        const productsWithoutReplicas = this.productsWithoutReplicas(products)
        const productsDetails = await Promise.all(
          productsWithoutReplicas.map((product) => this.fetchProductDetails(product))
        )
        console.log(productsDetails)

        this.products = productsDetails
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProductDetails(product) {
      const productResponse = await axios.get(
        `https://fakestoreapi.com/products/${product.productId}`
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
          price: priceFormatted,
          
        }
      })

      return productsFormatted
    },
  
  },

  component: {
    downloadExcel: JsonExcel
  }
}
</script>
