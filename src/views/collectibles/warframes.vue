<template>
  <collectible-item-list category="warframes" />
</template>

<script lang="ts">
  import Vue from "vue"
  import CollectibleItemList from "@/components/Collectibles/CollectibleItemList.vue"

  export default Vue.extend({
    name: "Warframes",

    components: {
      CollectibleItemList,
    },
  })
</script>
