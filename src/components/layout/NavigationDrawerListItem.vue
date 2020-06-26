<!-- suppress ALL -->
<template>
  <v-list-item
    :to="to"
    :exact="exact"
    :link="link"
    active-class="nav-drawer__list-item--active"
    :input-value="inputValue"
    color="white"
    :ripple="false"
  >
    <v-list-item-icon v-if="icon !== undefined">
      <slot name="icon">
        <v-icon>{{ icon }}</v-icon>
      </slot>
    </v-list-item-icon>
    <v-list-item-content>
      <slot name="content"/>
      <v-list-item-title :class="titleClass">{{ title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'NavigationDrawerListItem',
  props: {
    color: {
      type: String,
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    link: {
      type: Boolean,
      default: false
    },
    inputValue: {
      type: Boolean,
      default: false
    },
    to: {
      type: null,
      default: null
    },
    exact: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Boolean],
      default: undefined
    },
    title: String
  }
}
</script>

<style lang="scss" scoped>
</style>
