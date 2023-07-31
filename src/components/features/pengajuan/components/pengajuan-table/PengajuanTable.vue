<script setup lang="ts">
import { usePengajuanStore } from '../../stores/pengajuan';
import { Header } from "vue3-easy-data-table";
import { storeToRefs } from 'pinia';
import EasyDataTable from 'vue3-easy-data-table'
import { useToast } from 'vue-toast-notification';

const pengajuanStore = usePengajuanStore()
const toast = useToast()

const {
    data,
    page,
    per_page,
    responseStatus
} = storeToRefs(pengajuanStore)

const headers: Header[] = [
    { text: "Nama", value: "name" },
    { text: "Email", value: "email" },
    { text: "No Handphone", value: "no_hp" },
    { text: "Alamat", value: "alamat" },
    { text: "Jaminan Pinjaman", value: "jaminan" },
    { text: "Alasan Pengajuan", value: "alasan" },
    { text: "Action", value: "action", width: 250},
];

const serverOptions = {
    page: page,
    rowsPerPage: per_page,
}

const getData = async () => {
    pengajuanStore.getPengajuan()
}

const updateAction = (id: number, status: string) => {
    pengajuanStore.updateStatusPengajuan({
        id: id,
        status: status
    })
}

onMounted(() => {
    getData()
})

watchEffect(() => {
    if(responseStatus.value){
        toast.success("Berhasil Update", {
            position: 'top'
        })
        getData()
    }
})


</script>

<template>
    <div class="container p-10 flex-1">
        <div class="pb-8 w-[80%] mb-5">
            <p class="text-3xl capitalize mb-4 font-semibold">Daftar Pengajuan</p>
        </div>

        <div class="relative">
            <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="data"
                table-class-name="customize-table">
                <template #item-action="{ id, is_status, status }">
                    <div v-if="!is_status || is_status === '0' " class="flex gap-x-3">
                        <div class="w-full">
                            <BaseButton @click="updateAction(id, 'tolak')" variant="warning">
                                Tolak
                            </BaseButton>
                        </div>
                        <div class="w-full">
                            <BaseButton @click="updateAction(id, 'konfirmasi')" variant="primary">
                                Konfirmasi
                            </BaseButton>
                        </div>
                    </div>

                    <div v-else class="capitalize">
                        {{ status }}
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>

<style>
.customize-table {
    --easy-table-border: 0px solid #445269;
    --easy-table-row-border: 0px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: black;
    --easy-table-header-background-color: #fff;

    --easy-table-header-item-padding: 10px 15px;

    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #fff;

    --easy-table-body-row-font-color: black;
    --easy-table-body-row-background-color: #fff;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #2d3a4f;
    --easy-table-body-row-hover-background-color: #eee;

    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #fff;
    --easy-table-footer-font-color: black;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;


    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    ;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
