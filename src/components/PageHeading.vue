<template>
  <v-row>
    <v-col cols="12">
      <h1 id="page-heading" class="text-center">{{ text }}</h1>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "PageHeading",

    props: {
      text: {
        type: String,
        required: true,
      },
    },
  })
</script>
