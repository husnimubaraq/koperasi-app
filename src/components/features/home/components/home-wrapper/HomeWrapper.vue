<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { storeToRefs } from 'pinia';

const { user} = useAuthStore()

const { profile } = storeToRefs(useAuthStore())

const isAdmin = user?.role === 'admin'

</script>

<template>
  <div class="container p-10 flex-1">
    <div v-if="!isAdmin">
      <p class="text-2xl capitalize">{{ user?.name }}</p>
      <p class="">Nasabah - {{profile?.no_hp}} - {{profile?.email}}</p>
      <p class="mt-2 text-gray-400">*Jika ada kesalahan pada data diatas, silahkan hubungi pegawai koperasi</p>

      <div class="flex items-center justify-around mt-[100px]">
        <router-link to="/tagihan"
          class="w-40 h-[180px] flex flex-col items-center justify-center border border-black p-4 hover:border-[#c8ee44] hover:text-[#c8ee44]"
          active-class="text-black">
          <tagihan-icon />
          <p class="text-base text-center mt-4">Tagihan</p>
        </router-link>

        <router-link to="/rekap"
          class="w-40 h-[180px] flex flex-col items-center justify-center border border-black p-4 hover:border-[#c8ee44] hover:text-[#c8ee44]"
          active-class="text-black">
          <rekap-icon />
          <p class="text-base text-center mt-4">Rekap</p>
        </router-link>

        <router-link to="/pengajuan"
          class="w-40 h-[180px] flex flex-col items-center justify-center border border-black p-4 hover:border-[#c8ee44] hover:text-[#c8ee44]"
          active-class="text-black">
          <pengajuan-icon />
          <p class="text-base text-center mt-4">Pengajuan</p>
        </router-link>

        <router-link to="/bantuan"
          class="w-40 h-[180px] flex flex-col items-center justify-center border border-black p-4 hover:border-[#c8ee44] hover:text-[#c8ee44]"
          active-class="text-black">
          <bantuan-icon />
          <p class="text-base text-center mt-4">Bantuan</p>
        </router-link>
      </div>
    </div>

    <div v-else class=" mt-20">
      <div class=" h-[400px] flex flex-col items-center justify-center w-full border border-black rounded-md px-3 py-5 font-semibold text-3xl">
        Selamat Datang Pegawai Koperasi
      </div>
    </div>
  </div>
</template>
