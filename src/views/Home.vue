<template>
  <CenteredView>
    <v-col cols="12" sm="8" md="6">
      <v-row>
        <v-col>
          <h1
            class="text-center"
            :class="responsiveText('display-3', 'display-4')"
          >
            CCM-GUI
          </h1>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col>
          <h1
            class="text-center"
            :class="responsiveText('headline', 'display-1')"
          >
            An user-friendly GUI to manage a CCM server
          </h1>
        </v-col>
      </v-row>
      <hr class="my-12">
      <v-row>
        <v-col>
          <h1
            class="text-center d-flex justify-space-around"
            :class="[
              responsiveText('headline', 'display-1'),
              { 'flex-column': $vuetify.breakpoint.smAndDown }
            ]"
          >
            <span>Server URL</span>
            <router-link id="server-url" class="deep-purple--text text--ligthen-2 pb-2" :to="{ name: 'settings' }">
              {{ ccmServerUrl }}
            </router-link>
          </h1>
        </v-col>
      </v-row>
    </v-col>
  </CenteredView>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CenteredView from '../components/CenteredView'
import { ResponsiveTextMixin } from '@/mixins/ResponsiveText'
import { Layout } from '@/constants/store'

export default {
  name: 'Home',
  mixins: [ResponsiveTextMixin],
  components: { CenteredView },
  created () {
    this.setBreadcrumbs([])
  },
  methods: {
    ...mapActions('layout', { setBreadcrumbs: Layout.setBreadcrumbs })
  },
  computed: {
    ...mapGetters(['ccmServerUrl'])
  }
}
</script>

<style lang="scss">
  #server-url {
    text-decoration: none;
    position: relative;

    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      height: 3px;
      transition: width .4s ease-out;
      -webkit-transition: width .4s ease-out;
      background-color: currentColor;
    }

    &:hover:after {
      width: 100%;
      left: 0;
    }
  }
</style>
