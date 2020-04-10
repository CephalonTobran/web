<template>
  <v-card class="mx-auto" max-width="400" :to="{ name: category }">
    <v-img
      class="white--text align-end"
      height="225px"
      :src="require('@/assets/img/dashboard/' + category + '.jpeg')"
    >
      <v-card-title class="capitalized">{{ category }}</v-card-title>
    </v-img>

    <v-progress-linear
      absolute
      :value="masteredPercentage"
      :buffer-value="constructedPercentage"
      height="6"
      top
      color="accent"
      background-opacity="0.6"
    ></v-progress-linear>

    <v-card-text class="text--primary">
      {{
        $tc("dashboard.collectibleSummary.total", total, {
          singularCollectibleName: singularCollectibleName,
          pluralCollectibleName: pluralCollectibleName,
        })
      }}<br />
      {{
        $tc("dashboard.collectibleSummary.remaining", remaining, {
          count: remainingCountString,
          singularCollectibleName: singularCollectibleName,
          pluralCollectibleName: pluralCollectibleName,
        })
      }}<br />
      {{
        $tc("dashboard.collectibleSummary.constructed", constructed, {
          count: constructedCountString,
          singularCollectibleName: singularCollectibleName,
          pluralCollectibleName: pluralCollectibleName,
        })
      }}<br />
      {{
        $tc("dashboard.collectibleSummary.mastered", mastered, {
          count: masteredCountString,
          singularCollectibleName: singularCollectibleName,
          pluralCollectibleName: pluralCollectibleName,
        })
      }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from "vue"
  import { percentage } from "../utilities"

  export default Vue.extend({
    name: "DashboardCollectiblesCategorySummary",

    props: {
      category: {
        type: String,
        required: true,
      },
    },

    computed: {
      total(): number {
        return this.$store.state.collectibles[this.category].total
      },
      remaining(): number {
        return this.total - this.constructed
      },
      constructed(): number {
        return this.$store.state.collectibles[this.category].constructed
      },
      mastered(): number {
        return this.$store.state.collectibles[this.category].mastered
      },

      singularCollectibleName(): string {
        return this.$i18n.tc("collectibles." + this.category, 1).toString()
      },

      pluralCollectibleName(): string {
        return this.$i18n
          .tc("collectibles." + this.category, this.total)
          .toString()
      },

      remainingCountString(): string {
        return this.countString(this.remaining)
      },
      constructedCountString(): string {
        return this.countString(this.constructed)
      },
      masteredCountString(): string {
        return this.countString(this.mastered)
      },

      constructedPercentage(): number {
        return percentage(this.constructed, this.total)
      },
      masteredPercentage(): number {
        return percentage(this.mastered, this.total)
      },
    },

    methods: {
      countString(count: number): string {
        if (count === this.total)
          return this.$i18n.t("dashboard.collectibleSummary.all").toString()
        else return count.toString()
      },
    },
  })
</script>

<style lang="scss" scoped>
  .capitalized {
    text-transform: capitalize;
  }
</style>
