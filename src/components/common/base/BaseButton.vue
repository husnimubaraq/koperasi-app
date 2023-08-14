<script setup lang="ts">
const props = defineProps<{
  href?: string;
  to?: string;
  target?: string;
  variant?: "primary" | "fill" | "warning" | "green";
}>();

const cssClasses = [
  "hover:text-[#c8ee44]",
  "py-3",
  "rounded-md",
  "capitalize",
  "flex",
  "items-center",
  "justify-center",
  "gap-x-2",
  "transition",
  "duration-500",
  "w-full",
];

switch (props.variant) {
  case "primary":
    cssClasses.push(
      "bg-[#c8ee44]",
      "text-black hover:text-black",
      "hover:bg-[#d7eb8f]",
      "p-2"
    );
    break;
  case "warning":
    cssClasses.push(
      "bg-[#FF8800]",
      "text-white hover:text-black",
      "hover:bg-[#ffbb33]"
    );
    break;
  case "fill":
    cssClasses.push(
      "bg-[#c8ee44]",
      "text-white hover:text-black",
      "hover:[#d7eb8f]",
      "p-2"
    );
    break;
  case "green":
    cssClasses.push(
      "bg-[#0369a1]",
      "text-white hover:text-black",
      "hover:[#1e40af]",
      "p-2"
    );
    break;
  default:
    break;
}
</script>

<template>
  <div class="text-sm">
    <a
      v-if="props.href"
      :href="props.href"
      :class="cssClasses"
      :target="target"
    >
      <slot />
    </a>
    <router-link v-else-if="props.to" :to="props.to" :class="cssClasses">
      <slot />
    </router-link>
    <button v-else :class="cssClasses">
      <slot />
    </button>
  </div>
</template>
