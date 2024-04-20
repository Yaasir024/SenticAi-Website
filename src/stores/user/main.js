import { ref, computed, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

import { useSystemStore } from "@/stores/system/main";
import { useSystemNotifications } from "@/stores/system/notification";

import router from "@/router";

export const useUserStore = defineStore("User", () => {
  // Initialize System
  const useSystem = useSystemStore();
  const useNotification = useSystemNotifications();

  const userData = ref(null);

  const userDataStatus = ref({
    success: false,
    error: false,
    errorMessage: false,
    loading: false,
  });

  const getUser = async () => {
    userDataStatus.value.loading = true;
    userDataStatus.value.success = false;
    userDataStatus.value.error = false;
    try {
      userDataStatus.value.loading = true;
      const { data: { user, error } } = await supabase.auth.getUser()
      if (error) throw error;
      userData.value = user;
      setTimeout(() => {
        userDataStatus.value.loading = false;
        userDataStatus.value.success = true;
      },80)
    } catch (error) {
      userDataStatus.value.loading = false;
      userDataStatus.value.success = true;
      userDataStatus.value.error = false;
      userDataStatus.value.errorMessage = error.message;
    }
    // console.log(userData.value);
  };

  // getUser();

  return {
    userData,
    userDataStatus,
    getUser,
  };
});
