<script setup>
import Overlay from '@/components/global/Overlay.vue'
import Loader from '@/components/global/loading/Loader.vue'

import ProgressSpinner from 'primevue/progressspinner';

</script>

<template>
    <div class="z-[1500] bg-white">
        <div class="centered-div z-[1600]">
            <ProgressSpinner style="width: 80px; height: 80px" strokeWidth="8"
                class="fill-surface-0 dark:fill-surface-800" animationDuration=".4s"
                aria-label="Custom ProgressSpinner" />
        </div>
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