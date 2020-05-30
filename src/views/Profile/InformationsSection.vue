<template>
  <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" class="pt-0">

    <!-- INFORMATIONS TITLE -->
    <v-row>
      <v-col>
        <InformationTile title="Informations">
          <template #prepend>
            <BaseSectionButton tooltip="Refresh" icon="mdi-refresh" right @click="loadProfile" />
          </template>
          <template #append>
            <BaseSectionButton tooltip="Delete" icon="mdi-trash-can-outline" left />
            <BaseSectionButton tooltip="Edit" icon="mdi-pencil" left :nudge-left="37" />
          </template>
        </InformationTile>
      </v-col>
    </v-row>

    <!-- INFORMATIONS CARDS -->
    <template v-if="!loading">
      <InformationTile v-for="(information, index) in informations" :key="index">
        <v-chip label color="#454545" class="mt-n1 subtitle-1 mr-2" style="border-radius: 0px!important;">
          {{ information.name }}
        </v-chip>
        {{ information.value }}
        <v-icon
          v-if="information.type && profile.type === 'Superadmin'"
          right
          :color="profileStyle.Colors.Superadmin"
          class="mt-n1"
          :class="responsiveText('subtitle-1', 'headline')"
        >
          mdi-account-cog
        </v-icon>
      </InformationTile>
    </template>

    <!-- SKELETON INFORMATIONS -->
    <v-row v-else>
      <v-col class="py-0">
        <v-skeleton-loader v-for="n in 5" :key="n" type="list-item" class="my-1"/>
      </v-col>
    </v-row>

  </v-col>
</template>

<script>
import dayjs from 'dayjs'
import InformationTile from '@/components/profile/TitleTile'
import { ProfilesStyle } from '@/constants/style'
import { ResponsiveTextMixin } from '@/mixins/ResponsiveText'
import { mapActions } from 'vuex'
import { Profiles } from '@/constants/store'
import BaseSectionButton from '@/components/base/BaseSectionButton'

export default {
  name: 'InformationsSection',
  mixins: [ResponsiveTextMixin],
  components: { BaseSectionButton, InformationTile },
  props: {
    profile: Object,
    cols: {
      type: Number,
      default: null
    },
    sm: {
      type: Number,
      default: null
    },
    md: {
      type: Number,
      default: null
    },
    lg: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    loading: true,
    profileStyle: ProfilesStyle,
    computedData: {
      profileCreatedAt: null,
      profileUpdatedAt: null
    }
  }),
  mounted () {
    if (this.profile) this.loading = false
    else this.loadProfile()
  },
  methods: {
    ...mapActions('profiles', { fetchProfile: Profiles.fetchOne }),
    loadProfile () {
      this.loading = true
      this.fetchProfile(this.$route.params.id).then(() => { this.loading = false })
    }
  },
  computed: {
    profileBadgeColor () {
      if (!this.profile) return ProfilesStyle.Colors.Default
      return ProfilesStyle.Colors[this.profile.type] || ProfilesStyle.Colors.Default
    },
    informations () {
      if (!this.profile) return []
      return [
        { name: 'Name', value: this.profile.name },
        { name: 'UUID', value: this.profile.id },
        { name: 'Type', value: this.profile.type, type: true },
        { name: 'Created', value: this.computedData.profileCreatedAt },
        { name: 'Updated', value: this.computedData.profileUpdatedAt }
      ]
    }
  },
  watch: {
    profile: {
      immediate: true,
      handler: function (profile) {
        if (profile) {
          this.computedData.profileCreatedAt = dayjs(profile.createdAt).format('DD/MM/YYYY')
          this.computedData.profileUpdatedAt = dayjs(profile.updatedAt).format('DD/MM/YYYY')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
