<template>
  <BaseDashboardCard
    :loading="loading"
    :disabled="disabled"
    :title="title"
    spacing="px-8 py-0"
  >
    <slot></slot>
    <template #actions v-if="$slots.actions">
      <slot name="actions"></slot>
    </template>
  </BaseDashboardCard>
</template>

<script>
import BaseDashboardCard from '@/components/base/card/BaseDashboardCard'
export default {
  name: 'SettingCard',
  components: { BaseDashboardCard },
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
