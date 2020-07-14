import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Carrito from '../views/Carrito.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faChevronLeft, faTimes, faCartPlus, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VModal from 'vue-js-modal'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import Toasted from 'vue-toasted';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSimpleAlert from "vue-simple-alert";
 

library.add(faShoppingCart, faChevronLeft, faTimes, faCartPlus, faTrash, faSearch)
dom.watch()
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.use(VModal)
Vue.use(VueNumberInput);
Vue.use(Toasted, {
  iconPack : 'fontawesome'
});
Vue.use(VueSimpleAlert);

Vue.use(VueAxios, axios)
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
    component: Carrito
    // component: () => import(/* webpackChunkName: "carrito" */ '../views/Carrito.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
