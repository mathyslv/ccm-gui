<template>
  <v-container fluid>
    <v-row class="mb-4">
      <InformationsSection :profile="profile" :cols="12" :md="6" :lg="4" />
      <RolesSection :profile="profile" :cols="12" :md="6" :lg="8" />
    </v-row>
    <ResourcesSection :profile="profile" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Layout } from '@/constants/store'
import InformationsSection from '@/views/Profile/InformationsSection'
import RolesSection from '@/views/Profile/RolesSection'
import ResourcesSection from '@/views/Profile/ResourcesSection'

export default {
  name: 'Profile',
  components: { ResourcesSection, RolesSection, InformationsSection },
  methods: {
    ...mapActions('layout', { setBreadcrumbs: Layout.setBreadcrumbs })
  },
  computed: {
    ...mapGetters('resources', { allResources: 'data' }),
    ...mapGetters('profiles', ['profiles']),
    profile () {
      return this.profiles.find(p => p.id === this.$route.params.id)
    }
  },
  watch: {
    profile: {
      immediate: true,
      handler: function (val) {
        this.setBreadcrumbs([
          { title: 'Profiles', to: { name: 'profiles' } },
          { title: (val ? val.name : '...') }
        ])
      }
    }
  }
}
</script>

<style scoped>
</style>
