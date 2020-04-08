<template>
  <div class="dashboard">
    <h1>{{ $t("dashboard.heading") }}</h1>

    <v-card class="mx-auto" max-width="400" :to="{ name: 'Warframes' }">
      <v-img
        class="white--text align-end"
        height="225px"
        src="@/assets/img/dashboard/warframes.jpeg"
      >
        <v-card-title>{{ $t("dashboard.warframes.title") }}</v-card-title>
      </v-img>

      <v-progress-linear
        absolute
        :value="masteredPercentage"
        :buffer-value="constructedPercentage"
        height="6"
        top
        color="accent"
        background-opacity="0.5"
      ></v-progress-linear>

      <v-card-text class="text--primary">
        {{ $tc("dashboard.warframes.total", warframes.total) }}<br />
        {{
          $tc("dashboard.warframes.remaining", warframesRemaining, {
            n: remainingCountString,
          })
        }}<br />
        {{
          $tc("dashboard.warframes.constructed", warframes.constructed, {
            n: constructedCountString,
          })
        }}<br />
        {{
          $tc("dashboard.warframes.mastered", warframes.mastered, {
            n: masteredCountString,
          })
        }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import { percentage } from "../../helpers"

  export default Vue.extend({
    name: "Dashboard",

    data: function () {
      return {
        warframes: {
          total: 72,
          constructed: 9,
          mastered: 5,
        },
      }
    },

    computed: {
      constructedCountString(): string {
        if (this.warframes.constructed === this.warframes.total)
          return this.$i18n.t("dashboard.warframes.all").toString()
        else return this.warframes.constructed.toString()
      },
      masteredCountString(): string {
        if (this.warframes.mastered === this.warframes.total)
          return this.$i18n.t("dashboard.warframes.all").toString()
        else return this.warframes.mastered.toString()
      },
      remainingCountString(): string {
        if (this.warframesRemaining === this.warframes.total)
          return this.$i18n.t("dashboard.warframes.all").toString()
        else return this.warframesRemaining.toString()
      },

      constructedPercentage(): number {
        return percentage(this.warframes.constructed, this.warframes.total)
      },
      masteredPercentage(): number {
        return percentage(this.warframes.mastered, this.warframes.total)
      },
      warframesRemaining(): number {
        return this.warframes.total - this.warframes.constructed
      },
    },
  })
</script>
