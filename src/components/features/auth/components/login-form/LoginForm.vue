<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { watchEffect, ref } from 'vue'
import { useAuthStore } from '~/stores/auth';
import { useToast } from 'vue-toast-notification';

const router = useRouter()
const toast = useToast()

const userStore = useAuthStore()

const {
    errors,
    error,
    responseStatus,
    returnUrl
} = storeToRefs(userStore)

const usernameRef = ref('')
const passwordRef = ref('')
const rememberMeRef = ref(false)

function onLogin() {
    userStore.login({
        username: usernameRef.value,
        password: passwordRef.value
    })
}

watchEffect(() => {
    if (responseStatus.value) {
        toast.success("Berhasil Login", {
            position: 'top'
        })
        setTimeout(() => {
            router.push(returnUrl.value || '/')
        }, 2000)
    }else{
        if(error.value){
            toast.error(error.value, {
                position: 'top'
            })
        }
    }
})

</script>

<template>
    <AuthWrapper>
        <div>
            <div class="mb-10 mt-[100px]">
                <p class="text-2xl">SELAMAT DATANG</p>
                <p class="text-gray-400">Aplikasi Koperasi Unit Desa</p>
            </div>

            <div class="flex flex-col gap-y-3 w-[451px]">
                <BaseInput id="username" label="Username" placeholder="Masukan Username" v-model:model-value="usernameRef"
                    v-model:errors="errors">
                    <div v-if="errors.email">
                        <div v-for="item in errors.email">
                            <p class="text-sm text-red-600">{{ item }}</p>
                        </div>
                    </div>
                </BaseInput>

                <BaseInput type="password" id="password" label="Password" placeholder="Masukan Password" v-model:model-value="passwordRef"
                    v-model:errors="errors">
                    <div v-if="errors.password">
                        <div v-for="item in errors.password">
                            <p class="text-sm text-red-600">{{ item }}</p>
                        </div>
                    </div>
                </BaseInput>

                <div class="flex items-center justify-between">
                    <Checkbox id="remember_me" v-model="rememberMeRef" />

                    <BaseButton>
                        Lupa Password
                    </BaseButton>
                </div>

                <BaseButton variant="primary" @click="onLogin" type="submit">
                    Masuk
                </BaseButton>

                <div class="text-sm text-center mt-3">
                    <label class="text-gray-400">Tidak punya akun? </label>
                    <BaseButton to="/register">
                        Mendaftar Sekarang
                    </BaseButton>
                </div>
            </div>
        </div>
    </AuthWrapper>
</template>