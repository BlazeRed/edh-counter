<template>
  <v-app class="custom-font">
    <v-app-bar color="transparent" app absolute flat short>
      <v-icon
        v-if="currentRouteName != 'Home'"
        v-on:click="backToHome"
        class="me-2"
      >
        mdi-chevron-left
      </v-icon>
      <span>Elder Dragon Highlander</span>
      <v-spacer />
      <v-avatar size="32">
        <a class="link" href="https://gatherer.wizards.com/" target="_blank">
          <v-icon color="primary">mdi-book-open-variant</v-icon>
        </a>
      </v-avatar>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
body {
  background-color: #121212;
}

.custom-font {
  font-family: Futura, sans-serif !important;
  color: var(--v-primary-base) !important;
}

.link {
  text-decoration: none;
}
</style>

<script>
export default {
  name: "App",

  methods: {
    backToHome() {
      this.$router.back();
    },
  },
};
</script>
