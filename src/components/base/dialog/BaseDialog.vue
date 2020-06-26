<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    :max-width="650"
    :overlay-opacity="0.8"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"/>
    </template>
    <v-card :loading="loading" :disabled="disabled">
      <v-card-title class="headline primary row ma-0 py-2 white--text">
        <div class="col pa-0"></div>
        <div class="col-8 pa-0 text-center">{{ title }}</div>
        <div class="col pa-0 text-right">
          <v-tooltip left color="transparent" :nudge-left="-15" :open-delay="750" transition="slide-x-reverse-transition">
            <template #activator="{ on }">
              <v-btn
                v-on="on"
                icon
                @click="$emit('input',false)"
                color="primary lighten-4"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span class="grey--text text--lighten-2">close</span>
          </v-tooltip>
        </div>
      </v-card-title>
      <v-card-text class="pa-12">
        <slot />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    title: String,
    loading: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: 650
    }
  },
  data: () => ({
    closeHover: false
  })
}
</script>

<style scoped>

</style>
