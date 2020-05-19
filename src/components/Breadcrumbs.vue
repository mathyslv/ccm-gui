<template>
  <v-row justify="start" align="center">
    <v-col cols="auto">
      <template v-for="(item, index) in items">
        <span v-if="item.type === 'path'" :key="index" :class="responsiveDisplay">{{ item.value }}</span>
        <span v-else :key="index" :class="[responsiveDisplay, {'mx-2': $vuetify.breakpoint.mdAndUp}]">
          <v-icon :class="responsiveDisplay">mdi-chevron-double-right</v-icon>
        </span>
      </template>
    </v-col>
    <v-spacer></v-spacer>
    <v-col :cols="twoLines ? 12 : 'auto'" md="auto">
      <slot></slot>
      <v-btn v-if="back" class="ml-4" color="accent" @click.stop="$router.back()">
        <span class="d-none d-md-flex">Back</span>
        <v-icon :right="$vuetify.breakpoint.mdAndUp">mdi-keyboard-return</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" v-if="$vuetify.breakpoint.smAndDown">
      <hr class="">
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    path: Array,
    back: {
      type: Boolean,
      default: false
    },
    twoLines: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items () {
      const path = this.path
      return path.reduce((acc, item, index) => {
        acc.push({ type: 'path', value: item })
        if (index < path.length - 1) acc.push({ type: 'separator' })
        return acc
      }, [])
    },
    responsiveDisplay () {
      return this.$vuetify.breakpoint.smAndDown ? 'headline' : 'display-2'
    }
  }
}
</script>

<style scoped>

</style>
