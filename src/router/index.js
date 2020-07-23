import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Carrito from '../views/Carrito.vue'
// import Categorias from '../views/Categorias.vue'
// import Checkout from '../views/Checkout.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Tienda',
    component: Home,
  },
  {
    path: '/carrito',
    name: 'Carrito',
    // component: Carrito
    component: () => import(/* webpackChunkName: "carrito" */ '../views/Carrito.vue'),
  },
  {
    path: '/categorias',
    name: 'Categorias',
    // component: Categorias,
    component: () => import(/* webpackChunkName: "categorias" */ '../views/Categorias.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    // component: Checkout,
    component: () => import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
