<template>
  <v-navigation-drawer
    :value="notificationDrawer"
    @input="setNotificationDrawer"
    fixed
    right
    temporary
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Layout } from '@/constants/store'

export default {
  name: 'NotificationDrawer',
  methods: {
    ...mapActions('layout', { setNotificationDrawer: Layout.setNotificationDrawer })
  },
  computed: mapState('layout', ['notificationDrawer'])
}
</script>

<style scoped>

</style>
