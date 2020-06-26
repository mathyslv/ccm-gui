<template>
  <v-navigation-drawer app color="primary" dark floating>
    <v-list color="transparent">
      <!-- <NavigationDrawerListItem input-value icon title="Profiles" exact>
        <template #icon>
          <v-progress-circular size="24" indeterminate color="secondary"/>
        </template>
      </NavigationDrawerListItem> -->
      <NavigationDrawerListItem title="CCM-GUI" title-class="headline" />
      <NavigationDrawerListItem :to="{ name: 'home'}" icon="mdi-view-dashboard" title="Dashboard" exact />
      <NavigationDrawerListItem :to="{ name: 'profiles' }" icon="mdi-account-search" title="Profiles" />
      <NavigationDrawerListItem :to="{ name: 'event-logs' }" icon="mdi-clock-alert-outline" title="Event Logs" />
      <NavigationDrawerListItem :to="{ name: 'settings' }" icon="mdi-cog" title="Settings" />
    </v-list>
    <template #append>
      <v-list color="transparent">
        <NavigationDrawerListItem
          v-if="isLoggedIn"
          @click.native.stop="logout"
          link
          icon="mdi-logout-variant"
          title="Logout"
        />
        <template v-else>
          <NavigationDrawerListItem
            :to="{ name: 'login' }"
            icon="mdi-account-circle"
            title="Login"
          />
        </template>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import NavigationDrawerListItem from './NavigationDrawerListItem'
import { Auth, Layout } from '@/constants/store'

export default {
  name: 'NavigationDrawer',
  components: { NavigationDrawerListItem },
  data: () => ({
  }),
  methods: {
    ...mapActions('layout', [Layout.setDrawer]),
    ...mapActions('auth', { processLogout: Auth.logout }),
    logout () {
      this.processLogout()
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    ...mapState('layout', ['drawer']),
    ...mapGetters('auth', ['isLoggedIn'])
  }
}
</script>

<style lang="scss" scoped>
</style>
