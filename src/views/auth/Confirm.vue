<script setup>
import { ref, computed } from "vue";
import { useSystemStore } from "@/stores/system/main"
import { useSignupStore } from "@/stores/auth/signup"
import { useAuthStore } from "@/stores/auth/index"

import { ElInput } from 'element-plus'
import 'element-plus/dist/index.css'

const useSystem = useSystemStore()
const useSignup = useSignupStore()
const useAuth = useAuthStore()

const signup = () => {
    useSignup.signup()
}
</script>


<template>
    <section class="h-screen w-full flex flex-col items-center justify-center">
        <div class="max-w-[390px] w-full">
            <h1 class="text-[30px] leading-[36px] mb-2">
               SenticAi
            </h1>
            <div v-if="!useSignup.signupCompleted" class="py-6 rounded-lg max-w-[390px] w-full">
                <p class="">
                    Sign in with your email.
                </p>
                <form @submit.prevent="signup" class="mt-8 flex flex-col gap-y-3 text-white">
                    <div class="flex flex-col gap-y-2">
                        <el-input v-model="useSignup.signupData.email" type="email"
                            style="width: 100%;" size="large" placeholder="you@example.com" required />
                    </div>
                    <div class="mt-5">
                        <button class="bg-brand w-full py-2 px-4 rounded-md text-white">
                            Send Login Link
                        </button>
                    </div>
                </form>
            </div>
            <div v-else class="p-6 rounded-lg max-w-[390px] w-full bg-[#2a2929]">
                <h1 class="text-center text-white text-[28px] leading-[28px] font-semibold font-grotesque">
                    Check your email
                </h1>
                <p class="mt-2 text-center">
                    Thanks for signing up! We've sent a secure login link to your email. Please check your inbox and click on the link to access your account. If you don't see the email, please check your spam folder. If you encounter any issues, please contact our support team."
                </p>
            </div>
        </div>
        <!-- {{useSignup.signupCompleted}}AA -->
    </section>
</template>

<style scoped>
.el-input>* {
    background-color: transparent !important;
    border-color: rgb(52, 52, 52);
    color: white;
}
</style>