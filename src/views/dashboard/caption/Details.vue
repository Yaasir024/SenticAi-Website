<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import router from "@/router";

import { getFormatDateTime } from "@/utils/date"

import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';

import DashboardTemplate from "@/templates/Dashboard.vue"

import { useAuthStore } from "@/stores/auth/index"
import { useCaptionGeneratorStore } from "@/stores/dashboard/captionGenerator"

const route = useRoute()

const useAuth = useAuthStore()
const useCaptionGenerator = useCaptionGeneratorStore()


onMounted(() => {
    useCaptionGenerator.getCaptions(route.params.id)
})

const logout = () => {
    useAuth.logOut()
}

const captionData = computed(() => {
    if (useCaptionGenerator.singleCaption.success) {
        return useCaptionGenerator.singleCaption.data
    }
    return null
})

const formattedHastags = computed(() => {
    if (captionData.value && captionData.value.hashtags) {
        return captionData.value.hashtags.map(hashtag => hashtag.slice(1)).join(', ');
    }
    return null
})
</script>

<template>
    <DashboardTemplate>
        <template #main>
            <section class="min-h-screen pb-[120px] px-5">
                <div class="sticky top-0 py-[28px] bg-[#f8fafc]">
                    <div
                        class="max-w-[1135px] w-full mx-auto relative flex items-center justify-between p-2 rounded-md bg-[#f1f5f9] border text-[#64748b]">
                        <ul class="flex items-center gap-x-2">
                            <li class="">
                                <RouterLink to="/dashboard">
                                    <button class="elative flex items-center py-2 px-5 hover:bg-[#f1f5f9] rounded-md">
                                        <span class="">Home</span>
                                    </button>
                                </RouterLink>
                            </li>
                        </ul>
                        <div class="flex items-center gap-x-2">
                            <button @click="logout"
                                class="elative flex items-center py-2 px-5 hover:bg-[#f1f5f9] rounded-md">
                                <span class="">Logout</span>
                            </button>
                        </div>

                    </div>
                </div>
                <div class="max-w-[1140px] w-full mx-auto py-4">
                    <div v-if="false" class="mb-4">
                        <h4 class="text-[28px] font-semibold">
                            Generated Captions
                        </h4>
                    </div>
                    <div v-if="useCaptionGenerator.singleCaption.loading"
                        class="min-h-[60vh] flex items-center justify-center">
                        <ProgressSpinner style="width: 80px; height: 80px" strokeWidth="8"
                            class="fill-surface-0 dark:fill-surface-800" animationDuration=".4s"
                            aria-label="Custom ProgressSpinner" />
                    </div>
                    <div v-else-if="useCaptionGenerator.singleCaption.success" class="w-full">
                        <div class="max-w-[480px] w-full mx-auto">
                            <div class="rounded-md overflow-hidden">
                                <img :src="captionData.imageUrl" alt="" class="w-full">
                            </div>
                            <div class="mt-1 w-full flex items-center justify-between">
                                <div class="">
                                    <p class="">
                                        {{ getFormatDateTime(captionData.created_at) }}
                                    </p>
                                </div>
                                <div class="">
                                    <Tag v-if="captionData.status == 'success'" icon="pi pi-check" severity="success"
                                        value="Successful"></Tag>
                                    <Tag v-if="captionData.status == 'pending'" severity="warning" value="Pending"></Tag>
                                </div>
                            </div>
                            <div class="mt-4 flex flex-col gap-y-3">
                                <div class="flex flex-col gap-y-1">
                                    <h5 class="text-[15px] text-gray-500 font-semibold">
                                        Caption
                                    </h5>
                                    <p v-if="captionData.generatedCaption" style="white-space: pre-line;"
                                        class="text-[16px]">
                                        {{ captionData.generatedCaption }}
                                    </p>
                                </div>
                                <div class="flex flex-col gap-y-1">
                                    <h5 class="text-[15px] text-gray-500 font-semibold">
                                        Hashtags
                                    </h5>
                                    <p v-if="formattedHastags" class="text-[16px]">
                                        {{ formattedHastags }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </DashboardTemplate>
</template>
