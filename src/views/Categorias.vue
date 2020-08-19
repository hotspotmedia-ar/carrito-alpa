<template>
  <div>

    <div class="filter-bar">
      <div class="row" style="margin-right: 15px;margin-left: -5px;">
        <input class="form-control" type="text" placeholder="Buscar..." v-model="searchTextInput" @keyup.delete="searchText.slice(0, -1)" style="text-align:center;"/>
      </div>
    </div>

    <div class="row" style="padding: 10px;paddingTop:130px;" v-if="filteredCategories.length > 0">
      <div class="col-lg-2 col-md-3 col-sm-4 col-6" style="padding-right: 0px; padding-left: 0px;" v-for="category in filteredCategories" :key="category.name" @click="categoryFilter(category)">
        <div class="container" style="padding:5px;" >
          <img :src="category.url" style="width:100%;-webkit-filter: brightness(60%);" >
          <div class="centered" style="font-weight: 500; font-size: 14px;">{{category.categoria}}</div>
        </div>
      </div>
    </div>

    <div v-else class="row" style="height: 100vh;flex-direction: column;justify-content: center;align-content: center;align-items: center;color:#aaa; marginTop: 0px;" >
      <font-awesome-icon icon="times-circle" size="2x" />
      <p class="align-self-center" style="margin-top: 15px; font-size: 18px;">No se encontraron categorías.</p>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Categorias',
  data() {
    return {
      searchText: '',
      timeout: '',
    }
  },
  computed: {
    searchTextInput: {
      get() {
        return this.searchText
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.searchText = val
        }, 500)
      }
    },
    filteredCategories() {
      let namefilter = this.categories
      if(this.searchText !== '')
        namefilter = namefilter.filter(item => item.categoria.toLowerCase().search(this.searchText.toLowerCase()) !== -1)
      return namefilter
    },
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

.filter-bar {
  background-color:white;
  padding-top: 6px;
  padding-bottom: 6px;
  position: fixed;
  width: 100%;
  margin-bottom:10px;
  margin-bottom: 10px;
  box-shadow: 0 15px 20px -15px rgba(27, 33, 58, 0.4);
  z-index: 500;
  margin-top: 60px;
}

</style>