<template>
  <BaseDialog title="Create a profile" :value="value" @input="onDialogInput">
    <v-form>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.name"
            color="primary"
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
            color="primary"
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
    <template #actions>
      <BaseActionButton @click="$emit('input', false)" color="text" text>Cancel</BaseActionButton>
      <v-spacer></v-spacer>
      <BaseActionButton color="success" @click="create" :loading="!!loading" icon="mdi-account-plus">
        Create
      </BaseActionButton>
    </template>
  </BaseDialog>
</template>

<script>
import { mapActions } from 'vuex'
import { Notifications, Profiles } from '@/constants/store'
import BaseDialog from '@/components/base/dialog/BaseDialog'
import BaseActionButton from '@/components/base/button/BaseActionButton'

export default {
  name: 'CreateProfileDialog',
  components: { BaseActionButton, BaseDialog },
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
