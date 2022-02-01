<template>
  <v-container class="container">
    <v-card>
      <v-card-title>Players</v-card-title>
      <v-card-subtitle>Set number of players:</v-card-subtitle>

      <v-card-text class="selectable-items-container">
        <selectable-item
          v-for="opt in playersOptions"
          v-model="selectedPlayers"
          v-bind:key="opt.value"
          v-bind:data="opt"
        />
      </v-card-text>

      <v-card-title>Life</v-card-title>
      <v-card-subtitle>Set a starting life:</v-card-subtitle>
      <v-card-text class="selectable-items-container">
        <selectable-item
          v-for="opt in lifeOptions"
          v-model="selectedLife"
          v-bind:key="opt.value"
          v-bind:data="opt"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          v-bind:disabled="!selectedPlayers || !selectedLife"
          color="#1b9df7"
          text
        >
          Play
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selectable-items-container {
  display: flex;
  gap: 1em;
}
</style>

<script>
import SelectableItem from "../components/SelectableItem.vue";

export default {
  name: "Home",

  components: { SelectableItem },

  data: () => ({
    playersOptions: [
      { value: "1", groupName: "players" },
      { value: "2", groupName: "players" },
      { value: "3", groupName: "players" },
      { value: "4", groupName: "players" },
      { value: "5", groupName: "players" },
      { value: "6", groupName: "players" },
    ],
    lifeOptions: [
      { value: "20", groupName: "life" },
      { value: "30", groupName: "life" },
      { value: "40", groupName: "life" },
    ],
    selectedPlayers: undefined,
    selectedLife: undefined,
  }),
};
</script>
