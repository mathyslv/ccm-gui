<template>
  <v-container fluid>
    <Breadcrumbs :path="['Profiles']">
      <v-btn color="primary" @click="loadData(true)" :loading="loading">
        <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-refresh</v-icon>
        <span class="d-none d-md-flex">Refresh data</span>
      </v-btn>
      <v-btn class="ml-2" color="success" @click="createProfileDialog = true">
        <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-account-plus</v-icon>
        <span class="d-none d-md-flex">Create profile</span>
      </v-btn>
    </Breadcrumbs>
    <v-row v-if="loading">
      <v-col cols="12" sm="6" md="4" lg="3" v-for="n in 4" :key="n">
        <v-skeleton-loader type="article, actions" />
      </v-col>
    </v-row>

    <v-row v-else justify="start">
      <v-col cols="12" sm="6" md="4" lg="3" v-for="profile in profiles" :key="profile.id">
        <ProfileCard
          :loading="deleteProfileData.loadingId === profile.id ? 'error' : false"
          :profile="profile"
          @delete="showDeleteDialog(profile)"
        />
      </v-col>
    </v-row>

    <!-- DELETE PROFILE DIALOG -->
    <v-dialog v-model="deleteProfileData.dialog" width="600">
      <v-card>
        <v-card-title class="headline">Delete {{ deleteProfileData.profileId }} ?</v-card-title>
        <v-card-actions>
          <v-btn text @click="deleteProfileData.dialog =  false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteProfile">
            Delete
            <v-icon right>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- CREATE PROFILE DIALOG -->
  <CreateProfileDialog v-model="createProfileDialog" />

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ProfilesStyle } from '@/constants/style'
import { Notifications } from '@/constants/store'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProfileCard from '@/components/profiles/ProfileCard'
import CreateProfileDialog from '@/views/Profiles/CreateProfileDialog'

export default {
  name: 'Profiles',
  components: { CreateProfileDialog, ProfileCard, Breadcrumbs },
  mounted () {
    this.loadData()
  },
  data: () => ({
    profilesStyle: ProfilesStyle,
    loading: true,
    deleteProfileData: {
      loadingId: null,
      dialog: false,
      profileId: null
    },
    createProfileDialog: false
  }),
  methods: {
    ...mapActions('profiles', ['fetchAll', 'delete']),
    ...mapActions('notifications', [Notifications.addNotification]),
    showDeleteDialog (profile) {
      this.deleteProfileData.profileId = profile.id
      this.deleteProfileData.dialog = true
    },
    async loadData (force = false) {
      if (this.neverFetch || force) {
        this.loading = true
        await this.fetchAll()
        this.loading = false
      } else this.loading = false
    },
    async deleteProfile () {
      this.deleteProfileData.loadingId = this.deleteProfileData.profileId
      this.deleteProfileData.dialog = false
      const profile = this.profiles.find(p => p.id === this.deleteProfileData.profileId)
      await this.delete(profile.id)
      this.addNotification({ type: 'success', text: `Profile ${profile.id} deleted.` })
      this.deleteProfileData.profileId = null
      this.deleteProfileData.loadingId = null
    }
  },
  computed: {
    ...mapState('profiles', { neverFetch: 'clean', profiles: 'profiles' })
  }
}
</script>

<style scoped>

</style>
