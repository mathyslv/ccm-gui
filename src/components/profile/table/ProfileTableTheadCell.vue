<template>
  <th class="text-body-1 white--text">
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
    border: none !important;
    height: 24px !important;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 20px;
      height: 1px;
      border-bottom: 1px solid red;
    }
  }
</style>
