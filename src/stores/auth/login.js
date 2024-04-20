import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

import { useSystemStore } from "@/stores/system/main";
import { useSystemNotifications } from "@/stores/system/notification";

import router from "@/router";

export const useLoginStore = defineStore("login", () => {
  // Initialize System
  const useSystem = useSystemStore();

  const useNotification = useSystemNotifications();
  // Login Data
  const loginData = ref({
    email: "",
    password: "",
  });

  const resetLoginData = () => {
    loginData.value = {
      email: "",
      password: "",
    };
  };

  // LOGIN
  const login = async () => {
    try {
      useSystem.showLoader();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.value.email,
        password: loginData.value.password,
      });
      if (error) throw error;
      // console.log(data);
      router.push("/dashboard");
      // createUserData(data.user.id);
    } catch (error) {
      // console.log(error);
      if (error instanceof Error) {
        useNotification.showMessage("error", error.message);
      }
    } finally {
      useSystem.hideLoader();
    }
  };

  return {
    loginData,
    login,
  };
});
