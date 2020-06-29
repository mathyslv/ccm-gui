<template>
  <div class="mb-10">
    <h1 class="text-h5 text--text font-weight-bold mb-3 d-flex">
      {{ title }}
      <v-spacer/>
      <slot name="actions"/>
    </h1>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ProfileSection',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
