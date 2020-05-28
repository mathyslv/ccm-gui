<template>
  <v-container fluid>
    <Breadcrumbs :path="breadcrumbsPath" back two-lines>
      <v-switch color="primary lighten-1" v-model="autoScroll" label="Auto Scroll" class="d-inline-flex mr-4"/>
      <v-btn
        tile
        depressed
        color="primary"
        @click="refresh"
        :loading="resourcesMeta.loading || profileLoading"
      >
        <v-icon left>mdi-refresh</v-icon>
        {{ refreshData.current }}
      </v-btn>
      <v-menu offset-y v-model="refreshData.menu" left>
        <template v-slot:activator="{ on }">
          <v-btn depressed color="primary" tile v-on="on" style="min-width: 0" class="px-2 ml-1">
            <v-icon v-if="refreshData.menu">mdi-chevron-up</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list dark>
          <v-list-item
            v-for="(item, index) in refreshData.items"
            :key="index"
            @click="refreshData.current = item"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </Breadcrumbs>

    <v-row class="mb-4">
      <InformationsSection
        :loading="profileLoading"
        :profile="profile"
        :cols="12" :md="6" :lg="4"
      />
      <!-- <v-divider vertical color="white" class="mt-6 mb-6" /> -->
      <RolesSection
        :loading="profileLoading"
        :profile="profile"
        :cols="12" :md="6" :lg="8"
      />
    </v-row>

    <!-- RESOURCES SECTION -->
    <ResourcesSection
      :loading="resourcesMeta.loading"
      :reqError="resourcesMeta.reqError"
      :error="resourcesMeta.error"
      :auto-scroll="autoScroll"
      :env-list="envList"
      :profile="profile"
    />

  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Profiles, Resources } from '@/constants/store'
import { ProfilesStyle } from '@/constants/style'
import { RefreshTypes } from '@/constants/profile'
import InformationsSection from '@/views/Profile/InformationsSection'
import RolesSection from '@/views/Profile/RolesSection'
import ResourcesSection from '@/views/Profile/ResourcesSection'

export default {
  name: 'Profile',
  components: { ResourcesSection, RolesSection, InformationsSection, Breadcrumbs },
  mounted () {
    if (this.profile) this.profileLoading = false
    else this.loadProfile()
    if (this.resources) this.resourcesMeta.loading = false
    else this.loadResources()
  },
  data: () => ({
    refreshData: {
      menu: false,
      items: [RefreshTypes.refreshAll, RefreshTypes.refreshProfile, RefreshTypes.refreshResources],
      current: RefreshTypes.refreshAll
    },
    profilesStyle: ProfilesStyle,
    profileLoading: true,
    resourcesLoading: true,
    autoScroll: false,
    profileMeta: {
      loading: true,
      reqError: false,
      error: null
    },
    resourcesMeta: {
      loading: true,
      reqError: false,
      error: null
    }
  }),
  methods: {
    ...mapActions('profiles', { fetchProfile: Profiles.fetchOne }),
    ...mapActions('resources', { fetchResources: Resources.fetchAll }),
    refresh () {
      const current = this.refreshData.current
      if (current === RefreshTypes.refreshAll || current === RefreshTypes.refreshProfile) {
        this.profileLoading = true
        this.loadProfile()
      }
      if (current === RefreshTypes.refreshAll || current === RefreshTypes.refreshResources) {
        this.resourcesMeta.loading = true
        this.loadResources()
      }
    },
    loadProfile () {
      this.fetchProfile(this.$route.params.id).then(() => {
        this.profileLoading = false
      })
    },
    loadResources () {
      this.fetchResources(this.$route.params.id)
        .catch(e => {
          this.resourcesMeta.reqError = true
          if (e.response && e.response.status === 401) {
            this.resourcesMeta.error = 'Unauthorized to access resources of this profile.'
          } else this.resourcesMeta.error = e
        })
        .finally(() => {
          this.resourcesMeta.loading = false
        })
    }
  },
  computed: {
    ...mapGetters('resources', { allResources: 'data' }),
    ...mapGetters('profiles', ['profiles']),
    profile () {
      return this.profiles.find(p => p.id === this.$route.params.id)
    },
    resources () {
      const resourcesData = this.allResources.find(s => s.id === this.$route.params.id)
      return (resourcesData ? resourcesData.resourcesEnv : null)
    },
    envList () {
      if (!this.resources) return []
      return this.resources
    },
    breadcrumbsPath () {
      if (this.$vuetify.breakpoint.smAndDown) return ['Profiles', (this.profile ? this.profile.name : '...')]
      return ['Profiles', this.$route.params.id]
    }
  }
}
</script>

<style scoped>
</style>
