<template>
  <v-container id="about">
    <page-heading>{{ $t("pages.about.heading") }}</page-heading>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue"
  import PageHeading from "@/components/PageHeading.vue"

  export default Vue.extend({
    name: "About",

    components: {
      PageHeading,
    },
  })
</script>
