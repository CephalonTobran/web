import Vue from "vue"
import Vuetify from "vuetify/lib"

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#537793",
        secondary: "#6A8fAC",
        accent: "#E94F19",
      },
      dark: {
        primary: "#132E47",
        secondary: "#1E3A54",
        accent: "#8E3C20",
      },
    },
  },
})
