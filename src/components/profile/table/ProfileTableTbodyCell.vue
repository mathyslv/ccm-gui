<template>
  <td class="text-body-1 text--text">
    <slot/>
  </td>
</template>

<script>
export default {
  name: 'ProfileTableTbodyCell'
}
</script>

<style scoped lang="scss">
  td {
    position: relative;
    border-bottom: none!important;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: calc(100% - 16px);
      margin-left: 8px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
  }
</style>
