<template>
  <v-simple-table class="resource-table"
                  :class="{'resource-table-expanded': expanded, 'resource-table-new': newResourceShow}">
    <thead>
    <tr>
      <th class="body-2 resource-col resource-key-col">Key</th>
      <th class="body-2 resource-col resource-type-col">_type</th>
      <th class="body-2 resource-col">Value</th>
      <th v-if="!expanded" class="min-width-col tools-column-th text-center">
        <v-icon class="body-2" color="white">mdi-cog</v-icon>
      </th>
    </tr>
    </thead>
    <v-fade-transition group tag="tbody">
      <tr v-for="resource in env.resources"
          :key="resource.key"
          :class="{'resource-extended': resource.extended}">
        <td class="subtitle-1 resource-col resource-key-col">{{ resource.key }}</td>
        <td class="subtitle-1 resource-col resource-type-col" :class="[valueColor(resource)]">{{ resource._type }}</td>
        <td class="subtitle-1 resource-col text-left" :class="[valueColor(resource)]">
          {{ resource.value }}
        </td>
        <td class="min-width-col tools-column-td" v-if="!expanded">
          <template v-if="!resource.extended || resource.override">
            <v-btn icon color="accent" tile>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red darken-2" tile @click="deleteResource(resource)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
        </td>
      </tr>
      <tr v-if="newResourceShow" key="__new__" class="grey darken-3" :id="'new-resource-tr-' + env.env">
        <td>
          <v-text-field color="white" placeholder="key" ref="newResourceKey"
                        :autofocus="autoScroll"
                        @keypress.enter="createResource"
                        v-model="newResource.key"
          />
        </td>
        <td class="resource-key-col">
          <v-select :color="newResourceTypeColor" placeholder="_type"
                    :item-color="newResourceTypeColor"
                    @keypress.enter="createResource"
                    :items="['string', 'integer', 'boolean']"
                    v-model="newResource._type"
          />
        </td>
        <td class="pb-1">
          <v-text-field :color="newResourceTypeColor" placeholder="value"
                        @update:error="valueError = $event"
                        @keypress.enter="createResource"
                        v-model="newResource.value"
                        :rules="newResourceTypeRules"
          >
          </v-text-field>
        </td>
        <td class="text-center">
          <v-btn
            color="green darken-2"
            tile
            depressed
            :loading="loading"
            :disabled="!newResource.value || !newResource.key || valueError"
            @click="createResource"
          >
            Add
          </v-btn>
        </td>
      </tr>
    </v-fade-transition>
  </v-simple-table>
</template>

<script>
import { mapActions } from 'vuex'
import { Notifications, Resources } from '@/constants/store'

export default {
  name: 'EnvResourcesTable',
  props: {
    loading: {
      type: Boolean || String,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    profileId: String,
    newResourceShow: {
      type: Boolean,
      default: false
    },
    env: Object,
    autoScroll: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valueError: false,
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
    valueColor (resource) {
      switch (resource._type) {
        case 'integer':
          return 'blue--text text--lighten-2'
        case 'boolean':
          return 'yellow--text text--darken-2'
        default:
          return ''
      }
    },
    setLoading (val) {
      this.$emit('loading', val)
    },
    async createResource () {
      if (!this.newResource.key || !this.newResource.value) return
      try {
        this.setLoading('green')
        await this.processCreate({ id: this.profileId, env: this.env.env, data: this.newResource })
        this.addNotification({ type: 'success', text: `Resource ${this.env.env}/${this.newResource.key} added.` })
        this.newResource.key = null
        this.newResource.value = null
        this.newResource._type = 'string'
        if (this.autoScroll) {
          this.scrollToNewResourceTr()
          this.$refs.newResourceKey.focus()
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.setLoading(false)
      }
    },
    async deleteResource (resource) {
      try {
        this.setLoading('red darken-2')
        await this.processDelete({ id: this.profileId, env: resource.env, key: resource.key })
        this.addNotification({ type: 'success', text: `Resource ${resource.env}/${resource.key} deleted.` })
      } catch (e) {
        console.log(e)
      } finally {
        this.setLoading(false)
      }
    },
    scrollToNewResourceTr () {
      setTimeout(function () {
        this.$scrollTo('#new-resource-tr-' + this.env.env, 500, { offset: -300 })
      }.bind(this), 200)
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
    'newResourceShow' (show) {
      if (show) {
        if (this.autoScroll) this.scrollToNewResourceTr()
      }
    },
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

<style lang="scss" scoped>
  $hover-color: #454545;
  $extended-color: rgba(103, 58, 183, 0.15);

  .fade-enter-active,
  .fade-leave-active {
    transition: all .4s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }

  .min-width-col {
    width: 1px;
    white-space: nowrap;
  }

  .resource-table-new {
    .resource-type-col.min-width-col {
      min-width: 150px;
    }
  }

  .tools-column-th > i {
    color: rgba(255, 255, 255, 0.7);
  }

  .resource-extended-title {
    color: $extended-color !important;
  }

  .resource-table tr > td,
  .resource-table tr > th {
    border-bottom: none !important;
  }

  .resource-table tr {
    &:hover {
      background-color: $hover-color !important;
      & > td.tools-column-td {
      }
    }

    & > td {
      height: 36px !important;
    }
  }

  .resource-col {
    max-width: 300px;
  }

  .v-application thead {
    tr {
      background-color: #454545 !important;

      th {
        font-size: 1rem !important;
        color: white !important;
        padding-top: 0;
        padding-bottom: 0;
        height: 36px !important;
      }
    }
  }

  .resource-extended {
    background-color: $extended-color !important;

    &:hover {
      background-color: $hover-color !important;
    }
  }

  .mdi-28px {
    font-size: 28px !important;
  }

  .resource-table-expanded {
    .resource-col {
      font-size: 150% !important;
    }

    .min-width-col {
      width: auto !important;
      white-space: nowrap;
    }

    thead th.resource-col {
      // font-size: 175% !important;
    }
  }
</style>
