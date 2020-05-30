<template>
  <v-tooltip
    transition="fade-transition"
    :left="left"
    :right="right"
    :top="top"
    :bottom="bottom"
    :nudge-left="nudgeLeft"
    :nudge-right="nudgeRight"
    :nudge-top="nudgeTop"
    :nudge-bottom="nudgeBottom"
  >
    <span class="body-1">{{ tooltip }}</span>
    <template #activator="{ on }">
      <v-btn icon tile v-on="on" @click="$emit('click')">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script>
export default {
  name: 'BaseSectionButton',
  props: {
    tooltip: String,
    icon: String,
    nudgeLeft: {
      type: [Number, String],
      default: 0
    },
    nudgeRight: {
      type: [Number, String],
      default: 0
    },
    nudgeTop: {
      type: [Number, String],
      default: 0
    },
    nudgeBottom: {
      type: [Number, String],
      default: 0
    },
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
