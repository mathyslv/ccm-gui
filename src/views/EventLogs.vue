<template>
  <v-container fluid px-8>
    <v-overlay :value="filtering" :opacity="0.9">
      <v-progress-circular indeterminate size="96" color="white"></v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col class="text-left">
        <span v-if="filters.length === 0" class="headline">You have no filter</span>
        <v-fade-transition group>
          <v-chip
            v-for="(filter, index) in filters"
            :key="index"
            color="accent"
            label
            class="title ml-2 mb-2"
            close
            @click:close="filters.splice(index, 1)"
          >
            {{filter.property}} {{filter.comparison}} {{filter.value}}
          </v-chip>
        </v-fade-transition>
      </v-col>
      <v-col class="shrink headline">
        <v-dialog :max-width="500" :overlay-opacity="0.97" v-model="addFilterDialog">
          <template #activator="{ on }">
            <v-btn v-on="on" color="accent">
              <v-icon left>mdi-plus</v-icon>
              filter
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="justify-center primary">
              Add filter : {{addFilterData.property}} {{addFilterData.comparison}} {{addFilterData.value}}
            </v-card-title>
            <v-card-text class="pt-8 px-8">
              <v-container fluid>
                <v-row class="align-center">
                  <v-col cols="4" class="text-right"><h1 class="title white--text">Property</h1></v-col>
                  <v-col>
                    <v-select
                      v-model="addFilterData.property"
                      solo
                      light
                      hide-details
                      item-color="white"
                      :items="['id', 'emitter', 'type', 'category', 'target', 'meta']"
                    />
                  </v-col>
                </v-row>
                <v-row class="align-center">
                  <v-col cols="4" class="text-right"><h1 class="title white--text">Comparison</h1></v-col>
                  <v-col>
                    <v-select
                      v-model="addFilterData.comparison"
                      solo
                      light
                      item-color="white"
                      hide-details
                      class="text-center align-self-center"
                      :items="['=', '<', '>']"
                    />
                  </v-col>
                </v-row>
                <v-row class="align-center">
                  <v-col cols="4" class="text-right"><h1 class="title white--text">Value</h1></v-col>
                  <v-col>
                    <v-text-field
                      v-model="addFilterData.value"
                      hide-details
                      light
                      solo
                      label="value"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="success"
                @click="addFilter"
                :disabled="!addFilterData.property || !addFilterData.comparison || !addFilterData.value"
              >
                add
                <v-icon right>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-divider color="white"/>
    <v-row>
      <v-col cols="12">
        <v-card color="transparent">
          <v-card-text class="px-0">
            <v-simple-table>
              <thead>
              <tr>
                <th
                  v-for="(column, index) in columns"
                  :key="index"
                  class="subtitle-1 white--text text-uppercase align-center"
                >
                  <v-btn
                    v-if="!column.base"
                    :color="column.active ? 'primary' : 'white'"
                    class="sort-button subtitle-1"
                    tile
                    :text="!column.active"
                    @click="toggleSortBy(column)"
                  >
                    {{ column.title }}
                    <v-slide-x-transition>
                      <v-icon v-if="column.active" right>
                        {{ column.sort === 'desc' ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
                      </v-icon>
                    </v-slide-x-transition>
                  </v-btn>
                  <template v-else>{{ column.title }}</template>
                </th>
              </tr>
              </thead>
              <v-fade-transition group tag="tbody" leave-absolute>
                <tr v-for="event in resultEvents" :key="event.id">
                  <td
                    v-for="(column, index) in columns"
                    :key="index"
                    :class="!column.isFilter ? 'subtitle-1' : ''"
                  >
                    <v-btn
                      v-if="column.isFilter"
                      text
                      :color="!!column.buttonColorFn ? buttonColorFn(column.buttonColorFn, event) : 'white'"
                      class="subtitle-1"
                      :class="column.noTextTransform ? 'text-none' : ''"
                      @click="addFilterBy(column.key, event[column.key])"
                    >
                      {{ event[column.key] }}
                    </v-btn>
                    <template v-else>{{ event[column.key] }}</template>
                  </td>
                </tr>
              </v-fade-transition>
            </v-simple-table>
            {{ page }} /
            {{ pages }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import columns from './event-logs/columns'
import fakeEvents from './event-logs/fake-events.json'

export default {
  name: 'EventLogs',
  data: () => ({
    page: 1,
    pages: [1],
    addFilterDialog: false,
    columns,
    events: fakeEvents,
    addFilterData: {
      property: null,
      comparison: null,
      value: null
    },
    filteredEvents: [],
    filtering: false,
    filters: []
  }),
  created () {
    this.events.forEach(event => {
      event.formattedDate = dayjs(event.date).format('DD/MM/YYYY - HH:mm:ss')
    })
  },
  methods: {
    addFilter () {
      const exists = this.filters.find(f => {
        return f.property === this.addFilterData.property &&
            f.comparison === this.addFilterData.comparison &&
            f.value === this.addFilterData.value
      })
      if (!exists) this.filters.push({ ...this.addFilterData })
      this.addFilterDialog = false
    },
    addFilterBy (property, value) {
      const exists = this.filters.find(f => {
        return f.property === property &&
            f.comparison === '=' &&
            f.value === value
      })
      if (!exists) this.filters.push({ property, comparison: '=', value })
    },
    toggleSortBy (column) {
      if (!column.active) column.active = true
      else if (column.sort === 'desc') column.sort = 'asc'
      else {
        column.active = false
        column.sort = 'desc'
      }
    },
    sortEvents () {
      const sortBy = this.columns.filter(c => c.active)
      if (sortBy.length === 0) sortBy.push(this.columns.find(c => c.base))
      sortBy.forEach(s => {
        this.filteredEvents.sort((e1, e2) => {
          let result
          const key = s.key || s.title
          const delta = s.sort === 'asc' ? 1 : -1
          if (s.f) result = s.f(e1, e2)
          else result = e1[key] > e2[key] ? 1 : -1
          return result * delta
        })
      })
    },
    buttonColorFn (f, event) {
      return this[f](event)
    },
    typeButtonColor (event) {
      switch (event.type) {
        case 'create':
          return 'success lighten-1'
        case 'update':
          return 'warning lighten-1'
        case 'delete':
          return 'error'
        default:
          return 'white'
      }
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    filterEvents () {
      this.filtering = true
      new Promise((resolve, reject) => {
        const filters = this.filters
        this.sleep(500).then(() => {
          const events = this.events.filter(event => {
            if (!filters.length) return true
            return filters.every(filter => {
              switch (filter.comparison) {
                case '=':
                  return event[filter.property].toLowerCase() === filter.value.toLowerCase()
                case '<':
                  return event[filter.property] < filter.value
                case '>':
                  return event[filter.property] > filter.value
                default:
                  return true
              }
            })
          })
          resolve(events)
        })
      }).then(filtered => {
        console.log(this.filtering)
        this.filtering = false
        this.filteredEvents = filtered
        this.page = 1
        this.pages = []
        for (let i = 0; i < Math.ceil(filtered.length / 10); i++) {
          this.pages.push(i + 1)
        }
      })
    }
  },
  computed: {
    resultEvents () {
      return this.filteredEvents.slice((this.page - 1) * 10, this.page * 10)
    }
  },
  watch: {
    filters: {
      immediate: true,
      handler: function () {
        this.filterEvents()
        this.sortEvents()
      }
    },
    columns: {
      immediate: true,
      deep: true,
      handler: function () {
        this.sortEvents()
      }
    }
  }
}
</script>

<style scoped>

</style>
