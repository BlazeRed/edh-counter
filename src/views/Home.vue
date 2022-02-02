<template>
  <div class="container fill-height">
    <v-card>
      <div v-bind:class="isPortrait ? '' : 'landscape-view'">
        <div>
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
        </div>
        <v-divider v-if="!isPortrait" vertical inset />
        <div>
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
        </div>
      </div>

      <v-card-actions>
        <v-spacer />
        <v-btn
          v-bind:disabled="!selectedPlayers || !selectedLife"
          v-on:click="startGame"
          color="accent"
          text
        >
          Play
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4em;
}

.landscape-view {
  display: flex;
  direction: row;
}

.selectable-items-container {
  display: flex;
  flex-wrap: wrap;
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

  methods: {
    startGame() {
      this.$router.push({
        path: `/counter/${this.selectedPlayers}/${this.selectedLife}`,
      });
    },
  },
};
</script>
