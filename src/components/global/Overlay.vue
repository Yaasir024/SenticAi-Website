<script setup>
const props = defineProps(["background"])
</script>

<template>
    <div :class="background" class="fixed top-0 left-0 bottom-0 right-0 z-[100]"></div>
</template>