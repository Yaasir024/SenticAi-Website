<script setup>
import { ref, computed } from "vue";
import { useSystemStore } from "@/stores/system/main"
import { useLoginStore } from "@/stores/auth/login"
import { useAuthStore } from "@/stores/auth/index"


import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const useAuth = useAuthStore()
const useSystem = useSystemStore()
const useLogin = useLoginStore()

const login = () => {
    useLogin.login()
}
</script>


<template>
    <section class="min-h-screen w-full flex flex-col items-center justify-center px-3">
        <div class="max-w-[500px] w-full">
            <h1 class="text-[34px] leading-[36px] font-semibold text-center">
                SenticAi
            </h1>
            <div class="mt-10 bg-white border rounded-[10px] max-w-[500px] w-full p-[20px]">
                <h4 class="text-[21px] font-semibold">
                    Login
                </h4>
                <div class="mt-4">
                    <form @submit.prevent="login" autocomplete="on" class="flex flex-col gap-y-4">
                        <div class="flex flex-col gap-y-2">
                            <div class="">
                                <label class="text-[14px] leading-[20px]">
                                    Email
                                </label>
                            </div>
                            <InputText name="email" type="email" v-model="useLogin.loginData.email"
                                placeholder="Enter your email" required autocomplete="email" />
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <div class="">
                                <label class="text-[14px] leading-[20px]">
                                    Password
                                </label>
                            </div>
                            <Password v-model="useLogin.loginData.password" placeholder="Enter Password"
                                :feedback="false" toggleMask required />
                        </div>
                        <div class="">
                            <button class="bg-brand w-full p-4 rounded-lg text-white">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div class="mt-[30px]">
                <p class="text-center text-[16px]">
                    Already have an account? <RouterLink to="/login" class="font-medium underline hover:text-brand transition-all duration-200 ease-in-out">Login</RouterLink>
                </p>
            </div>
            </div>
            <!-- {{useAuth.session}} -->
        </div>
    </section>
</template>

<style scoped>
.el-input>* {
    background-color: transparent !important;
    border-color: rgb(52, 52, 52);
}
</style>