<template>
  <SettingBaseCard title="CCM Server URL">
    <v-text-field class="headline" color="white" solo-inverted v-model="url" @keydown.enter="save" />
    <template #actions>
      <v-spacer></v-spacer>
      <v-btn color="green" @click="save" tile>
        Save
        <v-icon right>mdi-check</v-icon>
      </v-btn>
    </template>
  </SettingBaseCard>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SettingBaseCard from '@/components/settings/SettingBaseCard'
import { Notifications, Root } from '@/constants/store'

export default {
  name: 'CcmServerUrl',
  components: { SettingBaseCard },
  mounted () {
    this.url = this.ccmServerUrl
  },
  data: () => ({
    url: null
  }),
  methods: {
    ...mapActions({ setCcmServerUrl: Root.setCcmServerUrl }),
    ...mapActions('notifications', [Notifications.addNotification]),
    save () {
      let url = this.url
      if (url.substring(url.length - 1) !== '/') url += '/'
      document.activeElement.blur()
      if (url === this.ccmServerUrl) return
      this.setCcmServerUrl(url)
      this.addNotification({
        type: 'success',
        text: 'CCM Server URL saved.'
      })
    }
  },
  computed: {
    ...mapGetters(['ccmServerUrl'])
  }
}
</script>

<style scoped>

</style>
