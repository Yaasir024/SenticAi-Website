import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

import axios from "axios";

import { useUserStore } from "@/stores/user/main";
import { useSystemStore } from "@/stores/system/main";
import { useSystemNotifications } from "@/stores/system/notification";

import router from "@/router";

export const useCaptionGeneratorStore = defineStore("CaptionGenerator", () => {
  const modelsBaseEndpoint = import.meta.env.VITE_MODELS_BASE_ENDPOINT;
  const useUser = useUserStore();
  // Initialize System
  const useSystem = useSystemStore();

  const useNotification = useSystemNotifications();

  const showCaptionGenerator = ref(false);
  const showViewCaptionModal = ref(false);

  const allGeneratedCaption = ref({
    data: null,
    success: false,
    error: false,
    loading: false,
  });
  const singleCaption = ref({
    data: null,
    success: false,
    error: false,
    loading: false,
  });

  const generateCaptionData = ref({
    image: null,
    imageType: "",
    platform: "",
    generateHashtags: false,
  });

  const clearGenerateData = () => {
    generateCaptionData.value = {
      image: null,
      imageType: "",
      platform: "",
      generateHashtags: false,
    };
  };

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
        .eq("userId", userId)
        .order("created_at", { ascending: false });
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
  const getCaptions = async (id) => {
    singleCaption.value.loading = true;
    singleCaption.value.success = false;
    singleCaption.value.error = false;
    // Wait for useUser.userData.id to be available
    while (!useUser.userData) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms
    }
    try {
      let userId = useUser.userData.id;
      singleCaption.value.loading = true;
      const { data, error } = await supabase
        .from("generated_captions")
        .select("*")
        .eq("userId", userId)
        .eq("id", id) // Add the `id` filter
        .single();
      if (error) throw error;
      // console.log(data)
      singleCaption.value.data = data;
      singleCaption.value.loading = false;
      singleCaption.value.success = true;
    } catch (error) {
      singleCaption.value.loading = false;
      singleCaption.value.success = true;
      singleCaption.value.error = false;
      singleCaption.value.errorMessage = error.message;
    }
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

  async function uploadToStorage(image) {
    const { data, error } = await supabase.storage
      .from("caption-generator-images")
      .upload(generateUniqueId(), generateCaptionData.value.image);
    if (error) throw error;
    const imageUrl = `https://meggaeeyyayvbjvryxyy.supabase.co/storage/v1/object/public/${data.fullPath}`;
    return imageUrl;
  }

  async function generateCaptionFromModel(imageUrl) {
    const url = `${modelsBaseEndpoint}/generate-caption/gemini/from-image`;

    const data = {
      imageUrl: imageUrl,
      platform: generateCaptionData.value.platform,
      imageType: generateCaptionData.value.imageType,
      generateHashtags: generateCaptionData.value.generateHashtags,
    };
    try {
      const response = await axios.post(url, data); // Use await for the asynchronous request
      // console.log(response.data.result, "Result");
      return response.data.result; // Return the result from the response
    } catch (error) {
      // console.error("Error generating caption:", error);
      throw error; // Re-throw the error for handling in the calling function
    }
  }

  const saveDataToDB = async (image, generatedResult, status) => {
    const { data, error } = await supabase
      .from("generated_captions")
      .insert([
        {
          userId: useUser.userData.id,
          imageUrl: image,
          status: status,
          generatedCaption: generatedResult ? generatedResult.caption : null,
          hashtags: generatedResult ? generatedResult.hashtags : null,
          imageType: generateCaptionData.value.imageType,
          platform: generateCaptionData.value.platform,
          generateHashtags: generateCaptionData.value.generateHashtags,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  };

  const generateCaption = async () => {
    useSystem.showLoader();
    try {
      const imageUrl = await uploadToStorage(generateCaptionData.value.image);

      // Caption generation logic
      try {
        const result = await generateCaptionFromModel(imageUrl);

        // Save to database with success status
        const dbData = await saveDataToDB(imageUrl, result, "success");
        // console.log(dbData[0].id, "DB Data");

        useNotification.showMessage(
          "success",
          "Caption generated successfully."
        );
        showCaptionGenerator.value = false;

        const insertedId = dbData[0].id;
        if (insertedId) {
          router.push(`/dashboard/${insertedId}`);
        } else {
          router.push("/dashboard");
        }
        useSystem.hideLoader();
        setTimeout(() => {
          clearGenerateData()
        }, 0)
      } catch (captionError) {
        // console.error("Error generating caption:", captionError);

        // Save to database with pending status even on caption generation error
        await saveDataToDB(imageUrl, null, "pending");

        // Failed Error
        useNotification.showMessage(
          "error",
          "Failed to generate caption. Try Again Later."
        );
        showCaptionGenerator.value = false;
        useSystem.hideLoader();
      }
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        useNotification.showMessage("error", uploadError.message);
      }
      useSystem.hideLoader();
    }
  };

  return {
    allGeneratedCaption,
    singleCaption,
    generateCaptionData,
    showCaptionGenerator,
    showViewCaptionModal,
    clearGenerateData,
    getCaptions,
    getAllGeneratedCaptions,
    generateCaptionFromModel,
    generateCaption,
  };
});
