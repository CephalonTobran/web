<template>
  <v-container id="collectible-item-list">
    <page-heading>{{ headingText }}</page-heading>

    <v-row>
      <v-col cols="12">
        <v-expansion-panels accordion hover>
          <v-expansion-panel id="search-sort-filter-panel" @click="scrollToPageHeading">
            <v-expansion-panel-header color="secondary">
              {{ $t("searchSortFilter.header") }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <!-- Search -->
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model.trim="searchText"
                    :label="$t('searchSortFilter.searchLabel')"
                    :placeholder="randomCollectibleName"
                    prepend-icon="mdi-magnify"
                    color="white"
                    clearable
                    hide-details
                /></v-col>

                <!-- Sort -->
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="sortBy"
                    :items="sortSelectList"
                    :label="$t('searchSortFilter.sortLabel')"
                    prepend-icon="mdi-sort-variant"
                    color="white"
                    item-color="accent"
                    hide-details
                  >
                    <template slot="append-outer">
                      <v-btn icon @click="toggleSortDirection"
                        ><v-icon>{{ sortDirectionIcon }}</v-icon></v-btn
                      >
                    </template>
                  </v-select>
                </v-col>

                <!-- Filter -->
                <v-col cols="12" sm="6" md="4">
                  <!-- Mastery Rank -->
                  <v-range-slider
                    v-model="filters.masteryRank"
                    max="30"
                    min="0"
                    :label="$t('searchSortFilter.filterLabel.mastery')"
                    thumb-label
                    step="1"
                    color="accent"
                    hide-details
                  ></v-range-slider>

                  <!-- Variant -->
                  <v-chip-group v-model="filters.variant">
                    <v-chip filter outlined label value="original">{{
                      $t("searchSortFilter.filterLabel.variant.original")
                    }}</v-chip>
                    <v-chip filter outlined label value="prime">{{
                      $t("searchSortFilter.filterLabel.variant.prime")
                    }}</v-chip>
                    <v-chip filter outlined label value="umbra">{{
                      $t("searchSortFilter.filterLabel.variant.umbra")
                    }}</v-chip>
                  </v-chip-group>

                  <!-- Vault Status -->
                  <v-chip-group v-model="filters.vaulted">
                    <v-chip
                      filter
                      outlined
                      label
                      value="1"
                      :disabled="filters.variant !== 'prime'"
                      >{{ $t("searchSortFilter.filterLabel.vaultedStatus.vaulted") }}</v-chip
                    >
                    <v-chip
                      filter
                      outlined
                      label
                      value="0"
                      :disabled="filters.variant !== 'prime'"
                      >{{ $t("searchSortFilter.filterLabel.vaultedStatus.notVaulted") }}</v-chip
                    >
                  </v-chip-group>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row>
      <collectible-item-summary
        v-for="collectible in collectibles"
        :key="collectible.databaseID"
        :collectible="collectible"
      />
    </v-row>

    <router-view />
  </v-container>
</template>

<script lang="ts">
  import CollectibleItemSummary from "@/components/Collectibles/CollectibleItemSummary.vue"
  import PageHeading from "@/components/PageHeading.vue"
  import {
    Collectible,
    CollectiblesList,
    CollectibleSortFields,
    sortCollectiblesBy,
  } from "@/types/collectibles"
  import { TranslateResult } from "vue-i18n"
  import capitalize from "lodash/capitalize"

  export default {
    name: "CollectibleItemList",

    components: {
      PageHeading,
      CollectibleItemSummary,
    },

    props: {
      category: {
        type: String,
        required: true,
        default: "warframes",
      },
    },

    data() {
      return {
        searchText: null,
        sortBy: CollectibleSortFields.name,
        sortSelectList: [
          {
            text: this.$t("searchSortFilter.sortTypes.name").toString(),
            value: CollectibleSortFields.name,
            sortType: "alphabetical",
          },
          {
            text: this.$t("searchSortFilter.sortTypes.introduced").toString(),
            value: CollectibleSortFields.introduced,
            sortType: "numeric",
          },
          {
            text: this.$t("searchSortFilter.sortTypes.masteryRequirement").toString(),
            value: CollectibleSortFields.masteryRequirement,
            sortType: "numeric",
          },
        ],
        sortAscending: true,
        filters: {
          masteryRank: [0, 30],
          variant: undefined as string,
          vaulted: undefined as boolean,
        },
      }
    },

    computed: {
      collectibles(): CollectiblesList {
        // Copy the array, so we aren't using a reference, which causes a Vuex mutation error
        let collectibles = [...this.$store.state[this.category].list]

        if (this.searchText) {
          collectibles = collectibles.filter((collectible: Collectible) =>
            collectible.name.toLowerCase().includes(this.searchText.toLowerCase())
          )
        }

        if (this.filters.masteryRank[0] > 0) {
          collectibles = collectibles.filter(
            (collectible: Collectible) =>
              collectible.masteryRequirement >= this.filters.masteryRank[0]
          )
        }

        if (this.filters.masteryRank[1] < 30) {
          collectibles = collectibles.filter(
            (collectible: Collectible) =>
              collectible.masteryRequirement <= this.filters.masteryRank[1]
          )
        }

        if (this.filters.variant !== undefined) {
          if (this.filters.variant === "original") {
            collectibles = collectibles.filter(
              (collectible: Collectible) => !collectible.name.endsWith(" Prime")
            )
            collectibles = collectibles.filter(
              (collectible: Collectible) => !collectible.name.endsWith(" Umbra")
            )
          } else if (this.filters.variant === "prime") {
            collectibles = collectibles.filter((collectible: Collectible) =>
              collectible.name.endsWith(" Prime")
            )
          } else if (this.filters.variant === "umbra") {
            collectibles = collectibles.filter((collectible: Collectible) =>
              collectible.name.endsWith(" Umbra")
            )
          }
        }

        if (this.filters.variant === "prime" && this.filters.vaulted !== undefined) {
          collectibles = collectibles.filter(
            (collectible: Collectible) => collectible.isVaulted == this.filters.vaulted
          )
        }

        collectibles.sort((collectibleA: Collectible, collectibleB: Collectible) =>
          sortCollectiblesBy(this.sortBy, this.sortAscending, collectibleA, collectibleB)
        )

        return collectibles
      },

      headingText(): TranslateResult {
        const translationData = {
          filtered: this.filteredTotal,
          total: this.total,
          collectibleName: capitalize(this.category),
        }

        if (this.filteredTotal < this.total) {
          return this.$t("collectiblesList.headingWithFilter", translationData)
        } else {
          return this.$t("collectiblesList.heading", translationData)
        }
      },

      total(): number {
        return this.$store.getters[`warframes/total`]
      },

      filteredTotal(): number {
        return this.collectibles.length
      },

      randomCollectibleName(): string {
        if (this.filteredTotal < 1) return "..."

        const randomNumber = Math.floor(Math.random() * this.filteredTotal)
        return this.collectibles[randomNumber].name
      },

      sortDirectionIcon(): string {
        const index = this.sortBy as number
        const type = this.sortSelectList[index].sortType

        if (type === "alphabetical")
          return this.sortAscending
            ? "mdi-sort-alphabetical-ascending-variant"
            : "mdi-sort-alphabetical-descending-variant"
        else if (type === "numeric")
          return this.sortAscending
            ? "mdi-sort-numeric-ascending-variant"
            : "mdi-sort-numeric-descending-variant"
        else return this.sortAscending ? "mdi-sort-ascending" : "mdi-sort-descending"
      },
    },

    methods: {
      toggleSortDirection() {
        this.sortAscending = !this.sortAscending
      },

      scrollToPageHeading() {
        this.$vuetify.goTo("#page-heading", {
          duration: 300,
          easing: "easeInOutCubic",
          offset: 10,
        })
      },
    },
  }
</script>
