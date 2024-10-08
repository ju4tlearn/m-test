<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ pathMatched?: string }>()
</script>

<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl">404 Not Found</h1>
        <p class="py-6">{{ pathMatched }}</p>
        <RouterLink to="/">
          <button class="btn btn-primary text-base-100">返回主页</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
