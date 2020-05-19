import axios from 'axios'
import Cookies from 'js-cookie'
import { Auth } from '@/constants/store'

const setAxiosAuthorization = token => {
  if (token) axios.defaults.headers.Authorization = `Bearer ${token}`
  else axios.defaults.headers.Authorization = null
}

const tokenFromCookies = Cookies.get(Auth._cookies.token)

if (tokenFromCookies) {
  setAxiosAuthorization(tokenFromCookies)
}

export default {
  namespaced: true,
  state: {
    profile: null,
    token: tokenFromCookies
  },
  mutations: {
    [Auth.login] (state, token) {
      state.profile = {
        name: 'Superadmin'
      }
      state.token = token
      Cookies.set(Auth._cookies.token, token)
    },
    [Auth.logout] (state) {
      state.profile = null
      state.token = null
      Cookies.remove(Auth._cookies.token)
    }
  },
  actions: {
    async [Auth.login] ({ commit }, profile) {
      try {
        const { data = {} } = await axios.post('auth/login', profile)
        if (!data.access_token) return Promise.reject(new Error('Access_token missing in the API response.'))
        commit(Auth.login, data.access_token)
        setAxiosAuthorization(data.access_token)
        return Promise.resolve(data)
      } catch (e) {
        const response = e.response || {}
        if (response.status === 401) return Promise.reject(new Error('Invalid credentials.'))
        if (response.status === 400) return Promise.reject(new Error(response.data.message.toString()))
        return Promise.reject(e)
      }
    },
    [Auth.logout] ({ commit }) {
      commit(Auth.logout)
      setAxiosAuthorization(null)
    }
  },
  getters: {
    isLoggedIn: state => !!state.token
  }
}
