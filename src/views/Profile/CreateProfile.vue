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
                @keydown.enter="createProfile"
              />
              <BaseInput
                type="password"
                label="Password"
                icon="mdi-lock"
                v-model="form.password"
                @keydown.enter="createProfile"
              />
              <BaseInput
                type="password"
                label="Password confirmation"
                icon="mdi-lock"
                v-model="form.passwordConfirm"
                @keydown.enter="createProfile"
              />
            </v-col>
          </v-row>
          <template #actions>
            <BaseActionButton color="accent" :to="{ name: 'profiles' }" icon="mdi-account-plus" text>
              Back to Profiles
            </BaseActionButton>
            <v-spacer/>
            <BaseActionButton
              :disabled="!isValid"
              color="primary"
              @click.stop="createProfile"
              icon-right
              icon="mdi-account-search"
            >
              Create
            </BaseActionButton>
          </template>
        </BaseCard>
      </v-col>
    </v-row>
  </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/base/layout/BaseContainer'
import BaseCard from '@/components/base/card/BaseCard'
import BaseInput from '@/components/base/form/BaseInput'
import BaseActionButton from '@/components/base/button/BaseActionButton'
export default {
  name: 'CreateProfile',
  components: { BaseActionButton, BaseInput, BaseCard, BaseContainer },
  data: () => ({
    form: {
      profile: null,
      password: null,
      passwordConfirm: null
    }
  }),
  methods: {
    createProfile () {
      //  if (!this.isValid) return
    }
  },
  computed: {
    isValid () {
      const validations = [
        !!this.form.profile,
        !!this.form.password,
        !!this.form.passwordConfirm,
        this.form.password === this.form.passwordConfirm
      ]
      return validations.every(v => v)
    }
  }
}
</script>

<style scoped>

</style>
