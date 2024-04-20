import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

import { useUserStore } from "@/stores/user/main";
import { useSystemStore } from "@/stores/system/main";
import { useSystemNotifications } from "@/stores/system/notification";

import router from "@/router";

export const useCaptionGeneratorStore = defineStore("CaptionGenerator", () => {
  const useUser = useUserStore();
  // Initialize System
  const useSystem = useSystemStore();

  const useNotification = useSystemNotifications();

  const showCaptionGenerator = ref(false);

  const allGeneratedCaption = ref({
    data: null,
    success: false,
    error: false,
    loading: false,
  });

  const getAllGeneratedCaptions = async () => {
    allGeneratedCaption.value.loading = true;
    allGeneratedCaption.value.success = false;
    allGeneratedCaption.value.error = false;
    // Wait for useUser.userData.id to be available
    while (!useUser.userData) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms
    }
    try {
      let userId = useUser.userData.id;
      allGeneratedCaption.value.loading = true;
      const { data, error } = await supabase
        .from("generated_captions")
        .select("*")
        .eq("userId", userId);
      if (error) throw error;
      allGeneratedCaption.value.data = data;
      allGeneratedCaption.value.loading = false;
      allGeneratedCaption.value.success = true;
    } catch (error) {
      allGeneratedCaption.value.loading = false;
      allGeneratedCaption.value.success = true;
      allGeneratedCaption.value.error = false;
      allGeneratedCaption.value.errorMessage = error.message;
    }
    //   allGeneratedCaption.value.loading = false;
    //   allGeneratedCaption.value.data = response.data.data;
    //   allGeneratedCaption.value.success = response.data.success;
    //   allGeneratedCaption.value.error = response.data.errors;

    // Error
    // allGeneratedCaption.value.loading = false;
    //     allGeneratedCaption.value.error = true;
  };

  const generateUniqueId = () => {
    // Generate a random string
    const uniqueStr = Math.random().toString(36).substr(2, 9);

    // Get current timestamp
    const timestamp = new Date().getTime();

    // Combine timestamp and unique string
    const uniqueId = `${timestamp}-${uniqueStr}`;

    return uniqueId;
  };

  const saveCaptionImage = async (imgUrl) => {
    try {
      const { data, error } = await supabase
        .from("generated_captions")
        .insert([
          {
            userId: useUser.userData.id,
            imageUrl: imgUrl,
            status: "pending",
          },
        ])
        .select();

      if (error) throw error;
      useNotification.showMessage("success", "Image Uploaded Successfully");
      getAllGeneratedCaptions()
    } catch (error) {
      //   console.log(error);
      if (error instanceof Error) {
        useNotification.showMessage("error", error.message);
      }
    } finally {
      useSystem.hideLoader();
    }
  };

  const uploadFile = async (file) => {
    try {
      showCaptionGenerator.value = false;
      useSystem.showLoader();
      const { data, error } = await supabase.storage
        .from("caption-generator-images")
        .upload(generateUniqueId(), file);
      if (error) throw error;
      //   console.log(data);
      const imageFullPath = `https://meggaeeyyayvbjvryxyy.supabase.co/storage/v1/object/public/${data.fullPath}`;
      saveCaptionImage(imageFullPath);
      // console.log(imageFullPath);
    } catch (error) {
      //   console.log(error);
      if (error instanceof Error) {
        useNotification.showMessage("error", error.message);
      }
    } finally {
      showCaptionGenerator.value = false;
    }
  };

  return {
    allGeneratedCaption,
    getAllGeneratedCaptions,
    showCaptionGenerator,
    uploadFile,
  };
});