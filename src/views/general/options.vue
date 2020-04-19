<template>
  <v-container id="options">
    <page-heading>{{ $t("pages.options.heading") }}</page-heading>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue"
  import PageHeading from "@/components/PageHeading.vue"

  export default Vue.extend({
    name: "Options",

    components: {
      PageHeading,
    },
  })
</script>
