import { BuildingConfig } from './building'
import {
  AllianceDevelop,
  Armory,
  Building,
  Camp,
  Defense,
  Ideology,
  MineralResearch,
  Officer,
  Politics,
  Race,
  Resource,
  Ship,
  Technology,
} from './enum'
import { TechnologyConfig } from './technology'
import {
  AllianceDevelopConfig,
  ArmoryConfig,
  CampConfig,
  DefenseConfig,
  IdeologyConfig,
  MineralResearchConfig,
  OfficerConfig,
  PoliticsConfig,
  RaceConfig,
  ShipConfig,
} from './types'

/**
 * 宇宙尺寸
 */
export interface UniverseSize {
  /** 银河的个数 */
  galaxyCount: number
  /** 每个银河的星系数 */
  systemCount: number
  /** 每个星系的行星数 */
  planetCount: number
}

/**
 * 宇宙配置类型
 */
export interface UniverseConfigType extends UniverseSize {
  /** 宇宙种子 */
  seed: number
  /** 游戏速度 */
  gameSpeed: number
  /** 舰队速度 */
  fleetSpeed: number
  /** 资源保底收入，没有建筑也能增加资源！ */
  baseIncome: Partial<Record<Resource, number>>
  /** 控制宇宙资源的产出速度，以1000为基准*/
  resourceFactor: Partial<Record<Resource, number>>
  /** 建筑任务队列长度 */
  taskQueueLength: number
  /** 最大战斗回合 */
  maxRound: number
  /** 初始可以殖民的星球数 */
  baseColony: number
  /** 每级探险科技允许殖民的星球数 */
  colonyPerTech: number
  /** 科技殖民最大数量 */
  maxTechColony: number
  /** 殖民加成最大数量 */
  maxColonyBonus: number
  /** 制造卫星需要的资源, TODO: 加入管理员页面 */
  moonCost: Partial<Record<Resource, number>>
  /** 玩家的初始订单数 */
  orderSize: number
  /** 挂单税率 */
  orderTax: number
  /** 订单路费计算距离因子 */
  orderDisFactor: number
  /** 矿物行星最大数量 */
  mineralPlanetMax: number
  /** 舰队飞行重氢消耗倍数 */
  fuelConsumptionFactor: number
  /** 是否开放赞助中心 */
  rechargeCenterEnabled: boolean
  /** 邀请奖励配置 */
  inviteRewardConfig?: InviteRewardConfig
}

/**
 * 邀请奖励配置
 */
export interface InviteRewardConfig {
  /** 每次签到奖励金额 */
  rewardAmount: number
  /** 奖励有效天数 */
  rewardDays: number
  /** 每个被邀请人最多可获得的奖励数量 */
  maxRewardsPerInvitee: number
  /** 最多可邀请的人数 */
  maxInviteeCount: number
}

/**
 * 宇宙所有配置
 */
export interface UniverseAllConfig {
  universe: UniverseConfigType
  building: Record<Building, BuildingConfig>
  technology: Record<Technology, TechnologyConfig>
  ship: Record<Ship, ShipConfig>
  defense: Record<Defense, DefenseConfig>
  officer: Record<Officer, OfficerConfig>
  armory: Record<Armory, ArmoryConfig>
  ideology: Record<Ideology, IdeologyConfig>
  race: Record<Race, RaceConfig>
  politics: Record<Politics, PoliticsConfig>
  camp: Record<Camp, CampConfig>
  mineralResearch: Record<MineralResearch, MineralResearchConfig>
  allianceDevelop: Record<AllianceDevelop, AllianceDevelopConfig>
}

/**
 * 宇宙配置
 */
export const UniverseConfig: UniverseConfigType = {
  seed: 0.63,
  gameSpeed: 1000,
  fleetSpeed: 1000,
  baseIncome: {
    [Resource.Metal]: 1,
    [Resource.Crystal]: 1,
    [Resource.Deuterium]: 0,
  },
  resourceFactor: {
    [Resource.Metal]: 1000,
    [Resource.Crystal]: 1000,
    [Resource.Deuterium]: 1000,
  },
  galaxyCount: 9,
  systemCount: 400,
  planetCount: 15,
  taskQueueLength: 5,
  maxRound: 6,
  baseColony: 6,
  colonyPerTech: 0.5,
  maxTechColony: 30,
  maxColonyBonus: 10,
  moonCost: {
    [Resource.StarDust]: 2,
  },
  orderSize: 2,
  orderTax: 0.1,
  orderDisFactor: 10000,
  mineralPlanetMax: 1000,
  fuelConsumptionFactor: 10,
  rechargeCenterEnabled: true,
  inviteRewardConfig: {
    rewardAmount: 1000,
    rewardDays: 7,
    maxRewardsPerInvitee: 7,
    maxInviteeCount: 10,
  },
}
