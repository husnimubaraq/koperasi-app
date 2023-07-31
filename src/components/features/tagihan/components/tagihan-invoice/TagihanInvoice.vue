<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePembayaranStore } from '../../stores/pembayaran';
import { TPembayaran } from '../../types/pembayaran.interface';

const { query } = useRoute()

const pembayaranStore = usePembayaranStore()

function receiveMessage (event) {
    console.log(event.data)
}

onMounted(() => {
  window.addEventListener('message', receiveMessage)
}) 
onBeforeUnmount(() => {
  {
  window.removeEventListener('message', receiveMessage)
  }
})


</script>

<template>
  <div class="flex flex-col h-full">
    <iframe :src="query?.url" style="height: 100vh;" width="100%" frameborder="0"></iframe>
  </div>
</template>
