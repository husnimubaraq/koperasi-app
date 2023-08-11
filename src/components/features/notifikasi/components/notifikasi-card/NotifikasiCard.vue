<script setup lang="ts">

import { dateFormatter } from '~/utils/dayjs'

const props = defineProps<{
  judul: string
  deskripsi: string
  created_at: string
  is_read: string
  onClick: () => void
}>()

</script>

<template>
    <div class="mb-3">
        <p class="text-sm text-gray-500">{{ props.judul }}</p>

        <div 
            @click="props.onClick"
            :class="[
                props.is_read === '1' ? 'bg-gray-200' : 'bg-[#fff] cursor-pointer hover:border-[#29A073]',
                'flex items-center justify-between border border-black p-3 rounded-md mt-2'
            ]"
        >
            <p class=" capitalize font-medium">{{ props.deskripsi }}</p>
            <p class=" capitalize font-medium">{{  dateFormatter({ dateTime: props.created_at, format: "DD MMMM YYYY HH:mm"}) }}</p>
        </div>
    </div>
</template>