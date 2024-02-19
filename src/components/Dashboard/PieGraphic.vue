<template>
 
  <div class="pie_graphic">
    <Pie 
        v-if="this.$parent.loaded === false" 
        style="height: 350px" 
        id="my-chart-iddd" 
        :data="chartPieProductsData" 
        />
  </div>
</template>

<script>
import uniqolor from 'uniqolor'
import { Bar, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  CategoryScale,
  Legend,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale
)
export default {
  name: 'pie-graphic',
  data() {
    return {
      charDataPie: {
        labels: [],
        datasets: [
          {
            label: 'Categorias',
            data: [],
            backgroundColor: []
          }
        ]
      }
    }
  },
  methods: {
    productCategoryInformation() {
      const productsCategory = []
      for (const product of this.$parent.products) {
        const productExistInProductCategory = productsCategory.findIndex(
          (productCategory) => productCategory.category === product.category
        )
        if (productExistInProductCategory === -1) {
          productsCategory.push(product)
        } else {
          const productQuantity =
            product.quantity + productsCategory[productExistInProductCategory].quantity
          productsCategory[productExistInProductCategory].quantity = productQuantity
        }
      }

      const productLabels = productsCategory.map((product) => product.category)
      const productDataSets = productsCategory.map((product) => product.quantity)

      return {
        productLabels,
        productDataSets
      }
    }
  },
computed: {
  chartPieProductsData() {
    const { productLabels, productDataSets } = this.productCategoryInformation();
    
    // Now that productDataSets is defined, you can use it here
    const colors = productDataSets.map((product) => {
      return uniqolor.random(product.title).color;
    });

    return {
      labels: productLabels,
      datasets: [{
        label: 'Categorias',
        data: productDataSets,
        backgroundColor: colors
      }]
    };
  }
},

  
  components: {
    Pie
  }
}
</script>
