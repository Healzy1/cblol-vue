import { createRouter, createWebHashHistory } from "vue-router"; // modificado para hash history teste

const routes = [
  {
    path: "/",
    redirect: "/champions",
  },
  {
    path: "/champions",
    name: "Champions",
    component: () => import("../views/Champions.vue"),
  },
  {
    path: "/teams",
    name: "Teams",
    component: () => import("../views/Teams.vue"),
  },
  {
    path: "/players",
    name: "Players",
    component: () => import("../views/Players.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(), // modificado para hash history teste
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
