<template>
    <v-sheet :color="sheetColor" class="my-1" :class="title ? 'py-0' : 'py-2 px-4'" tile>
      <p
        v-if="title"
        class="my-0 text-center d-flex align-center justify-center"
        :class="responsiveText('headline', 'display-1')"
      >
        <v-icon v-if="prependIcon" left class="display-1">{{ prependIcon }}</v-icon>
        {{ title }}
      </p>
      <p
        v-else
        class="my-0"
        :class="[{'text-center': center}, responsiveText('subtitle-1', 'headline')]"
      >
        <slot></slot>
      </p>
    </v-sheet>
</template>

<script>
import { ResponsiveTextMixin } from '@/mixins/ResponsiveText'

export default {
  name: 'InformationTile',
  mixins: [ResponsiveTextMixin],
  props: {
    prependIcon: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    sheetColor () {
      if (this.color) return this.color
      return this.title ? 'primary' : null
    }
  }
}
</script>

<style scoped>

</style>
