<template>
  <div class="home" style="padding-top:60px;" ref="home">
   
   
    <div class="filter-bar">
        <div class="row" style="margin-right: 15px;margin-left: -5px;">
          <input class="form-control" type="text" placeholder="Buscar..." v-model="searchTextInput" @keyup.delete="searchText.slice(0, -1)" style="text-align:center;"/>
        </div>
      </div>
   



    <!-- <div class="row" style="padding: 10px;paddingTop:70px">
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
        </figure>
      </div>
    </div> -->

    <div v-if="this.searchCategory !== ''" style="padding: 70px 20px 20px; align-items: center;" class="row">
      <div class="col-1">
        <button class="btn btn-sm btn-outline-danger" @click="searchCategory = ''">
          <font-awesome-icon icon="times" class=""></font-awesome-icon>
        </button>
      </div>
      <div class="col-10" style="margin-left: 15px; text-align: left;">
        <p style="margin-bottom: 0;font-size: 11pt;">Categoría</p>
        <p style="margin-bottom: 0;font-size: 12pt;font-weight: 600;">{{this.searchCategory}}</p>
      </div>
    </div>

    <div class="row" :style="{'padding': '20px', 'paddingTop': (this.searchCategory == '') ? '70px' : '0px'}" v-if="this.filteredProducts.length > 0">
        <ul class="list-group" style="width: 100%;">
          <li class="list-group-item" v-for="product in filteredProducts" :key="product.id" @click="showAddToCartModal(product)" style="padding: 0;margin: 0;">
            <p class="font-weight-bolder product-id" style="text-align: left;padding-left: 20px;">#{{product.id}}</p>
            <p class="text-uppercase font-weight-bolder category" style="text-align: left;padding-left: 20px;">{{product.categoria}}</p>
            <p style="text-align: left;padding-left: 20px;"><a href="#" class="title">{{product.name}}</a></p>
          </li>
        </ul>
    </div>

    <div v-else class="row" style="height: 100vh;flex-direction: column;justify-content: center;align-content: center;align-items: center;color:#aaa;" :style="{ 'marginTop': (this.searchCategory == '') ? '-50px' : '-185px' }">
      <font-awesome-icon icon="times-circle" size="2x" />
      <p class="align-self-center" style="margin-top: 15px; font-size: 18px;">No se encontraron productos.</p>
    </div>

    <!-- float button 'Ver carrito' -->
    <div class="btn btn-primary" style="position: fixed; bottom: 10px; left: 50%; right: 50%; transform: translateX(-50%); width: 200px; border-radius: 5px; margin-bottom: 10px; font-weight: 600;-webkit-box-shadow: 0px 0px 105px -39px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 105px -39px rgba(0,0,0,0.75);box-shadow: 0px 0px 105px -39px rgba(0,0,0,0.75);"
      @click="$router.push({ name: 'Carrito' })">
      <font-awesome-icon icon="shopping-cart" size="lg"></font-awesome-icon> Ver carrito
    </div>


    <modal name="add-to-cart-modal" :adaptive=true :max-width="300" width="80%" height="auto" styles="border-radius: 10px;">
        <div style="display: flex; place-content: flex-end;">
          <button class="btn float-right" @click="$modal.hide('add-to-cart-modal')">
            <font-awesome-icon icon="times" />
          </button>
        </div>
        <div style="display: flex; flex-direction: column;align-items: center; padding: 25px;">
          <!-- <img :src="this.productToAdd.url" style="width: 150px; height: 150px;"> -->
          <p style="margin-top: 20px;">{{this.productToAdd.name}}</p>
          <div class="row" style="align-items: baseline;">
            <number-input v-model="productToAdd.quantity" :min="1" size="small" center inline controls></number-input>
          </div>
          <div style="margin-top: 20px;">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-sm" :class="{'btn-primary': (productToAdd.quantityType == 'bultos')}" style="border: #ced4da 1px solid">
                  <input type="radio" autocomplete="off" @click="productToAdd.quantityType = 'bultos'; formError = false"> BULTOS
              </label>
              <label class="btn btn-sm" :class="{'btn-primary': (productToAdd.quantityType == 'unidades')}" style="border: #ced4da 1px solid">
                  <input type="radio" autocomplete="off" @click="productToAdd.quantityType = 'unidades'; formError = false"> UNIDADES
              </label>
            </div>
          <p style="font-size: 10pt; margin-top: 5px;">{{productToAdd.quantityTypeDescription}}</p>
          </div>

          <b-alert :show="this.formError" variant="danger" style="margin-top: 10px;margin-bottom: 0;padding-top: 5px;padding-bottom: 5px;padding-left: 10px;padding-right: 10px;font-size:9pt;">
            Debes seleccionar bultos o unidades
          </b-alert>

          <button type="button" class="btn btn-primary" style="margin-top: 20px;" @click="validateAddModal()">
            <font-awesome-icon icon="cart-plus" size="lg"></font-awesome-icon>
            <span style="font-weight: 600;margin-left: 10px;">Agregar al carrito</span>
          </button>
        </div>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    filteredProducts() {
      let namefilter = this.$store.state.products.all
      if(this.searchText !== '')
        namefilter = namefilter.filter(item => item.name.toLowerCase().search(this.searchText.toLowerCase()) !== -1)
      
      let categoryfilter = namefilter
      if (this.searchCategory !== '')
        categoryfilter = namefilter.filter(item => item.categoria.toLowerCase() == this.searchCategory.toLowerCase())

      return categoryfilter
    },
    categories() {
      let categories_temp = []
      this.$store.state.products.all.forEach((item) => {
        categories_temp.indexOf(item.categoria) == -1 ? categories_temp.push(item.categoria) : ''
      })
      return categories_temp.sort()
    },
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
      this.productToAdd.quantityType = ''
      this.productToAdd.quantityTypeDescription = product.quantityTypeDescription
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
    validateAddModal() {
      if(this.productToAdd.quantityType == '')
      {
        this.formError = true
      }
      else{
        this.addProductToCart(this.productToAdd)
        this.$modal.hide('add-to-cart-modal')
        this.showToastProductAdded();
      }
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
        quantity: 1,
        quantityType: '',
      },
      searchText: '',
      searchCategory: '',
      timeout: '',
      formError: false
    }
  },
  created () {
    this.$store.dispatch('products/getAllProducts')
    if('category' in this.$route.params)
      this.searchCategory = this.$route.params.category
    else
      this.searchCategory = ''
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
  margin-bottom:10px;
  margin-bottom: 10px;
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

*:focus
{
    box-shadow: none !important;
    border: solid 1px red( any color ) !important;
}

</style>