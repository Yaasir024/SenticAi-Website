<script setup>
import { ref, computed, onMounted } from "vue";

import { getFormatDateTime } from "@/utils/date"

import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';

import DashboardTemplate from "@/templates/Dashboard.vue"
import CaptionGenerator from '@/components/dashboard/modals/CaptionGenerator.vue';

import { useAuthStore } from "@/stores/auth/index"
import { useCaptionGeneratorStore } from "@/stores/dashboard/captionGenerator"

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
                            <button @click="logout" class="elative flex items-center py-2 px-5 hover:bg-[#f1f5f9] rounded-md">
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
                    <div v-else-if="useCaptionGenerator.allGeneratedCaption.success"
                        class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5">
                        <div v-for="item in useCaptionGenerator.allGeneratedCaption.data" :key="item.id"
                            class="card w-full rounded-lg overflow-hidden shadow flex flex-col bg-white">
                            <div class="h-[240px]">
                                <img :src="item.imageUrl" alt="" class="w-full h-full object-cover object-top">
                            </div>
                            <div class="p-[20px]">
                                <div class="w-full flex items-center justify-between">
                                    <div class="">
                                        <p class="">
                                            {{ getFormatDateTime(item.created_at) }}
                                        </p>
                                    </div>
                                    <div class="">
                                        <Tag v-if="item.status == 'successful'" icon="pi pi-check" severity="success"
                                            value="Successful"></Tag>
                                        <Tag v-if="item.status == 'pending'" severity="warning" value="Pending"></Tag>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CaptionGenerator />
            </section>
        </template>
    </DashboardTemplate>
</template>
