<template>
  <v-app class="custom-font">
    <v-app-bar color="transparent" absolute flat short>
      <v-spacer />
      <v-avatar size="32">
        <a class="link" href="https://gatherer.wizards.com/" target="_blank">
          <v-icon>mdi-book-open-variant</v-icon>
        </a>
      </v-avatar>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.custom-font {
  font-family: Futura, sans-serif;
}

.link {
  text-decoration: none;
}
</style>

<script>
export default {
  name: "App",
};
</script>
