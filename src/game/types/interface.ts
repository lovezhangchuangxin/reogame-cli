// 这里存放前后端调接口时要用的类型（不是存放游戏类型的定义）

import { PlanetType, User } from '.'
import { Building, Defense, ProductInfo, Resource_1, Resource_2, Ship } from '../config'

/**
 * 玩家数据查询条件
 */
export interface UserQuery {
  /** 宇宙编号 */
  universe?: number
  /** 玩家名 */
  username?: string
  /** 玩家邮箱 */
  email?: string
  /** 玩家 ip */
  ip?: string
}

/**
 * 玩家分页数据
 */
export interface UserDataPage {
  /** 页号 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 玩家数据 */
  userList: User[]
  /** 总数 */
  total: number
}

/**
 * 宇宙查询列表数据
 */
export interface UniverseQueryData {
  /** 宇宙编号 */
  id: number
  /** 宇宙名 */
  name: string
  /** 玩家数量 */
  userCount: number
}

/**
 * 商品查询条件
 */
export interface ProductQuery {
  /** 宇宙编号 */
  universe?: number
  /** 商品名 */
  name?: string
  /** 商品分类 */
  category?: string
}

/**
 * 商品查询结果
 */
export interface ProductDataPage {
  /** 页号 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 商品数据 */
  productList: ProductInfo[]
  /** 总数 */
  total: number
}

/**
 * 星球总览数据
 */
export interface PlanetOverview {
  /** 星球 id */
  id: number
  /** 星球类型 */
  type: PlanetType
  /** 星球名称 */
  name?: string
  /** 已使用领土面积 */
  usedField: number
  /** 总领土面积 */
  totalField: number
  /** 第一类资源 */
  resource_1: Partial<Record<Resource_1, number>>
  /** 第二类资源 */
  resource_2: Partial<Record<Resource_2, number>>
  /** 每小时第一类资源生产的速度 */
  resource_1_speed: Partial<Record<Resource_1, number>>
  /** 建筑等级 */
  buildings: Partial<Record<Building, number>>
  /** 舰船数量 */
  ships: Partial<Record<Ship, number>>
  /** 防御设施数量 */
  defenses: Partial<Record<Defense, number>>
}

/**
 * 玩家信息
 */
export interface PlayerInfo {
  /** 玩家所在宇宙 */
  universe: number
  /** 玩家 id */
  id: number
  /** 玩家名称 */
  username: string
  /** 第一个星球 id 新增概念：母星 id 积分最高的星球为母星*/
  planetId: number
  /** 第一个星球名称 新增概念：母星 名称 积分最高的星球为母星*/
  planetName?: string
}

/**
 * 指纹记录
 */
export interface FingerprintRecord {
  /** 用户ID */
  userId: number
  /** 浏览器指纹 */
  fingerprint: string
  /** IP地址 */
  ip: string
  /** 记录时间 */
  timestamp: number
}

/**
 * 用户指纹稳定度
 */
export interface FingerprintStability {
  /** 用户ID */
  userId: number
  /** 稳定度分数 0-100，越高越稳定 */
  stabilityScore: number
  /** 空指纹比例 */
  emptyFingerprintRatio: number
  /** 唯一指纹数量 */
  uniqueFingerprintCount: number
  /** 总访问次数 */
  totalAccessCount: number
  /** 不稳定原因列表 */
  instabilityReasons: string[]
}

/**
 * 多账户可疑组
 */
export interface MultiAccountGroup {
  /** 组ID */
  groupId: string
  /** 关联的用户列表 */
  users: MultiAccountUser[]
  /** 可疑分数 */
  score: number
  /** 可疑等级 */
  level: 'normal' | 'low' | 'medium' | 'high'
  /** 匹配的原因 */
  reasons: {
    /** 是否IP相同 */
    sameIP: boolean
    /** 是否指纹相同 */
    sameFingerprint: boolean
    /** IP列表 */
    ips: string[]
    /** 指纹列表 */
    fingerprints: string[]
  }
  /** 首次检测时间 */
  firstDetected: number
  /** 最后更新时间 */
  lastUpdated: number
  /** 用户指纹稳定度 */
  fingerprintStability?: Map<number, FingerprintStability>
  /** 疑似脚本的用户ID列表 */
  scriptUsers?: number[]
}

/**
 * 多账户检测用户信息
 */
export interface MultiAccountUser {
  /** 用户ID */
  id: number
  /** 用户名 */
  username: string
  /** 宇宙ID */
  universe: number
  /** 注册时间 */
  registerTime: number
  /** 最近在线 */
  onlineTime: number
  /** 指纹历史 */
  fingerprints: FingerprintRecord[]
}

/**
 * 多账户检测查询条件
 */
export interface MultiAccountQuery {
  /** 宇宙ID */
  universe?: number
  /** 可疑等级 */
  level?: 'normal' | 'low' | 'medium' | 'high'
  /** 最小分数 */
  minScore?: number
  /** 最大分数 */
  maxScore?: number
  /** 用户ID */
  userId?: number
  /** 页码 */
  page?: number
  /** 每页大小 */
  pageSize?: number
}

/**
 * 多账户检测结果分页
 */
export interface MultiAccountPage {
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
  /** 可疑组列表 */
  groups: MultiAccountGroup[]
  /** 总数 */
  total: number
}
