<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AccountMenuItem from './AccountMenuItem.vue'

const route = useRoute()
const store = useGlobalStore()

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
  <AccountMenuItem />

  <div class="h-screen fixed z-20 w-16 p-2 bg-base-200 border-r flex flex-col justify-between">
    <div class="flex items-center flex-col gap-1">
      <RouterLink
        v-for="i in menuItems"
        role="button"
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
        role="button"
        class="flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors w-full py-2 rounded-md"
        :class="{ 'bg-primary/10 text-primary': store.isShowMenu }"
        @click="store.toggleMenu()"
      >
        <Icon icon="proicons:person" class="size-6" />
      </div>
    </div>
  </div>
</template>
