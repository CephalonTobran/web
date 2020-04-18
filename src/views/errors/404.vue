<template>
  <div class="error-404">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-6">
            <v-toolbar color="error" flat>
              <v-toolbar-title>{{
                $t("pages.error.404.title")
              }}</v-toolbar-title>
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
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    name: "Error404",

    methods: {
      goBack() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.replace("/")
      },
    },
  })
</script>
