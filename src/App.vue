<template>
  <v-app>
    <v-navigation-drawer
      v-model="mainMenuVisible"
      app
      temporary
      color="secondary"
      overlay-opacity="0.8"
    >
      <v-list nav two-line>
        <v-list-item
          v-for="(menuItem, i) in mainMenuItems"
          :key="i"
          :to="{ name: menuItem.route }"
          exact
        >
          <v-list-item-avatar>
            <v-icon>mdi-{{ menuItem.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ menuItem.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        @click.stop="mainMenuVisible = !mainMenuVisible"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Cephalon Tobran</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "App",

    data: () => ({
      mainMenuVisible: false,
      mainMenuItems: [
        {
          title: "Dashboard",
          subtitle: "General overview",
          icon: "view-dashboard-outline",
          route: "Dashboard",
        },
        {
          title: "Settings",
          subtitle: "Change app options",
          icon: "cog-outline",
          route: "Settings",
        },
        {
          title: "About",
          subtitle: "About Cephalon Tobran",
          icon: "information-outline",
          route: "About",
        },
      ],
    }),
  })
</script>
