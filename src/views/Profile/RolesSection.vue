<template>
  <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" class="pt-0">
    <!-- ROLES TITLE -->
    <v-row>
      <v-col>
        <InformationTile title="Roles">
          <!-- <template #prepend>
            <v-tooltip right transition="fade-transition">
              <span class="body-1">Refresh</span>
              <template #activator="{ on }">
                <v-btn icon tile v-on="on">
                  <v-icon >mdi-refresh</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </template> -->
        </InformationTile>
      </v-col>
    </v-row>

    <!-- SKELETON INFORMATIONS -->
    <v-row v-if="loading">
      <v-col class="py-1">
        <v-sheet class="pa-2">
          <v-row><v-col v-for="n in 3" :key="n"><v-skeleton-loader type="heading"/></v-col></v-row>
          <v-row v-for="n in 3" :key="n"><v-col v-for="n in 3" :key="n"><v-skeleton-loader type="text"/></v-col></v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- NO ROLE -->
    <InformationTile v-else-if="profile && profile.roles.length === 0" class="text-center">No role</InformationTile>

    <!-- ROLES CARDS -->
    <v-sheet v-else class="py-2 px-4" tile>
        <v-simple-table v-if="profile">
          <thead>
          <tr>
            <th class="subtitle-1">Name</th>
            <th class="subtitle-1">Value</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(role, index) in profile.roles" :key="index">
            <td class="subtitle-1">{{ role.name }}</td>
            <td class="subtitle-1">{{ role.value }}</td>
          </tr>
          </tbody>
        </v-simple-table>
    </v-sheet>
  </v-col>
</template>

<script>
import InformationTile from '@/components/profile/TitleTile'

export default {
  name: 'RolesSection',
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
  }
}
</script>

<style lang="scss" scoped>
  $hover-color: #454545;
  .v-application {
    thead {
      tr {
        background-color: #454545 !important;
        th {
          font-size: 1rem !important;
          color: white !important;
          padding-top: 0;
          padding-bottom: 0;
          height: 36px !important;
        }
      }
    }
    tr {
      &:hover {
        background-color: $hover-color !important;
      }
      & > th,
      & > td {
        border-bottom: none !important;
        height: 36px !important;
      }
    }
  }
</style>
