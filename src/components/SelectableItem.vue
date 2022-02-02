<template>
  <div v-bind:class="'item ' + itemStyle" v-on:click="updateSelectedItem">
    <span class="body-1">{{ data.value }}</span>
  </div>
</template>

<style scoped>
.item {
  width: 4.5em;
  height: 4.5em;
  text-align: center;
  padding: 1.4em;
  border-radius: 0.5em;
  cursor: pointer;
}

.not-selected {
  border: 2px solid var(--v-primary-base);
}

.selected {
  border: 2px solid var(--v-accent-base);
  background-color: var(--v-accent-base);
  color: #333;
}
</style>

<script>
export default {
  name: "SelectableItem",

  props: {
    value: { type: String },
    data: { type: Object, required: true },
  },

  data: () => ({}),

  computed: {
    itemStyle() {
      return this.value === this.data.value ? "selected" : "not-selected";
    },
  },

  methods: {
    updateSelectedItem() {
      this.$emit("input", this.data.value);
    },
  },
};
</script>
