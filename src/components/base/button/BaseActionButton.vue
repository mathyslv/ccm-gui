<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    elevation="0"
    :outlined="outlined && !text"
    :text="text && !outlined"
    class="pt-1 px-4"
  >
    <v-icon
      v-if="icon && !iconRight"
      v-bind="iconAttrs"
      class="mt-n1 ml-n1"
      left
    >{{ icon }}</v-icon>
    <slot />
    <v-icon
      v-if="icon && iconRight"
      v-bind="iconAttrs"
      class="mt-n1"
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
    outlined: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
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
    }
  }
}
</script>

<style scoped>

</style>
