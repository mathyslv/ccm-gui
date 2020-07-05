<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    elevation="0"
    :outlined="outlined && !text"
    :text="text && !outlined"
    :small="small"
    class="px-4"
    :class="roundedClass"
  >
    <v-icon
      v-if="icon && !iconRight"
      v-bind="iconAttrs"
      class="ml-n1"
      left
    >{{ icon }}</v-icon>
    <slot />
    <v-icon
      v-if="icon && iconRight"
      v-bind="iconAttrs"
      right
    >{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BaseActionButton',
  props: {
    icon: String,
    iconSize: String,
    small: Boolean,
    outlined: Boolean,
    iconRight: Boolean,
    text: Boolean,
    rounded: {
      type: String,
      default: () => 'xl'
    },
    plain: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconAttrs () {
      if (!['x-small', 'small', 'large', 'x-large'].includes(this.iconSize)) return
      return {
        [this.iconSize]: true
      }
    },
    roundedClass () {
      if (['sm', 'md', 'lg', 'xl'].includes(this.rounded)) {
        return 'rounded-' + this.rounded
      }
      return 'rounded-xl'
    }
  }
}
</script>

<style scoped>

</style>
