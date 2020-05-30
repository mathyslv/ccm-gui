<template>
    <v-sheet :color="sheetColor" class="my-1" :class="title ? 'py-0' : 'py-2 px-4'" tile>
      <p
        v-if="title"
        class="my-0 text-center d-flex align-center justify-center"
        :class="responsiveText('headline', 'display-1')"
      >
        <v-row>
          <v-col class="py-0 align-self-center" cols="4">
            <div class="d-flex justify-start" :class="$slots.append ? 'px-0' : ''">
              <slot name="prepend" />
            </div>
          </v-col>
          <v-col class="py-0 text-center" cols="4">
            <v-icon v-if="prependTitleIcon" left class="display-1">{{ prependTitleIcon }}</v-icon> {{ title }}
          </v-col>
          <v-col class="py-0 align-self-center" cols="4">
            <div class="d-flex justify-end" :class="$slots.append ? 'px-0' : ''">
              <slot name="append" />
            </div>
          </v-col>
        </v-row>
      </p>
      <p
        v-else
        class="my-0 pt-1"
        style="font-size: 20px!important;"
        :class="[{'text-center': center}, responsiveText('subtitle-1', 'body-2')]"
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
    prependTitleIcon: {
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
