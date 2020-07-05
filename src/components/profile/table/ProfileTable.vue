<template>
  <v-simple-table class="profile-table">
    <thead>
    <ProfileTableTheadRow>
      <ProfileTableTheadCell v-for="(column, index) in columns" :key="index">
        {{ column.title }}
      </ProfileTableTheadCell>
    </ProfileTableTheadRow>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <td class="text-body-1 text--text" v-for="(column, colIndex) in columns" :key="colIndex">
        <slot :name="'col.' + column.slot">{{ item[column.slot] }}</slot>
      </td>
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import ProfileTableTheadRow from '@/components/profile/table/ProfileTableTheadRow'
import ProfileTableTheadCell from '@/components/profile/table/ProfileTableTheadCell'
export default {
  name: 'ProfileTable',
  components: { ProfileTableTheadCell, ProfileTableTheadRow },
  props: {
    columns: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
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
      &:not(:last-child) td {
        position: relative;
        border-bottom: none!important;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: calc(100% - 16px);
          margin-left: 8px;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
      }
    }
  }
</style>
