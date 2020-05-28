<template>
  <CenteredView>
      <v-col cols="12" sm="8" md="4">
        <v-card
          class="elevation-12"
          :loading="loading ? 'primary' : false"
          :disabled="loading">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Log in to a profile</v-toolbar-title>
          </v-toolbar>
          <v-card-title v-if="error" class="error--text">
            <v-icon color="error" class="mr-2">mdi-alert-circle</v-icon>
            {{ error }}
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.profile"
                color="white"
                label="Login"
                prepend-icon="mdi-account"
                @keydown.enter="login"
              />
              <v-text-field
                v-model="form.password"
                color="white"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                @keydown.enter="login"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="accent lighten-2" tile :to="{ name: 'register' }">
              <v-icon left>mdi-account-plus</v-icon>
              Create a profile
            </v-btn>
            <v-spacer/>
            <v-btn color="primary" class="px-4" tile @click.stop="login">
              Log in
              <v-icon right>mdi-arrow-right-bold-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
  </CenteredView>
</template>

<script>
import { mapActions } from 'vuex'
import CenteredView from '@/components/CenteredView'
import { Auth, Notifications } from '@/constants/store'
import { LoginNotification } from '@/constants/notifications'

export default {
  name: 'Login',
  components: { CenteredView },
  data: () => ({
    form: {
      profile: null,
      password: null
    },
    loading: false,
    error: null
  }),
  methods: {
    ...mapActions('notifications', [Notifications.addNotification]),
    ...mapActions('auth', { processLogin: Auth.login }),
    async login () {
      this.loading = true
      try {
        await this.processLogin(this.form)
        this.addNotification(LoginNotification(this.form.profile))
        await this.$router.push({ name: 'profiles' })
      } catch (e) {
        this.error = e.message
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
