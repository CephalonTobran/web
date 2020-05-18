module.exports = {
  css: {
    sourceMap: true,
  },

  pwa: {
    name: "Cephalon Tobran",
    themeColor: "#4D93BA",
    msTileColor: "#000000",
  },

  productionSourceMap: false,

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
}
