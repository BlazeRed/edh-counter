<template>
  <div v-bind:style="gridStyle" class="container fill-height">
    <PlayerCounter
      v-for="player in players"
      v-bind:key="player"
      v-bind:data="{ name: player, totalPlayers: players }"
    >
    </PlayerCounter>
  </div>
</template>

<style scoped>
.container {
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
    this.players = parseInt(this.$route.params.players);
    this.lifeTotal = parseInt(this.$route.params.life);
  },

  computed: {
    gridStyle() {
      let layout = "";

      // Landscape mode
      if (!this.isPortrait) {
        if (this.players > 1 && this.players < 5) {
          layout = "grid-template-columns: repeat(2, 1fr);";
        } else if (this.players >= 5) {
          layout = "grid-template-columns: repeat(3, 1fr);";
        }
        // Portrait mode
      } else if (this.players >= 4) {
        layout = "grid-template-columns: repeat(2, 1fr);";
      } else {
        layout = `grid-template-rows: repeat(${this.players}, 1fr);`;
      }
      return layout;
    },
  },
};
</script>
