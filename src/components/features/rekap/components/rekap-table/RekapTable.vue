<script setup lang="ts">
import { useRekapStore } from '../../stores/rekap';
import { Header } from "vue3-easy-data-table";
import { storeToRefs } from 'pinia';
import EasyDataTable from 'vue3-easy-data-table'

const rekapStore = useRekapStore()

const {
    data,
    page,
    per_page
} = storeToRefs(rekapStore)

const headers: Header[] = [
  { text: "Tagihan", value: "no_tagihan" },
  { text: "Tanggal", value: "tgl_tagihan" },
  { text: "Denda", value: "denda" },
  { text: "Jumlah", value: "nominal" },
  { text: "Status", value: "status",  },
  { text: "Action", value: "" },
];

const serverOptions = {
  page: page,
  rowsPerPage: per_page,
}

const getData = async() => {
  rekapStore.getRekap()

}

onMounted(() => {
  getData()
})


</script>

<template>
  <div class="relative">
    <EasyDataTable
      v-model:server-options="serverOptions"
      :headers="headers"
      :items="data"
      table-class-name="customize-table"
    >
      <template #item-action="">
        <BaseButton 
          variant="primary"
        >
          
        </BaseButton>
      </template>
    </EasyDataTable>
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
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
