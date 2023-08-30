<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { user } = useAuthStore();

const isAdmin = user?.role === "admin";
</script>

<template>
  <div class="container p-10 flex-1">
    <div class="border-b border-black pb-8 w-[100%] mb-5">
      <p class="text-3xl capitalize mb-4 font-semibold">Tagihan</p>
      <div v-if="!isAdmin">
        <p class="text-2xl capitalize">{{ user?.name }}</p>
        <p class="">Nasabah</p>
        <p class="mt-2 text-gray-400">Jika ada kesalahan tagihan pinjaman 
            dan masalah pembayaran silahkan hubungi pegawai koperasi</p>
      </div>
      <div v-else>
        <div class="flex">
          <base-button variant="primary" to="/tagihan/tambah-tagihan">
            <p class="mx-5">Tambah</p>
          </base-button>
        </div>
      </div>
    </div>

    <tagihan-table />
  </div>
</template>
