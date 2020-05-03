import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import moment from 'moment'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')
Vue.prototype.moment = moment

import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce)
Vue.use(vueDebounce, {
  lock: true,
  listenTo: 'keyup',
  defaultTime: '1200ms'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
