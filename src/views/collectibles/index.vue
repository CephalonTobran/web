<template>
  <div class="collectibles">
    <h1>{{ $t("pages.collectibles.heading") }}</h1>

    <collectibles-category-summary
      category="warframes"
    ></collectibles-category-summary>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import CollectiblesCategorySummary from "@/components/CollectiblesCategorySummary.vue"

  export default Vue.extend({
    name: "Collectibles",

    components: {
      CollectiblesCategorySummary,
    },
  })
</script>
