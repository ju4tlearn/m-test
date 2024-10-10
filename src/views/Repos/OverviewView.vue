<script setup lang="ts">
import ProjectViewTable from '@/components/ProjectViewTable.vue'
import router from '@/router'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ref } from 'vue'

const repoCount = ref(0)

const getRepoCount = (v: number) => {
  repoCount.value = v
}
</script>

<template>
  <div v-if="!repoCount" class="w-full h-full flex justify-center">
    <div class="flex flex-col items-center justify-center gap-8">
      <div class="flex flex-col justify-center items-center gap-4">
        <h3 class="font-semibold text-2xl">欢迎使用代码仓库</h3>
        <span class="text-base-content/50">
          代码仓库用于托管基于 GIT 或 SVN 管理的代码库。通过 Review 合并请求来审查代码变更。
          版本发布可以用来标记、发布代码版本。
        </span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <div class="flex flex-col items-center gap-2 w-56">
          <img src="/repos/1.svg" class="size-40" />
          <div class="flex flex-col items-center gap-2">
            <h4>创建代码仓库</h4>
            <span class="text-sm text-base-content/50 text-center">
              浏览、编辑代码以及查看代码提交记录
            </span>
          </div>
        </div>

        <Icon icon="ep:right" class="size-6 text-base-content/50" />

        <div class="flex flex-col items-center gap-2 w-56">
          <img src="/repos/2.svg" class="size-40" />
          <div class="flex flex-col items-center gap-2">
            <h4>合并请求</h4>
            <span class="text-sm text-base-content/50 text-center">
              发起合并请求并逐请协作者 Review 变更内容
            </span>
          </div>
        </div>

        <Icon icon="ep:right" class="size-6 text-base-content/50" />

        <div class="flex flex-col items-center gap-2 w-56">
          <img src="/repos/3.svg" class="size-40" />
          <div class="flex flex-col items-center gap-2">
            <h4>代码版本</h4>
            <span class="text-sm text-base-content/50 text-center">发布、标记代码版本</span>
          </div>
        </div>
      </div>

      <button class="btn btn-neutral" @click="router.push('/repos/create')">创建代码仓库</button>
    </div>
  </div>
  <ProjectViewTable
    visibility="all"
    v-on:repo-count="getRepoCount"
    :class="{ hidden: !repoCount }"
  />
</template>
