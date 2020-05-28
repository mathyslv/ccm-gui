<template>
  <v-app-bar app color="primary" elevation="0" clipped-left>
    <v-btn :to="{ name: 'home'}" icon tile exact>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <!-- <v-app-bar-nav-icon @click.stop="changeDrawer">
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-icon v-if="drawer.mini">mdi-arrow-right</v-icon>
        <v-icon v-else>mdi-arrow-left</v-icon>
      </template>
    </v-app-bar-nav-icon> -->
    <v-toolbar-title>CCM-GUI</v-toolbar-title>
    <v-spacer/>
    <v-btn :to="{ name: 'settings' }" icon tile exact class="mr-2">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'profiles' }" icon tile>
      <v-icon>mdi-account-search</v-icon>
    </v-btn>
    <v-divider vertical color="white" class="mx-2"/>
    <v-btn v-if="!isLoggedIn" outlined color="white" :to="{ name: 'login' }" exact class="mr-2" tile>
      Log in
    </v-btn>
    <NavbarNotifications  />
    <v-btn class="ml-2 mr-0" v-if="isLoggedIn" icon @click="logout" tile>
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
    <!--<v-divider vertical class="mx-2"/>-->
  </v-app-bar>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Auth, Layout } from '@/constants/store'
import NavbarNotifications from '@/components/layout/NavbarNotifications'

export default {
  name: 'Navbar',
  components: { NavbarNotifications },
  methods: {
    ...mapActions('layout', [Layout.toggleDrawerMini, Layout.setDrawer]),
    ...mapActions('auth', { processLogout: Auth.logout }),
    changeDrawer () {
      if (this.$vuetify.breakpoint.smAndDown) this.setDrawer(!this.drawer.displayed)
      else this.toggleDrawerMini()
    },
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

<style scoped>

</style>
