<!-- eslint-disable -->
<template>
  <v-hover #default="{ hover }">
    <BaseCard
      v-on="$listeners"
      :spacing="spacing"
      :color="color"
      :title="title"
      :loading="loading"
      :disabled="disabled"
    >
      <template #root>
        <v-fade-transition>
          <v-overlay v-if="hover" :color="hoverColor" absolute :opacity="0.8">
            <slot name="hover" />
          </v-overlay>
        </v-fade-transition>
      </template>
      <slot />
      <template v-if="$slots['actions']" #actions>
        <slot name="actions" />
      </template>
    </BaseCard>
  </v-hover>
</template>

<script>
import BaseCard from '@/components/base/card/BaseCard'
export default {
  name: 'BaseHoverCard',
  components: { BaseCard },
  props: {
    spacing: String,
    hoverColor: {
      type: String,
      default: 'white'
    },
    color: String,
    title: String,
    loading: [Boolean, String],
    disabled: Boolean
  }
}
</script>

<style scoped>

</style>
