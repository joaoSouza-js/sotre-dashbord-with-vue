# Projeto E-commerce Vue.js
![applicaiton_image_01](https://github.com/joaoSouza-js/store-dashbord-with-vue/assets/84108989/81505b92-7c9e-425e-aff7-96fb771e8811)


Este é um projeto de loja online desenvolvido utilizando Vue.js e consumindo a API Fake Store para obtenção de dados dos produtos.

## Telas

### Página Inicial
- Apresentação da loja
- Carousel de produtos utilizando vue3-carousel
- Ao clicar em um produto, o usuário é redirecionado para a página do produto com detalhes e opção de adicionar ao carrinho.

### Página do Produto
<img src="https://github.com/joaoSouza-js/store-dashbord-with-vue/assets/84108989/f9783e2e-f276-4887-9258-cc691e6e78d2" alt="Página do Produto" width="50%" height="50%" >
.
- Detalhes completos do produto (nome, descrição, preço, qualificação)
- Opção de adicionar quantidade ao carrinho e confirmar a compra
- Redirecionamento para a tela de confirmação de compras após selecionar a quantidade desejada.

### Confirmação de Compras

<img src="https://github.com/joaoSouza-js/store-dashbord-with-vue/assets/84108989/f1da38ba-f4fc-487f-ace3-1932b9b32e91" alt="Página do Produto" width="50%" height="50%" >

---
- Mostra todos os produtos do carrinho com informações de preço e nome
- Seção dedicada a informações adicionais como subtotal, desconto e frete
- Opção de excluir produtos do carrinho ou ajustar a quantidade
- Importação da tabela de produtos como PDF ou Excel

### Dashboard
<img src="https://github.com/joaoSouza-js/store-dashbord-with-vue/assets/84108989/b2518275-be56-4c5a-b2d2-d09363fcd553" alt="Página do Produto" width="50%" height="50%" >

---

- Gráfico de barras mostrando informações dos produtos mais vendidos
- Gráfico de pizza mostrando as categorias e quantidade de produtos
- Tabela com informações detalhadas dos produtos (preço, quantidade de vendas, avaliação, descrição)
- Opção de importar a tabela como PDF ou Excel

## Utilização da API Fake Store
Para exibir todas as informações dos produtos, foram necessárias algumas formatações e requisições adicionais à API. Para tornar a aplicação mais eficiente, foram utilizados conceitos assíncronos e concorrência de Promises com `Promise.all()`.

Claro, vou adicionar essas informações ao README do projeto:

## Roteamento e Estrutura SPA
Este projeto utiliza o Vue Router para gerenciar o roteamento entre as diferentes telas da aplicação. Sendo assim, a aplicação é uma SPA (Single Page Application), o que significa que apenas uma página HTML é carregada inicialmente e as demais telas são carregadas dinamicamente conforme a navegação do usuário, sem a necessidade de recarregar a página inteira.

## Estrutura MVVM
O padrão de arquitetura utilizado neste projeto é o MVVM (Model-View-ViewModel), onde:
- **Model**: Representa os dados e a lógica de negócios da aplicação.
- **View**: É a camada de apresentação responsável por exibir os dados ao usuário e capturar a interação do usuário.
- **ViewModel**: É responsável por intermediar a comunicação entre a View e o Model, fornecendo os dados necessários para a View e encaminhando as ações do usuário para o Model.

O Vue.js, por sua vez, é especialmente adequado para a implementação do padrão MVVM, facilitando a separação de preocupações e tornando o código mais organizado e fácil de dar manutenção.

Se precisar de mais alguma informação, estou à disposição para ajudar!

## Baseado em Template Figma
Este projeto foi baseado em um template existente do Figma, disponível [aqui](https://www.figma.com/file/LPPAPhvFM9vEHZ3rgmqgSV/E-commerce-Website-Template-(Freebie)-(Community)?type=design&node-id=0-1&mode=design&t=w5dLFDA2I40xDWGJ-0).

## Próximos Passos Possíveis
- Adicionar meta dados para melhorar o SEO
- Implementar server-side rendering
- Cachear requisições para melhorar o desempenho

## Hooks e Métodos Vue Utilizados
- `mounted`: Executado após a instância Vue ser montada
- `computed`: Propriedades computadas reativas
- `methods`: Métodos Vue para manipulação de dados e eventos

Agradeço por conferir este projeto e estou disponível para quaisquer dúvidas ou sugestões adicionais!

##  Configurações do projeto

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

Certamente! Abaixo estão os comandos para iniciar o projeto nos principais gerenciadores de pacotes: npm, yarn e pnpm.

```sh
# Instalar dependências
npm install
```

ou

```sh
yarn install
```

ou

```sh
pnpm install
```

### Compilar e Atualizar Automaticamente para Desenvolvimento

```sh
npm run dev
```

ou

```sh
yarn dev
```

ou

```sh
pnpm dev
```

### Compilar e Minificar para Produção

```sh
npm run build
```

ou

```sh
yarn build
```

ou

```sh
pnpm build
```

Esses comandos irão iniciar o projeto e configurar o ambiente de desenvolvimento ou compilar o projeto para produção, conforme necessário.

Se precisar de mais alguma assistência, não hesite em perguntar!


