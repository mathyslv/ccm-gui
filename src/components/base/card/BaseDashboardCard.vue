<template>
  <BaseCard :loading="loading" :disabled="disabled">
    <template #root>
      <v-card-text class="title align-center d-flex text--text pl-6" v-if="title">
        {{ title }}
        <v-spacer />
        <slot name="actions" />
      </v-card-text>
      <v-divider v-if="title" color="#FFF" class="mx-6"/>
      <v-row class="ma-0 flex-column dashboard-card-content" :class="{'dashboard-card-content-title': !!title}">
        <v-col class="d-flex">
          <v-row class="flex-column justify-center" :class="'align-self-' + align">
            <v-card-text class="py-0" :class="{'text-center': center}">
              <slot />
            </v-card-text>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/base/card/BaseCard'
export default {
  name: 'BaseDashboardCard',
  components: { BaseCard },
  props: {
    title: String,
    align: {
      type: String,
      default: 'center'
    },
    loading: {
      type: [String, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-card-content {
    height: 100%;
  }
  .dashboard-card-content-title {
    height: calc(100% - 68px);
  }
</style>
