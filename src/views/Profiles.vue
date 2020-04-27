<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="3" v-for="profile in profiles" :key="profile.id">
        <v-card raised @click="doSmth">
          <v-card-text>
            <p class="display-1 text--primary">
              {{ profile.name }}
              <v-icon
                v-if="profile.type === 'Superadmin'"
                class="display-1 float-right"
                color="amber"
              >
                mdi-account-cog
              </v-icon>
            </p>
            <p>/profiles/{{ profile.id }}</p>
            <p>
              Created: 22/04/2020 <br>
              Updated: 27/04/2020
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn icon text color="error">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn icon text color="accent lighten-2">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon text color="primary lighten-2">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Profiles',
  data: () => ({
    profiles: [
      {
        id: '155667a6-573f-4ee2-a381-f29ddf98893b',
        name: 'Superadmin',
        type: 'Superadmin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '0f691d89-9b8c-4cd1-934e-6ca9eff64e71',
        name: 'API',
        type: 'Normal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2381f2c6-6c01-4bd7-bb3b-5a60d9397e0c',
        name: 'Logger',
        type: 'Normal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '44a9f1c6-6c01-4cd7-bb3b-5a60d9397e0c',
        name: 'API_Events',
        type: 'Normal',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }),
  methods: {
    doSmth () {
    }
  }
}
</script>

<style scoped>

</style>
