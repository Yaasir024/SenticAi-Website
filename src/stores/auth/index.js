import { ref, computed, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

import { useSystemStore } from "@/stores/system/main";
import { useSystemNotifications } from "@/stores/system/notification";

import router from "@/router";

export const useAuthStore = defineStore("Auth", () => {
  // Initialize System
  const useSystem = useSystemStore();
  const useNotification = useSystemNotifications();

  const currentSession = ref(null);

  const user = ref(null);

  const getUser = async () => {
    const session = await supabase.auth.getSession(); // Wait for promise resolution
    if (session) {
      currentSession.value = session.data.session;
      user.value = session.data.session.user;
    } else {
      currentSession.value = null;
      user.value = null;
    }
  };

  const getSession = async () => {
    const session = await supabase.auth.getSession(); // Wait for promise resolution
    // console.log(session.data.session, "Find Session");
    if (session) {
      currentSession.value = session.data.session;
    } else {
      currentSession.value = null;
    }
    // supabase.auth.getSession().then(({ data }) => {
    //   session.value = data.session;
    // });

    // supabase.auth.onAuthStateChange((_, _session) => {
    //   session.value = _session;
    // });
  };

  const logOut = async () => {
    try {
      useSystem.showLoader();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
      router.go();
    } catch (error) {
      // console.log(error);
      if (error instanceof Error) {
        useNotification.showMessage("error", error.message);
      }
    } finally {
      setTimeout(() => {
        useSystem.hideLoader();
      }, 150)
    }
  };

  return {
    user,
    getUser,
    currentSession,
    getSession,
    logOut,
  };
});
