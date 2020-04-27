<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="toggleDrawerMini">
      <v-icon v-if="drawer.mini">mdi-arrow-right</v-icon>
      <v-icon v-else>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>CCM-GUI</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Layout } from '@/constants/store'

export default {
  name: 'Navbar',
  methods: {
    ...mapActions('layout', [Layout.toggleDrawerMini])
  },
  computed: {
    ...mapState('layout', ['drawer'])
  }
}
</script>

<style scoped>

</style>
