import HomePage from "../views/HomePage.vue";
import SearchedTvShows from "../views/SearchedTvShows.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "tvShows",
        component: HomePage,
      },
      {
        path: "/search/:name",
        name: "searchedTvShows",
        component: SearchedTvShows,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: LoginPage,
      },
    ],
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "/signup",
        name: "signup",
        component: SignupPage,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.Auth.isInitialized) {
    return checkState().then((user) => {
      store.state.Auth.isInitialized = true;
      if (user === null) {
        store.commit("CLEAR_USER");
        next();
      } else {
        store.commit("SET_USER", user);
        if (to.path === "/login") {
          next("/");
          return;
        }
        next();
      }
    });
  } else {
    if (to.path === "/login" && auth.currentUser) {
      next("/");
      return;
    }

    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !auth.currentUser
    ) {
      next("/login");
      return;
    }

    next();
  }
});

function checkState() {
  return new Promise((resolve) => auth.onAuthStateChanged(resolve));
}

export default router;
