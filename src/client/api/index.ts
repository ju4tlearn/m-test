import { useFetch } from '@vueuse/core'
import type { LoginResponse } from './models'

export class AuthService {
  public static async login(
    account: string,
    password: string,
    client_id: string,
    client_secret: string,
    scope: string
  ) {
    const { data, error } = await useFetch('https://gitee.com/oauth/token')
      .post({
        grant_type: 'password',
        username: account,
        password: password,
        client_id: client_id,
        client_secret: client_secret,
        scope: scope
      })
      .json<LoginResponse>()

    if (error.value) {
      return error.value
    }

    return data.value
  }
}
