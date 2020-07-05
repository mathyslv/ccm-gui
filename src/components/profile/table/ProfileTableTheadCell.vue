<template>
  <th class="text-body-1 text--text text--lighten-3">
    <slot/>
  </th>
</template>

<script>
export default {
  name: 'ProfileTableTheadCell'
}
</script>

<style scoped lang="scss">
  th {
    position: relative;
    border-bottom: none !important;
    height: 24px !important;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: calc(100% - 16px);
      margin-left: 8px;
      border-bottom: 1px solid var(--v-text-lighten3);
    }
  }
</style>
