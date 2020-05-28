<template>
  <v-app id="inspire" dark>
    <!-- <NavigationDrawer v-if="false" /> -->
    <Navbar v-if="!untouched" />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app class="justify-center">
      <span>CCM-GUI &copy; {{ fullYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/layout/Navbar'
// import NavigationDrawer from '@/components/layout/NavigationDrawer'
import { Routes } from '@/constants/router'

export default {
  name: 'App',
  components: {
    // NavigationDrawer,
    Navbar
  },
  data: () => ({
    fullYear: new Date().getFullYear(),
    configRoute: Routes.config
  }),
  computed: {
    ...mapGetters(['untouched'])
  }
}
</script>
