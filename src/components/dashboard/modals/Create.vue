<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import { useClickOutside } from "@/composables/useClickOutside";

const emit = defineEmits(["closeModal"])

const agreeToTerms = ref(false)

const modalRef = ref(null);

const form = ref({
    performSentiment: false
})


const closeClickOutside = () => {
    emit("closeModal")
    // document.body.classList.remove('menu-open');
};

useClickOutside(modalRef, closeClickOutside, true, closeClickOutside);


const readFile = async (e) => {
    let file = e.target.files[0];
    console.log(file)
    // if (file.size > maxSizeInBytes) {
    //     useSystem.showMessage(
    //         "error",
    //         "FIle size is greater than 3mb. Please Try again."
    //     );
    // } else {
    //     useOnboarding.form.cacRegistration.name = file.name
    //     useOnboarding.form.cacRegistration.file = file
    // }
};
const allowSubmit = computed(() => {
    return false
})
const cancel = () => {

}
const generate = () => {

}
</script>



<template>
    <div class="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-[302]">
        <div class="max-w-[800px] md:w-full px-4">
            <div ref="modalRef"
                class="modal relative w-full h-full bg-dark-2 rounded-[21px] flex flex-col overflow-hidden p-6">
                <div
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
                            jpg/png files with a size less than 5mb
                        </p>
                    </div>
                    <input type="file" accept=".png,.jpg,.jpeg" @change="readFile"
                        class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" title="" />
                </div>
                <div class="mt-4">
                    <input type="text" placeholder="Enter Name"
                        class="w-full px-3 py-2 border border-grey-3 outline-none bg-transparent rounded-lg">
                    <div class="mt-2 flex gap-x-1">
                        <div class="">
                            <button @click="form.performSentiment = !form.performSentiment"
                                class="h-[16px] md:h-[20px] w-[16px] md:w-[20px] border border-[#D6DDEB] rounded flex items-center justify-center shrink-0 mr-2">
                                <svg v-if="form.performSentiment" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                    viewBox="0 0 12 12" fill="none">
                                    <path d="M2.5 6L5 8.5L10 3.5" stroke="white" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <span @click="form.performSentiment = !form.performSentiment" class="cursor-pointer">Perform Sentiment Analysis</span>
                    </div>
                    <div class="mt-6">
                        <div class="flex items-center justify-end gap-x-2">
                            <div @click="cancel"
                                class="py-3 px-3 border border-go-blue hover:bg-go-blue hover:text-go-sky rounded-[10px] text-base leading-[24px] font-bold font-jarkata cursor-pointer flex items-center justify-center transition-all duration-200 ease-in-out">
                                Back</div>
                            <button @click="generate()"
                                :class="allowSubmit ? 'bg-go-blue text-go-sky cursor-pointer' : 'bg-go-blue/80 text-go-sky/40 cursor-default'"
                                class="py-3 px-3 rounded-[10px] text-base leading-[24px] font-bold font-jarkata ">
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.center-fixed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.img-poster {
    position: absolute;
    /* width: 100%; Set width to auto to maintain aspect ratio */
    height: 100%;
    /* Set height to 100% to span the height of the container */
    top: 0;
    /* Align the image to the top of the container */
    bottom: 0;
    /* Align the image to the top of the container */
    right: 0;
    /* Align the image to the left of the container */
}
</style>