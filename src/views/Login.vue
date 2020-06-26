<template>
  <BaseContainer>
    <v-row class="justify-center">
      <v-col cols="12" sm="8" lg="6">
        <BaseCard spacing="pt-12 px-12">
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <BaseInput
                label="Profile name"
                icon="mdi-account-circle"
                v-model="form.profile"
                autofocus
                @keydown.enter="login"
              />
              <BaseInput
                type="password"
                label="Password"
                icon="mdi-lock"
                v-model="form.password"
                @keydown.enter="login"
              />
            </v-col>
          </v-row>
          <template #actions>
            <v-spacer/>
            <BaseActionButton
              color="primary"
              @click.stop="login"
              icon-right
              icon="mdi-login-variant"
            >
              Login
            </BaseActionButton>
          </template>
        </BaseCard>
      </v-col>
    </v-row>
  </BaseContainer>
</template>

<script>
import { mapActions } from 'vuex'
import { Auth, Notifications } from '@/constants/store'
import { LoginNotification } from '@/constants/notifications'
import BaseActionButton from '@/components/base/button/BaseActionButton'
import BaseContainer from '@/components/base/layout/BaseContainer'
import BaseInput from '@/components/base/form/BaseInput'
import BaseCard from '@/components/base/card/BaseCard'

export default {
  name: 'Login',
  components: { BaseCard, BaseInput, BaseContainer, BaseActionButton },
  data: () => ({
    form: {
      profile: null,
      password: null
    },
    loading: false,
    error: null,
    profileNameFocus: false,
    passwordFocus: false
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
