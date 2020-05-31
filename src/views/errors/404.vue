<template>
  <v-container id="error-404">
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-card>
          <v-toolbar color="error" flat>
            <v-toolbar-title>{{ $t("pages.error.404.title") }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            {{ $t("pages.error.404.message") }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="warning" @click="goBack">
              {{ $t("pages.error.404.back") }}
            </v-btn>
            <v-btn text color="success" :to="{ name: 'Dashboard' }" replace>
              {{ $t("pages.error.404.dashboard") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "Error404",

    methods: {
      goBack(): void {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.replace("/")
      },
    },
  })
</script>
