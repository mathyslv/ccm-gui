<template>
  <BaseCard spacing="pa-6" :loading="loading" :disabled="!!loading" v-if="profile">
    <ProfileSection title="Profile">
      <template #actions>
        <BaseActionButton
          small
          outlined
          icon="mdi-pencil"
          color="secondary"
          @click="editProfileDrawer = true"
        >
          Edit
        </BaseActionButton>
        <BaseActionButton
          small
          outlined
          icon="mdi-trash-can"
          color="error"
          class="ml-1"
          @click="deleteConfirmDialog = true"
        >
          Delete
        </BaseActionButton>
      </template>
      <ProfileTable
        :columns="[{title: 'Name', slot: 'name'}, {title: 'Created at', slot: 'created', title: 'UUID', slot: 'id'}]"
        :items="[profile]"
      >
        <template #item.name>
          <v-icon v-if="profile.type === 'Superadmin'" color="amber darken-1" class="mt-n1" small>mdi-account-cog</v-icon>
          {{ profile.name }}
        </template>
        <template #item.created>
          {{ createdAt }}
        </template>
      </ProfileTable>
    </ProfileSection>
    <ProfileSection title="Roles">
      <template #actions>
        <BaseActionButton small outlined icon="mdi-plus" color="success">Add</BaseActionButton>
      </template>
      <ProfileTable
        v-if="profile.roles.length > 0"
        :columns="[{title: 'Role', slot: 'name'}, {title: 'Value', slot: 'value'}]"
        :items="profile.roles"
      >
      </ProfileTable>
    </ProfileSection>
    <ResourcesSection :profile="profile" />
    <v-dialog v-model="deleteConfirmDialog" :max-width="500">
      <v-card color="error" dark class="rounded-md" :loading="loading">
        <v-card-title class="text-h5">
          <v-btn fab small color="white" icon @click="deleteConfirmDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer/>
          Delete {{ profile.name }} ?
          <v-spacer/>
          <v-btn fab small depressed color="white" light @click="deleteProfile" class="rounded-xl">
            <v-icon color="error">mdi-check</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>
    <portal to="drawer">
      <EditProfileDrawer :profile="profile" v-model="editProfileDrawer" />
    </portal>
  </BaseCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Layout, Notifications, Profiles } from '@/constants/store'
import ResourcesSection from '@/views/Profile/components/ResourcesSection'
import BaseActionButton from '@/components/base/button/BaseActionButton'
import BaseCard from '@/components/base/card/BaseCard'
import dayjs from 'dayjs'
import ProfileSection from '@/components/profile/ProfileSection'
import ProfileTable from '@/components/profile/table/ProfileTable'
import EditProfileDrawer from '@/views/Profile/EditProfileDrawer'

export default {
  name: 'Profile',
  components: { EditProfileDrawer, ProfileTable, ProfileSection, BaseCard, BaseActionButton, ResourcesSection },
  data: () => ({
    loading: false,
    deleteConfirmDialog: false,
    editProfileDrawer: false
  }),
  methods: {
    ...mapActions('profiles', { processDelete: Profiles.delete }),
    ...mapActions('layout', { setBreadcrumbs: Layout.setBreadcrumbs }),
    ...mapActions('notifications', [Notifications.addNotification]),

    async deleteProfile () {
      this.loading = 'white'
      const id = this.profile.id
      this.processDelete(id).then(() => {
        this.addNotification({ type: 'success', text: `Profile ${id} deleted.` })
        this.loading = false
        this.$router.replace({ name: 'profiles' })
      })
    }
  },
  computed: {
    ...mapGetters('resources', { allResources: 'data' }),
    ...mapGetters('profiles', ['profiles']),
    profile () {
      return this.profiles.find(p => p.id === this.$route.params.id)
    },
    createdAt () {
      if (!this.profile) return null
      return dayjs(this.profile.createdAt).format('DD/MM/YYYY')
    },
    updatedAt () {
      if (!this.profile) return null
      return dayjs(this.profile.updatedAt).format('DD/MM/YYYY')
    }
  },
  watch: {
    profile: {
      immediate: true,
      deep: true,
      handler: function (val) {
        this.setBreadcrumbs(['Profiles', (val ? val.name : '...')])
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
