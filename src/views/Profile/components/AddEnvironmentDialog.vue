<template>
  <v-dialog
    v-model="dialog"
    max-width="650px"
    :overlay-opacity="0.97"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-card v-on="on" elevation="0" tile>
        <v-card-text class="headline white--text d-flex align-center px-5 py-5">
          <v-icon color="green" :left="fullActivator">mdi-plus</v-icon>
          {{ fullActivator ? 'Add environment' : '' }}
        </v-card-text>
      </v-card>
    </template>
    <v-card :loading="loading" :disabled="!!loading">
      <v-card-title class="headline primary row mx-0">
        <div class="col pa-0"></div>
        <div class="col-10 pa-0 text-center">Add an environment</div>
        <div class="col pa-0 text-right">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-container pt-0>
          <v-row class="py-4">
            <v-col>
              <h1 class="text-center white--text headline">Name of the environment</h1>
              <v-row justify="center">
                <v-col cols="6">
                  <v-text-field
                    v-model="env"
                    hide-details
                    label="name"
                    name="environment"
                    autocomplete="off"
                    required
                    autofocus
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <hr class="mb-4"/>
          <v-row>
            <v-col>
              <h1 class="text-center white--text headline">Add the first resource</h1>
              <v-row>
                <v-col>
                  <v-text-field
                    color="white"
                    label="key"
                    ref="newResourceKey"
                    v-model="newResource.key"/>
                </v-col>
                <v-col class="resource-key-col" cols="3">
                  <v-select
                    :color="newResourceTypeColor"
                    label="_type"
                    :item-color="newResourceTypeColor"
                    :items="['string', 'integer', 'boolean']"
                    v-model="newResource._type"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    :color="newResourceTypeColor"
                    label="value"
                    @update:error="valueError = $event"
                    v-model="newResource.value"
                    :rules="newResourceTypeRules"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          tile
          color="green darken-1"
          @click="add"
          :loading="!!loading"
          :disabled="!env || !newResource.key || !newResource.value || valueError"
        >
          Add
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { Notifications, Resources } from '@/constants/store'

export default {
  name: 'AddEnvironmentDialog',
  props: {
    profileId: String,
    fullActivator: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    dialog: false,
    valueError: false,
    env: null,
    newResource: {
      key: null,
      value: null,
      _type: 'string'
    },
    rules: {
      required: value => !!value || 'required',
      boolean: value => (value === 'true' || value === 'false') || "'true' or 'false'",
      integer: value => /^[0-9]+$/.test(value) || 'should contain only digits',
      string: () => true
    }
  }),
  methods: {
    ...mapActions('resources', { processDelete: Resources.deleteOne, processCreate: Resources.createOne }),
    ...mapActions('notifications', [Notifications.addNotification]),
    async add () {
      if (!this.newResource.key || !this.newResource.value) return
      try {
        this.loading = 'green'
        await this.processCreate({ id: this.profileId, env: this.env, data: this.newResource })
        this.addNotification({ type: 'success', text: `Environment ${this.env} added.` })
        this.addNotification({ type: 'success', text: `Resource ${this.env}/${this.newResource.key} added.` })
        this.env = null
        this.newResource.key = null
        this.newResource.value = null
        this.newResource._type = 'string'
        this.dialog = false
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    newResourceTypeColor () {
      switch (this.newResource._type) {
        case 'integer':
          return 'blue lighten-2'
        case 'boolean':
          return 'yellow darken-2'
        default:
          return 'white'
      }
    },
    newResourceTypeRules () {
      switch (this.newResource._type) {
        case 'integer':
          return [this.rules.required, this.rules.integer]
        case 'boolean':
          return [this.rules.required, this.rules.boolean]
        default:
          return [this.rules.required]
      }
    }
  },
  watch: {
    'newResource._type' () {
      const value = this.newResource.value
      this.newResource.value = ''
      this.$nextTick(() => {
        this.newResource.value = value
      })
    }
  }
}
</script>

<style scoped>

</style>
