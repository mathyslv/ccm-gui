<template>
  <v-expansion-panel :disabled="disabled">
    <v-expansion-panel-header class="py-0" :class="[headerClass, disabled ? 'pr-12' : '']">
      <v-row align="center">
        <v-col v-if="(column, index) in columns" class="py-0 text-left" cols="2">
          <slot name="id"/>
          <v-btn v-if="disabled" icon color="white" class="sort-button ml-2" small>
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </v-col>
        <v-col class="py-0 text-left" cols="2"><slot name="date"/></v-col>
        <v-col class="py-0 text-left" cols="2"><slot name="emitter"/></v-col>
        <v-col class="py-0 text-left" cols="2"><slot name="type"/></v-col>
        <v-col class="py-0 text-left" cols="2"><slot name="category"/></v-col>
        <v-col class="py-0 text-left" cols="2"><slot name="target"/></v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content :class="contentClass">
      <slot name="default" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'ExpansionPanel',
  props: {
    headerClass: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    columns: [
      'id',
      'date',
      'emitter',
      'type',
      'category',
      'target'
    ]
  })
}
</script>

<style lang="scss" scoped>
  .sort-button {
    pointer-events: all!important;
  }

  .v-expansion-panel:not(.v-expansion-panel--disabled) > .v-expansion-panel-header:hover:hover::before {
    opacity: 0.08;
  }
</style>
