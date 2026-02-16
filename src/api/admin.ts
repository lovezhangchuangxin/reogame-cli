import {
  Building,
  Camp,
  Defense,
  Ideology,
  MultiAccountGroup,
  MultiAccountPage,
  MultiAccountQuery,
  PlanetOverview,
  Politics,
  ProductDataPage,
  ProductQuery,
  Race,
  Resource,
  Role,
  Ship,
  Technology,
  UniverseConfigType,
  User,
  UserDataPage,
  UserQuery,
} from '../game'
import { req } from './req'

export class AdminApi {
  private static buildLogFilterParams(filters?: {
    level?: string
    module?: string
    traceId?: string
    userId?: string
    startTime?: string
    endTime?: string
  }) {
    return {
      level: filters?.level || undefined,
      module: filters?.module || undefined,
      traceId: filters?.traceId || undefined,
      userId: filters?.userId || undefined,
      startTime: filters?.startTime || undefined,
      endTime: filters?.endTime || undefined,
    }
  }

  /**
   * 获取日志文件列表
   */
  static async getLogFiles() {
    return req<
      {
        name: string
        size: number
        mtimeMs: number
      }[]
    >('GET', '/admin/log/files')
  }

  /**
   * 分页读取日志内容
   */
  static async getLogContent(
    file: string,
    cursor = 0,
    limit = 200,
    filters?: {
      level?: string
      module?: string
      traceId?: string
      userId?: string
      startTime?: string
      endTime?: string
    },
  ) {
    return req<{
      file: string
      lines: string[]
      nextCursor: number
      eof: boolean
      size: number
    }>('GET', '/admin/log/content', {
      file,
      cursor,
      limit,
      ...this.buildLogFilterParams(filters),
    })
  }

  /**
   * 获取日志流式地址
   */
  static getLogStreamUrl(
    file: string,
    options?: {
      cursor?: number
      tailLines?: number
      followLatest?: boolean
      level?: string
      module?: string
      traceId?: string
      userId?: string
      startTime?: string
      endTime?: string
    },
  ) {
    const params = new URLSearchParams()
    params.set('file', file)
    params.set('tailLines', String(options?.tailLines ?? 200))
    params.set('followLatest', options?.followLatest === false ? '0' : '1')
    if (options?.cursor !== undefined) {
      params.set('cursor', String(options.cursor))
    }
    if (options?.level) {
      params.set('level', options.level)
    }
    if (options?.module) {
      params.set('module', options.module)
    }
    if (options?.traceId) {
      params.set('traceId', options.traceId)
    }
    if (options?.userId) {
      params.set('userId', options.userId)
    }
    if (options?.startTime) {
      params.set('startTime', options.startTime)
    }
    if (options?.endTime) {
      params.set('endTime', options.endTime)
    }
    return `/api/admin/log/stream?${params.toString()}`
  }

  static getLogDownloadUrl(
    file: string,
    filters?: {
      level?: string
      module?: string
      traceId?: string
      userId?: string
      startTime?: string
      endTime?: string
    },
  ) {
    const params = new URLSearchParams()
    params.set('file', file)
    if (filters?.level) {
      params.set('level', filters.level)
    }
    if (filters?.module) {
      params.set('module', filters.module)
    }
    if (filters?.traceId) {
      params.set('traceId', filters.traceId)
    }
    if (filters?.userId) {
      params.set('userId', filters.userId)
    }
    if (filters?.startTime) {
      params.set('startTime', filters.startTime)
    }
    if (filters?.endTime) {
      params.set('endTime', filters.endTime)
    }
    return `/api/admin/log/download?${params.toString()}`
  }

  /**
   * 根据条件分页获取玩家数据
   */
  static async getUserListByPage(query: UserQuery, page: number, pageSize: number) {
    return req<UserDataPage>('POST', '/admin/getUserListByPage', {
      query,
      page,
      pageSize,
    })
  }

  /**
   * 修改玩家数据
   */
  static async changeUser(user: Partial<User>) {
    return req<User>('POST', '/admin/changeUser', { user })
  }

  /**
   * 权限修改
   */
  static async changeRole(universe: number, id: number, role: Role) {
    return req<{
      universe: number
      id: number
      role: Role
    }>('POST', '/admin/changeRole', { universe, id, role })
  }

  /**
   * 检查数据库
   */
  static async checkLeveldb() {
    return req('GET', '/admin/checkLeveldb')
  }

  /**
   * 修改宇宙参数
   */
  static async changeUniverseConfig(universe: number, config: UniverseConfigType) {
    return req<UniverseConfigType>('POST', '/admin/changeUniverseConfig', {
      universe,
      config,
    })
  }

  /**
   * 执行代码
   */
  static async runCode(code: string) {
    return req('POST', '/admin/runCode', { code })
  }

  /**
   * 清空ACS
   */
  static async clearACS() {
    return req('POST', '/admin/clearACS')
  }
  /**
   * 清空聊天室记录
   */
  static async clearChatMessage() {
    return req('POST', '/admin/clearChatMessage')
  }
  /**
   * 矿主开关
   */
  static async MineralHostSwitch() {
    return req<{ status: boolean }>('POST', '/admin/MineralHostSwitch')
  }
  /**
   * 获取矿主开关状态
   */
  static async getMineralHostStatus() {
    return req<{ status: boolean }>('GET', '/admin/getMineralHostStatus')
  }
  /**
   * 分页查询商品列表
   */
  static async getProductListByPage(query: ProductQuery, page: number, pageSize: number) {
    return req<ProductDataPage>('POST', '/admin/getProductListByPage', {
      query,
      page,
      pageSize,
    })
  }

  /**
   * 获取有多人使用的玩家 ip 列表
   */
  static async getMultiUserIps() {
    return req<
      {
        ip: string
        num: number
      }[]
    >('POST', '/admin/getMultiUserIps')
  }

  /**
   * 修改封禁时间
   */
  static async changeBannedTime(universe: number, id: number, bannedTime: number) {
    return req('POST', '/admin/changeBannedTime', { universe, id, bannedTime })
  }

  /**
   * 获取玩家列表，id/sername/universe
   */
  static async getUserList() {
    return req<
      {
        universe: number
        id: number
        username: string
      }[]
    >('POST', '/admin/getUserList')
  }

  /**
   * 获取在线用户ID列表
   */
  static async getOnlineUsers() {
    return req<number[]>('POST', '/admin/getOnlineUsers')
  }

  /**
   * 获取玩家信息
   */
  static async checkUserConfig(universe: number, id: number) {
    return req<{
      DarkMatter: number
      AntiMatter: number
      StarDust: number
      Container: number
    }>('POST', '/admin/checkUserConfig', { universe, id })
  }

  /**
   * 修改玩家参数
   */
  static async changeUserConfig(
    universe: number,
    id: number,
    config: {
      DarkMatter: number
      AntiMatter: number
      StarDust: number
      Container: number
    },
  ) {
    return req<{
      universe: number
      id: number
      config: {
        DarkMatter: number
        AntiMatter: number
        StarDust: number
        Container: number
      }
    }>('POST', '/admin/changeUserConfig', { universe, id, config })
  }

  /**
   * 修改公告
   */
  static async changeAnnouncement(universeId: number, announcement: string) {
    return req('POST', '/admin/changeAnnouncement', {
      universeId,
      announcement,
    })
  }

  /**
   * 删除用户
   */
  static async deleteUser(universe: number, id: number) {
    return req('POST', '/admin/deleteUser', { universe, id })
  }

  /**
   * 宇宙归零
   */
  static async resetUniverse(universe: number) {
    return req('POST', '/admin/resetUniverse', { universe })
  }

  /**
   * 重置AMM交易池
   */
  static async resetAMMPool() {
    return req('POST', '/admin/resetAMMPool')
  }

  /**
   * 获取用户星球列表
   */
  static async getUserPlanets(universe: number, id: number) {
    return req<PlanetOverview[]>('POST', '/admin/getUserPlanets', {
      universe,
      id,
    })
  }

  /**
   * 修改星球资源
   */
  static async changePlanetResource(
    universe: number,
    planetId: number,
    resources: Partial<Record<Resource, number>>,
  ) {
    return req('POST', '/admin/changePlanetResource', {
      universe,
      planetId,
      resources,
    })
  }

  /**
   * 修改星球建筑
   */
  static async changePlanetBuilding(
    universe: number,
    planetId: number,
    buildings: Partial<Record<Building, number>>,
  ) {
    return req('POST', '/admin/changePlanetBuilding', {
      universe,
      planetId,
      buildings,
    })
  }

  /**
   * 修改星球舰船
   */
  static async changePlanetShip(
    universe: number,
    planetId: number,
    ships: Partial<Record<Ship, number>>,
  ) {
    return req('POST', '/admin/changePlanetShip', {
      universe,
      planetId,
      ships,
    })
  }

  /**
   * 修改星球防御设施
   */
  static async changePlanetDefense(
    universe: number,
    planetId: number,
    defenses: Partial<Record<Defense, number>>,
  ) {
    return req('POST', '/admin/changePlanetDefense', {
      universe,
      planetId,
      defenses,
    })
  }

  /**
   * 修改用户科技
   */
  static async changeUserTechnology(
    universe: number,
    userId: number,
    technologies: Partial<Record<Technology, number>>,
  ) {
    return req('POST', '/admin/changeUserTechnology', {
      universe,
      userId,
      technologies,
    })
  }

  /**
   * 修改用户种族
   */
  static async changeUserRace(
    universe: number,
    userId: number,
    races: Partial<Record<Race, number>>,
  ) {
    return req('POST', '/admin/changeUserRace', {
      universe,
      userId,
      races,
    })
  }

  /**
   * 修改用户政体
   */
  static async changeUserPolitics(
    universe: number,
    userId: number,
    politicses: Partial<Record<Politics, number>>,
  ) {
    return req('POST', '/admin/changeUserPolitics', {
      universe,
      userId,
      politicses,
    })
  }

  /**
   * 修改用户阵营
   */
  static async changeUserCamp(
    universe: number,
    userId: number,
    camps: Partial<Record<Camp, number>>,
  ) {
    return req('POST', '/admin/changeUserCamp', {
      universe,
      userId,
      camps,
    })
  }

  /**
   * 修改用户意识形态
   */
  static async changeUserIdeology(
    universe: number,
    userId: number,
    ideologies: Partial<Record<Ideology, number>>,
  ) {
    return req('POST', '/admin/changeUserIdeology', {
      universe,
      userId,
      ideologies,
    })
  }

  /**
   * 获取多账户检测组列表
   */
  static async getMultiAccountGroups(query: MultiAccountQuery) {
    return req<MultiAccountPage>('GET', '/multiAccount/groups', query)
  }

  /**
   * 刷新多账户检测
   */
  static async refreshMultiAccountDetection() {
    return req<{
      success: boolean
      count: number
      groups: MultiAccountGroup[]
    }>('POST', '/multiAccount/refresh')
  }

  /**
   * 获取多账户统计信息
   */
  static async getMultiAccountStatistics() {
    return req<{
      total: number
      normal: number
      low: number
      medium: number
      high: number
    }>('GET', '/multiAccount/statistics')
  }
}
