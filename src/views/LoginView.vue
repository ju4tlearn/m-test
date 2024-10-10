<script setup lang="ts">
import { AuthService } from '@/client/api'
import router from '@/router'
import { ref } from 'vue'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { Autoplay, Pagination } from 'swiper/modules'

const imgs = ['./login/1.png', './login/2.png', './login/3.png']
const showImg = Math.floor(Math.random() * 3) + 1

const account = ref()
const password = ref()
const clientID = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET
const acceptTerm = ref(false)

const login = async () => {
  const scope = 'user_info projects'
  const { data, error, response } = await AuthService.login(
    account.value,
    password.value,
    clientID,
    clientSecret,
    scope
  )

  if (error.value && response.value) {
    alert('登陆失败, code: ' + response.value.status)
    return
  }

  if (data.value) {
    const _data = data.value
    localStorage.setItem('accessToken', _data.access_token)
    localStorage.setItem('tokenType', _data.token_type)
    localStorage.setItem('expiresIn', _data.expires_in.toString())
    localStorage.setItem('scope', _data.scope)
    localStorage.setItem('isLogin', '1')
    router.push('/')
  }
}
</script>

<template>
  <div class="h-screen flex">
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      :pagination="{
        clickable: true
      }"
      :navigation="true"
      :modules="[Autoplay, Pagination]"
      class="mySwiper w-1/2"
    >
      <swiper-slide>
        <img :src="imgs[0]" class="h-full w-full object-cover" />
      </swiper-slide>
      <swiper-slide>
        <img :src="imgs[1]" class="h-full w-full object-cover" />
      </swiper-slide>
      <swiper-slide>
        <img :src="imgs[2]" class="h-full w-full object-cover" />
      </swiper-slide>
    </swiper>
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
              class="checkbox checkbox-xs rounded"
              @click="acceptTerm = !acceptTerm"
            />
            <span class="label-text text-base-content/50">
              我已阅读并同意
              <a class="link-primary">服务协议</a>
              和
              <a class="link-primary">隐私政策</a>
            </span>
          </label>
        </div>

        <div class="form-control w-96 flex flex-col gap-4 items-center">
          <button class="w-96 btn btn-primary text-lg font-normal text-base-100">登 陆</button>
          <div class="text-base-content/50">
            还未注册？
            <a class="link-primary">立即注册</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
