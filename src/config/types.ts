/**
 * 默认配置
 */
export const DEFAULT_CONFIG: GameConfig = {
  server: {
    host: 'reogame.com',
    port: 443,
    https: true,
  },
  user: {
    username: '',
    password: '',
    token: '',
  },
}

/**
 * 游戏配置
 */
export interface GameConfig {
  /** 连接服务器配置 */
  server: ServerConfig
  /** 用户相关配置 */
  user: UserConfig
}

/**
 * 游戏服务器配置
 */
export interface ServerConfig {
  /** host */
  host: string
  /** 端口 */
  port: number
  /** https */
  https: boolean
}

/**
 * 用户相关配置
 */
export interface UserConfig {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** token */
  token: string
}
