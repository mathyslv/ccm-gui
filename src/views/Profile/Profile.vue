<template>
  <BaseCard spacing="pa-6">
    <ProfileSection title="Profile">
      <template #actions>
        <BaseActionButton small outlined icon="mdi-pencil" color="primary">Edit</BaseActionButton>
        <BaseActionButton small outlined icon="mdi-trash-can" color="error" class="ml-1">Delete</BaseActionButton>
      </template>
      <ProfileTable>
        <thead>
        <ProfileTableTheadRow>
          <ProfileTableTheadCell>Name</ProfileTableTheadCell>
          <ProfileTableTheadCell>Created at</ProfileTableTheadCell>
          <ProfileTableTheadCell>UUID</ProfileTableTheadCell>
        </ProfileTableTheadRow>
        </thead>
        <tbody>
        <tr>
          <td class="text-body-1 text--text">
            <v-icon v-if="profile.type === 'Superadmin'" color="amber darken-1" class="mt-n1" small>mdi-account-cog</v-icon>
            {{ profile.name }}
          </td>
          <td class="text-body-1 text--text">{{ createdAt }}</td>
          <td class="text-body-1 text--text">{{ profile.id }}</td>
        </tr>
        </tbody>
      </ProfileTable>
    </ProfileSection>
    <ProfileSection title="Roles">
      <template #actions>
        <BaseActionButton small outlined icon="mdi-plus" color="success">Add</BaseActionButton>
      </template>
      <ProfileTable>
        <thead>
        <ProfileTableTheadRow>
          <ProfileTableTheadCell>Role</ProfileTableTheadCell>
          <ProfileTableTheadCell>Value</ProfileTableTheadCell>
        </ProfileTableTheadRow>
        </thead>
        <tbody>
        <tr v-for="(role, index) in profile.roles" :key="index">
          <td class="text-body-1 text--text">{{ role.name }}</td>
          <td class="text-body-1 text--text">{{ role.value }}</td>
        </tr>
        </tbody>
      </ProfileTable>
    </ProfileSection>
    <ResourcesSection :profile="profile" />
    <!--
    <InformationsSection :profile="profile" :cols="12" />
    <RolesSection :profile="profile" :cols="12" />
    -->
  </BaseCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Layout } from '@/constants/store'
import ResourcesSection from '@/views/Profile/components/ResourcesSection'
import BaseActionButton from '@/components/base/button/BaseActionButton'
import BaseCard from '@/components/base/card/BaseCard'
import dayjs from 'dayjs'
import ProfileSection from '@/components/profile/ProfileSection'
import ProfileTable from '@/components/profile/table/ProfileTable'
import ProfileTableTheadRow from '@/components/profile/table/ProfileTableTheadRow'
import ProfileTableTheadCell from '@/components/profile/table/ProfileTableTheadCell'

export default {
  name: 'Profile',
  components: { ProfileTableTheadCell, ProfileTableTheadRow, ProfileTable, ProfileSection, BaseCard, BaseActionButton, ResourcesSection },
  methods: {
    ...mapActions('layout', { setBreadcrumbs: Layout.setBreadcrumbs })
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
      handler: function (val) {
        this.setBreadcrumbs(['Profiles', (val ? val.name : '...')])
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .profile-table {
    tbody tr {
      &:hover {
        background: inherit!important;
      }
    }
  }
</style>
