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
        <span class="secondary--text">Edit profile</span>
      </v-list-item>
    </template>
    <v-divider class="mx-4 mb-4"/>
    <v-list>
      <v-list-item>
        <BaseInput @keypress.enter="update" icon="mdi-account" label="Name" v-model="form.name" />
      </v-list-item>
      <v-divider class="mx-4 mb-4"/>
      <v-list-item>
        <v-spacer/>
        <BaseActionButton
          rounded="md"
          color="secondary"
          :loading="!!loading"
          :disabled="!form.name || form.name === profile.name"
          @click="update"
        >
          Update
        </BaseActionButton>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex'
import { Notifications, Profiles } from '@/constants/store'
import BaseInput from '@/components/base/form/BaseInput'
import BaseActionButton from '@/components/base/button/BaseActionButton'

export default {
  name: 'EditProfileDrawer',
  components: { BaseActionButton, BaseInput },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    profile: Object
  },
  data: () => ({
    loading: false,
    form: {
      name: null
    }
  }),
  methods: {
    ...mapActions('profiles', { processUpdate: Profiles.update }),
    ...mapActions('notifications', [Notifications.addNotification]),
    update () {
      if (this.loading || !this.form.name || this.form.name === this.profile.name) return
      this.loading = 'secondary'
      const data = { id: this.profile.id, data: { ...this.form } }
      this.processUpdate(data)
        .then(profile => {
          this.addNotification({ type: 'success', text: `Profile ${this.form.name} updated.` })
          this.loading = false
          this.$emit('input', false)
        })
        .catch(e => { console.log(e) })
    }
  },
  watch: {
    profile: {
      immediate: true,
      deep: true,
      handler: function (profile) {
        if (profile) this.form.name = profile.name
      }
    }
  }
}
</script>

<style scoped>

</style>
