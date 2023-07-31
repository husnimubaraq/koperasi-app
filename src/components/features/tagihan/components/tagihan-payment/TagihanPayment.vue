<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toast-notification';
import { usePembayaranStore } from '../../stores/pembayaran';
import { TPembayaran } from '../../types/pembayaran.interface';
import { useAuthStore } from '~/stores/auth';

const route = useRoute()
const toast = useToast()

const pembayaranStore = usePembayaranStore()
const userStore = useAuthStore()

const {
    data,
    responseStatus,
    error
} = storeToRefs(pembayaranStore)

function onSelect(item: TPembayaran){
  pembayaranStore.createPemabyaran({
    user_id: userStore.user?.id as number,
    nominal: Number("300000.00"),
    denda: Number("2000.00"),
    no_tagihan: 'TX-20230730173739',
    jenis_tagihan: 'tagihan',
    name: item.name,
    group: item.group,
    code: item.code
  })
}

const getData = async() => {
  pembayaranStore.getPembayaran()
}

onMounted(() => {
  getData()
})

watchEffect(() => {
  if (!responseStatus.value) {
    if(error.value){
      toast.error(error.value, {
          position: 'top'
      })
    }
  }
})

</script>

<template>
  <div class="container p-10 flex-1 md:w-[50%]">
    <div class=" w-[80%] mb-5">
        <p class="text-3xl capitalize mb-4 font-semibold">Pembayaran</p>
    </div>

    <div v-for="item in data" :key="item.code">
      <div 
        @click="onSelect(item)"
        class="flex items-center justify-between border border-black rounded-[5px] px-2 py-2 mb-3 hover:border-[#c8ee44] cursor-pointer"
      >
        <div class="flex flex-col">
          <label class="text-base font-semibold">{{ item.name }}</label>
          <label class="text-sm text-gray-500">{{ item.group }}</label> 
        </div>
        <div>
          <img :src="item.icon_url" style="height: 30px; width: auto;" />
        </div>
      </div>
    </div>
  </div>
</template>
