<template>
  <v-row>
    <v-col cols="12">
      <h1 id="page-heading" class="text-center">
        <slot></slot>
      </h1>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "PageHeading",
  })
</script>
