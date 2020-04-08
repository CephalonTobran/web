import Vue from "vue"
import VueRouter from "vue-router"
import DashboardView from "../views/general/dashboard.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardView,
  },
  {
    path: "/warframes",
    name: "Warframes",
    component: () =>
      import(
        /* webpackChunkName: "warframes" */ "../views/collectibles/warframes.vue"
      ),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/general/about.vue"),
  },
  {
    path: "/options",
    name: "Options",
    component: () =>
      import(/* webpackChunkName: "options" */ "../views/general/options.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "error-404" */ "../views/errors/404.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
