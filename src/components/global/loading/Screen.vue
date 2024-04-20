<script setup>
import Overlay from '@/components/global/Overlay.vue'
import Loader from '@/components/global/loading/Loader.vue'

import ProgressSpinner from 'primevue/progressspinner';

</script>

<template>
    <div class="">
        <div class="centered-div z-[400]">
            <ProgressSpinner style="width: 80px; height: 80px" strokeWidth="8"
                class="fill-surface-0 dark:fill-surface-800" animationDuration=".4s"
                aria-label="Custom ProgressSpinner" />
        </div>
        <Overlay :background="'bg-black/80'" class="z-[320]" />
    </div>
</template>

<style scoped>
.centered-div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>