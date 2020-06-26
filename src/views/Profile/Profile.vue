<template>
  <BaseContainer>
    <v-row class="mb-4">
      <InformationsSection :profile="profile" :cols="12" :md="6" :lg="4" />
      <RolesSection :profile="profile" :cols="12" :md="6" :lg="8" />
    </v-row>
    <ResourcesSection :profile="profile" />
    <portal to="destination">
      <BaseActionButton icon="mdi-arrow-left" color="grey darken-2" outlined :to="{name: 'profiles'}" exact>
        Profiles
      </BaseActionButton>
      <BaseActionButton icon="mdi-pencil" color="primary">Edit</BaseActionButton>
      <BaseActionButton icon="mdi-trash-can" color="error">Delete</BaseActionButton>
    </portal>
  </BaseContainer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Layout } from '@/constants/store'
import InformationsSection from '@/views/Profile/components/InformationsSection'
import RolesSection from '@/views/Profile/components/RolesSection'
import ResourcesSection from '@/views/Profile/components/ResourcesSection'
import BaseActionButton from '@/components/base/button/BaseActionButton'
import BaseContainer from '@/components/base/layout/BaseContainer'

export default {
  name: 'Profile',
  components: { BaseContainer, BaseActionButton, ResourcesSection, RolesSection, InformationsSection },
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
        this.setBreadcrumbs(['Profiles', (val ? val.name : '...')])
      }
    }
  }
}
</script>

<style scoped>
</style>
