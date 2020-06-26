<template>
  <v-container  v-bind="spacing">
    <slot />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseContainer',
  computed: {
    ...mapState('layout', ['navbarExtension']),
    spacing () {
      return {
        fluid: true,
        'px-6': true,
        'pt-4': true
        // 'pt-8': !!this.navbarExtension,
        // 'pt-4': !this.navbarExtension
      }
    }
  }
}
</script>

<style scoped>

</style>
