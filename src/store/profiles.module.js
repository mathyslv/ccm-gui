import axios from 'axios'
import { Profiles } from '@/constants/store'
import { promiseWrapper } from '@/store/helpers'

export default {
  namespaced: true,
  state: {
    clean: true,
    profiles: []
  },
  mutations: {
    [Profiles.fetchAll] (state, data) {
      state.clean = false
      state.profiles = data
    },
    [Profiles.fetchOne] (state, data) {
      const index = state.profiles.findIndex(p => p.id === data.id)
      if (index === -1) state.profiles.push(data)
      else state.profiles.splice(index, 1, data)
    },
    [Profiles.create] (state, data) {
      data.roles = data.roles || []
      state.profiles.push(data)
    },
    [Profiles.delete] (state, id) {
      const deletedIndex = state.profiles.findIndex(p => p.id === id)
      if (deletedIndex !== -1) state.profiles.splice(deletedIndex, 1)
    }
  },
  actions: {
    [Profiles.fetchAll] ({ commit }) {
      return promiseWrapper(axios.get('profiles'), data => commit(Profiles.fetchAll, data))
    },
    [Profiles.fetchOne] ({ commit }, id) {
      return promiseWrapper(axios.get(`profiles/${id}`), data => commit(Profiles.fetchOne, data))
    },
    [Profiles.create] ({ commit }, form) {
      return promiseWrapper(axios.post('profiles/create', form), data => commit(Profiles.create, data))
    },
    [Profiles.delete] ({ commit }, id) {
      return promiseWrapper(axios.delete(`profiles/${id}`), () => commit(Profiles.delete, id))
    }
  },
  getters: {
    profiles: state => state.profiles,
    getProfile: state => id => state.profiles.find(p => p.id === id)
  }
}