import axios, { AxiosRequestConfig } from 'axios'
import { DafaultRequestMethod, ResponseData } from './types'
import { configManager } from '../config'

/**
 * 获取完整的 baseURL
 * 根据配置管理器中的服务器配置动态生成
 */
function getBaseURL(): string {
  const { host, port, https } = configManager.getServer()
  const protocol = https ? 'https' : 'http'
  return `${protocol}://${host}:${port}/api`
}

// 创建 axios 实例
export const instance = axios.create({
  timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 动态设置 baseURL（支持运行时切换服务器）
    config.baseURL = getBaseURL()

    // 携带 token
    const user = configManager.getUser()
    if (user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Token 过期错误
 */
export class TokenExpiredError extends Error {
  constructor(message: string = 'token已过期，请使用 reogame auth login 命令重新登录') {
    super(message)
    this.name = 'TokenExpiredError'
  }
}

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // '401' token 过期
    if (response.data.code == 401) {
      configManager.setUser({ token: '' })
      throw new TokenExpiredError()
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 通用请求方法
export const req = async <T>(
  method: DafaultRequestMethod,
  url: string,
  data?: unknown,
  config: AxiosRequestConfig = {},
): Promise<ResponseData<T>> => {
  config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
    method,
  }

  data =
    config.headers!['Content-Type'] === 'application/json' && method !== 'GET'
      ? JSON.stringify(data)
      : data

  if (method === 'GET' || method === 'DELETE') {
    config.params = data
  } else {
    config.data = data
  }

  return (await instance(url, config)).data
}
