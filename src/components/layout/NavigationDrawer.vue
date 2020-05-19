<template>
  <v-navigation-drawer
    app
    :value="drawer.displayed"
    :mini-variant="$vuetify.breakpoint.mdAndUp && drawer.mini"
    @input="setDrawer">
    <v-list>
      <NavigationDrawerListItem :to="{ name: 'home'}">
        <template #icon>mdi-view-dashboard</template>
        <template #title>Home</template>
      </NavigationDrawerListItem>
      <NavigationDrawerListItem :to="{ name: 'profiles' }">
        <template #icon>mdi-account-search</template>
        <template #title>Profiles</template>
      </NavigationDrawerListItem>
      <NavigationDrawerListItem :to="{ name: 'settings' }">
        <template #icon>mdi-cog</template>
        <template #title>Settings</template>
      </NavigationDrawerListItem>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NavigationDrawerListItem from './NavigationDrawerListItem'
import { Layout } from '@/constants/store'

export default {
  name: 'NavigationDrawer',
  components: { NavigationDrawerListItem },
  data: () => ({
  }),
  methods: {
    ...mapActions('layout', [Layout.setDrawer])
  },
  computed: {
    ...mapState('layout', ['drawer'])
  }
}
</script>

<style scoped>

</style>
