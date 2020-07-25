import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faChevronLeft, faTimes, faCartPlus, faTrash, faSearch, faTags, faTimesCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VModal from 'vue-js-modal'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import Toasted from 'vue-toasted';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSimpleAlert from "vue-simple-alert";
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import Multiselect from 'vue-multiselect'
 

library.add(faShoppingCart, faChevronLeft, faTimes, faCartPlus, faTrash, faSearch, faTags, faTimesCircle, faTelegramPlane, faPlus)
dom.watch()
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.use(VModal)
Vue.use(VueNumberInput);
Vue.use(Toasted, {
  iconPack : 'fontawesome'
});
Vue.use(VueSimpleAlert, { reverseButtons: true });
Vue.use(VueTheMask)
Vue.use(Vuelidate)
Vue.component('multiselect', Multiselect)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
