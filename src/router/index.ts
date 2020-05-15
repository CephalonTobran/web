import Vue from "vue"
import VueRouter from "vue-router"
import DashboardView from "../views/general/dashboard.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/collectibles",
    name: "collectibles",
    component: () =>
      import(
        /* webpackChunkName: "collectibles" */ "../views/collectibles/index.vue"
      ),
  },
  {
    path: "/collectibles/warframes",
    name: "warframes",
    component: () =>
      import(
        /* webpackChunkName: "warframes" */ "../views/collectibles/warframes.vue"
      ),
    children: [
      {
        path: ":warframe",
        name: "warframe",
        component: () =>
          import(
            /* webpackChunkName: "warframe" */ "../views/collectibles/warframe.vue"
          ),
        props: true,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/general/about.vue"),
  },
  {
    path: "/options",
    name: "options",
    component: () =>
      import(/* webpackChunkName: "options" */ "../views/general/options.vue"),
  },
  {
    path: "*",
    name: "error404",
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
