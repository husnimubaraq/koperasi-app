<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification";
import { useTagihanStore } from "../../stores/tagihan";
import { usePengajuanStore } from "~/components/features/pengajuan/stores/pengajuan";
import { dateFormatter } from "~/utils/dayjs";
import { formatCurrency } from "~/utils/rupiah";

const router = useRouter();
const toast = useToast();

const pengajuanStore = usePengajuanStore();
const tagihanStore = useTagihanStore();

const { error, responseStatus } = storeToRefs(tagihanStore);

const { dataSelect: dataPengajuan } = storeToRefs(pengajuanStore);

const pengajuanRef = ref(
  dataPengajuan.value.length > 0
    ? dataPengajuan.value[0]
    : {
        name: "Pilih Pengajuan",
        value: "",
      }
);

const dateRef = ref("");
const dendaRef = ref(0);
const jumlahRef = ref(0);
const numericValueDendaRef = ref(0);
const numericValueJumlahRef = ref(0);

function formatNominalDenda(event: InputEvent) {
  const rawValue = (event.target as HTMLInputElement).value;

  // Remove non-numeric characters and convert to number
  numericValueDendaRef.value = parseFloat(rawValue.replace(/[^\d]/g, ""));

  // Format the numeric value as Indonesian Rupiah (IDR) currency
  dendaRef.value = formatCurrency(numericValueDendaRef.value);
}

function formatNominalJumlah(event: InputEvent) {
  const rawValue = (event.target as HTMLInputElement).value;

  // Remove non-numeric characters and convert to number
  numericValueJumlahRef.value = parseFloat(rawValue.replace(/[^\d]/g, ""));

  // Format the numeric value as Indonesian Rupiah (IDR) currency
  jumlahRef.value = formatCurrency(numericValueJumlahRef.value);
}
// parsing
function parseFormattedValueToNumber(formattedValue: string): number {
  // Remove non-numeric characters and convert to number
  const numericValue = parseFloat(
    formattedValue.replace(/[^0-9,-]/g, "").replace(",", ".")
  );

  // Format the number without decimal places and thousands separators
  return numericValue;
}

const dateNow = dateFormatter({
  dateTime: new Date(),
  format: "YYYY-MM-DD",
});

function onSubmit() {
  const formattedNominalDenda = parseFormattedValueToNumber(dendaRef.value);
  const formattedNominalJumlah = parseFormattedValueToNumber(jumlahRef.value);
  const pengajuan = dataPengajuan.value.find(
    (x: any) => x.value === pengajuanRef.value.value
  );

  console.log("dateRef.value: ", dateRef.value);

  if (dateRef.value < dateNow) {
    toast.error("Tanggal tidak boleh kurang dari waktu sekarang", {
      position: "top",
    });
  } else {
    tagihanStore.createTagihan({
      user_id: pengajuan?.item?.user_id as any,
      pengajuan_id: pengajuan?.item?.id as number,
      nominal: formattedNominalJumlah,
      nominal_denda: formattedNominalDenda,
      tgl_tagihan: dateRef.value,
    });
  }
}

watchEffect(() => {
  pengajuanStore.getPengajuanFormat();
});

watchEffect(() => {
  if (responseStatus.value) {
    toast.success("Tagihan berhasil ditambahkan", {
      position: "top",
    });
    setTimeout(() => {
      router.back();
    }, 2000);
  } else {
    if (error.value) {
      toast.error(error.value, {
        position: "top",
      });
    }
  }
});
</script>

<template>
  <div class="container p-10 flex flex-col md:w-[40%]">
    <div class="pb-8 mb-5">
      <p class="text-3xl capitalize mb-4 font-semibold">Tagihan</p>
    </div>

    <div class="flex flex-col gap-y-3 w-full">
      <BaseSelect
        id="pengajuan"
        label="Pengajuan"
        v-model:model-value="pengajuanRef"
        :data="dataPengajuan"
      />

      <BaseInput
        type="date"
        id="date"
        label="Tanggal"
        placeholder="Masukan Tanggal"
        v-model:model-value="dateRef"
      >
      </BaseInput>

      <BaseInput
        type="text"
        id="denda"
        label="Denda"
        placeholder="Masukan Denda"
        v-model:model-value="dendaRef"
        @input="formatNominalDenda"
      >
      </BaseInput>

      <BaseInput
        container-class-name="mb-3"
        type="text"
        id="jumlah"
        label="Jumlah"
        placeholder="Masukan Jumlah"
        v-model:model-value="jumlahRef"
        @input="formatNominalJumlah"
      >
      </BaseInput>

      <BaseButton variant="primary" @click="onSubmit" type="submit">
        Tagih
      </BaseButton>
    </div>
  </div>
</template>
