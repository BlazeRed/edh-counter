<template>
  <v-app>
    <v-app-bar color="transparent" absolute flat short>
      <v-spacer />
      <a href="https://gatherer.wizards.com/">
        <v-avatar size="32">
          <v-icon>mdi-book-open-variant</v-icon>
        </v-avatar>
      </a>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
