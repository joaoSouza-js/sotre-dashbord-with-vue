<template>
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

  <section slot="pdf-content">
    <table border="1" ref="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Preço</th>
          <th>Descrição</th>
          <th>Categoria</th>

          <th>Avaliação</th>
          <th>Quantidade</th>
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
</template>

<style scoped>

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
</style>

<script>
import { PRICE_FORMATTER } from '@/utils/priceFormatter'
import JsonExcel from 'vue-json-excel3'
import 'jspdf-autotable'; // Importe a biblioteca jspdf-autotable

import * as jspdf from 'jspdf'

export default {
  data() {
    return {
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
  computed: {
    productsFormatted() {
      const productsFormatted = this.$parent.products.map((product) => {
        const priceFormatted = PRICE_FORMATTER.format(Number(product.price))

        return {
          ...product,
          price: priceFormatted
        }
      })

      return productsFormatted
    }
  },
  methods: {
    downloadPdf() {
      const doc = new jspdf.jsPDF()
      const tableData = this.getTableData()

      doc.autoTable({
        head: [Object.keys(tableData[0])],
        body: tableData.map(Object.values)
      })

      doc.save('tabela.pdf')
    },
    getTableData() {
      const table = this.$refs.table
      const tableData = []
      const headers = []

      for (let i = 0; i < table.rows[0].cells.length; i++) {
        headers.push(table.rows[0].cells[i].textContent)
      }

      for (let i = 1; i < table.rows.length; i++) {
        const rowData = {}
        for (let j = 0; j < table.rows[i].cells.length; j++) {
          rowData[headers[j]] = table.rows[i].cells[j].textContent
        }
        tableData.push(rowData)
      }

      return tableData
    }
  },
  component: {
    downloadExcel: JsonExcel
  }
}
</script>
