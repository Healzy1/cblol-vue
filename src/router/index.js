import { createRouter, createWebHistory } from "vue-router";

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
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
