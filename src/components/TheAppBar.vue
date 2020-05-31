<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="toggleMainMenu"></v-app-bar-nav-icon>

    <v-toolbar-title>{{ $t("brand.name.full") }}</v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "TheAppBar",

    methods: {
      toggleMainMenu(): void {
        this.$store.commit("SET_MAIN_MENU_VISIBILITY")
      },
    },
  })
</script>
