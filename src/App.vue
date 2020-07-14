<template>
  <div id="app">
    <div id="nav" class="row vertical-center">
    
      <div class="col-2">
        <router-link v-if="$router.currentRoute.name === 'Carrito'" to="/" class="float-left">
          <font-awesome-icon icon="chevron-left" size="lg" />
        </router-link>
        <a class="float-left" v-if="$router.currentRoute.name !== 'Carrito'">
          <font-awesome-icon icon="search" size="lg" @click="this.showFilters" />
        </a>
      </div>
      <div class="col-8">
        <img src="https://papeleraalpa.com.ar/wp-content/uploads/2019/10/cropped-logo-alpa-2.png" height="40px" />
      </div>
      <div class="col-2">
        <router-link v-if="$router.currentRoute.name !== 'Carrito'" to="/carrito" class="float-right align-middle">
          <div style="position: relative">
            <font-awesome-icon icon="shopping-cart" size="lg" />
            <span class="badge badge-danger badge-cart pull-right" v-if="cartItemCount>0">{{cartItemCount}}</span>
          </div>
        </router-link>
      </div>
    </div>

    <div class="content">
      <router-view ref="home"></router-view>
    </div>

  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    cartItemCount: function() {
      return this.cart.length
    },
    ...mapState({
      cart: state => state.cart.items
    })
  },
  methods: {
    showFilters() {
      this.$refs.home.showFilters()
    },
    ...mapActions('cart', [
      'saveOrderNumber'
    ])
  },
  created() {
    let order = this.$route.query.orden
    if(order !== undefined)
      this.saveOrderNumber(order)
    else
      window.close
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  /* -webkit-box-shadow: 1px -183px 35px 159px rgba(0,0,0,0.63);
  -moz-box-shadow: 1px -183px 35px 159px rgba(0,0,0,0.63);
  box-shadow: 1px -183px 35px 159px rgba(0,0,0,0.63); */
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0;
  z-index: 1000;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.vertical-center {
  display: flex;
  align-items: center;
}

.badge-cart {
  position: absolute;
  top: -11px;
  right: -7px;
  border-radius: 50%;
}

.content {
  /* padding-top: 70px; */
  margin-left: 10px;
  margin-right: 10px;
}

</style>
