<script setup lang="ts">
import { UserService } from '@/client/api'
import router from '@/router'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed, ref } from 'vue'

const PROJECT_NAME_LIMIT = 100

const giteeProject = ['ignore']

const assignProject = ref<string>()
const projectName = ref<string>('')
const projectDesc = ref<string>()
const addREADME = ref(false)
const addGitignore = ref(false)
const isPublic = ref(false)

const clear = () => {
  assignProject.value = ''
  projectName.value = ''
  projectDesc.value = ''
  addREADME.value = false
  addGitignore.value = false
  isPublic.value = false
}

const isProjNameFullOfLimit = computed(() => projectName.value.length > 100)

const create = async () => {
  if (!projectName.value || !projectDesc.value || projectName.value.length > 100) {
    return
  }
  const token = localStorage.getItem('accessToken') ?? ''
  const gitTemp = addGitignore.value ? 'macOS' : undefined
  const { data, error, response } = await UserService.createRepo(
    token,
    projectName.value,
    projectDesc.value,
    addREADME.value,
    isPublic.value,
    gitTemp
  )
  if (error.value && response.value && response.value.status === 422) {
    alert('项目已存在, 创建失败')
    clear()
  }

  if (data.value && response.value && response.value.status === 201) {
    router.push('/repos')
    clear()
  }
}
</script>

<template>
  <div class="p-8 flex flex-col gap-6">
    <div class="flex items-center gap-4">
      <button
        class="btn btn-sm btn-circle border-none bg-base-100 shadow-xl"
        @click="router.push('/repos')"
      >
        <Icon icon="solar:arrow-left-linear" class="size-6 text-primary" />
      </button>

      <h2 class="text-xl">创建代码仓库</h2>
    </div>

    <form class="flex flex-col gap-4" @submit.prevent="create">
      <label class="w-full max-w-xs">
        <div class="text-sm font-semibold mb-2">
          所属项目
          <span class="text-error">*</span>
        </div>
        <select required class="select select-bordered select-sm rounded w-full max-w-xs">
          <option disabled selected>请选择</option>
          <option v-for="proj in giteeProject" :key="proj" @click="assignProject = proj">
            {{ proj }}
          </option>
        </select>
      </label>

      <div class="join max-w-xl">
        <label class="shrink-0">
          <div class="text-sm font-semibold mb-2">
            仓库类型
            <span class="text-error">*</span>
          </div>
          <div class="h-12 border border-base-300 flex items-center gap-2 px-4">
            <Icon icon="devicon:git" class="size-5" />
            GIT 仓库
          </div>
        </label>
        <label class="w-full">
          <div class="text-sm font-semibold mb-2">
            仓库名称
            <span class="text-error">*</span>
          </div>
          <div class="h-12 w-full rounded-none border border-base-300 flex items-center">
            <input
              required
              v-model="projectName"
              type="text"
              placeholder="仓库名称只支持字母、数字、下划线(_)、中划线(-)和点(.)的结合"
              class="input input-sm w-full border-none rounded-none focus:outline-none text-sm"
            />

            <div
              class="shrink-0 pr-2 text-sm text-base-content/50"
              :class="{ 'text-error': isProjNameFullOfLimit }"
            >
              {{ projectName?.length }} / {{ PROJECT_NAME_LIMIT }}
            </div>
          </div>
        </label>
      </div>

      <label class="w-full max-w-xl">
        <div class="text-sm font-semibold mb-2">
          仓库描述
          <span class="text-error">*</span>
        </div>
        <textarea
          required
          v-model="projectDesc"
          class="textarea textarea-bordered rounded-none w-full"
          placeholder="Bio"
        ></textarea>
      </label>

      <div class="flex flex-col gap-4">
        <div class="text-sm font-semibold">初始化仓库</div>
        <div class="flex flex-col gap-4">
          <label class="label cursor-pointer justify-start gap-2 p-0">
            <input
              type="checkbox"
              class="checkbox checkbox-xs rounded"
              @click="addREADME = !addREADME"
            />
            <span class="label-text">生成 README 文件</span>
          </label>
          <label class="label cursor-pointer justify-start gap-2 p-0">
            <input
              type="checkbox"
              class="checkbox checkbox-xs rounded"
              @click="addGitignore = !addGitignore"
            />
            <span class="label-text">添加 .gitignore 文件</span>
          </label>
          <label class="label cursor-pointer justify-start gap-2 p-0">
            <input type="checkbox" class="checkbox checkbox-xs rounded" disabled />
            <span class="label-text">添加分支模型（仓库创建后将根据所选模型创建分支）</span>
          </label>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="text-sm font-semibold">是否开源</div>
        <label class="label cursor-pointer justify-start gap-2 p-0">
          <input
            type="radio"
            name="is-public"
            class="radio radio-xs checked:bg-primary"
            :checked="!isPublic"
            @click="isPublic = false"
          />
          <span class="label-text">私有仓库（仅对仓库成员可见，仓库成员可访问仓库。）</span>
        </label>
        <label class="label cursor-pointer justify-start gap-2 p-0">
          <input
            type="radio"
            name="is-public"
            class="radio radio-xs checked:bg-primary"
            @click="isPublic = true"
          />
          <span class="label-text">公开仓库</span>
        </label>
      </div>

      <div class="flex items-center gap-2">
        <button class="btn btn-sm btn-neutral rounded">完成创建</button>
        <button
          type="button"
          class="btn btn-sm btn-outline rounded border-base-300"
          @click="clear(), router.push('/repos')"
        >
          取消
        </button>
      </div>
    </form>
  </div>
</template>
