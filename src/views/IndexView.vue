<script setup lang="ts">
import LayoutItem from '@/components/LayoutItem.vue'
</script>

<template>
  <div class="h-screen relative">
    <LayoutItem />
    <div class="h-full pl-16">
      <RouterView />
    </div>
  </div>
</template>
