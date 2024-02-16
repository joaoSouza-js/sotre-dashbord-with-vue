<template>
  <div class="DashboardViewContainer">
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
    <section id="graphics_container">
      <div>
        <Bar
          v-if="loaded === false"
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
          style="height: 500px"
        />
      </div>

      <div class="pie_graphic">
        <Pie v-if="loaded === false" style="height: 350px" id="my-chart-iddd" :data="charDataPie" />
      </div>
    </section>

    <div class="downloadFile">
      <button @click="downloadPdf">pdf</button>
      <downloadExcel
        class="button"
        :data="productsFormatted"
        :fields="json_fields"
        type="xlsx"
        worksheet="Resumo de Vendas"
        name="resumo.xlsx"
      >
        Excel
      </downloadExcel>
    </div>
    <VueHtml2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="myPDF"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
          <table  border="1" ref="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
      
                <th>Rating</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in productsFormatted" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.title }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.rating.rate }}</td>
                <td>{{ product.quantity }}</td>
              </tr>
            </tbody>
          </table>

        </section>
      </VueHtml2pdf>
  </div>
</template>

<style scoped>
.DashboardViewContainer {
  @apply pt-10
   
    pb-8
    max-w-[1280px]
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
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}

table,
th,
td {
  @apply border
    border-gray-800;
}

table th,
table td {
  @apply text-lg
  px-5;
}

th,
td {
  padding: 12px; /* Increased padding for more space */
  text-align: left;
}

/* Centering tbody content */
tbody {
  text-align: center;
}

th:nth-child(3),
td:nth-child(3),
th:nth-child(5),
td:nth-child(5),
th:nth-child(6),
td:nth-child(6),
th:nth-child(7),
td:nth-child(7) {
  text-align: center;
  width: 7.5rem; /* Adjust the width as needed */
}

table,
th,
td {
  border: 1px solid black;
}

th,
td {
  padding: 8px;
  text-align: left;
}

.downloadFile {
  @apply flex

    justify-end
    gap-2
   mt-8;
}

.downloadFile button,
.downloadFile .button {
  color: red;
  @apply w-28
    border-2
    uppercase
    text-gray-700
    border-gray-400
    flex
    text-lg
    justify-center
    font-bold
    py-3
  
    rounded-lg
    cursor-pointer;
}
</style>
<script>
import { PRICE_FORMATTER } from '@/utils/priceFormatter'
import axios from 'axios'
import uniqolor from 'uniqolor'
import * as jspdf from 'jspdf';
import 'jspdf-autotable'; // Importe a biblioteca jspdf-autotable


import { sliceText } from '@/utils/sliceText'
import JsonExcel from 'vue-json-excel3'
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
  data() {
    return {
      responsive: true,
      products: [],
      loaded: true,
      chartData: {
        labels: [],
        datasets: [{ data: [], backgroundColor: '', label: 'Categorias' }]
      },
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
      },
      charDataPie: {
        labels: [],
        datasets: [
          {
            label: 'Categorias',
            data: [],
            backgroundColor: []
          }
        ]
      },
      json_fields: {
        id: 'id',
        Titulo: 'title',
        Preço: 'price',
        Categoria: 'category',
        Vendas: 'quantity',
        Avaliação: 'rating.rate'
      }
    }
  },
  async mounted() {
    await this.fetchCard()
    const productsLabeldd = this.products.map((product) => product.title.slice(0, 10))
    const productDatadd = this.products.map((product) => product.quantity)
    const { productLabels, productDataSets } = this.productCategoryInformation()
    console.log('productLabels => ', productLabels)
    this.chartData = {
      labels: productsLabeldd,
      datasets: [{ data: productDatadd, backgroundColor: '#f87979', label: 'Categorias' }]
    }
    this.loaded = false

    const colors = productDataSets.map((product) => {
      return uniqolor.random(product.title).color
    })

    this.charDataPie = {
      labels: productLabels,
      datasets: [
        {
          label: 'Categorias',
          data: productDataSets,
          backgroundColor: colors
        }
      ]
    }
  },
  methods: {
    pdfDownload(){
      html2pdf(document.getElementById("downloadFile"),{
        margin: 1,
        filename: "resumo.pdf"
      })
    },
    productCategoryInformation() {
      const productsCategory = []
      for (const product of this.products) {
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
    },
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
    },
    downloadPdf() {
      const doc = new jspdf.jsPDF();
      const tableData = this.getTableData();

      doc.autoTable({
        head: [Object.keys(tableData[0])],
        body: tableData.map(Object.values)
      });

      doc.save('tabela.pdf');
    },
    getTableData() {
      const table = this.$refs.table;
      const tableData = [];
      const headers = [];
      
      for (let i = 0; i < table.rows[0].cells.length; i++) {
        headers.push(table.rows[0].cells[i].textContent);
      }

      for (let i = 1; i < table.rows.length; i++) {
        const rowData = {};
        for (let j = 0; j < table.rows[i].cells.length; j++) {
          rowData[headers[j]] = table.rows[i].cells[j].textContent;
        }
        tableData.push(rowData);
      }

      return tableData;
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
    Bar,
    Pie,
    
    component: {
      downloadExcel: JsonExcel
    }
  }
}
</script>
