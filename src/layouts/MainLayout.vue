<template>
  <q-layout view="hHh lpr lfr" class="custom-font">
    <q-header class="bg-dark">
      <q-toolbar class="text-primary">
        <q-icon
          v-if="currentRouteName != 'Home'"
          v-on:click="backToHome"
          class="me-2"
        >
          mdi-chevron-left
        </q-icon>

        <q-toolbar-title>
          Elder Dragon Highlander (Beta {{ version }})
        </q-toolbar-title>

        <q-space />
        <a class="link" href="https://gatherer.wizards.com/" target="_blank">
          <q-avatar>
            <q-icon name="mdi-book-open-variant" color="primary" />
          </q-avatar>
        </a>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.custom-font {
  font-family: Futura, sans-serif !important;
  color: var(--v-primary-base) !important;
}
.link {
  text-decoration: none;
}
</style>

<script setup>
import { computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
$q.dark.set(true);
/* Methods */

// Computed
const version = computed(() => {
  return process.env.VUE_APP_VERSION;
});
</script>
