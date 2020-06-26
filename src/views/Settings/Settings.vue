<template>
  <BaseContainer>
    <v-row>
      <v-col cols="12" md="6" lg="4" class="d-flex child-flex">
        <CcmServerUrl />
      </v-col>
      <v-col cols="12" md="6" lg="4" class="d-flex child-flex">
        <ApiLoggingLevels />
      </v-col>
    </v-row>
  </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/base/layout/BaseContainer'
import CcmServerUrl from '@/views/Settings/components/CcmServerUrl'
import ApiLoggingLevels from '@/views/Settings/components/ApiLoggingLevels'

export default {
  name: 'Settings',
  components: { ApiLoggingLevels, CcmServerUrl, BaseContainer }
}
</script>

<style lang="scss" scoped>
</style>
