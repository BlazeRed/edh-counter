<template>
  <div class="container fill-height">
    {{ $route.params.players }} {{ $route.params.life }}
  </div>
</template>

<style scoped>
/* .container {
  background-color: red;
} */
</style>

<script>
export default {
  name: "Counter",
};
</script>
