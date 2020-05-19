export const ResponsiveTextMixin = {
  methods: {
    responsiveText (smAndDownClass, mdAndUpClass) {
      return this.$vuetify.breakpoint.smAndDown ? smAndDownClass : mdAndUpClass
    }
  }
}
