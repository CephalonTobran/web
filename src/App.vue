<template>
  <v-app>
    <!-- Main Menu -->
    <v-navigation-drawer
      v-model="mainMenu.visible"
      app
      temporary
      color="secondary"
      overlay-opacity="0.8"
    >
      <v-list nav two-line>
        <v-list-item
          v-for="(menuItem, i) in mainMenu.items"
          :key="i"
          :to="{ name: menuItem.route }"
          exact
        >
          <v-list-item-avatar>
            <v-icon>{{ "mdi-" + menuItem.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ menuItem.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- End Main Menu -->

    <!-- App Bar -->
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        @click.stop="mainMenu.visible = !mainMenu.visible"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $t("brand.name.full") }}</v-toolbar-title>
    </v-app-bar>
    <!-- End App Bar -->

    <!-- Main Content -->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- End Main Content -->
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "App",

    data: function () {
      return {
        mainMenu: {
          visible: false,
          items: [
            {
              title: this.$i18n.t("mainMenu.dashboard.title"),
              subtitle: this.$i18n.t("mainMenu.dashboard.subtitle"),
              icon: "view-dashboard-outline",
              route: "Dashboard",
            },
            {
              title: this.$i18n.t("mainMenu.options.title"),
              subtitle: this.$i18n.t("mainMenu.options.subtitle"),
              icon: "cog-outline",
              route: "Options",
            },
            {
              title: this.$i18n.t("mainMenu.about.title"),
              subtitle: this.$i18n.t("mainMenu.about.subtitle"),
              icon: "information-outline",
              route: "About",
            },
          ],
        },
      }
    },
  })
</script>
