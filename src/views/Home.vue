<script setup>
import { ref, computed } from "vue";
import InputOtp from "primevue/inputotp";
const value = ref(null)

</script>

<template>
    This is home
    <InputOtp v-model="value" integerOnly />
</template>