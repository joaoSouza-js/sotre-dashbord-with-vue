<script>
import { RouterLink } from 'vue-router'
import SearchIcon from '@/assets/search.svg'
</script>
<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <nav>
      <RouterLink to="/">Loja</RouterLink>
      <RouterLink to="/about">Novos Produtos</RouterLink>
      <RouterLink to="/">Marcas</RouterLink>
      <RouterLink to="/about">Dashboard</RouterLink>
    </nav>
    <form>
      <img alt="Vue logo" src="@/assets/search.svg" />

      <input type="text" placeholder="buscar produtos" />
    </form>
    <nav>
      <RouterLink to="/" title="Navegar para perfil">
        <img alt="ícone do usuário" src="@/assets/iconUser.svg" />
      </RouterLink>
      <RouterLink to="/" title="Checar carrinho">
        <img alt="ícone de um carrinho de compras" src="@/assets/iconCard.svg" />
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  @apply py-6 px-6 flex gap-10 items-center justify-center fixed bg-white left-0 right-0 z-10;
}

nav:first-of-type {
  @apply flex items-center gap-6;
}

nav:first-of-type a {
  @apply text-black;
}

nav a.router-link-exact-active {
  @apply underline text-gray-800 font-bold;
}

header form {
  @apply bg-gray-200 rounded-[62px] flex gap-3 py-3 px-4 border w-[602px];
}

header form:focus-within {
  @apply border-gray-500;
}

header form img {
  @apply h-6 w-6;
}

header form input {
  @apply border-none outline-none bg-transparent text-gray-700 flex-1;
}

header form input::placeholder {
  @apply text-gray-700;
}

nav:last-of-type {
  @apply flex  gap-3;
}

nav:last-of-type img {
  @apply w-6
     h-6;
}
</style>
