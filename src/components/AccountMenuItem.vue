<script setup lang="ts">
// import { UserService } from '@/client/api'
import router from '@/router'
import { useGlobalStore } from '@/stores/globalStore'
import { Icon } from '@iconify/vue/dist/iconify.js'

const store = useGlobalStore()

// const getUserInfo = async () => {
//   const token = localStorage.getItem('accessToken') ?? ''
//   await UserService.getUserInfo(token).then((resp) => {})
// }

interface MenuItem {
  icon: string
  desc: string
  action?: () => any
}

const menuItems: MenuItem[] = [
  {
    icon: 'proicons:person',
    desc: '个人账户设置'
  },
  {
    icon: 'ep:shopping-cart',
    desc: '服务订购'
  },
  {
    icon: 'ion:person-add-outline',
    desc: '邀请成员'
  },
  {
    icon: 'solar:global-linear',
    desc: '切换语言'
  },
  {
    icon: 'lsicon:order-outline',
    desc: '工单中心'
  },
  {
    icon: 'fluent-mdl2:date-time',
    desc: '更新日志'
  },
  {
    icon: 'ic:outline-logout',
    desc: '退出',
    action() {
      localStorage.clear()
      store.toggleMenu()
      router.push('/')
    }
  }
]
</script>

<template>
  <div
    class="absolute top-0 left-16 z-10 w-80 h-screen bg-base-100 border-r p-4 -translate-x-96 transition flex flex-col gap-8"
    :class="{ '!translate-x-0': store.isShowMenu }"
  >
    <h3 class="text-xl">username</h3>

    <ul class="menu w-full p-0 gap-2">
      <li v-for="menu in menuItems" :key="menu.desc" @click="menu.action">
        <a class="flex items-center gap-2 text-base-content/75">
          <Icon :icon="menu.icon" class="size-5" />
          <span class="text-md">{{ menu.desc }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>
