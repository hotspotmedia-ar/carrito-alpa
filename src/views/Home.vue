<template>
  <div class="home" style="padding-top:60px;" ref="home">
   
   
    <div class="row filter-bar" v-if="this.boolShowFilters">
      <div class="col-6" style="padding-right:5px;">
        <input class="form-control" type="text" placeholder="Buscar..." v-model="searchText" style="text-align:center;" v-on:input="searchQuery = $event.target.value"/>
      </div>
      <div class="col-6" style="padding-left:5px;">
        <select class="form-control" placeholder="asd" v-model="searchCategory" style="text-align: center;text-align-last: center;-moz-text-align-last: center;">
          <option value="" disabled selected hidden>Categorías</option>
          <option value="">TODAS</option>
          <option v-for="category in this.categories" :key="category" :value="category">{{category}}</option>
        </select>
      </div>
    </div>
   



    <div class="row" style="padding: 10px;" :style="{ 'paddingTop': this.boolShowFilters? '70px' : '10px' }">
      <div class="col-lg-2 col-md-3 col-sm-4 col-6" style="padding-right: 5px; padding-left: 5px;" v-for="product in filteredProducts" :key="product.id">
        <figure class="card card-product-grid" @click="showAddToCartModal(product)">
          <div class="img-wrap">
            <img :src="product.url" style="width: 100%; border: none !important;">
          </div>
          <figcaption class="info-wrap border-top text-center" style="border: none !important;padding-right: 5px;padding-left: 5px;">
            <p class="font-weight-bolder product-id">#{{product.id}}</p>
            <p class="text-uppercase font-weight-bolder category">{{product.categoria}}</p>
            <p><a href="#" class=" title">{{product.name}}</a></p>
          </figcaption>
        </figure> <!-- card // -->
      </div>
    </div>

    <modal name="add-to-cart-modal" :adaptive=true :max-width="300" width="80%" height="auto" styles="border-radius: 10px;">
      <!-- <div class="row"> -->
        <div style="display: flex; place-content: flex-end;">
          <button class="btn float-right" @click="$modal.hide('add-to-cart-modal')">
            <font-awesome-icon icon="times" />
          </button>
        </div>
        <div style="display: flex; flex-direction: column;align-items: center; padding: 25px;">
          <img :src="this.productToAdd.url" style="width: 150px; height: 150px;">
          <p style="margin-top: 20px;">{{this.productToAdd.name}}</p>
          <div class="row" style="align-items: baseline;">
            <number-input v-model="productToAdd.quantity" :min="1" size="small" center inline controls></number-input>
          </div>
          <button type="button" class="btn btn-primary" style="margin-top: 20px;" @click="addProductToCart(productToAdd);$modal.hide('add-to-cart-modal');showToastProductAdded();">Agregar</button>
        </div>
      <!-- </div> -->
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    filteredProducts() {
      let namefilter = this.$store.state.products.all.filter(item => item.name.toLowerCase().search(this.searchText.toLowerCase()) !== -1)
      let categoryfilter = namefilter.filter(item => item.categoria.toLowerCase().search(this.searchCategory.toLowerCase()) !== -1)
      return categoryfilter
    },
    categories() {
      let categories_temp = []
      this.$store.state.products.all.forEach((item) => {
        categories_temp.indexOf(item.categoria) == -1 ? categories_temp.push(item.categoria) : ''
      })
      return categories_temp.sort()
    },
    ...mapState({
      products: state => state.products.all,
      cart: state => state.cart.items
    })
  },
  methods: {
    showAddToCartModal(product) {
      this.productToAdd.id = product.id
      this.productToAdd.name = product.name
      this.productToAdd.url = product.url
      this.productToAdd.quantity = 1
      this.$modal.show('add-to-cart-modal');
    },
    showToastProductAdded() {
      this.$toasted.show("&nbsp;&nbsp;Producto agregado!", {
        position: "bottom-left", 
        duration : 2000,
        iconPack: 'fontawesome',
        icon: {
          name: 'fa-cart-plus'
        },
        type: 'success',
        singleton: 'true'
      })
    },
    showFilters() {
      this.boolShowFilters = !this.boolShowFilters
    },
    ...mapActions('cart', [
      'addProductToCart'
    ])
  },
  data() {
    return {
      productToAdd: {
        id: 0,
        name: '',
        url: '',
        quantity: 1
      },
      searchText: '',
      searchCategory: '',
      boolShowFilters: false
    }
  },
  created () {
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>


<style scoped>

.title {
  font-size: 9pt;
  color: #0375BB;
  font-weight: 600;
}
.category {
  font-size: 7pt;
  color: #7F0760;
  /* margin-top: -10px; */
  margin-bottom: 0;
}

.product-id {
  font-size:11px;
  margin-bottom: 0;
  margin-top: 10px;
}

.filter-bar {
  background-color:white;
  padding-top: 6px;
  padding-bottom: 6px;
  position: fixed;
  width: 100%;
  /* margin-bottom:10px; */
  /* margin-bottom: 10px; */
  box-shadow: 0 15px 20px -15px rgba(27, 33, 58, 0.4);
  z-index: 500;
}

</style>

<style>

.toasted {
  margin-bottom: 15px;
  margin-right: 10px;
  margin-left: 10px;
  -webkit-box-shadow: 10px 10px 49px -9px rgba(0,0,0,0.75) !important;
  -moz-box-shadow: 10px 10px 49px -9px rgba(0,0,0,0.75) !important;
  box-shadow: 10px 10px 49px -9px rgba(0,0,0,0.75) !important;
  border-radius: 5px !important;
  width: 80%;
}

</style>