<template>
  <v-app id="inspire" dark>
    <NavigationDrawer />
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app class="justify-center">
      <span>&copy; {{ fullYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import NavigationDrawer from '@/components/layout/NavigationDrawer'

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    Navbar
  },
  data: () => ({
    fullYear: new Date().getFullYear()
  })
}
</script>
