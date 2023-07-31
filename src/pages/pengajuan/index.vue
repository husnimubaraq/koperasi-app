<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const { user } = useAuthStore()

</script>

<template>
  <web-navigation />
  <pengajuan-table v-if="user?.role === 'admin'" />
  <pengajuan-wrapper v-else />
</template>