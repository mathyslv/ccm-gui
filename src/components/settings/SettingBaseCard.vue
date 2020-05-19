<template>
  <v-card class="px-4" :loading="loading" :disabled="disabled">
    <v-card-title v-if="hasHeader" class="display-1"><slot name="title">{{ title }}</slot></v-card-title>
    <hr v-if="hasHeader" class="mx-4">
    <v-card-text class="white--text">
      <slot></slot>
    </v-card-text>
    <v-card-actions v-if="$slots.actions">
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SettingBaseCard',
  props: {
    loading: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasHeader () {
      return this.title || this.$slots.title
    }
  }
}
</script>

<style scoped>

</style>
