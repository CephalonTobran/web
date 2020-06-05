<template>
  <v-app>
    <the-main-menu />

    <the-app-bar />

    <v-content>
      <router-view />
    </v-content>

    <the-scroll-to-top-button />
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue"
  import TheMainMenu from "@/components/TheMainMenu.vue"
  import TheAppBar from "@/components/TheAppBar.vue"
  import TheScrollToTopButton from "@/components/TheScrollToTopButton.vue"

  export default Vue.extend({
    name: "App",

    components: {
      TheMainMenu,
      TheAppBar,
      TheScrollToTopButton,
    },
  })
</script>
