import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.mixin({
  data: () => ({
    isPortrait: false,
  }),

  beforeDestroy() {
    if (typeof window === "undefined") return;
    window.removeEventListener("resize", this.onResize, { passive: true });
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },

  methods: {
    onResize() {
      this.isPortrait = window.innerWidth < 600;
    },
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
