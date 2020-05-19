import { Layout } from '@/constants/store'

export default {
  namespaced: true,
  state: {
    drawer: {
      displayed: null,
      mini: true
    }
  },
  mutations: {
    [Layout.toggleDrawer] (state) {
      state.drawer.displayed = !state.drawer.displayed
    },
    [Layout.toggleDrawerMini] (state) {
      state.drawer.mini = !state.drawer.mini
    },
    [Layout.setDrawerMini] (state, mini) {
      state.drawer.mini = mini
    },
    [Layout.setDrawer] (state, displayed) {
      state.drawer.displayed = displayed
    }
  },
  actions: {
    [Layout.toggleDrawer] ({ commit }) {
      commit(Layout.toggleDrawer)
    },
    [Layout.toggleDrawerMini] ({ commit }) {
      commit(Layout.toggleDrawerMini)
    },
    [Layout.setDrawer] ({ commit }, displayed) {
      commit(Layout.setDrawer, displayed)
    },
    [Layout.setDrawerMini] ({ commit }, mini) {
      commit(Layout.setDrawerMini, mini)
    }
  }
}
