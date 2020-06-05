<template>
  <v-fab-transition>
    <v-btn
      v-show="show"
      v-scroll="onThrottledScroll"
      fab
      color="accent"
      bottom
      right
      fixed
      @click="scrollToTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script lang="ts">
  import Vue from "vue"
  import throttle from "lodash/throttle"

  export default Vue.extend({
    name: "TheScrollToTopButton",

    data() {
      return {
        show: false,
      }
    },

    methods: {
      onThrottledScroll: throttle(function (this: { show: boolean }) {
        if (typeof window === "undefined") return
        const top = window.pageYOffset || 0
        this.show = top > 500
      }, 500),

      scrollToTop(): void {
        this.$vuetify.goTo(30, {
          duration: 1000,
          easing: "easeInOutCubic",
          offset: 0,
        })
      },
    },
  })
</script>
