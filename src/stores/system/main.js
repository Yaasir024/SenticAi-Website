import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", () => {
  // Loading State
  const loadingState = ref(false);
  const showLoader = () => {
    loadingState.value = true;
  };
  const hideLoader = () => {
    loadingState.value = false;
  };

  const darkMode = ref(false);
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
  };

  return {
    loadingState,
    showLoader,
    hideLoader,
    darkMode,
    toggleDarkMode,
  };
});
