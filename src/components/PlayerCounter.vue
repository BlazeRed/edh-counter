<template>
  <div
    class="container"
    v-bind:class="isDefeated ? 'lose-border' : 'idle-border'"
    v-bind:style="spanCounter"
  >
    <div class="counter-data-layout">
      <div row>
        <v-icon v-on:click="setNameDialog = true" class="text-body-2 me-1">
          mdi-pencil
        </v-icon>
        <span class="text-body-2">{{ playerName }}</span>
      </div>
      <div row gap>
        <v-btn
          v-on:click="removeLife()"
          class="text-body-2 font-weight-bold"
          v-bind:class="
            isDefeated ? 'counter-outlined-lose' : 'counter-outlined'
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
            isDefeated ? 'counter-outlined-lose' : 'counter-outlined'
          "
          outlined
          large
        >
          +
        </v-btn>
      </div>
      <v-icon v-on:click="setCountersDialog = true">mdi-menu</v-icon>
    </div>

    <!-- Set name dialog -->
    <v-dialog
      v-model="setNameDialog"
      v-bind:max-width="isPortrait ? '80vw' : '50vw'"
      persistent
    >
      <v-card>
        <v-toolbar flat text>
          <v-toolbar-title>Set player name</v-toolbar-title>
        </v-toolbar>

        <div v-if="!isPortrait">
          <v-card-text class="pt-4">
            <div row gap>
              <v-text-field
                v-model="playerName"
                v-bind:rules="[rules.required]"
                hide-details
                outlined
              />
              <v-btn
                v-on:click="setName()"
                v-bind:disabled="playerName.length <= 0"
                color="accent"
                text
              >
                Done
              </v-btn>
            </div>
          </v-card-text>
        </div>
        <div v-else>
          <v-card-text class="pt-4">
            <v-text-field
              v-model="playerName"
              v-bind:rules="[rules.required]"
              hide-details
              outlined
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-on:click="setName()"
              v-bind:disabled="playerName.length <= 0"
              color="accent"
              text
            >
              Done
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- Commander damage dialog -->
    <v-dialog
      v-model="setCountersDialog"
      v-bind:max-width="isPortrait ? '80vw' : '50vw'"
      persistent
    >
      <v-card>
        <v-toolbar flat text>
          <v-toolbar-title>Set counters</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <!-- Poison counter -->
          <div col>
            <span class="text-body-2">&Phi;</span>
            <div row gap>
              <v-btn
                v-on:click="removePoison()"
                class="text-body-2 font-weight-bold"
                v-bind:class="
                  isDefeated ? 'counter-outlined-lose' : 'counter-outlined'
                "
                outlined
              >
                -
              </v-btn>
              <span class="text-h4">{{ poisonCounter }}</span>
              <v-btn
                v-on:click="addPoison()"
                class="text-body-2 font-weight-bold"
                v-bind:class="
                  isDefeated ? 'counter-outlined-lose' : 'counter-outlined'
                "
                outlined
              >
                +
              </v-btn>
            </div>
          </div>

          <!-- TODO: Commander damage -->
          <div v-for="(oppo, i) in otherPlayers" v-bind:key="i" col>
            <span class="text-body-2">{{ oppo }}</span>
            <div row gap>
              <v-btn
                v-on:click="removeCDFrom(oppo, i)"
                class="text-body-2 font-weight-bold"
                v-bind:class="
                  isDefeated ? 'counter-outlined-lose' : 'counter-outlined'
                "
                outlined
              >
                -
              </v-btn>
              <span class="text-h4">{{ oppoData[oppo] }}</span>
              <v-btn
                v-on:click="addCDFrom(oppo, i)"
                class="text-body-2 font-weight-bold"
                v-bind:class="
                  isDefeated ? 'counter-outlined-lose' : 'counter-outlined'
                "
                outlined
              >
                +
              </v-btn>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn v-on:click="setCountersDialog = false" color="accent" text>
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* Reset inherited padding */
  padding: 0 !important;
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
  align-items: center;
  justify-content: center;
}

div[col] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

div[gap] {
  gap: 1em;
}

.counter-outlined {
  border: thin solid var(--v-accent-base);
  min-width: 1em !important;
}

.counter-outlined-lose {
  border: thin solid var(--v-lose-base);
  min-width: 1em !important;
}
</style>

<script>
import Vue from "vue";

export default {
  name: "PlayerCounter",

  props: {
    data: { type: Object },
  },

  data: () => ({
    currentLife: undefined,
    playerName: undefined,
    isDefeated: false,
    setNameDialog: false,
    setCountersDialog: false,
    poisonCounter: 0,
    rules: {
      required: (value) => !!value || "Required.",
    },
    oppoData: {},
  }),

  beforeMount() {
    this.currentLife = this.data.lifeTotal;
    this.playerName = this.data.name;
    this.otherPlayers.map((o) => {
      this.oppoData[o] = 0;
    });
  },

  watch: {
    oppoData: {
      deep: true,
      handler(nv, ov) {
        console.log("oppoData", nv, ov);
      },
    },
    currentLife(nv) {
      if (nv <= 0) {
        this.isDefeated = true;
      } else {
        this.isDefeated = false;
      }
    },
    poisonCounter(nv) {
      if (nv >= 10) {
        this.isDefeated = true;
      } else {
        this.isDefeated = false;
      }
    },
  },

  computed: {
    totalPlayers() {
      return this.data.allPlayers.length;
    },
    otherPlayers() {
      return this.$store.getters.getPlayers.filter((p) => p != this.playerName);
    },
    isOdd() {
      return this.totalPlayers % 2;
    },
    isLast() {
      console.log(this.data.index === this.totalPlayers);
      return this.data.index === this.totalPlayers;
    },
    spanCounter() {
      let layout = "";

      if (this.isOdd && !this.isPortrait) {
        switch (this.totalPlayers) {
          case 3:
            layout = this.data.index === 1 ? "grid-row: span 2" : "";
            break;
          case 5:
            layout = this.data.index === 2 ? "grid-row: span 2" : "";
            break;
          default:
            layout = "";
            break;
        }
      } else if (
        this.isOdd &&
        this.isPortrait &&
        this.totalPlayers >= 5 &&
        this.isLast
      ) {
        layout = "grid-column: span 2";
      }
      return layout;
    },
  },

  methods: {
    setName() {
      // Update player name
      this.$store.commit("setPlayer", {
        name: this.playerName,
        index: this.data.index,
      });
      this.setNameDialog = false;
    },
    removeLife() {
      this.currentLife -= 1;
    },
    addLife() {
      this.currentLife += 1;
    },
    removePoison() {
      this.poisonCounter -= 1;
    },
    addPoison() {
      this.poisonCounter += 1;
    },
    removeCDFrom(oppo) {
      const count = this.oppoData[oppo] - 1;
      Vue.set(this.oppoData, oppo, count);
    },
    addCDFrom(oppo) {
      const count = this.oppoData[oppo] + 1;
      Vue.set(this.oppoData, oppo, count);
    },
  },
};
</script>
