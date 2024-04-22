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


</script>

<template>
    <Dialog v-model:visible="useCaptionGenerator.showViewCaptionModal" modal header="Header" position="bottom"
        :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <h2 class="text-[20px]">
                    View
                </h2>
            </div>
        </template>
        <div class="">
            Lorem Ipsum
        </div>
    </Dialog>
</template>