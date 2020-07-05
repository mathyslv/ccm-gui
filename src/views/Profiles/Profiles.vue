<template>
  <BaseContainer>
    <v-row v-if="loading">
      <v-col cols="12" sm="6" md="4" lg="3" v-for="n in 4" :key="n">
        <v-skeleton-loader type="article, actions" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" lg="9" xl="10">
        <router-view v-if="$route.name !== 'profiles'"/>
        <BaseCard v-else class="text-center justify-center">
          <v-row>
            <v-col class="align-self-center text-center shrink px-4 px-md-8 px-xl-12">
              <v-icon color="grey lighten-1" :size="128">mdi-information-variant</v-icon>
            </v-col>
            <v-col class="grow px-6">
              <h1 class="text-h2 grey--text text--lighten-1 text-center my-6" id="empty-tagline">
                To display informations about a profile, select one from the right panel
              </h1>
            </v-col>
            <v-col class="align-self-center text-center shrink px-4 px-md-8 px-xl-12">
              <v-icon color="primary lighten-1" :size="92">mdi-arrow-right</v-icon>
            </v-col>
          </v-row>
        </BaseCard>
      </v-col>
      <v-col cols="12" lg="3" xl="2">
        <BaseCard>
          <v-list flat color="white" outlined class="py-0">
            <v-list-item @click="createProfileDialog = true" :input-value="false" class="success lighten-5">
              <v-list-item-content>
                <v-list-item-title class="success--text text--darken-3">Create profile</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action-text>
                <v-icon color="success darken-2">mdi-plus</v-icon>
              </v-list-item-action-text>
            </v-list-item>
            <v-list-item-group color="blue" active-class="primary white--text">
              <v-divider class="my-2"/>
              <template v-for="(profile, index) in profiles">
                <v-list-item
                  :key="profile.id"
                  :to="{name: 'profile', params: { id: profile.id }}"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ profile.name }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action-text>
                    <v-icon v-if="profile.type === 'Superadmin'" color="amber darken-1" small>mdi-account-cog</v-icon>
                  </v-list-item-action-text>
                </v-list-item>
                <v-divider v-if="index < profiles.length - 1" :key="profile.id + '-d'" class="my-2"/>
              </template>
            </v-list-item-group>
          </v-list>
        </BaseCard>
        <!-- v-for="profile in profiles" :key="profile.id" -->
        <!-- <ProfileCard
          :loading="deleteProfileData.loadingId === profile.id ? 'error' : false"
          :profile="profile"
          @delete="showDeleteDialog(profile)"
        /> -->
      </v-col>
    </v-row>

    <!-- DELETE PROFILE DIALOG -->
    <v-dialog v-model="deleteProfileData.dialog" width="600" :overlay-opacity="0.97" transition="slide-y-transition">
      <v-card>
        <v-card-title class="headline">Delete {{ deleteProfileData.profileId }} ?</v-card-title>
        <v-card-actions>
          <v-btn tile text @click="deleteProfileData.dialog =  false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn tile color="error" @click="deleteProfile">
            Delete
            <v-icon right>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- CREATE PROFILE DIALOG -->
    <portal to="drawer">
      <CreateProfileDrawer v-model="createProfileDialog" />
    </portal>
  </BaseContainer>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ProfilesStyle } from '@/constants/style'
import { Notifications } from '@/constants/store'
import CreateProfileDrawer from '@/views/Profiles/CreateProfileDrawer'
import BaseContainer from '@/components/base/layout/BaseContainer'
import BaseCard from '@/components/base/card/BaseCard'

export default {
  name: 'Profiles',
  components: { BaseCard, BaseContainer, CreateProfileDrawer },
  mounted () {
    this.loadData()
  },
  data: () => ({
    items: [
      { title: 'Home', icon: 'home' },
      { title: 'About', icon: 'plus' }
    ],
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

<style scoped lang="scss">
#empty-tagline {
  line-height: 1.4em!important;
}
</style>
