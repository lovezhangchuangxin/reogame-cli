import { IBonusEffect, IBonusEffectWithTime } from './bonus'
import {
  AllElement,
  Armory,
  AttackType,
  Building,
  DecorationType,
  Defense,
  DefensiveType,
  EngineType,
  Ideology,
  Officer,
  Resource,
  Resource_1,
  Resource_3,
  Resource_4,
  ShieldType,
  Ship,
  ShipGroup,
  Technology,
} from './enum'

/**
 * 元素基础配置，比如建筑、科技、舰队、防御等的
 */
export interface ElementBaseConfig {
  /** 名称 */
  name: string
  /** 描述 */
  description: string
  /** 解锁的前置条件 */
  requirements: Partial<Record<Building | Technology | Officer, number>>
  /** 升级或者购买需要的资源基数 */
  costs: Partial<Record<Resource, number>>
  /** 图片 */
  icon: string
}

/**
 * 战斗元素的基础配置类型，舰船和防御的共同配置
 */
export interface BattleBaseConfig extends ElementBaseConfig {
  /** 攻击力 */
  attack: Partial<Record<AttackType, number>>
  /** 装甲值 */
  defense: Partial<Record<DefensiveType, number>>
  /** 护盾值 */
  shield: Partial<Record<ShieldType, number>>
}

/**
 * 舰船配置类型
 */
export interface ShipConfig extends BattleBaseConfig {
  /** 引擎类型 */
  engine: EngineType
  /** 速度 */
  speed: number
  /** 油耗 */
  fuelConsumption: number
  /** 容量 */
  capacity: number
  /** 舰船分组类型 */
  group: ShipGroup
}

/**
 * 防御设施配置类型
 */
export interface DefenseConfig extends BattleBaseConfig {}

/**
 * 官员配置类型
 */
export interface OfficerConfig extends ElementBaseConfig, IBonusEffect {
  /** 最大等级 */
  maxLevel: number
}

/**
 * 军械配置
 */
export interface ArmoryConfig
  extends Pick<ElementBaseConfig, 'name' | 'description' | 'icon'>, IBonusEffect {}

/**
 * 意识形态
 */
export interface IdeologyConfig
  extends Pick<ElementBaseConfig, 'name' | 'description' | 'costs' | 'icon'>, IBonusEffect {
  /** 意识形态代价 */
  ideologyCosts: Partial<Record<Ideology, number>>
}

/**
 * 种族配置
 */
export interface RaceConfig
  extends Pick<ElementBaseConfig, 'name' | 'description' | 'costs' | 'icon'>, IBonusEffect {
  /** 最大等级 */
  maxLevel: number
}

/**
 * 政治体制
 */
export interface PoliticsConfig
  extends Pick<ElementBaseConfig, 'name' | 'description' | 'costs' | 'icon'>, IBonusEffect {
  /** 最大等级 */
  maxLevel: number
}

/**
 * 阵营
 */
export interface CampConfig
  extends Pick<ElementBaseConfig, 'name' | 'description' | 'costs' | 'icon'>, IBonusEffect {
  /** 最大等级 */
  maxLevel: number
}

/**
 * 矿物研究
 */
export interface MineralResearchConfig
  extends Pick<ElementBaseConfig, 'name' | 'description' | 'costs' | 'icon'>, IBonusEffect {}
/**
 * 联盟发展
 */
export interface AllianceDevelopConfig
  extends Pick<ElementBaseConfig, 'name' | 'description' | 'costs' | 'icon'>, IBonusEffect {
  /** 最大等级 */
  maxLevel: number
}

/**
 * 商品状态
 */
export type ProductStatus = 'on' | 'off' | 'unpublished'

/**
 * 商品的基本信息
 */
export interface ProductBaseInfo {
  /** 商品 id */
  id: string
  /** 名称 */
  name: string
  /** 描述 */
  description?: string
  /** 商品分类 */
  category: string
  /** 购买需要的资源 */
  costs: Partial<Record<Resource_1 | Resource_3, number>>
  /** 商品包含的物资，包括资源和元素 */
  content?: Partial<Record<AllElement, number>>
  /** 商品具有的加成效果以及持续的时间，单位毫秒 */
  effect?: IBonusEffectWithTime
  /** 商品包含的装饰ID（购买后获得该装饰） */
  decorationId?: string
}

/**
 * 商品信息
 */
export interface ProductInfo extends ProductBaseInfo {
  /** 商品状态，on 上架，off 下架，未发布 */
  status: ProductStatus
  /** 自动下架时间 */
  autoOffTime?: number
  /** 剩余数量 */
  amount?: number
  /** 商品在哪些宇宙售卖 */
  universes: number[]
}

/**
 * 玩家的商品的信息
 */
export interface UserProductInfo extends ProductBaseInfo {
  /** 商品效果的总持续时间 */
  duration: number
  /** 商品的效果已持续的时间，单位毫秒 */
  passedTime: number
}

/**
 * 所有建造任务目标的类型
 */
export type BuildTaskTarget = Building | Technology | Ship | Defense

/**
 * 可数元素（无上限 maxLevel）
 */
export type CountableElement = Resource_1 | Resource_3 | Resource_4 | Ship | Defense | Armory

/**
 * 可购买的元素
 */
export type BuyableElement = CountableElement

/**
 * 装饰定义
 */
export interface DecorationDefinition {
  /** 装饰唯一ID */
  id: string
  /** 装饰名称 */
  name: string
  /** 装饰描述 */
  description?: string
  /** 装饰类型 */
  type: DecorationType
  /** CSS类名/样式标识 */
  styleClass: string
  /** 预览图URL */
  previewUrl?: string
  /** 是否启用 */
  enabled: boolean
}

/**
 * 用户装饰状态
 */
export interface UserDecorations {
  /** 当前使用的头像框ID */
  activeAvatarFrame?: string
  /** 当前使用的名字特效ID */
  activeNameEffect?: string
  /** 拥有的装饰ID列表 */
  ownedDecorations?: string[]
}
