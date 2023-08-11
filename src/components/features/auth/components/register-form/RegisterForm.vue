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
    errorsRegister: errors,
    error,
    responseStatus,
    returnUrl
} = storeToRefs(userStore)

const genre = [
    { name: 'Pria', value: "L" },
    { name: 'Wanita', value: "P" },
]

const passwordRef = ref('')
const nameRef = ref('')
const phoneRef = ref('')
const emailRef = ref('')
const genreRef = ref(genre[0])
const addressRef = ref('')
const birthDateRef = ref('')

function onRegister() {
    userStore.register({
        name: nameRef.value,
        email: emailRef.value,
        password: passwordRef.value,
        alamat: addressRef.value,
        jenis_kelamin: genreRef.value.value,
        tanggal_lahir: birthDateRef.value,
        nomor_hp: phoneRef.value
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
    <div class="flex flex-col items-center mb-[100px]">
        <div class="mb-5 mt-5 flex items-center w-[470px]">
            <img src="../../../../../assets/images/logo_koperasi.png" style="height: 47px; width: auto;" />
            <p class="text-black font-[600]">KUD Teratai Biru.</p>
        </div>
        <div class="mb-10 mt-5 flex flex-col w-[451px]">
            <p class="text-xl">Buat akun baru</p>
            <p class="text-gray-400">Selamat datang! Tolong masukkan data diri</p>
        </div>

        <div class="flex flex-col gap-y-3 w-[451px]">

            <BaseInput id="name" label="Nama" placeholder="Masukan Nama" v-model:model-value="nameRef">
                <div v-if="errors.name">
                    <div v-for="item in errors.name">
                        <p class="text-sm text-red-600">{{ item }}</p>
                    </div>
                </div>
            </BaseInput>

            <BaseInput type="password" id="password" label="Password" placeholder="Masukan Password"
                v-model:model-value="passwordRef">
                <div v-if="errors.password">
                    <div v-for="item in errors.password">
                        <p class="text-sm text-red-600">{{ item }}</p>
                    </div>
                </div>
            </BaseInput>

            <BaseInput id="phone" label="Nomor HP" placeholder="Masukan Nomor HP" v-model:model-value="phoneRef">
                <div v-if="errors.nomor_hp">
                    <div v-for="item in errors.nomor_hp">
                        <p class="text-sm text-red-600">{{ item }}</p>
                    </div>
                </div>
            </BaseInput>

            <BaseInput type="email" id="email" label="Email" placeholder="Masukan Email" v-model:model-value="emailRef">
                <div v-if="errors.email">
                    <div v-for="item in errors.email">
                        <p class="text-sm text-red-600">{{ item }}</p>
                    </div>
                </div>
            </BaseInput>

            <BaseSelect id="genre" label="Jenis Kelamin" v-model:model-value="genreRef" :data="genre" />

            <BaseInput type="address" id="address" label="Alamat" placeholder="Masukan Alamat"
                v-model:model-value="addressRef">
                <div v-if="errors.alamat">
                    <div v-for="item in errors.alamat">
                        <p class="text-sm text-red-600">{{ item }}</p>
                    </div>
                </div>
            </BaseInput>

            <BaseInput container-class-name="mb-5" type="date" id="birth_date" label="Tanggal Lahir"
                placeholder="Masukan Tanggal Lahir" v-model:model-value="birthDateRef">
                <div v-if="errors.tanggal_lahir">
                    <div v-for="item in errors.tanggal_lahir">
                        <p class="text-sm text-red-600">{{ item }}</p>
                    </div>
                </div>
            </BaseInput>

            <BaseButton variant="primary" @click="onRegister" type="submit">
                Buat Akun
            </BaseButton>

            <div class="text-sm text-center mt-3">
                <label class="text-gray-400">Sudah memiliki akun? </label>
                <BaseButton to="/login">
                    Masuk
                </BaseButton>
            </div>
        </div>
    </div>
</template>