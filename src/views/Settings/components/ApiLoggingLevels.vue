<template>
  <BaseDashboardCard title="API Logging Levels">
    <v-row align="center" justify="start">
      <v-col
        v-for="(level, index) in levels"
        :key="index"
        cols="12" md="4"
        class="pt-0"
      >
        <v-switch
          v-model="loggingLevels"
          :id="'log-level-' + level.value"
          :label="level.label"
          :color="level.color"
          :value="level.value"
          hide-details
        >
          <template #label>
            <label
              :for="'log-level-' + level.value"
              class="title d-block mb-1 switch-label"
              :class="loggingLevels.includes(level.value) ? level.color + '--text' : 'grey--text'"
            >
              {{ level.label }}
            </label>
          </template>
        </v-switch>
      </v-col>
    </v-row>
  </BaseDashboardCard>
</template>

<script>
import BaseDashboardCard from '@/components/base/card/BaseDashboardCard'

export default {
  name: 'ApiLoggingLevels',
  components: { BaseDashboardCard },
  data: () => ({
    levels: [
      { label: 'Error', value: 'error', color: 'error' },
      { label: 'Warning', value: 'warn', color: 'amber' },
      { label: 'Log', value: 'log', color: 'success' },
      { label: 'Debug', value: 'debug', color: 'deep-purple' },
      { label: 'Verbose', value: 'verbose', color: 'blue' }
    ],
    loggingLevels: ['error', 'warn', 'log', 'debug']
  }),
  methods: {
    save () {
    }
  }
}
</script>

<style scoped>
  .switch-label {
    cursor: pointer;
  }
</style>
