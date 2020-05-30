<template>
  <v-app-bar app color="primary" elevation="0" clipped-left class="align-center">
    <v-btn v-if="$route.name !== 'home'" @click="$router.back()" icon exact class="mr-1">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn
      :to="{ name: 'home' }"
      icon
      :ripple="false"
      exact
      class="mr-3"
      :class="$route.name === 'home' ? 'mr-n3' : ''"
    >
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title>
      CCM-GUI
    </v-toolbar-title>
    <template v-for="(item, index) in items">
      <v-toolbar-title :key="index" v-if="item.type === 'separator'" class="align-center d-flex px-2">
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-toolbar-title>
      <v-btn
        :key="index"
        v-else-if="index < items.length - 1"
        :to="item.value.to"
        text
        exact
        class="px-1 navbar-breadcrumbs-item"
        style="min-width: 0"
      >
        {{ item.value.title }}
      </v-btn>
      <v-toolbar-title
        :key="index"
        v-else
        class="navbar-breadcrumbs-item" style="padding-left: 6px;"
      >
        {{ item.value.title }}
      </v-toolbar-title>
    </template>
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
    ...mapState('layout', ['drawer', 'breadcrumbs']),
    ...mapGetters('auth', ['isLoggedIn']),
    items () {
      const path = this.breadcrumbs
      return path.reduce((acc, item) => {
        acc.push({ type: 'separator' })
        acc.push({ type: 'path', value: item })
        return acc
      }, [])
    }
  }
}
</script>

<style scoped>
 .navbar-breadcrumbs-item {
   font-size: 1.25rem!important;
   line-height: 1.5!important;
   overflow: hidden!important;
   text-overflow: ellipsis!important;
   white-space: nowrap!important;
   letter-spacing: normal!important;
   font-weight: normal!important;
   text-transform: uppercase!important;
 }
</style>
