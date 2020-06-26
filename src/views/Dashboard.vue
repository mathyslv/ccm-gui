<template>
  <BaseContainer>
    <v-row>
      <v-col cols="12" lg="6" class="d-flex child-flex">
        <BaseDashboardCard title="Activity">
          <template #actions>
            <v-btn color="text" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-list disabled class="py-0">
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in 8"
                :key="i"
                dense
              >
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1">Superadmin created the resource prod/logger.host on API</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </BaseDashboardCard>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex child-flex">
        <BaseDashboardCard center>
          <v-progress-circular size="160" color="accent" :value="0" :width="18" :rotate="270">
          </v-progress-circular>
          <h3 class="headline mt-4 accent--text font-weight-bold">Bandwidth</h3>
        </BaseDashboardCard>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex child-flex">
        <BaseDashboardCard center>
          <h3 class="display-3 error--text font-weight-bold">
            66%
          </h3>
          <h3 class="headline mt-2 error--text font-weight-bold">Error rate</h3>
        </BaseDashboardCard>
      </v-col>

      <v-col cols="12" lg="3" class="d-flex child-flex">
        <BaseDashboardCard center>
          <h3 class="display-3 info--text font-weight-bold">129</h3>
          <h3 class="headline mt-2 info--text font-weight-bold">resources</h3>
        </BaseDashboardCard>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex child-flex">
        <BaseDashboardCard center>
          <v-progress-circular size="160" color="success" :value="0" :width="18" :rotate="270">
          </v-progress-circular>
          <h3 class="headline mt-4 success--text font-weight-bold">Success</h3>
        </BaseDashboardCard>
      </v-col>
      <v-col cols="12" lg="6" class="d-flex child-flex">
        <BaseDashboardCard title="Event Logs" loading>
          <template #actions>
            <v-btn color="text" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-list disabled class="py-0">
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in 5"
                :key="i"
                dense
              >
                <v-list-item-icon>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1">Superadmin created the resource prod/logger.host on API</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </BaseDashboardCard>
      </v-col>
    </v-row>
  </BaseContainer>
</template>

<script>
import BaseDashboardCard from '@/components/base/card/BaseDashboardCard'
import BaseContainer from '@/components/base/layout/BaseContainer'

export default {
  name: 'Dashboard',
  components: { BaseContainer, BaseDashboardCard }
}
</script>

<style scoped>

</style>
