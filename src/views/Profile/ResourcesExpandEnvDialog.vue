<template>
  <v-dialog :value="value" @input="$emit('input', $event)" :overlay-opacity="0.97" transition="slide-y-transition">
    <v-card v-if="expandedEnv" class="expanded-env">
      <v-card-title class="headline primary row mx-0">
        <div class="col pa-0"></div>
        <div class="col pa-0 text-center">
          /{{ expandedEnv.env }}
          <template v-if="!!expandedEnv.extends">
            <span class="px-2">extends</span> /{{ expandedEnv.extends }}
          </template>
        </div>
        <div class="col pa-0 text-right">
          <v-btn icon @click="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="pt-4">
        <EnvResourcesTable :env="expandedEnv" :profile-id="profile.id" expanded/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import EnvResourcesTable from '@/components/profile/resources/EnvResourcesTable'
export default {
  name: 'ResourcesExpandEnvDialog',
  components: { EnvResourcesTable },
  props: {
    value: Boolean,
    expandedEnv: Object,
    profile: Object
  }
}
</script>

<style scoped>

</style>
