<template>
  <div v-bind:style="gridStyle" class="container">
    <PlayerCounter
      v-for="(player, i) in players"
      v-bind:key="player"
      v-bind:data="{
        name: player,
        index: i,
        allPlayers: players,
        lifeTotal: lifeTotal,
      }"
    >
    </PlayerCounter>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0 1em 1em 1em;
  display: grid;
  place-items: center;
  gap: 1em;
}
</style>

<script>
import PlayerCounter from "../components/PlayerCounter.vue";

export default {
  name: "Counter",

  components: { PlayerCounter },

  data: () => ({
    players: undefined,
    lifeTotal: undefined,
    color: "blue",
  }),

  beforeMount() {
    this.players = this.$store.getters.getPlayers;
    this.lifeTotal = parseInt(this.$route.params.life);
  },

  computed: {
    totalPlayers() {
      return this.players.length;
    },
    gridStyle() {
      let layout = "";

      // Landscape mode
      if (!this.isPortrait) {
        if (this.totalPlayers > 1 && this.totalPlayers < 5) {
          layout = "grid-template-columns: repeat(2, 1fr);";
        } else if (this.totalPlayers >= 5) {
          layout = "grid-template-columns: repeat(3, 1fr);";
        }
        // Portrait mode
      } else if (this.totalPlayers >= 4) {
        layout = "grid-template-columns: repeat(2, 1fr);";
      } else {
        layout = `grid-template-rows: repeat(${this.totalPlayers}, 1fr);`;
      }
      return layout;
    },
  },
};
</script>
