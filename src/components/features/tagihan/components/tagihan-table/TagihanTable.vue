<script setup lang="ts">
import { useTagihanStore } from "../../stores/tagihan";
import { useToast } from "vue-toast-notification";
import { Header } from "vue3-easy-data-table";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import EasyDataTable from "vue3-easy-data-table";
import { usePembayaranStore } from "../../stores/pembayaran";
import { API_URL } from "~/apis";
import { formatCurrency } from "~/utils/rupiah";

const tagihanStore = useTagihanStore();
const pembayaranStore = usePembayaranStore();

const toast = useToast();

const { user } = useAuthStore();

const isAdmin = user?.role === "admin";

const { data, page, per_page } = storeToRefs(tagihanStore);

const { responseStatus, error } = storeToRefs(pembayaranStore);

const headers: Header[] = isAdmin
  ? [
      { text: "Nama", value: "name" },
      { text: "Tanggal", value: "tgl_tagihan" },
      { text: "Bunga", value: "denda" },
      { text: "Tagihan", value: "nominal" },
      { text: "Jumlah", value: "jumlah" },
      { text: "Setoran", value: "bulan" },
      { text: "Status", value: "status" },
    ]
  : [
      { text: "Tipe", value: "jenis_tagihan" },
      { text: "Bunga", value: "denda" },
      { text: "Tagihan", value: "nominal" },
      { text: "Jumlah", value: "jumlah" },
      { text: "Tanggal", value: "tgl_tagihan" },
      { text: "No Pembayaran", value: "no_tagihan" },
      { text: "Setoran", value: "bulan" },
      { text: "Status", value: "status" },
    ];

const serverOptions = {
  page: page,
  rowsPerPage: per_page,
};

const onPay = async (id: number) => {
  const tagihan = data.value.find((x) => x.id === id);
  pembayaranStore.createPemabyaran(
    {
      user_id: user?.id as number,
      nominal: Number(tagihan.nominal),
      denda: Number(tagihan.denda),
      no_tagihan: tagihan.no_tagihan,
    },
    id
  );
};

const getData = async () => {
  tagihanStore.getTagihan();
};

const eventSource = new EventSource(
  `${API_URL}transaction/sse?access_token=${user?.access_token}`
);

onMounted(() => {
  getData();
});

watchEffect(() => {
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("data: ", data);
    if (data.message.status) {
      getData();
    }
  };
  if (!responseStatus.value) {
    if (error.value) {
      toast.error(error.value, {
        position: "top",
      });
    }
  }
});
</script>

<template>
  <div class="relative">
    <EasyDataTable
      v-model:server-options="serverOptions"
      :headers="headers"
      :items="data"
      table-class-name="customize-table"
    >
      <template #item-denda="{ denda }">
        <p>{{ formatCurrency(denda) }}</p>
      </template>
      <template #item-nominal="{ nominal }">
        <p>{{ formatCurrency(nominal) }}</p>
      </template>
      <template #item-jumlah="{ nominal, denda }">
        <p>{{ formatCurrency((Number(nominal) + Number(denda))) }}</p>
      </template>
      <template #item-status="{ status, id }">
        <div v-if="!isAdmin">
          <BaseButton
            v-if="status === 'Belum Bayar'"
            variant="primary"
            class="w-[100px]"
            @click="onPay(id)"
          >
            <p variant="primary">BAYAR</p>
          </BaseButton>
          <p v-else>{{ status }}</p>
        </div>
        <p v-else>{{ status }}</p>
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
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
