import { useFetch } from '@vueuse/core'
import type { GetUserInfoResponse, RepoInfo, LoginResponse } from './models'

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

export class UserService {
  public static async getUserInfo(accessToken: string) {
    const { data, error } = await useFetch(
      `https://gitee.com/api/v5/user?access_token=${accessToken}`
    )
      .get()
      .json<GetUserInfoResponse>()

    if (error.value) {
      return error.value
    }

    return data.value
  }

  public static async getUserRepos(
    accessToken: string,
    visibility?: 'public' | 'private' | 'all',
    affiliation?: string,
    type?: string,
    sort?: 'full_name' | 'created' | 'updated' | 'pushed',
    q?: string,
    page: number = 1,
    per_page: number = 20
  ) {
    let url = 'https://gitee.com/api/v5/user/repos'
    url += `?access_token=${accessToken}&page=${page}&per_page=${per_page}`
    if (visibility) url += `&visibility=${visibility}`
    if (affiliation) url += `&affiliation=${affiliation}`
    if (type && !visibility) url += `&type=${type}`
    if (sort) url += `&sort=${sort}`
    if (q) url += `&q=${q}`

    const { data, error } = await useFetch(url).get().json<RepoInfo[]>()

    if (error.value) {
      return error.value
    }

    return data.value
  }
}
