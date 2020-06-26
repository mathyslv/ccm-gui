<template>
  <BaseDashboardCard title="Server URL" align="start">
    <BaseInput label="URL" v-model="url" icon="mdi-link-variant" @keydown.enter="save"/>
  </BaseDashboardCard>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Notifications, Root } from '@/constants/store'
import BaseInput from '@/components/base/form/BaseInput'
import BaseDashboardCard from '@/components/base/card/BaseDashboardCard'

export default {
  name: 'CcmServerUrl',
  components: { BaseDashboardCard, BaseInput },
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
