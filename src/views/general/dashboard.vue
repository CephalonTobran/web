<template>
  <v-container id="dashboard">
    <page-heading>{{ $t("pages.dashboard.heading") }}</page-heading>

    <v-row justify="center">
      <collectibles-category-summary category="warframes" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue"
  import PageHeading from "@/components/PageHeading.vue"
  import CollectiblesCategorySummary from "@/components/Collectibles/CollectiblesCategorySummary.vue"

  export default Vue.extend({
    name: "Dashboard",

    components: {
      PageHeading,
      CollectiblesCategorySummary,
    },
  })
</script>
