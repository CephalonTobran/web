<template>
  <v-card class="mx-auto" max-width="400px" :to="{ name: category }">
    <v-img
      class="white--text align-end"
      max-width="400px"
      :src="require('@/assets/img/dashboard/' + category + '.jpeg')"
    >
      <v-card-title>{{ title }}</v-card-title>
    </v-img>

    <!-- <v-progress-linear
      absolute
      :value="masteredPercentage"
      :buffer-value="constructedPercentage"
      height="6"
      top
      color="accent"
      background-opacity="0.6"
    ></v-progress-linear> -->

    <v-card-text class="text--primary">
      {{ totalCollectiblesText
      }}<!--<br />
      {{
        $tc("collectibleCategorySummary.remaining", remaining, {
          count: remainingCountString,
          singularCollectibleName: singularCollectibleName,
          pluralCollectibleName: pluralCollectibleName,
        })
      }}<br />
      {{
        $tc("collectibleCategorySummary.constructed", constructed, {
          count: constructedCountString,
          singularCollectibleName: singularCollectibleName,
          pluralCollectibleName: pluralCollectibleName,
        })
      }}<br />
      {{
        $tc("collectibleCategorySummary.mastered", mastered, {
          count: masteredCountString,
          singularCollectibleName: singularCollectibleName,
          pluralCollectibleName: pluralCollectibleName,
        })
      }} -->
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from "vue"
  import { TranslateResult } from "vue-i18n"
  import capitalize from "lodash/capitalize"
  // import { percentage } from "../utilities"

  export default Vue.extend({
    name: "CollectiblesCategorySummary",

    props: {
      category: {
        type: String,
        required: true,
      },
    },

    computed: {
      title(): TranslateResult {
        return capitalize(this.$i18n.tc(`collectibles.${this.category}`, 2))
      },

      total(): number {
        return this.$store.getters[`${this.category}/total`]
      },
      totalCollectiblesText(): TranslateResult {
        return this.$t("collectibleCategorySummary.total", {
          total: this.total,
          pluralCollectibleName: this.pluralCollectibleName,
        })
      },
      // remaining(): number {
      //   return this.total - this.constructed
      // },
      // constructed(): number {
      //   return this.$store.state.collectibles[this.category].constructed
      // },
      // mastered(): number {
      //   return this.$store.state.collectibles[this.category].mastered
      // },

      singularCollectibleName(): string {
        return this.$i18n.tc("collectibles." + this.category, 1).toString()
      },
      pluralCollectibleName(): string {
        return this.$i18n
          .tc("collectibles." + this.category, this.total)
          .toString()
      },

      // remainingCountString(): string {
      //   return this.countString(this.remaining)
      // },
      // constructedCountString(): string {
      //   return this.countString(this.constructed)
      // },
      // masteredCountString(): string {
      //   return this.countString(this.mastered)
      // },

      // constructedPercentage(): number {
      //   return percentage(this.constructed, this.total)
      // },
      // masteredPercentage(): number {
      //   return percentage(this.mastered, this.total)
      // },
    },

    // methods: {
    //   countString(count: number): string {
    //     if (count === this.total)
    //       return this.$i18n.t("collectibleCategorySummary.all").toString()
    //     else return count.toString()
    //   },
    // },
  })
</script>
