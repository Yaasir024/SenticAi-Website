<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import router from "@/router";


import DashboardTemplate from "@/templates/Dashboard.vue"
import CaptionGrid from '@/components/dashboard/caption/Grid.vue';
import CaptionGenerator from '@/components/dashboard/modals/caption/Create.vue';

import ProgressSpinner from 'primevue/progressspinner';

import { useAuthStore } from "@/stores/auth/index"
import { useCaptionGeneratorStore } from "@/stores/dashboard/captionGenerator"

const route = useRoute()

const useAuth = useAuthStore()
const useCaptionGenerator = useCaptionGeneratorStore()


onMounted(() => {
    useCaptionGenerator.getAllGeneratedCaptions()
})

const logout = () => {
    useAuth.logOut()
}

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
                            <button @click="useCaptionGenerator.showCaptionGenerator = true"
                                class="bg-brand w-full p-2 rounded-lg text-white">
                                Generate Caption
                            </button>
                        </div>

                    </div>
                </div>
                <div class="max-w-[1140px] w-full mx-auto py-4">
                    <div class="mb-4">
                        <h4 class="text-[28px] font-semibold">
                            Generated Captions
                        </h4>
                    </div>
                    <div v-if="useCaptionGenerator.allGeneratedCaption.loading"
                        class="min-h-[60vh] flex items-center justify-center">
                        <ProgressSpinner style="width: 80px; height: 80px" strokeWidth="8"
                            class="fill-surface-0 dark:fill-surface-800" animationDuration=".4s"
                            aria-label="Custom ProgressSpinner" />
                    </div>
                    <CaptionGrid v-else-if="useCaptionGenerator.allGeneratedCaption.success" />
                </div>
                <CaptionGenerator />
            </section>
        </template>
    </DashboardTemplate>
</template>
