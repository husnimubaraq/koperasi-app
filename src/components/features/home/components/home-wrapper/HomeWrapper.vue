<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../../stores/home';

const { user } = useAuthStore()

const { profile } = storeToRefs(useAuthStore())

const { getDashboard } = useHomeStore()

const { data } = storeToRefs(useHomeStore())

const isAdmin = user?.role === 'admin'

onMounted(() => {
  getDashboard()
})

</script>

<template>
  <div class="container p-10 flex-1">
    <div v-if="!isAdmin">
      <p class="text-2xl capitalize">{{ user?.name }}</p>
      <p class="">Nasabah - {{profile?.no_hp}} - {{profile?.email}}</p>
      <p class="mt-2 text-gray-400">*Jika ada kesalahan pada data diatas, silahkan hubungi pegawai koperasi</p>

      <div class="flex items-center justify-around mt-[100px]">
        <router-link to="/tagihan"
          class="w-40 h-[180px] flex flex-col items-center justify-center rounded-[25px] border hover:border-black p-4 bg-[#c8ee44]"
          active-class="text-black">
          <tagihan-icon />
          <p class="text-base text-center mt-4">Tagihan</p>
        </router-link>

        <router-link to="/rekap"
          class="w-40 h-[180px] flex flex-col items-center justify-center rounded-[25px] border hover:border-black p-4 bg-[#c8ee44]"
          active-class="text-black">
          <rekap-icon />
          <p class="text-base text-center mt-4">Rekap</p>
        </router-link>

        <router-link to="/pengajuan"
          class="w-40 h-[180px] flex flex-col items-center justify-center rounded-[25px] border hover:border-black p-4 bg-[#c8ee44]"
          active-class="text-black">
          <pengajuan-icon />
          <p class="text-base text-center mt-4">Pengajuan</p>
        </router-link>

        <router-link to="/bantuan"
          class="w-40 h-[180px] flex flex-col items-center justify-center rounded-[25px] border hover:border-black p-4 bg-[#c8ee44]"
          active-class="text-black">
          <bantuan-icon />
          <p class="text-base text-center mt-4">Bantuan</p>
        </router-link>
      </div>
    </div>

    <div v-else class=" mt-5 w-[70%]">
      <p class="text-2xl capitalize font-semibold">Pegawai koperasi</p>

      <div class="flex items-center gap-x-10 mt-10">
        <router-link to="/tagihan"
          class="w-40 h-[100px] flex items-start justify-center gap-x-2 rounded-[25px] border hover:border-black p-4 bg-[#29A073]"
          active-class="text-black">
          <p class="text-xl text-center">{{ data.count_tagihan }}</p>
          <p class="text-xl text-center ">Tagihan</p>
        </router-link>

        <router-link to="/nasabah"
          class="w-40 h-[100px] flex items-start justify-center gap-x-2 rounded-[25px] border hover:border-black p-4 bg-[#29A073]"
          active-class="text-black">
          <p class="text-xl text-center">{{ data.count_nasabah }}</p>
          <p class="text-xl text-center ">Nasabah</p>
        </router-link>

        <router-link to="/pengajuan"
          class="w-40 h-[100px] flex items-start justify-center gap-x-2 rounded-[25px] border hover:border-black p-4 bg-[#29A073]"
          active-class="text-black">
          <p class="text-xl text-center">{{ data.count_pengajuan }}</p>
          <p class="text-xl text-center ">Pengajuan</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
