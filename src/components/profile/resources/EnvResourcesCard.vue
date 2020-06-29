<template>
  <v-card :disabled="!!loading" :loading="loading" elevation="0" tile>
    <v-card-text>
      <p class="text-body-1 text--text d-flex align-center pl-2" :class="{'mb-0': !showTable}">
        /{{ env.env }} ({{ env.resources.length }})
        <template v-if="!!env.extends">
          <span class="px-2 grey--text text--darken-1">extends</span> /{{ env.extends }}
        </template>
        <v-spacer />
        <v-btn tile fab x-small color="green darken-2" class="mr-2" :text="!newResourceShow" @click="toggleNewResource">
          <v-icon class="mdi-24px" v-if="!newResourceShow">mdi-plus-circle-outline</v-icon>
          <v-icon class="mdi-24px" v-else>mdi-plus-circle</v-icon>
        </v-btn>
        <v-btn color="blue" fab x-small tile text @click="$emit('expand-env', env)" class="mr-2">
          <v-icon class="mdi-24px">mdi-arrow-expand</v-icon>
        </v-btn>
        <v-btn
          depressed
          :color="showTable ? 'grey darken-2' : 'dark'"
          fab
          x-small
          tile
          :text="!showTable"
          @click="toggleTable"
        >
          <v-icon class="mdi-24px" v-if="!showTable">mdi-chevron-down</v-icon>
          <v-icon class="mdi-24px" v-else>mdi-chevron-up</v-icon>
        </v-btn>
      </p>
      <EnvResourcesTable
        v-show="showTable"
        :env="env"
        :profile-id="profileId"
        :new-resource-show="newResourceShow"
        :auto-scroll="autoScroll"
        :loading="loading"
        @new-resource-show="newResourceShow = $event"
        @loading="loading = $event"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import EnvResourcesTable from '@/components/profile/resources/EnvResourcesTable'

export default {
  name: 'EnvResourcesCard',
  components: { EnvResourcesTable },
  props: {
    profileId: String,
    env: Object,
    autoScroll: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    newResourceShow: false,
    expanded: false,
    loading: false,
    showTable: false
  }),
  methods: {
    toggleTable () {
      this.showTable = !this.showTable
      if (!this.showTable) this.newResourceShow = false
    },
    toggleNewResource () {
      this.newResourceShow = !this.newResourceShow
      if (this.newResourceShow) this.showTable = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
