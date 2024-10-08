<script setup lang="ts">
import LayoutItem from '@/components/LayoutItem.vue'
</script>

<template>
  <div class="h-screen">
    <LayoutItem />
    <div class="pl-16">
      <RouterView />
    </div>
  </div>
</template>
