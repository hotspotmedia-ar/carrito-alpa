<template>
  <div id="app">
    <div id="nav" class="row vertical-center">
    
      <div class="col-2">
        <transition name="slide" mode="out-in">
          <router-link v-if="$router.currentRoute.name == 'Carrito' || $router.currentRoute.name == 'Categorias'" to="/" class="float-left">
            <font-awesome-icon icon="chevron-left" size="lg" />
          </router-link>
          <router-link v-else-if="$router.currentRoute.name == 'Tienda'" to="/categorias" class="float-left">
            <font-awesome-icon icon="tags" size="lg" />
          </router-link>
          <router-link v-else-if="$router.currentRoute.name == 'Checkout'" to="/carrito" class="float-left">
            <font-awesome-icon icon="chevron-left" size="lg" />
          </router-link>
        </transition>
      </div>
      <div class="col-8">
        <img src="https://papeleraalpa.com.ar/wp-content/uploads/2019/10/cropped-logo-alpa-2.png" height="40px" />
      </div>
      <div class="col-2">
        <transition name="slide" mode="out-in">
          <router-link v-if="$router.currentRoute.name == 'Tienda' || $router.currentRoute.name == 'Categorias'" to="/carrito" class="float-right align-middle">
            <div style="position: relative">
              <font-awesome-icon icon="shopping-cart" size="lg" />
              <span class="badge badge-danger badge-cart pull-right" v-if="cartItemCount>0">{{cartItemCount}}</span>
            </div>
          </router-link>
        </transition>
      </div>
    </div>

    <div class="content">
      <transition name="slide" mode="out-in">
        <router-view ref="home"></router-view>
      </transition>
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
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  -ms-touch-action: manipulation;
  touch-action: manipulation;
}

#nav {
  padding: 10px;
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
  margin-left: 10px;
  margin-right: 10px;
}




.slide-enter-active,
.slide-leave-active {
  transition: opacity .1s, transform .1s;
}
.slide-enter {
  opacity: 1;
}

.slide-leave-to {
  opacity: 0;
}

</style>
