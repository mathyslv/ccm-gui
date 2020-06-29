<template>
  <v-card
    :elevation="elevation"
    :disabled="disabled"
    :color="color"
    :outlined="outlined"
    class="rounded-xl"
    v-on="listeners"
  >
    <slot name="root" />
    <v-card-title v-if="title" class="display-1 align-center d-flex px-8 pt-4">{{ title }}</v-card-title>
    <v-card-text :class="spacing" v-if="$slots.default">
      <slot />
    </v-card-text>
    <v-card-actions v-if="$slots['actions']">
      <slot name="actions"></slot>
    </v-card-actions>
    <v-fade-transition>
      <v-overlay v-if="loading || disabled" absolute color="white" :opacity="0.9">
        <v-progress-circular v-if="loading" :color="progressColor" indeterminate size="64 " width="8" />
      </v-overlay>
    </v-fade-transition>
  </v-card>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    spacing: String,
    color: String,
    title: String,
    loading: [Boolean, String],
    disabled: Boolean,
    outlined: Boolean,
    elevation: {
      type: Number,
      default: 2
    }
  },
  computed: {
    listeners () {
      if (this.disabled || this.loading) {
        const { click, ...listeners } = this.$listeners
        return listeners
      } else return this.$listeners
    },
    progressColor () {
      return 'grey darken-1'
      // return (this.loading === true) ? 'primary' : this.loading
    }
  }
}
</script>

<style scoped>

</style>
