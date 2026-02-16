import {
  BuildTaskTarget,
  ContainerItemType,
  DebrisInfo,
  Planet,
  PlanetBaseData,
  PlanetCallFleetData,
  Resource,
  SystemExtraInfo,
  UniverseAllConfig,
  UniverseQueryData,
  User,
} from '../game'
import { req } from './req'

interface InviteReward {
  id: string
  inviteeId: number
  inviteeName: string
  day: number
  amount: number
  createTime: number
}

interface InviteStats {
  inviteeCount: number
  maxInviteeCount: number
  pendingRewards: number
  pendingAmount: number
  totalClaimed: number
  inviteeStats: Array<{
    inviteeId: number
    signInDays: number
    paidCount: number
    canEarnMore: boolean
  }>
}

export class GameApi {
  /**
   * 获取我的游戏数据
   */
  static async getMyData() {
    return req<User | undefined>('GET', '/game/myData')
  }

  /**
   * 获取宇宙列表
   */
  static async getUniverseList() {
    return req<UniverseQueryData[]>('GET', '/game/universeList')
  }

  /**
   * 获取宇宙配置
   */
  static async getUniverseConfig(universeId?: number) {
    return req<UniverseAllConfig>('GET', '/game/universeConfig', { universeId })
  }

  /**
   * 获取星系的额外信息
   */
  static async getGalaxyExtraInfo(universe: number, galaxy: number, system: number) {
    return req<SystemExtraInfo>('GET', '/game/galaxyExtraInfo', {
      universe,
      galaxy,
      system,
    })
  }

  /**
   * 获取用户的所有星球列表
   */
  static async getPlanetList(universe: number, id: number) {
    return req<PlanetBaseData[]>('GET', '/game/planetList', { universe, id })
  }

  /**
   * 获取用户自己的行星的全部信息
   */
  static async getMyPlanetInfo(planetId: number) {
    return req<Planet>('GET', '/game/myPlanetInfo', { planetId })
  }

  /**
   * 获取用户自己全部的行星的信息
   */
  static async getMyAllPlanetsInfo(universe: number, id: number) {
    return req<PlanetCallFleetData[]>('GET', '/game/getMyAllPlanetsInfo', {
      universe,
      id,
    })
  }
  /**
   * 添加建筑任务
   */
  static async addBuildTask(planetId: number, target: number, added: number) {
    return req<void>('POST', '/game/addBuildTask', {
      planetId,
      target,
      added,
    })
  }

  /**
   * 每日签到
   */
  static async signIn(planetId: number) {
    return req<Partial<Record<Resource, number>>>('POST', '/game/signIn', {
      planetId,
    })
  }

  /**
   * 开宝箱
   */
  static async openContainer(planetId: number, num: number) {
    return req<Partial<Record<ContainerItemType, number>>>('POST', '/game/openContainer', {
      planetId,
      num,
    })
  }

  /**
   * 添加官员
   */
  static async addOfficer(officer: number, add: number) {
    return req('POST', '/game/addOfficer', {
      officer,
      add,
    })
  }

  /**
   * 升级意识形态
   */
  static async addIdeology(ideology: number, add: number) {
    return req('POST', '/game/addIdeology', {
      ideology,
      add,
    })
  }

  /**
   * 激活种族
   */
  static async activatedRace(race: number, add: number) {
    return req('POST', '/game/activatedRace', {
      race,
      add,
    })
  }

  /**
   * 激活政治体制
   */
  static async activatedPolitics(politics: number, add: number) {
    return req('POST', '/game/activatedPolitics', {
      politics,
      add,
    })
  }

  /**
   * 激活阵营
   */
  static async activatedCamp(camp: number, add: number) {
    return req('POST', '/game/activatedCamp', {
      camp,
      add,
    })
  }

  /**
   * 升级矿物研究
   */
  static async addMineralResearch(mineralResearch: number, add: number) {
    return req('POST', '/game/addMineralResearch', {
      mineralResearch,
      add,
    })
  }

  /**
   * 搜索废墟
   */
  static async getDebris(universe: number, galaxy: number, system: number) {
    return req<DebrisInfo[]>('GET', '/game/getDebris', {
      universe,
      galaxy,
      system,
    })
  }

  /**
   * 取消任务
   */
  static async cancelLastTaskQueue(planetId: number, taskType: BuildTaskTarget) {
    return req('POST', '/game/cancelLastTaskQueue', {
      planetId,
      taskType,
    })
  }

  /**
   * 加速建造任务
   */
  static async accelerateBuildTask(planetId: number, element: BuildTaskTarget) {
    return req('POST', '/game/accelerateBuildTask', {
      planetId,
      element,
    })
  }

  /**
   * 获取公告
   */
  static async getAnnouncement(universe: number) {
    return req<string>('POST', '/game/getAnnouncement', { universe })
  }

  /**
   * 获取待领取的邀请奖励列表
   */
  static async getInviteRewards() {
    return req<InviteReward[]>('GET', '/game/inviteRewards')
  }

  /**
   * 领取邀请奖励
   */
  static async claimInviteRewards(rewardIds: string[]) {
    return req<{ claimedCount: number; totalAmount: number }>('POST', '/game/claimInviteRewards', {
      rewardIds,
    })
  }

  /**
   * 获取邀请统计信息
   */
  static async getInviteStats() {
    return req<InviteStats>('GET', '/game/inviteStats')
  }
}
