<template>
  <v-app-bar
    app
    color="rgba(247,247,247,0.95)"
    class="align-center pl-2"
    elevate-on-scroll
  >
    <v-divider
      color="lightgrey"
      class="ml-6"
      id="navbar-bottom-border"
    />
    <svg width="128" height="64" viewBox="0 0 128 64" fill="none" xmlns="http://www.w3.org/2000/svg" id="svg">
      <path d="M-1.56772 7.62939e-06C-61.0053 -9.53674e-06 128 7.62939e-06 128 7.62939e-06V64C128 64 128.065 64 88.0323 64C48 64 57.8699 2.47955e-05 -1.56772 7.62939e-06Z" fill="#C4C4C4"/>
    </svg>
    <v-app-bar-nav-icon v-show="$vuetify.breakpoint.smAndDown"/>
    <template v-for="(item, index) in items">
      <v-toolbar-title
        :key="index"
        v-if="item.type === 'separator'"
        class="align-center d-flex px-1"
      >
        <v-icon color="text">mdi-chevron-double-right</v-icon>
      </v-toolbar-title>
      <v-toolbar-title
        :key="index"
        v-else
        class="navbar-breadcrumbs-item text--text"
      >
        {{ item.value }}
      </v-toolbar-title>
    </template>
    <v-spacer/>
    <v-btn color="white" icon @click="setNotificationDrawer(true)" class="mr-n1">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <template v-if="navbarExtension" #extension>
      <portal-target
        v-if="navbarExtension"
        class="d-flex grow"
        id="navbar-portal"
        name="destination"
      />
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Auth, Layout } from '@/constants/store'

export default {
  name: 'Navbar',
  methods: {
    ...mapActions('layout', {
      setNotificationDrawer: Layout.setNotificationDrawer,
      setDrawer: Layout.setDrawer
    }),
    ...mapActions('auth', { processLogout: Auth.logout }),
    logout () {
      this.processLogout()
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    ...mapState('layout', ['drawer', 'breadcrumbs', 'navbarExtension']),
    ...mapGetters('auth', ['isLoggedIn']),
    items () {
      const path = this.breadcrumbs
      return path.reduce((acc, item, index) => {
        if (index) acc.push({ type: 'separator' })
        acc.push({ type: 'path', value: item })
        return acc
      }, [])
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar-breadcrumbs-item {
    text-transform: uppercase !important;
    font-weight: bold !important;
  }

  #svg {
    z-index: -1;
    position: absolute;
    top: 0;
    width: 128px;
    height: 64px;
    right: 0;
    bottom: 0;
    path {
      fill: var(--v-primary-base);
    }
  }

  .v-toolbar {
    #navbar-bottom-border {
      margin-right: 64px;
      position: absolute;
      transition: .3s all;
      top: 64px;
      left: -8px;
      right: 16px;
    }
    &.v-toolbar--extended {
      #navbar-bottom-border {
        top: 120px;
        margin-right: 8px;
      }
    }
  }
</style>
