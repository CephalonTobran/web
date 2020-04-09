<template>
  <v-app>
    <the-main-menu></the-main-menu>

    <the-app-bar></the-app-bar>

    <!-- Main Content -->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- End Main Content -->
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue"
  import TheMainMenu from "@/components/TheMainMenu.vue"
  import TheAppBar from "@/components/TheAppBar.vue"

  export default Vue.extend({
    name: "App",

    components: {
      TheMainMenu,
      TheAppBar,
    },
  })
</script>
