<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" max-width="512px" :raised="hover ? true : false">
      <v-img
        :src="image"
        max-width="512px"
        max-height="342px"
        aspect-ratio="1.4970"
        position="top center"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="accent"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-toolbar :color="hover ? 'accent' : 'secondary'" dense flat>
        <v-toolbar-title class="capitalized">{{ name }}</v-toolbar-title>
      </v-toolbar>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "CollectibleItemSummary",

    props: {
      warframe: {
        type: Object,
        required: true,
      },
    },

    computed: {
      name(): string {
        return this.warframe.name
      },

      image(): string {
        return `https://cdn.warframestat.us/img/${this.warframe.image}`
      },

      wikiURL(): string {
        return this.warframe.wikiURL
      },
    },
  })
</script>

<style scoped>
  .capitalized {
    text-transform: capitalize;
  }
</style>
