<template>
  <v-row v-if="profile" :justify="envList.length === 0 ? 'center': 'start'" class="masonry">
    <v-col cols="12">
      <TitleTile
        :prepend-icon="reqError ? 'mdi-lock' : null"
        title="Resources"
        :color="error ? 'red' : null"
      />
    </v-col>

    <!-- SKELETON RESOURCES -->
    <template v-if="loading">
      <v-col cols="4" v-for="n in 3" :key="n">
        <v-sheet class="px-2">
          <v-skeleton-loader type="date-picker-options"/>
          <!-- <v-row>
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader type="heading"/>
            </v-col>
          </v-row>
          <v-row v-for="n in 4" :key="n">
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader type="text"/>
            </v-col>
          </v-row> -->
        </v-sheet>
      </v-col>
    </template>

    <!-- ERROR OR NO RESOURCE -->
    <v-col v-else-if="reqError" cols="6" class="text-center">
      <TitleTile center>{{ error }}</TitleTile>
    </v-col>

    <v-col v-else-if="envList.length === 0"  cols="auto" class="text-center">
      <AddEnvironmentDialog full-activator :profile-id="profile.id" />
    </v-col>

    <!-- RESOURCES CARDS -->
    <v-col v-else cols="12" class="py-0">
      <v-fade-transition group tag="div" class="row">
        <v-col cols="12" lg="6" md="6" v-for="env in envList" :key="env.env" class="pt-0">
          <EnvResourcesCard :auto-scroll="autoScroll" :profile-id="profile.id" :env="env" @expand-env="processExpandEnv"/>
        </v-col>
        <v-col cols="auto" key="add-env-btn" class="pt-0">
          <!-- <v-card @click="toggleAddEnv" elevation="0">
            <v-card-text class="headline white--text d-flex align-center px-5 text-lowercase py-5">
              <v-icon color="green darken-2">mdi-plus</v-icon>
            </v-card-text>
          </v-card> -->
          <AddEnvironmentDialog :profile-id="profile.id" />
          <!-- <v-btn x-large color="green">Add resource</v-btn> -->
        </v-col>
      </v-fade-transition>
    </v-col>

    <ResourcesExpandEnvDialog
      :value="expandEnvShow"
      @input="toggleExpandEnv"
      :expanded-env="expandedEnv"
      :profile="profile"
    />
  </v-row>
</template>

<script>
import TitleTile from '@/components/profile/TitleTile'
import EnvResourcesCard from '@/components/profile/resources/EnvResourcesCard'
import ResourcesExpandEnvDialog from '@/views/Profile/ResourcesExpandEnvDialog'
import AddEnvironmentDialog from '@/views/Profile/AddEnvironmentDialog'

export default {
  name: 'ResourcesSection',
  components: { AddEnvironmentDialog, ResourcesExpandEnvDialog, TitleTile, EnvResourcesCard },
  props: {
    loading: Boolean,
    reqError: Boolean,
    error: String,
    autoScroll: Boolean,
    envList: Array,
    profile: Object
  },
  data: () => ({
    expandEnvShow: false,
    expandedEnv: null
  }),
  methods: {
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
    toggleAddEnv () {
    }
  }
}
</script>

<style scoped>
</style>
