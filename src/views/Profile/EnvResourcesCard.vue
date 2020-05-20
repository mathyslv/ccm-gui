<template>
  <v-card :disabled="!!loading" :loading="loading">
    <v-card-text>
      <p class="headline white--text d-flex" :class="{'mb-0': !showTable}">
        /{{ env.env }} ({{ env.resources.length }})
        <template v-if="!!env.extends">
          <span class="px-2 grey--text text--darken-1">extends</span> /{{ env.extends }}
        </template>
        <v-spacer />
        <v-btn tile fab x-small color="green darken-2" class="mr-2"
               :text="!newResource.show"
               @click="toggleNewResource"
        >
          <v-icon v-if="!newResource.show">mdi-plus</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
        <v-btn color="blue" tile :text="!showTable"
               fab
               x-small
               @click="toggleTable"
        >
          <v-icon v-if="!showTable">mdi-chevron-down</v-icon>
          <v-icon v-else>mdi-chevron-up</v-icon>
        </v-btn>
      </p>
      <hr v-show="showTable">
      <v-simple-table v-show="showTable" class="resource-table">
        <thead>
        <tr>
          <th class="body-2 resource-col">Key</th>
          <th class="body-2 resource-col">Value</th>
          <th class="body-2 resource-col">_type</th>
          <th class="tools-column tools-column-th text-right"><v-icon class="body-2">mdi-tools</v-icon></th>
        </tr>
        </thead>
        <v-fade-transition group tag="tbody">
        <tr v-for="resource in env.resources"
            :key="resource.key"
            :class="{'resource-extended': resource.extended}">
          <td class="subtitle-1 resource-col">{{ resource.key }}</td>
          <td class="subtitle-1 resource-col" :class="[valueColor(resource)]">
            {{ resource.value }}
          </td>
          <td class="subtitle-1 resource-col" :class="[valueColor(resource)]">{{ resource._type }}</td>
          <td class="tools-column">
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
        <tr v-if="newResource.show" key="__new__" class="grey darken-3" :id="'new-resource-tr-' + env.env">
          <td>
            <v-text-field color="white" placeholder="key" ref="newResourceKey"
                          :autofocus="autoScroll"
                          @keypress.enter="createResource"
                          v-model="newResource.key"
            />
          </td>
          <td>
            <v-text-field color="white" placeholder="value"
                          @keypress.enter="createResource"
                          v-model="newResource.value"
            />
          </td>
          <td>
            <v-select color="white" placeholder="_type"
                      item-color="white"
                      @keypress.enter="createResource"
                      :items="['string', 'integer', 'boolean']"
                      v-model="newResource._type"
            />
          </td>
          <td class="text-center">
            <v-btn color="green darken-2" tile depressed
                   :disabled="!newResource.value || !newResource.key"
                   @click="createResource"
            >
              Save
            </v-btn>
          </td>
        </tr>
        </v-fade-transition>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { Notifications, Resources } from '@/constants/store'

export default {
  name: 'EnvResourcesCard',
  props: {
    id: String,
    env: Object,
    autoScroll: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    showTable: false,
    newResource: {
      show: false,
      key: null,
      value: null,
      _type: 'string'
    }
  }),
  methods: {
    ...mapActions('resources', { processDelete: Resources.deleteOne, processCreate: Resources.createOne }),
    ...mapActions('notifications', [Notifications.addNotification]),
    async createResource () {
      if (!this.newResource.key || !this.newResource.value) return
      try {
        this.loading = 'green'
        await this.processCreate({ id: this.id, env: this.env.env, data: this.newResource })
        this.addNotification({ type: 'success', text: `Resource ${this.env.env}/${this.newResource.key} created.` })
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
        this.loading = false
      }
    },
    async deleteResource (resource) {
      try {
        this.loading = 'red darken-2'
        await this.processDelete({ id: this.id, env: resource.env, key: resource.key })
        this.addNotification({ type: 'success', text: `Resource ${resource.env}/${resource.key} deleted.` })
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    scrollToNewResourceTr () {
      setTimeout(function () {
        this.$scrollTo('#new-resource-tr-' + this.env.env, 500, { offset: -300 })
      }.bind(this), 200)
    },
    valueColor (resource) {
      switch (resource._type) {
        case 'integer':
          return 'red--text text--darken-2'
        case 'boolean':
          return 'yellow--text text--darken-2'
        default:
          return ''
      }
    },
    toggleTable () {
      this.showTable = !this.showTable
      if (!this.showTable) this.newResource.show = false
    },
    toggleNewResource () {
      this.newResource.show = !this.newResource.show
      if (this.newResource.show) this.showTable = true
    }
  },
  watch: {
    'newResource.show' (show) {
      if (show) {
        if (this.autoScroll) this.scrollToNewResourceTr()
      }
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

  .tools-column {
    width: 1px;
    white-space: nowrap;
    &.tools-column-th > i {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .resource-extended-title {
    color: $extended-color !important;
  }

  .resource-table tr > td,
  .resource-table tr > th {
    border-bottom: none!important;
  }
  .resource-table tr  {
    &:hover {
      background-color: $hover-color !important;
    }
    & > td {
      height: 36px!important;
    }
  }

  .resource-col {
    max-width: 300px;
  }

  .resource-extended {
    background-color: $extended-color !important;
    &:hover {
      background-color: $hover-color !important;
    }
  }
</style>
