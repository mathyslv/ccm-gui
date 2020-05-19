<template>
  <v-card raised :loading="loading || ownLoading" @click="viewProfile" :disabled="!!loading || !!ownLoading">
    <v-card-text>
      <p class="display-1 white--text">
        {{ profile.name }}
        <v-icon
          v-if="profile.type === 'Superadmin'"
          class="display-1 float-right"
          :color="profilesStyle.Colors.Superadmin"
        >
          mdi-account-cog
        </v-icon>
      </p>
      <p>/profiles/{{ profile.id }}</p>
      <p>
        Created: {{ createdAtFormat }} <br>
        Updated: {{ updatedAtFormat }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn icon large text color="error" @click.stop="$emit('delete')">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn icon large text :color="profilesStyle.Colors.Superadmin" @click.stop="getProfileToken">
        <v-icon>mdi-account-key</v-icon>
      </v-btn>
      <v-btn icon large text color="accent lighten-2" @click.stop="editProfile">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog id="token-dialog-container" v-model="tokenDialog.show" max-width="600">
      <v-card>
        <v-card-title class="body-1" :id="'generated-token-' + profile.id">
          {{tokenDialog.token}}
        </v-card-title>
        <v-card-actions>
          <v-btn color="green lighten-1" text
                 :disabled="tokenDialog.copyButtonPressed"
                 @click="tokenCopied"
                 :id="'copy-generated-token-' + profile.id"
                 :data-clipboard-target="'#generated-token-' + profile.id">
            {{ tokenDialog.copyButtonPressed ? 'Copied' : 'Copy' }}
            <v-icon right>{{ tokenDialog.copyButtonPressed ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="dark" text @click="tokenDialog.show = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import * as ClipboardJS from 'clipboard'
import { mapActions } from 'vuex'
import { ProfilesStyle } from '@/constants/style'
import { Notifications } from '@/constants/store'

export default {
  name: 'ProfileCard',
  props: {
    profile: Object,
    loading: {
      type: [String, Boolean],
      default: false
    }
  },
  data: () => ({
    clipboardJsInstance: null,
    ownLoading: false,
    profilesStyle: ProfilesStyle,
    tokenDialog: {
      show: false,
      token: null,
      copyButtonPressed: false
    }
  }),
  methods: {
    ...mapActions('notifications', [Notifications.addNotification]),
    viewProfile () {
      this.$router.push({ name: 'profile', params: { id: this.profile.id } })
    },
    getProfileToken () {
      this.ownLoading = ProfilesStyle.Colors.Superadmin
      setTimeout(async function () {
        try {
          const { data = {} } = await axios.get('auth/token/' + this.profile.id)
          this.tokenDialog.show = true
          this.tokenDialog.token = data.access_token
          this.$nextTick(() => {
            this.clipboardJsInstance = new ClipboardJS('#copy-generated-token-' + this.profile.id, {
              container: document.getElementById('token-dialog-container')
            })
          })
        } catch (e) {
          const response = e.response || {}
          if (response.status === 401) return console.log(new Error('Unauthorized'))
          if (response.status === 403) return console.log(new Error('Forbidden'))
          return console.log(e)
        } finally {
          this.ownLoading = false
        }
      }.bind(this), 500)
    },
    editProfile () {
      this.ownLoading = 'accent lighten-2'
      setTimeout(function () {
        this.ownLoading = false
        this.addNotification({ type: 'success', color: 'accent lighten-2', text: `Profile ${this.profile.id} saved.` })
      }.bind(this), 2000)
    },
    tokenCopied () {
      this.tokenDialog.copyButtonPressed = true
      setTimeout(function () { this.tokenDialog.copyButtonPressed = false }.bind(this), 2500)
    }
  },
  computed: {
    createdAtFormat () {
      return dayjs(this.profile.createdAt).format('DD/MM/YYYY')
    },
    updatedAtFormat () {
      return dayjs(this.profile.updatedAt).format('DD/MM/YYYY')
    }
  }
}
</script>

<style scoped>

</style>
