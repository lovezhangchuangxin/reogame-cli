import { homedir } from 'node:os'
import { join } from 'node:path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { GameConfig, DEFAULT_CONFIG } from './types'
import { encrypt, decrypt } from './crypto'

/** 配置文件目录 */
export const CONFIG_DIR = join(homedir(), '.ogame')

/** 配置文件路径 */
export const CONFIG_FILE = join(CONFIG_DIR, 'ogame.json')

/**
 * 配置管理器
 * 负责读取、写入和管理游戏配置
 */
class ConfigManager {
  private config: GameConfig | null = null

  /**
   * 获取配置文件路径
   */
  getConfigPath(): string {
    return CONFIG_FILE
  }

  /**
   * 检查配置文件是否存在
   */
  exists(): boolean {
    return existsSync(CONFIG_FILE)
  }

  /**
   * 加载配置文件
   * 如果文件不存在，返回默认配置
   */
  load(): GameConfig {
    if (this.config) {
      return this.config
    }

    if (!this.exists()) {
      this.config = { ...DEFAULT_CONFIG }
      return this.config
    }

    try {
      const content = readFileSync(CONFIG_FILE, 'utf-8')
      const parsed = JSON.parse(content) as Partial<GameConfig>

      // 合并默认配置和已保存的配置
      this.config = {
        server: { ...DEFAULT_CONFIG['server'], ...parsed['server'] },
        user: { ...DEFAULT_CONFIG['user'], ...parsed['user'] },
      }

      return this.config
    } catch (error) {
      console.error('配置文件解析失败，使用默认配置:', error)
      this.config = { ...DEFAULT_CONFIG }
      return this.config
    }
  }

  /**
   * 保存配置到文件
   */
  save(config?: Partial<GameConfig>): void {
    if (config) {
      this.config = {
        server: { ...this.load()['server'], ...config['server'] },
        user: { ...this.load()['user'], ...config['user'] },
      }
    }

    if (!this.config) {
      throw new Error('没有可保存的配置')
    }

    // 确保配置目录存在
    if (!existsSync(CONFIG_DIR)) {
      mkdirSync(CONFIG_DIR, { recursive: true })
    }

    writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2), 'utf-8')
  }

  /**
   * 获取当前配置
   */
  get(): GameConfig {
    return this.load()
  }

  /**
   * 更新部分配置
   */
  update(partial: Partial<GameConfig>): void {
    const current = this.load()
    this.config = {
      server: { ...current['server'], ...partial['server'] },
      user: { ...current['user'], ...partial['user'] },
    }
    this.save()
  }

  /**
   * 重置为默认配置
   */
  reset(): void {
    this.config = { ...DEFAULT_CONFIG }
    this.save()
  }

  /**
   * 获取服务器配置
   */
  getServer() {
    return this.load().server
  }

  /**
   * 更新服务器配置
   */
  setServer(server: Partial<GameConfig['server']>): void {
    const current = this.load()
    this.config = {
      ...current,
      server: { ...current.server, ...server },
    }
    this.save()
  }

  /**
   * 获取用户配置（密码会自动解密）
   */
  getUser() {
    const user = this.load().user
    // 解密密码
    return {
      ...user,
      password: decrypt(user.password),
    }
  }

  /**
   * 更新用户凭证（密码会自动加密）
   */
  setUser(credentials: Partial<GameConfig['user']>): void {
    const current = this.load()
    // 加密密码
    const encryptedCredentials = {
      ...credentials,
      password: credentials.password ? encrypt(credentials.password) : current.user.password,
    }
    this.config = {
      ...current,
      user: { ...current.user, ...encryptedCredentials },
    }
    this.save()
  }
}

// 导出单例实例
export const configManager = new ConfigManager()

// 导出类型
export * from './types'
