<script setup>
import { ref, computed } from "vue";
import { useSignupStore } from "@/stores/auth/signup"

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const useSignup = useSignupStore()

const signup = () => {
    useSignup.signup()
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
                    Create your account
                </h4>
                <div class="mt-4">
                    <form @submit.prevent="signup" autocomplete="on" class="flex flex-col gap-y-4">
                        <div class="flex flex-col md:flex-row md:items-center gap-x-2 gap-y-4">
                            <div class="flex-1 flex flex-col gap-y-2">
                                <div class="">
                                    <label class="text-[14px] leading-[20px]">
                                        First Name
                                    </label>
                                </div>
                                <InputText type="text" v-model="useSignup.signupData.firstName"
                                    placeholder="Enter your first name" required />
                            </div>
                            <div class="flex-1 flex flex-col gap-y-2">
                                <div class="">
                                    <label class="text-[14px] leading-[20px]">
                                        Last Name
                                    </label>
                                </div>
                                <InputText type="text" v-model="useSignup.signupData.lastName"
                                    placeholder="Enter your last name" required />
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <div class="">
                                <label class="text-[14px] leading-[20px]">
                                    Email
                                </label>
                            </div>
                            <InputText name="email" type="email" v-model="useSignup.signupData.email"
                                placeholder="Enter your email" required autocomplete="email" />
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <div class="">
                                <label class="text-[14px] leading-[20px]">
                                    Password
                                </label>
                            </div>
                            <Password v-model="useSignup.signupData.password" placeholder="Enter Password" :feedback="false" toggleMask required />
                        </div>
                        <div class="">
                            <button class="bg-brand w-full p-4 rounded-lg text-white">
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="mt-[30px]">
                <p class="text-center text-[16px]">
                    Already have an account? <RouterLink to="/login" class="font-medium underline hover:text-brand transition-all duration-200 ease-in-out">Log in</RouterLink>
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.section-bg {
    background: rgb(174, 238, 205);
    background: radial-gradient(circle, rgba(174, 238, 205, 1) 0%, rgba(148, 203, 233, 1) 100%);
}
</style>