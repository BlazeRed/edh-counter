<template>
  <div
    class="container"
    v-bind:class="isDefeated ? 'lose-border' : 'idle-border'"
    v-bind:style="spanCounter"
  >
    <div class="counter-data-layout">
      <span class="text-body-2">Player {{ data.name }}</span>
      <div row>
        <v-btn
          v-on:click="removeLife()"
          class="text-body-2 font-weight-bold"
          v-bind:class="
            isDefeated ? 'update-life-outlined-lose' : 'update-life-outlined'
          "
          outlined
          large
        >
          -
        </v-btn>
        <span class="text-h2">{{ currentLife }}</span>
        <v-btn
          v-on:click="addLife()"
          class="text-body-2 font-weight-bold"
          v-bind:class="
            isDefeated ? 'update-life-outlined-lose' : 'update-life-outlined'
          "
          outlined
          large
        >
          +
        </v-btn>
      </div>
      <v-icon>mdi-menu</v-icon>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.idle-border {
  border: 2px solid var(--v-accent-base);
  border-radius: 0.5em;
}

.lose-border {
  border: 2px solid var(--v-lose-base);
  border-radius: 0.5em;
}

.counter-data-layout {
  display: flex;
  gap: 0.2em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

div[row] {
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  justify-content: center;
}

.update-life-outlined {
  border: thin solid var(--v-accent-base);
  min-width: 1em !important;
}

.update-life-outlined-lose {
  border: thin solid var(--v-lose-base);
  min-width: 1em !important;
}
</style>

<script>
export default {
  name: "PlayerCounter",

  props: {
    data: { type: Object },
  },

  data: () => ({
    currentLife: undefined,
    isDefeated: false,
  }),

  beforeMount() {
    this.currentLife = this.data.lifeTotal;
  },

  watch: {
    currentLife(nv) {
      if (nv <= 0) this.isDefeated = true;
    },
  },

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
      return layout;
    },
  },

  methods: {
    removeLife() {
      this.currentLife -= 1;
    },
    addLife() {
      this.currentLife += 1;
    },
  },
};
</script>
