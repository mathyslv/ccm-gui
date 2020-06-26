<template>
  <BaseHoverCard
    spacing="pa-4"
    :loading="loading || ownLoading"
    @click="viewProfile"
    :disabled="!!loading || !!ownLoading"
  >
    <template #hover>
      <v-row dense class="grow">
        <v-col>
          <BaseActionButton color="error" icon="mdi-trash-can-outline" @click.stop="$emit('delete')">
            Delete
          </BaseActionButton>
        </v-col>
        <v-col>
          <BaseActionButton color="info" icon="mdi-eye" @click.stop="viewProfile">
            Open
          </BaseActionButton>
        </v-col>
        <v-col>
          <BaseActionButton color="amber darken-2" icon="mdi-account-key" @click.stop="getProfileToken">
            Token
          </BaseActionButton>
        </v-col>
      </v-row>
    </template>
    <p class="display-1 text--text d-flex align-center ma-0">
      <v-icon
        v-if="profile.type === 'Superadmin'"
        left
        class="display-1 float-right"
        :color="profilesStyle.Colors.Superadmin"
      >
        mdi-account-cog
      </v-icon>
      {{ profile.name }}
      <v-spacer />
      <span class="title secondary--text">{{ (Math.round(Math.random() * 100)) + 3 }} resources</span>
      <!-- <span class="subtitle-2">{{ profile.id }}</span> -->
    </p>
    <hr class="my-2 pa-0 transparent" />
    <p class="text--text d-flex subtitle-1 ma-0">
      Created: {{ createdAtFormat }} <v-spacer /> Updated: {{ updatedAtFormat }}
    </p>
      <!-- <v-btn icon large text color="error" @click.stop="$emit('delete')" tile>
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn icon large text :color="profilesStyle.Colors.Superadmin" @click.stop="getProfileToken" tile>
        <v-icon>mdi-account-key</v-icon>
      </v-btn>
      <v-btn icon large text color="accent lighten-2" @click.stop="editProfile" tile>
        <v-icon>mdi-pencil</v-icon>
      </v-btn> -->
    <v-dialog id="token-dialog-container" v-model="tokenDialog.show" max-width="600">
      <v-card>
        <v-card-title class="body-1" :id="'generated-token-' + profile.id">
          {{tokenDialog.token}}
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="green lighten-1"
            tile
            text
            :disabled="tokenDialog.copyButtonPressed"
            @click="tokenCopied"
            :id="'copy-generated-token-' + profile.id"
            :data-clipboard-target="'#generated-token-' + profile.id">
            {{ tokenDialog.copyButtonPressed ? 'Copied' : 'Copy' }}
            <v-icon right>{{ tokenDialog.copyButtonPressed ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="dark" text @click="tokenDialog.show = false" tile>Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </BaseHoverCard>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import * as ClipboardJS from 'clipboard'
import { mapActions } from 'vuex'
import { ProfilesStyle } from '@/constants/style'
import { Notifications } from '@/constants/store'
import BaseCard from '@/components/base/card/BaseCard'
import BaseHoverCard from '@/components/base/card/BaseHoverCard'
import BaseActionButton from '@/components/base/button/BaseActionButton'

export default {
  name: 'ProfileCard',
  // eslint-disable-next-line vue/no-unused-components
  components: { BaseActionButton, BaseHoverCard, BaseCard },
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
      setTimeout(function () {
        this.tokenDialog.copyButtonPressed = false
      }.bind(this), 2500)
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
