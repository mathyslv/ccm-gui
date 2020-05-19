<template>
  <CenteredView>
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Create a profile</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.profile"
                color="white"
                autocomplete="off"
                label="Name"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                v-model="form.password"
                color="white"
                id="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
              />
              <v-text-field
                v-model="form.passwordConfirm"
                color="white"
                id="passwordConfirm"
                label="Password confirmation"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="accent lighten-2" :to="{ name: 'login' }">
              <v-icon left>mdi-arrow-left</v-icon>
              Back to log in
            </v-btn>
            <v-spacer/>
            <v-btn color="primary" class="px-4">
              Create
              <v-icon right>mdi-account-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
  </CenteredView>
</template>

<script>
import CenteredView from '@/components/CenteredView'

export default {
  name: 'Register',
  components: { CenteredView },
  data: () => ({
    form: {
      profile: null,
      password: null,
      passwordConfirm: null
    }
  })
}
</script>

<style scoped>

</style>
