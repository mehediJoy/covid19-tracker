import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Country from "../views/Country.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/country/:name",
    name: "Country",
    component: Country,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
