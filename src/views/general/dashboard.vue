<template>
  <div class="dashboard">
    <h1>{{ $t("dashboard.heading") }}</h1>

    <collectibles-category-summary
      category="warframes"
    ></collectibles-category-summary>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import CollectiblesCategorySummary from "@/components/DashboardCollectiblesCategorySummary.vue"

  export default Vue.extend({
    name: "Dashboard",

    components: {
      CollectiblesCategorySummary,
    },
  })
</script>
