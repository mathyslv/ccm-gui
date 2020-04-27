<template>
  <v-navigation-drawer :value="drawer.displayed" app :mini-variant="drawer.mini">
    <v-list>
      <NavigationDrawerListItem :to="{ name: 'home'}">
        <template #icon>mdi-view-dashboard</template>
        <template #title>Home</template>
      </NavigationDrawerListItem>
      <NavigationDrawerListItem :to="{ name: 'profiles' }">
        <template #icon>mdi-account-search</template>
        <template #title>Profiles</template>
      </NavigationDrawerListItem>
      <NavigationDrawerListItem :to="{ name: 'about' }">
        <template #icon>mdi-cog</template>
        <template #title>Settings</template>
      </NavigationDrawerListItem>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import NavigationDrawerListItem from './NavigationDrawerListItem'
export default {
  name: 'NavigationDrawer',
  components: { NavigationDrawerListItem },
  data: () => ({
  }),
  computed: {
    ...mapState('layout', ['drawer'])
  }
}
</script>

<style scoped>

</style>
