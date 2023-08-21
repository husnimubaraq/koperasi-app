<script setup lang="ts">
import { useNotifikasiStore } from '../../stores/notifikasi';
import { storeToRefs } from 'pinia';

const { getNotifikasi, updateNotifikasi } = useNotifikasiStore()

const {
    data
} = storeToRefs(useNotifikasiStore())

const onUpdate = (id: number) => {
    updateNotifikasi(id)
}

onMounted(() => {
    getNotifikasi()
})

</script>

<template>
    <div class="container p-10 flex-1">
        <div class="pb-8 w-[100%] mb-5">
            <p class="text-3xl capitalize mb-4 font-semibold">Notifikasi</p>
        </div>

        <div class="relative" v-for="item in data" :key="item.id">
            <NotifikasiCard
                :judul="item.judul"
                :deskripsi="item.deskripsi"
                :created_at="item.created_at"
                :is_read="(item.status)"
                :on-click="() => onUpdate(item.id)"
            />
        </div>
    </div>
</template>