<template>
  <v-col cols="12" sm="6" md="4" lg="3" xl="2">
    <v-hover v-slot:default="{ hover }">
      <v-card
        :class="hover ? 'mt-n1' : undefined"
        :elevation="hover ? 4 : 2"
        class="mx-auto transition-swing"
        max-width="512px"
      >
        <v-img
          :src="image"
          max-width="512px"
          max-height="342px"
          aspect-ratio="1.4970"
          position="top center"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="accent"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-toolbar :color="hover ? 'accent' : 'secondary'" dense flat>
          <v-toolbar-title>{{ name }}</v-toolbar-title>
        </v-toolbar>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "CollectibleItemSummary",

    props: {
      collectible: {
        type: Object,
        required: true,
      },
    },

    computed: {
      name(): string {
        return this.collectible.name
      },

      image(): string {
        return `https://cdn.warframestat.us/img/${this.collectible.image}`
      },

      wikiURL(): string {
        return this.collectible.wikiURL
      },
    },
  })
</script>
