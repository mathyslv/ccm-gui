<template>
  <div class="ccm-form-group mb-8" style="width: 100%;">
    <label
      :for="inputId"
      class="text-subtitle-1 d-block"
      :class="focus ? color + '--text' : 'text--text'"
      style="cursor: pointer;"
    >
      <v-icon v-if="icon" :color="focus ? color : 'text'" class="mt-n1">
        {{ icon }}
      </v-icon>
      {{ label }}
    </label>
    <v-text-field
      v-bind="$attrs"
      v-on="$listeners"
      class="rounded-md text-subtitle-2"
      outlined
      dense
      hide-details
      :id="inputId"
      :color="color"
      :value="value"
      @focus="focus = true"
      @blur="focus = false"
      @input="$emit('input', $event)"
      @keydown="$emit('keydown', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'secondary'
    },
    icon: {
      type: String,
      default: () => ''
    },
    label: {
      type: String,
      required: true
    },
    id: String,
    value: null
  },
  data: () => ({
    focus: false
  }),
  computed: {
    inputId () {
      return '__ccm__form-group--' + (this.id ? this.id : this._uid)
    }
  }
}
</script>

<style scoped>

</style>
