<script setup lang="ts">

interface TProps {
  label?: string
  modelValue?: string
  id: string
  type?: string
  placeholder: string
  containerClassName?: string
  errors?: any
  disabled?: boolean
}

const props = defineProps<TProps>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value)
}


</script>

<template>
  <div class="inline-block w-[100%]" :class="props.containerClassName">
    <label class="text-sm">{{ props.label }}</label>
    <div
      class="mt-2"
      :class="props.disabled ? 'disabled:bg-red' : ''"
    >
        <input 
            :type="props.type" 
            :id="props.id" 
            :placeholder="props.placeholder" 
            :value="props.modelValue"
            @input="updateValue"
            class="border border-black outline-none w-full disabled:bg-gray-300 px-3 py-2 rounded-md"
            :disabled="props.disabled"
        />
    </div>
    <slot/>
  </div>
</template>
