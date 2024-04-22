import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth/index";
import { supabase } from "@/lib/supabaseClient";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/auth/Signup.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/auth/confirm",
      name: "auth-confirm",
      component: () => import("../views/auth/Confirm.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard-home",
      component: () => import("../views/dashboard/Main.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/dashboard/:id",
      name: "dashboard-caption-details",
      component: () => import("../views/dashboard/caption/Details.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0, behavior: "smooth" };
  },
});


router.beforeEach((to, from, next) => {
  const useAuth = useAuthStore();

  const checkAuth = async () => {
    if (!useAuth.currentSession) {
      await useAuth.getSession(); // Wait for user data retrieval
    }
    return useAuth.currentSession; // Return user data after retrieval (if needed)
  };

  checkAuth().then((userData) => {
    if (to.path === "/login" && userData) {
      next("/dashboard");
      return;
    }

    if (to.path === "/signup" && userData) {
      next("/dashboard");
      return;
    }

    if (to.matched.some((record) => record.meta.requiresAuth) && !userData) {
      next("/login");
      return;
    }

    next(); // Proceed with navigation if checks pass
  });

});

export default router;
