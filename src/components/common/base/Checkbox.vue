<script setup lang="ts">

const props = defineProps<{
  label?: string
  id: string
  containerClassName?: string
}>()

</script>

<template>
  <div class="inline-block" :class="props.containerClassName">
    <input 
        type="checkbox"
        :id="props.id" 
    />
    <label :for="props.id" class="ml-2 text-sm">Ingat dalam 30 hari</label>
  </div>
</template>
