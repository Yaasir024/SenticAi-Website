<script setup>
import { ref, computed, onMounted } from "vue";

import { useUserStore } from "@/stores/user/main";
import { useCaptionGeneratorStore } from "@/stores/dashboard/captionGenerator"


import Sidebar from 'primevue/sidebar';
import FileUpload from 'primevue/fileupload';

const useUser = useUserStore();
const useCaptionGenerator = useCaptionGeneratorStore()


// import Toast from 'primevue/toast';
// import { useToast } from "primevue/usetoast";
// const toast = useToast();

const onAdvancedUpload = (e) => {
    // console.log(e.files[0])
    useCaptionGenerator.uploadFile(e.files[0])
    // toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
const visibleBottom = ref(true)
</script>

<template>
    <Sidebar v-model:visible="useCaptionGenerator.showCaptionGenerator" header="Caption Generator" position="bottom" style="height: auto">
        <div class="">
            <!-- <Toast /> -->
            <FileUpload name="demo" customUpload @uploader="onAdvancedUpload($event)" :multiple="false"
                accept="image/*" :maxFileSize="5000000">
                <template #empty>
                    <div class="">
                        <p class="text-center">Drag and drop files to here to generate a caption. Maximum file size 5MB</p>
                    </div>
                </template>
            </FileUpload>
        </div>
    </Sidebar>
</template>