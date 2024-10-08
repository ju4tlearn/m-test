<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface MenuItem {
  icon: string
  desc: string
  path: string
}

const menuItems: MenuItem[] = [
  {
    icon: 'icon-park-outline:workbench',
    desc: '工作台',
    path: '/'
  },
  {
    icon: 'iconoir:code',
    desc: '代码',
    path: '/repos'
  }
]

const nowPath = computed(() => route.path.split('/')[1])
</script>

<template>
  <div class="h-screen fixed w-16 p-2 bg-base-200 border-r flex flex-col justify-between">
    <div class="flex items-center flex-col gap-1">
      <RouterLink
        v-for="i in menuItems"
        :key="i.desc"
        class="flex flex-col items-center hover:bg-primary/10 hover:text-primary transition-colors w-full rounded-md p-1"
        :class="{ 'bg-primary/10 text-primary': i.path.replace('/', '') === nowPath }"
        :to="i.path"
      >
        <Icon :icon="i.icon" class="size-6" />

        <span class="text-xs">{{ i.desc }}</span>
      </RouterLink>
    </div>

    <div class="flex items-center flex-col gap-1">
      <div
        class="flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors w-full py-2 rounded-md"
      >
        <Icon icon="proicons:person" class="size-6" />
      </div>
    </div>
  </div>
</template>
