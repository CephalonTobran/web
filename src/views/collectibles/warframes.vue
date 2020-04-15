<template>
  <v-container id="collectible-warframes-view">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $tc("warframes.heading", total) }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(warframe, index) in warframes"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <collectible-item-summary :warframe="warframe" />
      </v-col>
    </v-row>

    <router-view />
  </v-container>
</template>

<script lang="ts">
  import CollectibleItemSummary from "@/components/CollectibleItemSummary.vue"

  export default {
    name: "Warframes",

    components: {
      CollectibleItemSummary,
    },

    computed: {
      warframes(): string {
        return this.$store.state.warframes
      },

      total(): number {
        return this.$store.getters.totalWarframes
      },
    },
  }
</script>
