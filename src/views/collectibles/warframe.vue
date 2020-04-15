<template>
  <div class="warframe">
    <h2>{{ name }}</h2>
  </div>
</template>

<script lang="ts">
  export default {
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
  }
</script>
