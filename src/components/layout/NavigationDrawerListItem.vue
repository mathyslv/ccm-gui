<template>
  <v-list-item color="accent lighten-1" link :to="to" :exact="exact">
    <v-list-item-action class="white--text">
      <v-icon>
        <slot name="icon">mdi-close-thick</slot>
      </v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title class="white--text">
        <slot name="title">Default title</slot>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'NavigationDrawerListItem',
  props: {
    to: undefined,
    exact: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
</style>
