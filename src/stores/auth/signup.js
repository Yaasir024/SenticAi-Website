import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

import { useSystemStore } from "@/stores/system/main";
import { useSystemNotifications } from "@/stores/system/notification";

import router from "@/router";

export const useSignupStore = defineStore("Signup", () => {
  // Initialize System
  const useSystem = useSystemStore();

  const useNotification = useSystemNotifications();

  // Signup Data
  const signupData = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const resetSignupData = () => {
    signupData.value = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  };

  const createUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            first_name: signupData.value.firstName,
            last_name: signupData.value.lastName,
            email: signupData.value.email,
          },
        ])
        .select();

      if (error) throw error;
      // console.log(data);
      resetSignupData();
      router.push("/dashboard");
    } catch (error) {
      // console.log(error);
      if (error instanceof Error) {
        useNotification.showMessage("error", error.message);
      }
    } finally {
      useSystem.hideLoader();
    }
  };

  // LOGIN
  const signup = async () => {
    // console.log(signupData.value);
    try {
      useSystem.showLoader();
      const { data, error } = await supabase.auth.signUp({
        email: signupData.value.email,
        password: signupData.value.password,
      });
      if (error) throw error;
      // console.log(data.user.id);
      createUserData(data.user.id);
    } catch (error) {
      if (error instanceof Error) {
        useNotification.showMessage("error", error.message);
      }
    } finally {
      useSystem.hideLoader();
    }
  };

  return {
    signupData,
    signup,
  };
});
