<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import { useToast } from 'vue-toast-notification';

const router = useRouter()
const toast = useToast()

const userStore = useAuthStore()

const {
    profile,
    errorsRegister: errors,
    error,
    responseStatus
} = storeToRefs(userStore)

const genre = [
    { name: 'Pria', value: "L" },
    { name: 'Wanita', value: "P" },
]

const nameRef = ref('')
const phoneRef = ref('')
const emailRef = ref('')
const genreRef = ref({
    name: 'Pria',
    value: 'L'
})
const addressRef = ref('')
const birthDateRef = ref('')

function onSubmit() {
    userStore.updateProfile({
        name: nameRef.value,
        alamat: addressRef.value,
        jenis_kelamin: genreRef.value.value,
        tanggal_lahir: birthDateRef.value,
        no_hp: phoneRef.value
    })
}

watchEffect(() => {
    const dataGenre = genre.find(x => x.value === profile.value?.jenis_kelamin)

    if(dataGenre){
        genreRef.value = dataGenre as any
    }

    nameRef.value = profile.value?.name as string
    emailRef.value = profile.value?.email as string
    phoneRef.value = profile.value?.no_hp as string
    addressRef.value = profile.value?.alamat as string
    birthDateRef.value = profile.value?.tgl_lahir as string
    
    if (responseStatus.value) {
        toast.success("Profile berhasil diubah", {
            position: 'top'
        })
        router.back()
    } else {
        if (error.value) {
            toast.error(error.value, {
                position: 'top'
            })
        }
    }
})

</script>

<template>
    <div class="container p-10 flex flex-col md:w-[40%]">
        <div class="pb-8 mb-5">
            <p class="text-3xl capitalize mb-4 font-semibold">Profile</p>
        </div>

        <div class="flex flex-col gap-y-3 w-full">
            <BaseInput id="name" label="Nama" placeholder="Masukan Nama" v-model:model-value="nameRef">
                <div v-if="errors.name">
                    <div v-for="item in errors.name">
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

            <BaseInput disabled type="email" id="email" label="Email" placeholder="Masukan Email" v-model:model-value="emailRef">
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

            <BaseButton variant="primary" @click="onSubmit" type="submit">
                Update
            </BaseButton>
        </div>
    </div>
</template>
