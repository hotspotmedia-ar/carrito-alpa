<template>
  <div>
    <div class="row" style="padding: 10px;paddingTop:70px;">
      <div class="col-lg-2 col-md-3 col-sm-4 col-6" style="padding-right: 0px; padding-left: 0px;" v-for="category in categories" :key="category.name" @click="categoryFilter(category)">
        <div class="container" style="padding:5px;" >
          <img :src="category.url" style="width:100%;-webkit-filter: brightness(60%);" >
          <div class="centered" style="font-weight: 500; font-size: 14px;">{{category.categoria}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Categorias',
  computed: {
    ...mapState({
      products: state => state.products.all,
      cart: state => state.cart.items,
      categories: state => state.products.categories
    })
  },
  methods: {
    categoryFilter(category) {
      this.$router.push({ name: 'Tienda', params: { category: category.categoria } })
      // this.$router.push({ name: 'Tienda' })
    },
    ...mapActions([
      'getAllCategories',
    ])
  },
  created () {
    this.$store.dispatch('products/getAllCategories')
  }
}
</script>


<style scoped>

.container {
  position: relative;
  text-align: center;
  color: white;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>