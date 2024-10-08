<script setup lang="ts">
import { UserService } from '@/client/api'
import type { RepoInfo } from '@/client/api/models'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ref } from 'vue'

const repos = ref<RepoInfo[]>([])

const getRepos = async () => {
  const token = localStorage.getItem('accessToken') ?? ''
  await UserService.getUserRepos(token, 'all').then((resp) => {
    repos.value = resp
  })
}

getRepos()
</script>

<template>
  <div v-if="!repos.length" class="w-full h-full flex justify-center">
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

      <button class="btn btn-neutral">创建代码仓库</button>
    </div>
  </div>
  <div v-else class="flex p-4">
    <div class="overview-x-auto w-full">
      <table class="table">
        <thead>
          <tr>
            <th>仓库名称</th>
            <th>所属项目</th>
            <th>合并请求</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repo in repos" :key="repo.id">
            <td>{{ repo.name }}</td>
            <td></td>
            <td></td>
            <td>{{ repo.updated_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
