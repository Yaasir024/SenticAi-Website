<script setup>
import LoadingState from '@/components/global/loading/Screen.vue'
import { useSystemStore } from "@/stores/system/main"

const useSystem = useSystemStore()
</script>

<template>
  <main class="">
    <RouterView />
  <!-- <LoadingState v-if="true" /> -->
  <LoadingState v-if="useSystem.loadingState" />
  </main>
</template>
