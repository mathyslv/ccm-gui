<template>
  <div class="ccm-form-group mb-8">
    <label :for="inputId" class="title d-block mb-1" :class="focus ? color + '--text' : 'text--text'">
      <v-icon v-if="icon" :color="focus ? color : 'text'" class="mt-n1" left>
        {{ icon }}
      </v-icon>
      {{ label }}
    </label>
    <v-text-field
      outlined
      dense
      hide-details
      :color="color"
      v-bind="$attrs"
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
      required: true
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
