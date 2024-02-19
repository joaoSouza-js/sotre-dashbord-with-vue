<template>
  <section>
    <div id="presentation-content">
      <div>
        <h1>Encontre roupas que combinem com o seu estilo</h1>
        <p>
          Navegue pela nossa ampla gama de peças meticulosamente elaboradas, projetadas para realçar
          a sua individualidade e atender ao seu senso de estilo
        </p>
        <button>Compre Agora</button>
        <div id="presentation-store-highlights">
          <div>
            <strong>+ 200</strong>
            <span>Marcas Internacionais</span>
          </div>
          <div>
            <strong>+ 2,000</strong>
            <span>Produtos de Alta Qualidade</span>
          </div>
          <div>
            <strong>+ 30,000</strong>
            <span>Clientes Satisfeitos</span>
          </div>
        </div>
      </div>
      <img src="@/assets/presentation.png" />
    </div>
    <footer>
      <img v-for="brand in brands" v-bind:key="brand.name" :src="brand.image" :title="brand" />
    </footer>
  </section>
</template>
<style scoped>
#presentation-content {
  @apply flex px-24  bg-gray-300 justify-center;
}
#presentation-content > div:nth-of-type(1) {
  @apply pt-20;
}
#presentation-content > img:nth-of-type(1) {
  @apply pt-6;
}
#presentation-content h1 {
  @apply text-6xl font-bold  uppercase tracking-wide;
}

#presentation-content p {
  @apply text-gray-800 mt-8;
}
#presentation-content button {
  @apply bg-black
            rounded-full
            py-4
            px-12
            mt-8
            text-white
            transition-all;
}
#presentation-content button:hover {
  @apply bg-black/80
            rounded-full
            py-4
            px-12
            mt-8
            text-white;
}

#presentation-content #presentation-store-highlights {
  @apply flex flex-wrap  items-center mt-12 gap-8;
}

#presentation-content #presentation-store-highlights div:nth-last-of-type(2) {
  @apply px-6
            border-x
            border-x-gray-800;
}

#presentation-content #presentation-store-highlights strong {
  @apply font-bold
            text-4xl;
}

#presentation-content #presentation-store-highlights span {
  @apply block
            text-gray-800;
}

footer {
  @apply bg-black
        flex
        flex-wrap
        gap-24
        pt-12
        pb-8
        px-16
        justify-center;
}
</style>

<script>
import { brands } from '@/utils/brands'

export default {
  data() {
    return {
      brands
    }
  }
}
</script>
