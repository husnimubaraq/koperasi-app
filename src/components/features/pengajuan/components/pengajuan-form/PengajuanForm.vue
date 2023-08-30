<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import { usePengajuanStore } from "../../stores/pengajuan";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const toast = useToast();

const pengajuanStore = usePengajuanStore();

const { errors, error, responseStatus } = storeToRefs(pengajuanStore);

const { profile } = storeToRefs(useAuthStore());

const nameRef = ref("");
const emailRef = ref("");
const phoneRef = ref("");
const addressRef = ref("");
const jaminanRef = ref("");
const alasanRef = ref("");
const id_jaminanRef = ref("");

const nominalRef = ref("");

function onSubmit() {
  pengajuanStore.createPengajuan({
    user_id: profile.value?.id as number,
    alamat: addressRef.value,
    jaminan: jaminanRef.value,
    alasan: alasanRef.value,
    no_hp: phoneRef.value as string,
    nominal: nominalRef.value,
    id_jaminan: id_jaminanRef.value,
  });
}

const dataBulan = Array.from({ length: 12 }, (_, index) => ({
  name: `${index + 1} Bulan`,
  value: index + 1,
}));

const bulanRef = ref(dataBulan[0]);

watchEffect(() => {
  nameRef.value = profile.value?.name as string;
  emailRef.value = profile.value?.email as string;
  phoneRef.value = profile.value?.no_hp as string;
  addressRef.value = profile.value?.alamat as string;
  if (responseStatus.value) {
    toast.success("Pengagajuan Berhasil", {
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
      <p class="text-3xl capitalize mb-4 font-semibold">Pengajuan Awal</p>
      <p class="mt-2 text-gray-400 text-sm">
        Tolong masukan data diri, untuk pengajual awal
      </p>
    </div>

    <div class="flex flex-col gap-y-3 w-full">
      <BaseInput
        id="name"
        disabled
        label="Nama"
        placeholder="Masukan Nama"
        v-model:model-value="nameRef"
      >
      </BaseInput>

      <BaseInput
        id="email"
        disabled
        label="Email"
        placeholder="Masukan Email"
        v-model:model-value="emailRef"
      >
      </BaseInput>

      <BaseInput
        id="phone"
        label="Nomor HP"
        placeholder="Masukan HP"
        v-model:model-value="phoneRef"
      >
      </BaseInput>

      <BaseInput
        id="address"
        label="Alamat"
        placeholder="Masukan Alamat"
        v-model:model-value="addressRef"
      >
        <div v-if="errors.alamat">
          <div v-for="item in errors.alamat">
            <p class="text-sm text-red-600">{{ item }}</p>
          </div>
        </div>
      </BaseInput>

      <BaseInput
        id="jaminan"
        label="Jaminan Pinjaman"
        placeholder="Masukan Jaminan"
        v-model:model-value="jaminanRef"
      >
        <div v-if="errors.jaminan">
          <div v-for="item in errors.jaminan">
            <p class="text-sm text-red-600">{{ item }}</p>
          </div>
        </div>
      </BaseInput>
      <BaseInput
        id="id_jaminan"
        label="No ID Jaminan"
        placeholder="Contoh : nomor BPKB"
        v-model:model-value="id_jaminanRef"
      >
        <div v-if="errors.id_jaminan">
          <div v-for="item in errors.id_jaminan">
            <p class="text-sm text-red-600">{{ item }}</p>
          </div>
        </div>
      </BaseInput>
      <BaseInput
        type="text"
        id="nominal"
        label="Jumlah Nominal Pengajuan"
        placeholder="Masukan Nominal Pengajuan"
        v-model:modelValue="nominalRef"
      >
        <div v-if="errors.nominal">
          <div v-for="item in errors.nominal">
            <p class="text-sm text-red-600">{{ item }}</p>
          </div>
        </div>
      </BaseInput>

      <BaseInput
        container-class-name="mb-4"
        id="alasan"
        label="Alasan Pengajuan"
        placeholder="Masukan Alasan Pengajuan"
        v-model:model-value="alasanRef"
      >
        <div v-if="errors.alasan">
          <div v-for="item in errors.alasan">
            <p class="text-sm text-red-600">{{ item }}</p>
          </div>
        </div>
      </BaseInput>
      <BaseSelect
        id="bulan"
        label="Berapa Lama"
        v-model:model-value="bulanRef"
        :data="dataBulan"
      />

      <BaseButton variant="primary" @click="onSubmit" type="submit">
        Kirim Pengajuan
      </BaseButton>
    </div>
  </div>
</template>
