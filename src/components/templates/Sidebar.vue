<script setup>
import { ref, computed, onMounted } from 'vue'

import router from '@/router';
import { useRoute } from "vue-router";

import { useSystemStore } from "@/stores/system/main"

import { useClickOutside } from "@/composables/useClickOutside";

const useSystem = useSystemStore()


const route = useRoute();

const emit = defineEmits(["close", "createNew"])

const closeOnRoute = () => {
    emit('close')
}

const createNew = () => {
    emit("createNew")
}


const mobileNav = ref(null)

const closeClickOutside = () => {
    emit('close')
    document.body.classList.remove('menu-open');
};

useClickOutside(mobileNav, closeClickOutside, true, closeClickOutside);



const switchMode = () => {
    useSystem.toggleDarkMode()
}
const switchToDark = () => {
    useSystem.toggleDarkMode()
}


const checkRouteName = (text, searchText) => {
    const regex = new RegExp(`\\b${searchText}\\b`, 'i'); // Create a regular expression with the dynamic search text
    return regex.test(text);
}

const logOut = () => {
    router.push("/")
}

</script>

<template>
    <div ref="mobileNav" class="flex flex-col h-full bg-dark-primary">
        <div class="">
            <div class="py-8 flex justify-center">
                <h1 class="font-bold text-[30px] font-grotesque">
                    <span class="font-extrabold text-[#2563EB] text-[31px] font-inter">S</span>entricAI
                </h1>
            </div>
            <div class="px-3">
                <button class="w-full p-3 rounded-xl bg-brand text-white flex items-center justify-center gap-x-2">
                    <span class="text-[16px] leading-[24px] font-semibold">Create New</span>
                </button>
            </div>
        </div>
        <div class="mt-3 px-3 pb-2">
            <ul class="flex flex-col gap-y-1">
                <li class="dashboard">
                    <RouterLink to="/dashboard">
                        <button
                            :class="checkRouteName(route.name, 'dashboard-home') ? 'bg-[#2B2F48] text-[#F3F3F3]' : 'bg-transparent'"
                            class="flex items-center w-full px-3 py-[10px] rounded-lg gap-x-3 hover:bg-[#2B2F48] hover:text-[#F3F3F3] transition-all duration-150 ease-in-out">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 17.99V14.99M9.02 2.84001L3.63 7.04001C2.73 7.74001 2 9.23001 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29001 21.19 7.74001 20.2 7.05001L14.02 2.72001C12.62 1.74001 10.37 1.79001 9.02 2.84001Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            <span class="text-[16px] leading-[21px]">Home</span>
                        </button>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div class="mt-auto px-3 py-8">
            <div class="flex flex-col gap-y-[22px]">
                <button @click="logOut"
                    class="flex items-center w-full px-3 py-[10px] rounded-lg gap-x-3 hover:bg-[#2B2F48] hover:text-[#F3F3F3] transition-all duration-150 ease-in-out">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.02018 17.5H4.82574C4.40213 17.5 3.99587 17.3244 3.69633 17.0118C3.39679 16.6993 3.22852 16.2754 3.22852 15.8333V4.16667C3.22852 3.72464 3.39679 3.30072 3.69633 2.98816C3.99587 2.67559 4.40213 2.5 4.82574 2.5H8.02018M13.6105 14.1667L17.6035 10M17.6035 10L13.6105 5.83333M17.6035 10H8.02018"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="text-[16px] leading-[21px] font-medium font-inter">Log Out</span>
                </button>
                <div class="p-4 bg-[#2B2F48] rounded-xl">
                    <div class="flex items-center justify-between">
                        <div class=""></div>
                    </div>
                </div>
            </div>
            <div v-if="false" @click="switchMode" class="flex border-[2px] border-dark-1 rounded-xl overflow-hidden">
                <button :class="!useSystem.darkMode ? 'bg-grey-3' : 'text-white/60'"
                    class="flex-1 py-[14px] px-4 flex items-center gap-x-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 18.5C13.7239 18.5 15.3772 17.8152 16.5962 16.5962C17.8152 15.3772 18.5 13.7239 18.5 12C18.5 10.2761 17.8152 8.62279 16.5962 7.40381C15.3772 6.18482 13.7239 5.5 12 5.5C10.2761 5.5 8.62279 6.18482 7.40381 7.40381C6.18482 8.62279 5.5 10.2761 5.5 12C5.5 13.7239 6.18482 15.3772 7.40381 16.5962C8.62279 17.8152 10.2761 18.5 12 18.5Z"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86M4.86 19.14L4.99 19.01M12 2.08V2M12 22V21.92M2.08 12H2M22 12H21.92M4.99 4.99L4.86 4.86"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="text-[18px] leading-[28px] font-semibold">
                        Light
                    </span>
                </button>
                <button :class="useSystem.darkMode ? 'bg-dark-1 text-white' : 'text-grey-4'"
                    class="flex-1 py-[14px] px-4 flex items-center gap-x-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C13.0001 16.06 9.00009 11.97 8.98009 7.13996C8.97009 5.83996 9.24009 4.60996 9.73009 3.48996C10.2701 2.24996 9.62009 1.65996 8.37009 2.18996C4.41009 3.85996 1.70009 7.84996 2.03009 12.42Z"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="text-[18px] leading-[28px] font-semibold">
                        Dark
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>