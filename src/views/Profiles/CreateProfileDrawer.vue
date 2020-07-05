<template>
  <v-navigation-drawer
    absolute
    right
    temporary
    :value="value"
    :overlay-opacity="0.75"
    :width="300"
    :clipped="false"
    @input="$emit('input', $event)"
  >
    <template #prepend>
      <v-list-item class="justify-center text-h5 ma-4 rounded-xl">
        <span class="success--text">Create profile</span>
      </v-list-item>
    </template>
    <v-divider class="mx-4 mb-4"/>
    <v-list>
      <v-list-item>
        <BaseInput icon="mdi-account" label="Name" v-model="form.name" />
      </v-list-item>
      <v-list-item>
        <BaseInput
          v-model="form.password"
          icon="mdi-lock"
          label="Password"
          :type="passwordFieldShow ? 'text' : 'password'"
          :append-icon="passwordFieldShow ? 'mdi-eye' : 'mdi-eye-off'"
          @keydown.enter="create"
          @click:append="passwordFieldShow = !passwordFieldShow"
        />
      </v-list-item>
      <v-divider class="mx-4 mb-4"/>
      <v-list-item>
        <v-spacer/>
        <BaseActionButton
          rounded="md"
          color="success"
          :loading="!!loading"
          :disabled="!form.name || !form.password"
          @click="create"
        >
          Create
        </BaseActionButton>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!--
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
  </BaseDialog>-->
</template>

<script>
import { mapActions } from 'vuex'
import { Notifications, Profiles } from '@/constants/store'
import BaseInput from '@/components/base/form/BaseInput'
import BaseActionButton from '@/components/base/button/BaseActionButton'

export default {
  name: 'CreateProfileDrawer',
  components: { BaseActionButton, BaseInput },
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
    create () {
      if (this.loading) return
      this.loading = 'success'
      const data = { ...this.form, type: 'Normal' }
      this.processCreate(data)
        .then(profile => {
          this.addNotification({ type: 'success', text: `Profile ${this.form.name} created.` })
          this.loading = false
          this.form.name = null
          this.form.password = null
          this.passwordFieldShow = false
          this.$emit('input', false)
          this.$router.push({ name: 'profile', params: { id: profile.id } })
        })
        .catch(e => { console.log(e.response) })
    }
  }
}
</script>

<style scoped>

</style>
