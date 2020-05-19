import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'
import auth from './auth.module'
import layout from './layout.module'
import notifications from './notifications.module'
import profiles from './profiles.module'
import resources from './resources.module'
import { Root } from '@/constants/store'

let ENV_CCM_SERVER_URL = process.env.VUE_APP_CCM_SERVER_URL

if (ENV_CCM_SERVER_URL && ENV_CCM_SERVER_URL.substr(ENV_CCM_SERVER_URL.length - 1) !== '/') {
  ENV_CCM_SERVER_URL += '/'
}

Vue.use(Vuex)

const ccmServerUrlFromCookies = Cookies.get(Root._cookies.ccmServerUrl)

let untouched = !ccmServerUrlFromCookies
if (!untouched && ENV_CCM_SERVER_URL && ENV_CCM_SERVER_URL !== ccmServerUrlFromCookies) untouched = true

if (!untouched) {
  axios.defaults.baseURL = ccmServerUrlFromCookies
}

export default new Vuex.Store({
  state: {
    untouched,
    ccmServerUrl: ENV_CCM_SERVER_URL || ccmServerUrlFromCookies
  },
  mutations: {
    [Root.setCcmServerUrl] (state, url) {
      state.ccmServerUrl = url
      state.untouched = false
      Cookies.set(Root._cookies.ccmServerUrl, url)
    }
  },
  actions: {
    [Root.setCcmServerUrl] ({ commit }, url) {
      commit(Root.setCcmServerUrl, url)
      axios.defaults.baseURL = url
    }
  },
  modules: {
    auth,
    layout,
    notifications,
    profiles,
    resources
  },
  getters: {
    ccmServerUrl: state => state.ccmServerUrl,
    untouched: state => state.untouched
  }
})
