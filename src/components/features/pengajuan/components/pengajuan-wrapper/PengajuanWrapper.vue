<script setup lang="ts">

</script>

<template>
  <div class="container p-10 flex-1">
    <div class="pb-8 w-[100%] mb-5">
        <p class="text-3xl capitalize mb-4 font-semibold">Pengajuan</p>
        <p class="mt-2">Silahkan klik pengajuan awal kemudian ajukan</p>
        <p class="mt-2">pinjaman anda dengan mudah dan efisien.</p>
    </div>

    <div class="flex flex-col items-center ">
        <BaseButton to="/pengajuan/tambah-pengajuan">
            <div class="border border-black rounded-md px-3 py-5 font-semibold text-lg">
                Pengajuan Awal
            </div>
        </BaseButton>
    </div>
  </div>
</template>
