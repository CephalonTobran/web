<template>
  <v-container id="collectibles">
    <page-heading>{{ $t("pages.collectibles.heading") }}</page-heading>

    <collectibles-category-summary category="warframes" />
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue"
  import PageHeading from "@/components/PageHeading.vue"
  import CollectiblesCategorySummary from "@/components/Collectibles/CollectiblesCategorySummary.vue"

  export default Vue.extend({
    name: "Collectibles",

    components: {
      PageHeading,
      CollectiblesCategorySummary,
    },
  })
</script>
