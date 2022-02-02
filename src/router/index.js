import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Counter from "../views/Counter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/counter/:players/:life",
    name: "Counter",
    component: Counter,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
