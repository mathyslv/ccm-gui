<template>
  <v-dialog :value="value" width="600" @input="onDialogInput">
    <v-card :loading="loading">
      <v-card-title class="headline">Create a profile</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.name"
                color="white"
                autocomplete="off"
                label="Name"
                prepend-icon="mdi-account"
                type="text"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                @keydown.enter="create"
                v-model="form.password"
                color="white"
                id="password"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="passwordFieldShow ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwordFieldShow ? 'text' : 'password'"
                @click:append="passwordFieldShow = !passwordFieldShow"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$emit('input', false)">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="create" :loading="loading">
          Create
          <v-icon right>mdi-account-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { Notifications, Profiles } from '@/constants/store'

export default {
  name: 'CreateProfileDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    passwordFieldShow: false,
    form: {
      name: null,
      password: null
    }
  }),
  methods: {
    ...mapActions('profiles', { processCreate: Profiles.create }),
    ...mapActions('notifications', [Notifications.addNotification]),
    onDialogInput (evt) {
      this.$emit('input', evt)
    },
    switchPasswordFieldType () {
      const t = this.passwordFieldType
      this.passwordFieldType = (t === 'password') ? 'text' : 'password'
    },
    create () {
      this.loading = 'success'
      const data = { ...this.form, type: 'Normal' }
      this.processCreate(data)
        .then(() => {
          this.addNotification({ type: 'success', text: `Profile ${this.form.name} created.` })
          this.$emit('input', false)
          this.loading = false
          this.form.name = null
          this.form.password = null
        })
        .catch(e => { console.log(e.response) })
    }
  }
}
</script>

<style scoped>

</style>
