<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

interface TabItem {
  desc: string
  path: string
}

const tabItems: TabItem[] = [
  {
    desc: '最近访问',
    path: '/repos/recent'
  },
  {
    desc: '全部仓库',
    path: '/repos/'
  },
  {
    desc: '开源仓库',
    path: '/repos/openSource'
  }
]

const activeTab = ref<TabItem>(tabItems[1])

const toggleTab = (item: TabItem) => {
  activeTab.value = item
  router.push(item.path)
}
</script>

<template>
  <div class="h-full">
    <div class="px-6 py-4 border-b">
      <span class="font-semibold text-lg">代码仓库</span>
    </div>

    <div class="h-full">
      <div class="flex items-center justify-between px-4">
        <div role="tablist" class="tabs tabs-bordered tabs-lg gap-10">
          <a
            v-for="tab in tabItems"
            :key="tab.desc"
            role="tab"
            class="tab p-0 text-base"
            :class="{ 'tab-active': tab.path === activeTab.path }"
            @click="toggleTab(tab)"
          >
            {{ tab.desc }}
          </a>
        </div>

        <button class="btn btn-sm btn-neutral">创建代码仓库</button>
      </div>
      <div class="h-[1px] w-full bg-base-content/5"></div>

      <RouterView />
    </div>
  </div>
</template>
