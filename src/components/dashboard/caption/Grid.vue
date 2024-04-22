<script setup>
import { ref, computed, onMounted } from "vue";
import router from "@/router";


import { getFormatDateTime } from "@/utils/date"

import { useCaptionGeneratorStore } from "@/stores/dashboard/captionGenerator"

import Tag from 'primevue/tag';
const useCaptionGenerator = useCaptionGeneratorStore()


const viewCaption = (id) => {
    console.log(id)
    router.push(`/dashboard/${id}`)
    useCaptionGenerator.showViewCaptionModal = true
}

const allCaptions = computed(() => {
    if (useCaptionGenerator.allGeneratedCaption.success) {
        return useCaptionGenerator.allGeneratedCaption.data
    }
    return null
})
const truncateString = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text; // No truncation if text is empty or within limit
  }

  // Split into words and limit the array
  const words = text.split(' ');
  const truncatedWords = words.slice(0, maxLength);

  // Join the truncated words and add ellipses
  return truncatedWords.join(' ') + '...';
};
</script>

<template>
    <div class="">
        <div class="">
            <div v-if="allCaptions.length > 0"
                class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5">
                <div v-for="item in useCaptionGenerator.allGeneratedCaption.data" :key="item.id" class="">
                    <RouterLink :to="`/dashboard/${item.id}`">
                        <div class="card w-full rounded-lg overflow-hidden shadow flex flex-col bg-white">
                            <div class="h-[240px]">
                                <img :src="item.imageUrl" alt="" class="w-full h-full object-cover object-top">
                            </div>
                            <div class="p-[20px]">
                                <div class="w-full flex items-center justify-between">
                                    <div class="">
                                        <p class="">
                                            {{ getFormatDateTime(item.created_at) }}
                                        </p>
                                    </div>
                                    <div class="">
                                        <Tag v-if="item.status == 'success'" icon="pi pi-check" severity="success"
                                            value="Successful"></Tag>
                                        <Tag v-if="item.status == 'pending'" severity="warning" value="Pending"></Tag>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <p class="">
                                        {{ item.generatedCaption ? truncateString(item.generatedCaption, 20) : "No Caption" }}
                                        <!-- truncateString -->
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div v-else class="min-h-[400px]">
                <div class="flex flex-col items-center justify-center py-3 px-1">
                    <svg width="167" height="102" viewBox="0 0 167 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M160 14C163.866 14 167 17.134 167 21C167 24.866 163.866 28 160 28H120C123.866 28 127 31.134 127 35C127 38.866 123.866 42 120 42H142C145.866 42 149 45.134 149 49C149 52.866 145.866 56 142 56H131.826C126.952 56 123 59.134 123 63C123 65.5773 125 67.9107 129 70C132.866 70 136 73.134 136 77C136 80.866 132.866 84 129 84H46C42.134 84 39 80.866 39 77C39 73.134 42.134 70 46 70H7C3.13401 70 0 66.866 0 63C0 59.134 3.13401 56 7 56H47C50.866 56 54 52.866 54 49C54 45.134 50.866 42 47 42H22C18.134 42 15 38.866 15 35C15 31.134 18.134 28 22 28H62C58.134 28 55 24.866 55 21C55 17.134 58.134 14 62 14H160ZM160 42C163.866 42 167 45.134 167 49C167 52.866 163.866 56 160 56C156.134 56 153 52.866 153 49C153 45.134 156.134 42 160 42Z"
                            fill="#F3F7FF" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M106.672 14L115.974 81.8427L116.809 88.649C117.079 90.8417 115.519 92.8375 113.327 93.1067L54.7665 100.297C52.5739 100.566 50.5781 99.007 50.3089 96.8143L41.2931 23.3868C41.1585 22.2904 41.9381 21.2925 43.0345 21.1579C43.0414 21.1571 43.0483 21.1563 43.0553 21.1555L47.9136 20.6105M51.8421 20.1698L56.4292 19.6553Z"
                            fill="white" />
                        <path
                            d="M107.91 13.8302C107.817 13.1463 107.186 12.6678 106.502 12.7616C105.818 12.8554 105.34 13.4859 105.433 14.1698L107.91 13.8302ZM115.974 81.8427L117.214 81.6904C117.214 81.6846 117.213 81.6788 117.212 81.6729L115.974 81.8427ZM116.809 88.649L118.05 88.4967L116.809 88.649ZM113.327 93.1067L113.479 94.3474L113.327 93.1067ZM54.7665 100.297L54.9189 101.538L54.7665 100.297ZM50.3089 96.8143L51.5496 96.662L50.3089 96.8143ZM43.0553 21.1555L43.1946 22.3977L43.0553 21.1555ZM48.053 21.8527C48.739 21.7758 49.2328 21.1572 49.1558 20.4712C49.0789 19.7851 48.4603 19.2913 47.7743 19.3683L48.053 21.8527ZM51.7028 18.9276C51.0168 19.0046 50.523 19.6231 50.5999 20.3092C50.6769 20.9952 51.2954 21.489 51.9815 21.412L51.7028 18.9276ZM56.5685 20.8975C57.2546 20.8205 57.7484 20.202 57.6714 19.5159C57.5945 18.8299 56.9759 18.3361 56.2899 18.4131L56.5685 20.8975ZM105.433 14.1698L114.735 82.0125L117.212 81.6729L107.91 13.8302L105.433 14.1698ZM114.733 81.9951L115.569 88.8014L118.05 88.4967L117.214 81.6904L114.733 81.9951ZM115.569 88.8014C115.754 90.3088 114.682 91.6809 113.174 91.866L113.479 94.3474C116.357 93.994 118.404 91.3746 118.05 88.4967L115.569 88.8014ZM113.174 91.866L54.6142 99.0563L54.9189 101.538L113.479 94.3474L113.174 91.866ZM54.6142 99.0563C53.1067 99.2414 51.7347 98.1694 51.5496 96.662L49.0682 96.9666C49.4216 99.8445 52.041 101.891 54.9189 101.538L54.6142 99.0563ZM51.5496 96.662L42.5338 23.2344L40.0524 23.5391L49.0682 96.9666L51.5496 96.662ZM42.5338 23.2344C42.4833 22.8233 42.7757 22.4491 43.1868 22.3986L42.8821 19.9173C41.1006 20.136 39.8337 21.7576 40.0524 23.5391L42.5338 23.2344ZM43.1868 22.3986C43.1894 22.3983 43.192 22.398 43.1946 22.3977L42.9159 19.9133C42.9046 19.9145 42.8934 19.9159 42.8821 19.9173L43.1868 22.3986ZM43.1946 22.3977L48.053 21.8527L47.7743 19.3683L42.9159 19.9133L43.1946 22.3977ZM51.9815 21.412L56.5685 20.8975L56.2899 18.4131L51.7028 18.9276L51.9815 21.412Z"
                            fill="#23A455" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M104.14 18.2692L112.56 79.7529L113.317 85.9211C113.561 87.9082 112.167 89.7146 110.203 89.9557L57.7613 96.3947C55.7977 96.6358 54.0081 95.2204 53.7642 93.2333L45.6141 26.8568C45.4795 25.7604 46.2592 24.7625 47.3555 24.6279L53.8431 23.8314"
                            fill="#E8F0FE" />
                        <path
                            d="M63.6719 1.25H109.229C109.958 1.25 110.657 1.5395 111.173 2.05485L124.616 15.4898C125.132 16.0056 125.422 16.7053 125.422 17.4349V80C125.422 81.5188 124.191 82.75 122.672 82.75H63.6719C62.1531 82.75 60.9219 81.5188 60.9219 80V4C60.9219 2.48122 62.1531 1.25 63.6719 1.25Z"
                            fill="white" stroke="#23A455" stroke-width="2.5" />
                        <path d="M109.672 2.40283V14C109.672 15.6569 111.015 17 112.672 17H120.605" stroke="#23A455"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M71 68H97M71 17H97H71ZM71 29H114H71ZM71 42H114H71ZM71 55H114H71Z" stroke="#3CDA79"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h1 class="mt-2 text-[18px] font-medium">
                        No Captions Generated Yet
                    </h1>
                    <p class="text-center text-[13px] text-grey-5">
                        You can view all your generated captions here in real time. Generate your first caption to get
                        started.
                    </p>
                    <button @click="useCaptionGenerator.showCaptionGenerator = true"
                                class="mt-3 bg-brand w-full p-2 rounded-lg text-white">
                                Generate Caption
                            </button>
                </div>
            </div>
        </div>
    </div>
</template>
