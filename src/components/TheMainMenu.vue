<template>
  <v-navigation-drawer v-model="isVisible" app temporary color="secondary" overlay-opacity="0.8">
    <v-list nav two-line>
      <v-list-item v-for="(item, i) in items" :key="i" :to="{ name: item.route }" exact>
        <v-list-item-avatar>
          <v-icon>{{ "mdi-" + item.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "TheMainMenu",

    data() {
      return {
        items: [
          {
            title: this.$i18n.t("mainMenu.dashboard.title"),
            description: this.$i18n.t("mainMenu.dashboard.description"),
            icon: "view-dashboard-outline",
            route: "dashboard",
          },
          {
            title: this.$i18n.t("mainMenu.warframes.title"),
            description: this.$i18n.t("mainMenu.warframes.description"),
            icon: "account-details-outline",
            route: "warframes",
          },
          {
            title: this.$i18n.t("mainMenu.options.title"),
            description: this.$i18n.t("mainMenu.options.description"),
            icon: "cog-outline",
            route: "options",
          },
          {
            title: this.$i18n.t("mainMenu.about.title"),
            description: this.$i18n.t("mainMenu.about.description"),
            icon: "information-outline",
            route: "about",
          },
        ],
      }
    },

    computed: {
      isVisible: {
        get: function () {
          return this.$store.state.mainMenuIsVisible
        },
        set: function (visibility: boolean) {
          this.$store.commit("SET_MAIN_MENU_VISIBILITY", visibility)
        },
      },
    },
  })
</script>
