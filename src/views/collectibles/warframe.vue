<template>
  <div class="warframe">
    <h2>{{ name }}</h2>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "Warframes",

    props: {
      warframe: {
        type: String,
        default: "A Warframe",
      },
    },

    computed: {
      name(): string {
        return this.warframe
      },
    },
  })
</script>
