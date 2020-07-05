<template>
  <ProfileSection title="Environments" no-padding-bottom>
    <template #actions>
      <AddEnvironmentDialog :profile-id="profile.id">
        <template #activator="{ on }">
          <BaseActionButton v-on="on" small outlined icon="mdi-plus" color="success">Add</BaseActionButton>
        </template>
      </AddEnvironmentDialog>
    </template>
    <v-row>

      <!-- SKELETON RESOURCES -->
      <template v-if="loading">
        <v-col cols="4" v-for="n in 3" :key="n">
          <v-sheet class="px-2">
            <v-skeleton-loader type="date-picker-options"/>
          </v-sheet>
        </v-col>
      </template>

      <!-- ERROR OR NO RESOURCE -->
      <v-col v-else-if="reqError" cols="6" class="text-center">
        <TitleTile center>{{ error }}</TitleTile>
      </v-col>

      <!-- RESOURCES CARDS -->
      <v-col v-else-if="envList.length > 0" cols="12" class="py-0">
        <v-row>
          <v-col cols="12" lg="6" md="6" v-for="env in envList" :key="env.env" class="pt-0">
            <EnvResourcesCard :auto-scroll="autoScroll" :profile-id="profile.id" :env="env" @expand-env="processExpandEnv"/>
          </v-col>
        </v-row>
      </v-col>

      <ResourcesExpandEnvDialog
        :value="expandEnvShow"
        @input="toggleExpandEnv"
        :expanded-env="expandedEnv"
        :profile="profile"
      />
    </v-row>
  </ProfileSection>
</template>

<script>
import TitleTile from '@/components/profile/TitleTile'
import EnvResourcesCard from '@/components/profile/resources/EnvResourcesCard'
import ResourcesExpandEnvDialog from '@/views/Profile/components/ResourcesExpandEnvDialog'
import { mapActions, mapGetters } from 'vuex'
import { Resources } from '@/constants/store'
import ProfileSection from '@/components/profile/ProfileSection'
import BaseActionButton from '@/components/base/button/BaseActionButton'
import AddEnvironmentDialog from '@/views/Profile/components/AddEnvironmentDialog'

export default {
  name: 'ResourcesSection',
  components: {
    AddEnvironmentDialog,
    BaseActionButton,
    ProfileSection,
    ResourcesExpandEnvDialog,
    TitleTile,
    EnvResourcesCard
  },
  props: {
    profile: Object
  },
  mounted () {
    if (this.resources) this.loading = false
    else this.loadResources()
  },
  data: () => ({
    autoScroll: true,
    error: null,
    reqError: false,
    loading: true,
    expandEnvShow: false,
    expandedEnv: null
  }),
  methods: {
    ...mapActions('resources', { fetchResources: Resources.fetchAll }),
    processExpandEnv (env) {
      this.expandEnvShow = true
      this.expandedEnv = env
    },
    toggleExpandEnv (val) {
      if (!val) {
        this.expandEnvShow = false
        this.expandedEnv = null
      } else this.expandEnvShow = true
    },
    loadResources () {
      this.loading = true
      this.fetchResources(this.$route.params.id)
        .catch(e => {
          this.reqError = true
          if (e.response && e.response.status === 401) {
            this.error = 'Unauthorized to access resources of this profile.'
          } else this.error = e
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    ...mapGetters('resources', { allResources: 'data' }),
    resources () {
      const resourcesData = this.allResources.find(s => s.id === this.$route.params.id)
      return (resourcesData ? resourcesData.resourcesEnv : null)
    },
    envList () {
      if (!this.resources) return []
      return this.resources
    }
  },
  watch: {
    $route (to) {
      if (this.resources) this.loading = false
      else this.loadResources()
    }
  }
}
</script>

<style scoped>
</style>
