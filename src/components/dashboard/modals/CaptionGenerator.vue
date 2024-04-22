<script setup>
import { ref, computed, onMounted } from "vue";

import { useUserStore } from "@/stores/user/main";
import { useCaptionGeneratorStore } from "@/stores/dashboard/captionGenerator"

import Dialog from 'primevue/dialog';

import Message from 'primevue/message';

import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';

const useUser = useUserStore();
const useCaptionGenerator = useCaptionGeneratorStore()

const maxImageSize = 4
const maxSizeInBytes = 4 * 1024 * 1024

const messages = ref([]);
let count = ref(0);

const addMessages = (severityM, contentM) => {
    messages.value.push({ severity: severityM, content: contentM, id: count.value++ })
};

const clearMessage = () => {
    messages.value = []
}


const readFile = async (e) => {
    clearMessage()
    let file = e.target.files[0];
    if (file.size > maxSizeInBytes) {
        addMessages('error', `Images too large, shouldn't be larger than ${maxImageSize}MB.`)
    } else {
        useCaptionGenerator.generateCaptionData.image = file
        useCaptionGenerator.generateCaptionData.imageType = file.type
    }
};

const imagePreview = computed(() => {
    if (useCaptionGenerator.generateCaptionData.image) {
        return URL.createObjectURL(useCaptionGenerator.generateCaptionData.image);
    }
    return null;
})

const clearImage = () => {
    useCaptionGenerator.generateCaptionData.image = null
}

const platforms = [
    "Instagram",
    "Twitter",
    "Facebook",
    "LinkedIn",
    "Pinterest",
    "YouTube",
    "BlogPost",
    "WhatsApp Status"
];

const cancelModal = () => {
    useCaptionGenerator.showCaptionGenerator = false
    setTimeout(() => {
        useCaptionGenerator.clearGenerateData()
    }, 0)
}

const generateCaption = () => {
    clearMessage()
    if (!useCaptionGenerator.generateCaptionData.platform || !useCaptionGenerator.generateCaptionData.image) {
        addMessages('error', `Ensure All Fields are filled`)
    } else {
        useCaptionGenerator.generateCaption()
    }

}
</script>

<template>
    <Dialog v-model:visible="useCaptionGenerator.showCaptionGenerator" modal header="Header" position="bottom"
        :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <h2 class="text-[20px]">
                    Caption Generator
                </h2>
            </div>
        </template>
        <div class="">
            <transition-group name="p-message" tag="div">
                <Message v-for="msg of messages" :key="msg.id" :severity="msg.severity">{{ msg.content }}</Message>
            </transition-group>
            <div v-if="imagePreview" class="min-h-[80px] max-h-[300px]">
                <img :src="imagePreview" alt="" class="min-h-[80px] max-h-[300px] w-full">
            </div>
            <div v-else
                class="relative w-full min-h-[80px] py-[40px] border border-dashed rounded-xl flex flex-col items-center justify-center">
                <svg height="68px" width="68px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6z">
                    </path>
                </svg>
                <div class="mt-6">
                    <h5 class="text-center">
                        Drop file here or <button class="text-blue-600">click to upload</button>
                    </h5>
                    <p class="text-center">
                        jpg/png files with a size less than {{ maxImageSize }}mb
                    </p>
                </div>
                <input type="file" accept=".png,.jpg,.jpeg" @change="readFile"
                    class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" title="" />
            </div>
            <div class="mt-3 w-full flex items-center justify-between">
                <div class="flex items-center gap-x-2">
                    <InputSwitch v-model="useCaptionGenerator.generateCaptionData.generateHashtags" />
                    <h2 class="text-[18px]">Generate Hashtags</h2>
                </div>
                <div class="">
                    <button v-if="imagePreview" @click="clearImage" class="bg-red-600 w-full p-2 rounded-lg text-white">
                        Clear Image
                    </button>
                </div>
            </div>
            <div class="mt-3">
                <div class="flex flex-col md:flex-row md:items-center gap-x-2 gap-y-4">
                    <div class="flex-1 flex flex-col gap-y-1">
                        <div class="">
                            <label class="text-[14px] leading-[20px]">
                                Image Type
                            </label>
                        </div>
                        <InputText type="text" v-model="useCaptionGenerator.generateCaptionData.imageType"
                            placeholder="image/jpeg" readonly />
                    </div>
                    <div class="flex-1 flex flex-col gap-y-1">
                        <div class="">
                            <label class="text-[14px] leading-[20px]">
                                Select Posting Platform
                            </label>
                        </div>
                        <Dropdown v-model="useCaptionGenerator.generateCaptionData.platform" :options="platforms"
                            placeholder="Select a Platform" class="" />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex items-center gap-x-2">
                <button @click="cancelModal" class="bg-red-600 w-full p-2 rounded-lg text-white">
                    Cancel
                </button>
                <button @click="generateCaption" class="bg-brand shrink-0 p-2 rounded-lg text-white">
                    Generate Caption
                </button>
            </div>
        </template>
    </Dialog>
</template>