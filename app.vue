<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

onMounted(() => {
  auth.initAuth();
});
</script>