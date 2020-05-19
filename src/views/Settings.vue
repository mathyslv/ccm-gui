<template>
  <v-container fluid>
    <Breadcrumbs :path="['Settings']" />
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <CcmServerUrl />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import CcmServerUrl from '@/views/Settings/CcmServerUrl'

export default {
  name: 'Settings',
  components: { CcmServerUrl, Breadcrumbs }
}
</script>

<style scoped>

</style>
