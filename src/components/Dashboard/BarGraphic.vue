<template>
  <div>
    <Bar
      v-if="this.$parent.loaded === false"
      id="my-chart-id"
      :options="chartOptions"
      :data="BarChartData"
      style="height: 500px"
    />
  </div>
</template>

<script>
import uniqolor from 'uniqolor'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
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

  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale
)
export default {
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{ data: [], backgroundColor: '', label: 'Produtos' }]
      },
      chartOptions: {
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: false,
            text: 'rank de produtos'
          }
        }
      }
    }
  },
  computed: {
    BarChartData() {
      const products = this.$parent.products
      const productsLabel = products.map((product) => product.title.slice(0, 10))
      const productData = products.map((product) => product.quantity)
      const tableColor = uniqolor.random({
        saturation: 60,
      }).color
      return {
        labels: productsLabel,
        datasets: [{ data: productData, backgroundColor: tableColor, label: 'Produtos' }]
      }
    }
  },
  components: {
    Bar
  }
}
</script>
