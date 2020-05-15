import Vue from "vue"
import App from "./components/TheApp.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import i18n from "./plugins/i18n"

// Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,

  created: function () {
    this.$store.dispatch("enableDatabasePersistence")
    this.$store.dispatch("warframes/listen", "warframes")
  },

  render: (h) => h(App),
}).$mount("#app")
