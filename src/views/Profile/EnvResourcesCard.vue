<template>
  <v-card>
    <v-card-text>
      <p class="headline white--text">/{{ env }}</p>
      <hr>
      <v-simple-table>
        <thead>
        <tr>
          <th class="caption">Key</th>
          <th class="caption">Value</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(key, index) in keyList" :key="index">
          <td class="subtitle-1">{{ key }}</td>
          <td class="subtitle-1">{{ resources[key] }}</td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'EnvResourcesCard',
  props: {
    env: String,
    resources: Object
  },
  computed: {
    keyList () {
      if (!this.resources) return []
      return Object.keys(this.resources).sort()
    }
  }
}
</script>

<style scoped>

</style>
