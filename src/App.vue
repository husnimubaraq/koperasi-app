<template>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in" enter-from-class="opacity-0" enter-active-class="duration-300" enter-to-class="opacity-100" leave-from-class="opacity-100" leave-active-class="duration-300" leave-to-class="opacity-0">
      <component :is="Component" :key="route" />
    </transition>
  </router-view>
</template>
