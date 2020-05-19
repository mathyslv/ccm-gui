<template>
  <v-card>
    <v-card-text class="white--text">
      <p class="display-1 d-flex align-center ma-0">
        {{ name }}
        <v-spacer></v-spacer>
        <v-chip :color="profileBadgeColor" class="ma-2 float-right headline" label>
          {{ type }}
          <v-icon v-if="type === 'Superadmin'" right class="display-1">mdi-account-cog</v-icon>
        </v-chip>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { ProfilesStyle } from '@/constants/style'

export default {
  name: 'ProfileCard',
  props: {
    name: String,
    type: String
  },
  computed: {
    profileBadgeColor () {
      return ProfilesStyle.Colors[this.type] || ProfilesStyle.Colors.Default
    }
  }
}
</script>

<style scoped>

</style>
