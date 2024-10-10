<script setup lang="ts">
import { UserService } from '@/client/api'
import type { RepoInfo } from '@/client/api/models'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { onMounted, ref } from 'vue'

type visibilityType = 'public' | 'private' | 'all'

const repos = ref<RepoInfo[]>([])

const emit = defineEmits(['repoCount'])

const props = defineProps<{
  visibility: visibilityType
}>()

const getRepos = async (visibility: visibilityType) => {
  const token = localStorage.getItem('accessToken') ?? ''
  const { data } = await UserService.getUserRepos(token, visibility)
  if (data.value) {
    repos.value = data.value
    emit('repoCount', repos.value.length)
  }
}

onMounted(() => getRepos(props.visibility))

const timeAgo = (time: string) => {
  const now = Date.now()
  const past = new Date(time).getTime()
  const diffInMs = now - past // 时间差以毫秒为单位
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)) // 分钟
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)) // 小时
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) // 天

  if (diffInDays > 0) {
    return `${diffInDays} 天前`
  } else if (diffInHours > 0) {
    return `${diffInHours} 小时前`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} 分钟前`
  } else {
    return `刚刚`
  }
}

const starRepo = async (owner: string, repo: string) => {
  const token = localStorage.getItem('accessToken') ?? ''
  const { response } = await UserService.starRepo(token, owner, repo)
  if (response.value && response.value.status === 204) {
    await getRepos(props.visibility)
  }
}

const deleteRepo = async (owner: string, repo: string) => {
  const token = localStorage.getItem('accessToken') ?? ''
  const { response } = await UserService.deleteRepo(token, owner, repo)
  if (response.value && response.value.status === 204) {
    alert('删除成功')
    await getRepos(props.visibility)
  }
}
</script>

<template>
  <div class="flex p-4 overflow-hidden">
    <div class="overflow-auto w-full flex">
      <table class="table table-pin-rows">
        <thead>
          <tr>
            <th>仓库名称</th>
            <th>所属人</th>
            <th>问题请求</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repo in repos" :key="repo.id">
            <td class="flex items-center gap-2">
              <div class="bg-base-300 size-8 rounded text-center flex items-center justify-center">
                {{ repo.name[0].toLocaleUpperCase() }}
              </div>
              <div>
                <div class="text-sm">{{ repo.name }}</div>
                <span class="text-xs text-base-content/50">{{ repo.description }}</span>
              </div>
            </td>
            <td>{{ repo.assigner.name }}</td>
            <td>{{ repo.open_issues_count }}</td>
            <td>{{ timeAgo(repo.updated_at) }}</td>
            <td class="flex items-center gap-2">
              <button
                class="btn btn-square btn-ghost btn-xs"
                @click="starRepo(repo.assigner.name, repo.name)"
              >
                <Icon
                  icon="material-symbols:star"
                  class="size-4"
                  :class="{ 'text-primary': repo.stared }"
                />
              </button>

              <button
                class="btn btn-square btn-ghost btn-xs"
                @click="deleteRepo(repo.assigner.name, repo.name)"
              >
                <Icon icon="mdi:rubbish-bin-outline" class="size-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped>
.table :where(th, td) {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
