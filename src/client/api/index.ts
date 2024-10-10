import { useFetch } from '@vueuse/core'
import type { GetUserInfoResponse, RepoInfo, LoginResponse, CreateRepoResponse } from './models'

export class AuthService {
  public static login(
    account: string,
    password: string,
    client_id: string,
    client_secret: string,
    scope: string
  ) {
    return useFetch('https://gitee.com/oauth/token')
      .post({
        grant_type: 'password',
        username: account,
        password: password,
        client_id: client_id,
        client_secret: client_secret,
        scope: scope
      })
      .json<LoginResponse>()
  }
}

export class UserService {
  public static getUserInfo(accessToken: string) {
    return useFetch(`https://gitee.com/api/v5/user?access_token=${accessToken}`)
      .get()
      .json<GetUserInfoResponse>()
  }

  public static getUserRepos(
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

    return useFetch(url).get().json<RepoInfo[]>()
  }

  public static createRepo(
    accessToken: string,
    name: string,
    desc: string,
    autoInit: boolean,
    isPrivate: boolean,
    gitignoreTemplate?: string
  ) {
    return useFetch('https://gitee.com/api/v5/user/repos')
      .post({
        access_token: accessToken,
        name: name,
        description: desc,
        auto_init: autoInit,
        private: isPrivate,
        ...(gitignoreTemplate && { gitignore_template: gitignoreTemplate })
      })
      .json<CreateRepoResponse>()
  }

  public static starRepo(accessToken: string, owner: string, repo: string) {
    return useFetch(`https://gitee.com/api/v5/user/starred/${owner}/${repo}`).put({
      access_token: accessToken
    })
  }

  public static deleteRepo(accessToken: string, owner: string, repo: string) {
    return useFetch(`https://gitee.com/api/v5/repos/${owner}/${repo}`).delete({
      access_token: accessToken
    })
  }
}
