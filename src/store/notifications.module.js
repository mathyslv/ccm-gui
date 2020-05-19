import { Notifications } from '@/constants/store'

let id = 0

export default {
  namespaced: true,
  state: {
    notifications: []
  },
  mutations: {
    [Notifications.clearNotifications] (state) {
      state.notifications = []
    },
    [Notifications.addNotification] (state, { type, color, text, icon }) {
      id += 1
      state.notifications.splice(0, 0, { id, type, color, text, icon })
    },
    [Notifications.deleteNotification] (state, id) {
      const notifications = state.notifications
      const notificationIndex = notifications.findIndex(n => n.id === id)
      if (notificationIndex !== -1) state.notifications.splice(notificationIndex, 1)
    }
  },
  actions: {
    [Notifications.addNotification] ({ commit, rootGetters }, { type, color, text, icon }) {
      // if (!rootGetters['auth/isLoggedIn']) return
      commit(Notifications.addNotification, { type, color, text, icon })
    },
    [Notifications.deleteNotification] ({ commit }, id) {
      commit(Notifications.deleteNotification, id)
    },
    [Notifications.clearNotifications] ({ commit }) {
      commit(Notifications.clearNotifications)
    }
  }
}
