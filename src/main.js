import Vue from 'vue'
import PortalVue from 'portal-vue'
import VueScrollTo from 'vue-scrollto'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(PortalVue)
Vue.use(VueScrollTo)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
