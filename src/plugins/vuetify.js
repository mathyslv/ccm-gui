import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#092a53',
        secondary: '#1e54b3',
        accent: '#fc5185',
        error: colors.red.darken1,
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        text: '#424242',
        color1: '#841716',
        color2: '#ee942e',
        color3: '#098260',
        color4: '#0b2c57'
      }
    },
    options: {
      customProperties: true
    }
  }
})
