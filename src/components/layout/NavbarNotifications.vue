<template>
  <v-menu
    left
    offset-y
    bottom
    :nudge-width="500"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        tile
        :text="notifications.length === 0"
        :outlined="notifications.length > 0"
        :icon="notifications.length === 0"
        v-on="on"
      >
        <span v-if="notifications.length">{{ notifications.length }}</span>
        <v-icon v-if="notifications.length" right>mdi-bell-ring</v-icon>
        <v-icon v-else>mdi-bell-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <p v-if="notifications.length" class="subtitle-1 mb-0 white--text">
          {{ notifications.length }} notification{{ notifications.length > 1 ? 's' : '' }}
          <v-btn tile class="float-right" color="red lighten-2" text @click="clearNotifications">
            <v-icon left>mdi-trash-can-outline</v-icon>
            clear
          </v-btn>
        </p>
        <p v-else class="subtitle-2 mb-0">No notification</p>
        <p v-if="notifications.length" class="mt-4">
          <v-fade-transition group>
            <v-alert
              outlined
              v-for="notification in notifications"
              :key="notification.id"
              tile
              dense
              :color="notification.color"
              :type="notification.type"
              :icon="notification.icon"
              dismissible
              @input="deleteNotification(notification.id)"
              class="body-2 py-1"
            >
              <span class="white--text">{{ notification.text }}</span>
            </v-alert>
          </v-fade-transition>
        </p>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Notifications } from '@/constants/store'
export default {
  name: 'NavbarNotifications',
  computed: {
    ...mapState('notifications', ['notifications'])
  },
  methods: {
    ...mapActions('notifications', {
      [Notifications.deleteNotification]: 'deleteNotification',
      [Notifications.clearNotifications]: 'clearNotifications'
    })
  }
}
</script>

<style scoped>

</style>
