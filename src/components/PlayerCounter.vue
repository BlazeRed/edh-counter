<template>
  <div class="container" v-bind:style="spanCounter">Player {{ data.name }}</div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  border: 2px solid var(--v-accent-base);
  border-radius: 0.5em;
}
</style>

<script>
export default {
  name: "PlayerCounter",

  props: {
    data: { type: Object },
  },

  data: () => ({}),

  computed: {
    isOdd() {
      return this.data.totalPlayers % 2;
    },
    isLast() {
      return this.data.name === this.data.totalPlayers;
    },
    spanCounter() {
      let layout = "";

      if (this.isOdd && !this.isPortrait) {
        switch (this.data.totalPlayers) {
          case 3:
            layout = this.data.name === 2 ? "grid-row: span 2" : "";
            break;
          case 5:
            layout = this.data.name === 3 ? "grid-row: span 2" : "";
            break;
          default:
            layout = "";
            break;
        }
      } else if (
        this.isOdd &&
        this.isPortrait &&
        this.data.totalPlayers >= 5 &&
        this.isLast
      ) {
        layout = "grid-column: span 2";
      }

      console.log(layout);
      return layout;
    },
  },
};
</script>
