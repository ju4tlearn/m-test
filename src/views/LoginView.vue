<script setup lang="ts">
import { AuthService } from '@/client/api'
import router from '@/router'
import { ref } from 'vue'

const imgs = ['./login/1.png', './login/2.png', './login/3.png']
const showImg = Math.floor(Math.random() * 3) + 1

const account = ref()
const password = ref()
const clientID = '618c693f772f306e0b303d1c8d5cc2f6350f73db98f1700bcfd3fc80163e0aa0'
const clientSecret = '4ccdaa886bcd0faf0a2310b8de12ca416ed1edb5ded46449be2c0ece9de7d1ed'
const acceptTerm = ref(false)

const login = async () => {
  const scope = 'user_info projects'
  await AuthService.login(account.value, password.value, clientID, clientSecret, scope).then(
    (resp) => {
      const data = resp!
      alert('登陆成功')
      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('tokenType', data.token_type)
      localStorage.setItem('expiresIn', data.expires_in.toString())
      localStorage.setItem('scope', data.scope)
      localStorage.setItem('isLogin', '1')
      router.push('/')
    }
  )
}
</script>

<template>
  <div class="h-screen flex">
    <div class="w-1/2">
      <img :src="imgs[showImg]" class="h-full w-full object-cover" />
    </div>
    <div class="w-1/2 flex flex-col gap-20 items-center justify-center">
      <h1 class="text-4xl">登陆，即刻创造您的应用</h1>

      <form class="flex flex-col gap-20 w-96" @submit.prevent="login">
        <div class="flex flex-col gap-4">
          <input
            v-model="account"
            required
            type="text"
            placeholder="账号"
            class="input input-bordered"
          />

          <input
            v-model="password"
            required
            type="password"
            placeholder="密码"
            class="input input-bordered"
          />

          <label class="cursor-pointer label p-0 justify-start gap-2">
            <input
              required
              type="checkbox"
              class="checkbox checkbox-xs"
              @click="acceptTerm = !acceptTerm"
            />
            <span class="label-text">我已阅读并同意 服务协议 和 隐私政策</span>
          </label>
        </div>

        <div class="form-control w-96 flex flex-col gap-4 items-center">
          <button class="btn w-96">登陆</button>
          <div class="text-base-content/50">还未注册？立即注册</div>
        </div>
      </form>
    </div>
  </div>
</template>
