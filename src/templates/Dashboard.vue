<script setup>
import { ref, computed, onMounted } from "vue";

import Loading from "@/components/templates/Loading.vue"

import { useUserStore } from "@/stores/user/main";

const useUser = useUserStore();

onMounted(() => {
    useUser.getUser()
})
</script>

<template>
    <section class="">
        <Loading v-if="useUser.userDataStatus.loading" />
        <main v-else-if="useUser.userDataStatus.success" class="">
            <slot v-if="useUser.userDataStatus.success" name="main"></slot>
        </main>
    </section>
</template>