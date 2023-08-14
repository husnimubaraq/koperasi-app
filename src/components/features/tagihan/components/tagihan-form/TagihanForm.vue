<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification";
import { useTagihanStore } from "../../stores/tagihan";
import { usePengajuanStore } from "~/components/features/pengajuan/stores/pengajuan";

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
const dendaRef = ref("");
const jumlahRef = ref("");

function onSubmit() {
  const pengajuan = dataPengajuan.value.find(
    (x: any) => x.value === pengajuanRef.value.value
  );

  tagihanStore.createTagihan({
    user_id: pengajuan?.item?.user_id as any,
    pengajuan_id: pengajuan?.item?.id as number,
    nominal: Number(jumlahRef.value),
    nominal_denda: Number(dendaRef.value),
    tgl_tagihan: dateRef.value,
  });
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
        type="number"
        id="denda"
        label="Denda"
        placeholder="Masukan Denda"
        v-model:model-value="dendaRef"
      >
      </BaseInput>

      <BaseInput
        container-class-name="mb-3"
        type="number"
        id="jumlah"
        label="Jumlah"
        placeholder="Masukan Jumlah"
        v-model:model-value="jumlahRef"
      >
      </BaseInput>

      <BaseButton variant="primary" @click="onSubmit" type="submit">
        Tagih
      </BaseButton>
    </div>
  </div>
</template>
