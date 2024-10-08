import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalStore', () => {
  const isShowMenu = ref(false)

  const toggleMenu = () => {
    isShowMenu.value = !isShowMenu.value
  }

  return {
    isShowMenu,
    toggleMenu
  }
})
