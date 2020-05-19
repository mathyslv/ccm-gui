import { Resources } from '@/constants/store'
import axios from 'axios'
import { promiseWrapper } from '@/store/helpers'

export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    [Resources.fetchAll] (state, { id, resources }) {
      const index = state.data.findIndex(d => d.id === id)
      if (index === -1) {
        state.data.push({ id, resources })
      } else state.data.splice(index, 1, { id, resources })
    }
  },
  actions: {
    async [Resources.fetchAll] ({ commit }, id) {
      return promiseWrapper(
        axios.get(`resources/${id}`),
        resources => commit(Resources.fetchAll, { id, resources })
      )
    }
  },
  getters: {
    data: state => state.data
  }
}
