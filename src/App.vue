<template>
  <v-app id="inspire" style="background-color: #f0f0f0">
    <NavigationDrawer v-if="!untouched" />
    <Navbar v-if="!untouched"/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <NotificationDrawer v-if="!untouched" />
    <v-footer
      app
      class="justify-center"
      inset
      :class="$route.name === 'config' ? 'primary white--text' : ''"
    >
      <span>CCM-GUI &copy; {{ fullYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Navbar from '@/components/layout/Navbar'
import { Routes } from '@/constants/router'
import NotificationDrawer from '@/components/layout/NotificationDrawer'
import NavigationDrawer from '@/components/layout/NavigationDrawer'

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    NotificationDrawer,
    Navbar
  },
  data: () => ({
    fullYear: new Date().getFullYear(),
    configRoute: Routes.config
  }),
  computed: {
    ...mapState('layout', ['navbarExtension']),
    ...mapGetters(['untouched'])
  }
}
</script>

<style lang="scss">
  html {
    .v-application,
    .v-application .headline {
      font-family: 'Lato', sans-serif !important;
    }

    .child-flex > *,
    .flex {
      flex: 1 1 auto;
      max-width: 100%;
    }

    #navbar-portal .v-btn:not(:first-child){
      margin-left: 8px!important;
    }
  }
</style>
