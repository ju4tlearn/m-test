<script setup lang="ts">
import ProjectViewTable from '@/components/ProjectViewTable.vue'
import { ref } from 'vue'

const repoCount = ref(0)

const getRepoCount = (v: number) => {
  repoCount.value = v
}
</script>

<template>
  <div v-if="!repoCount" class="w-full flex justify-center">
    <div class="flex flex-col gap-4 items-center p-6">
      <img src="/repos/4.png" class="size-36" />
      <span class="text-base-content/50">暂无数据</span>
    </div>
  </div>
  <ProjectViewTable
    visibility="public"
    v-on:repo-count="getRepoCount"
    :class="{ hidden: !repoCount }"
  />
</template>
