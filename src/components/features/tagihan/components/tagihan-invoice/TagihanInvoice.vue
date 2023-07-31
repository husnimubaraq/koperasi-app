<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import {API_URL} from '~/apis/index'
import { useToast } from 'vue-toast-notification';

const toast = useToast()
const { query } = useRoute()
const router = useRouter()

const autStore = useAuthStore()

const {
  user
} = storeToRefs(autStore)

const eventSource = new EventSource(`${API_URL}transaction/sse?access_token=${user?.value?.access_token}`);

onMounted(() => {
  eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data.message.status){
        if(data.message.payment_status === "Sudah Bayar"){
          eventSource.close()
          toast.success("Pebayaran berhasil", {
            position: 'top'
          })
          router.replace('/tagihan')
        }
      }
  };
})


</script>

<template>
  <div class="flex flex-col h-full">
    <iframe :src="query?.url" style="height: 100vh;" width="100%" frameborder="0"></iframe>
  </div>
</template>
