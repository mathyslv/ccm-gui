<template>
  <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" class="pt-0">

    <!-- INFORMATIONS TITLE -->
    <v-row><v-col><InformationTile title="Informations"/></v-col></v-row>

    <!-- INFORMATIONS CARDS -->
    <template v-if="!loading">
      <InformationTile>Name: {{ profile.name }}</InformationTile>
      <InformationTile> Type:
        <v-chip
          label
          :color="profileBadgeColor"
          class="mt-n2"
          :class="responsiveText('subtitle-1', 'headline')"
        >
          {{ profile.type }}
          <v-icon
            v-if="profile.type === 'Superadmin'"
            right
            :class="responsiveText('subtitle-1', 'headline')"
          >
            mdi-account-cog
          </v-icon>
        </v-chip>
      </InformationTile>
      <InformationTile>Created at: {{ computedData.profileCreatedAt }}</InformationTile>
      <InformationTile>Updated at: {{ computedData.profileUpdatedAt }}</InformationTile>
    </template>

    <!-- SKELETON INFORMATIONS -->
    <v-row v-else>
      <v-col class="py-0">
        <v-skeleton-loader v-for="n in 4" :key="n" type="list-item" class="my-1"/>
      </v-col>
    </v-row>

  </v-col>
</template>

<script>
import dayjs from 'dayjs'
import InformationTile from '@/components/profile/TitleTile'
import { ProfilesStyle } from '@/constants/style'
import { ResponsiveTextMixin } from '@/mixins/ResponsiveText'

export default {
  name: 'InformationsSection',
  mixins: [ResponsiveTextMixin],
  components: { InformationTile },
  props: {
    loading: Boolean,
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
    computedData: {
      profileCreatedAt: null,
      profileUpdatedAt: null
    }
  }),
  computed: {
    profileBadgeColor () {
      if (!this.profile) return ProfilesStyle.Colors.Default
      return ProfilesStyle.Colors[this.profile.type] || ProfilesStyle.Colors.Default
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
