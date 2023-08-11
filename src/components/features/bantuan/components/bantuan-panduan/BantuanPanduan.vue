<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { pdfFile } from '../../data'

const { pdf, pages } = usePDF({
    url: pdfFile
})

const page = ref(1)

</script>

<template>
    <div class="mt-5 flex flex-col items-center bg-[#EFEDED] pb-5">
        <div class="flex items-center gap-x-3 py-5">
            <button @click="page = page > 1 ? page - 1 : page" class="hover:text-[#29A073]">
                Prev
            </button>
            <span>{{ page }} / {{ pages }}</span>
            <button @click="page = page < pages ? page + 1 : page" class="hover:text-[#29A073]">
                Next
            </button>
        </div>
        <VuePDF :pdf="pdf" :page="page" />
    </div>
</template>
