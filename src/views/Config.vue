<template>
  <v-container class="fill-height primary" fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-row justify="center">
          <v-col md="6" cols="12" class="py-0 text-center">
            <v-icon v-if="$vuetify.breakpoint.smAndDown" color="white" class="display-3 pb-8">mdi-rocket</v-icon>
            <h1
              class="white--text d-flex justify-center"
              :class="$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-3'"
            >
              <v-icon v-if="$vuetify.breakpoint.mdAndUp" left color="white" class="display-3">mdi-rocket</v-icon>
              Welwome on CCM-GUI
            </h1>
            <v-progress-linear
              background-color="white"
              :color="success ? 'success': 'primary'"
              :indeterminate="loading || success"
              class="my-12"
            ></v-progress-linear>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="auto" class="d-flex flex-column py-0">
            <h1 class="display-1 text-center mb-8 white--text">Please specify the URL of the CCM server</h1>
            <v-text-field
              @keypress.enter="ping"
              v-model="url"
              autofocus
              solo
              label="URL"
              placeholder="Ex: 127.0.0.1:3000"
              class="headline"
              hint="eee"
              hide-details
            />
            <h1 class="headline red--text mt-1 ml-1" v-if="error">
              <span v-if="errorCode === 404">Error: The server is unreachable</span>
              <span v-else-if="error">{{ error }} {{ errorCode }}</span>
            </h1>
            <h1 class="headline success--text mt-1 ml-1" v-if="success">
              Connection successful !
            </h1>
            <BaseActionButton
              icon="mdi-arrow-right"
              @click="ping"
              :loading="loading"
              :disabled="!url"
              class="align-self-end headline mt-8"
              :color="success ? 'success' : 'accent'"
              :large="$vuetify.breakpoint.mdAndUp"
            >
              Start
            </BaseActionButton>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import { Root } from '@/constants/store'
import BaseActionButton from '@/components/base/button/BaseActionButton'

export default {
  name: 'Config',
  components: { BaseActionButton },
  mounted () {
    this.url = this.ccmServerUrl
  },
  data: () => ({
    url: null,
    error: null,
    errorCode: null,
    loading: false,
    success: false
  }),
  methods: {
    ...mapActions([Root.setCcmServerUrl]),
    ping () {
      let url = this.url
      if (url.substr(url.length - 1) !== '/') url += '/'
      console.log(url)
      this.loading = true
      axios
        .get(url + 'ping', { baseURL: null })
        .then(() => {
          this.error = null
          this.errorCode = null
          this.success = true
          setTimeout(function () {
            this.setCcmServerUrl(url)
            this.$router.push({ name: 'home' })
          }.bind(this), 1500)
        })
        .catch(e => {
          console.log('e', e)
          console.log('e.response', e.response)
          this.error = e
          if (e.response) this.errorCode = e.response.status
          else this.errorCode = null
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    ...mapGetters(['ccmServerUrl'])
  }
}
</script>

<style lang="scss">
</style>
