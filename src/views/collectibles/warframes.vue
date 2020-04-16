<template>
  <v-container id="collectible-warframes-view">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $tc("warframes.heading", total) }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-select
          v-model="sortBy"
          :items="sortSelectList"
          :label="$t('sort.sortBy')"
      /></v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="warframe in warframes"
        :key="warframe.databaseID"
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
  import { WarframeSortCriteria } from "@/types/collectibles"

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

      sortSelectList(): Array<{ text: string; value: number }> {
        return [
          {
            text: this.$t("sort.name").toString(),
            value: WarframeSortCriteria.name,
          },
          {
            text: this.$t("sort.introduced").toString(),
            value: WarframeSortCriteria.introduced,
          },
          {
            text: this.$t("sort.masteryRequirement").toString(),
            value: WarframeSortCriteria.masteryRequirement,
          },
          {
            text: this.$t("sort.prime").toString(),
            value: WarframeSortCriteria.prime,
          },
          {
            text: this.$t("sort.vaulted").toString(),
            value: WarframeSortCriteria.vaulted,
          },
        ]
      },

      sortBy: {
        get: function (): number {
          return this.$store.state.sortWarframesBy
        },

        set: function (criteria: WarframeSortCriteria) {
          this.$store.commit("SORT_WARFRAMES", criteria)
        },
      },
    },
  }
</script>
