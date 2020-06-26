import { Layout } from '@/constants/store'

export default {
  namespaced: true,
  state: {
    navbarExtension: false,
    notificationDrawer: false,
    breadcrumbs: []
  },
  mutations: {
    [Layout.setNotificationDrawer] (state, drawer) {
      state.notificationDrawer = drawer
    },
    [Layout.setBreadcrumbs] (state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs
    },
    [Layout.setNavbarExtension] (state, navbarExtension) {
      state.navbarExtension = navbarExtension
    }
  },
  actions: {
    [Layout.setBreadcrumbs] ({ commit }, breadcrumbs) {
      commit(Layout.setBreadcrumbs, breadcrumbs)
    },
    [Layout.setNotificationDrawer] ({ commit }, drawer) {
      commit(Layout.setNotificationDrawer, drawer)
    },
    [Layout.setNavbarExtension] ({ commit }, navbarExtension) {
      commit(Layout.setNavbarExtension, navbarExtension)
    }
  }
}
