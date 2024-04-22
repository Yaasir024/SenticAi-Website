<script setup>
import { ref, computed } from "vue";

</script>

<template>
    <div class="h-screen w-full flex items-center justify-center">
        <div class="">
            <h1 class="text-center text-[30px]">
                Welcome To SenticAI.
            </h1>
            <div class="mt-2 flex items-center justify-center">
                <RouterLink to="/dashboard">
                    <button
                                class="bg-brand w-full p-2 rounded-lg text-white">
                                Go To Dashboard
                            </button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>