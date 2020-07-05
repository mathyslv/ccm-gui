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
      state.profiles = data.sort((p1, p2) => {
        if (p1.type === 'Superadmin') return -1
        else if (p2.type === 'Superadmin') return 1
        else if (p1.name < p2.name) return -1
        else if (p1.name > p2.name) return 1
        else return 0
      })
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
    [Profiles.update] (state, data) {
      const profile = state.profiles.find(p => p.id === data.id)
      if (profile) {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(profile, key)) {
            console.log('MAJ ' + key, data[key])
            profile[key] = data[key]
          }
        }
      }
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
    [Profiles.update] ({ commit }, { id, data }) {
      return promiseWrapper(axios.patch('profiles/' + id, data), updated => {
        commit(Profiles.update, updated)
        return updated
      })
    },
    [Profiles.create] ({ commit }, form) {
      return promiseWrapper(axios.post('profiles/create', form), data => {
        commit(Profiles.create, data)
        return data
      })
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
