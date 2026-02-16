import { enumToArray } from '../../utils'
import { BonusType } from './enum'

/**
 * 加成类型列表
 */
export const BonusList = enumToArray(BonusType)

/**
 * 加成类型对应的名称
 */
export const BonusName: Record<BonusType, string> = {
  [BonusType.AttackA]: '攻击时的攻击',
  [BonusType.DefensiveA]: '攻击时的装甲',
  [BonusType.ShieldA]: '攻击时的护盾',
  [BonusType.AttackD]: '防御时的攻击',
  [BonusType.DefensiveD]: '防御时的装甲',
  [BonusType.ShieldD]: '防御时的护盾',
  [BonusType.Attack]: '攻击',
  [BonusType.AttackLaser]: '激光攻击',
  [BonusType.AttackIon]: '离子攻击',
  [BonusType.AttackPlasma]: '等离子体攻击',
  [BonusType.AttackGravity]: '引力攻击',
  [BonusType.Defensive]: '装甲',
  [BonusType.DefensiveSlight]: '轻型装甲',
  [BonusType.DefensiveSmedium]: '中型装甲',
  [BonusType.DefensiveSheavy]: '重型装甲',
  [BonusType.Shield]: '护盾',
  [BonusType.ShieldSlight]: '轻型护盾',
  [BonusType.ShieldSmedium]: '中型护盾',
  [BonusType.ShieldSheavy]: '重型护盾',
  [BonusType.BuildTime]: '建造时间',
  [BonusType.BuildSlots]: '建筑队列',
  [BonusType.TechTime]: '研究时间',
  [BonusType.ResearchSlots]: '研究队列',
  [BonusType.ResearchSlotPlanet]: '星际市场网络',
  [BonusType.FleetTime]: '造船时间',
  [BonusType.FleetBuildSlots]: '造船队列',
  [BonusType.DefenseTime]: '防御建造时间',
  [BonusType.DefenseBuildSlots]: '防御队列',
  [BonusType.Resource]: '资源生产',
  [BonusType.Metal]: '金属开采',
  [BonusType.Crystal]: '水晶开采',
  [BonusType.Deuterium]: '重氢开采',
  [BonusType.Energy]: '能源生产',
  [BonusType.ResourceStorage]: '资源存储',
  [BonusType.ShipStorage]: '舰船载货量',
  [BonusType.FlyTime]: '舰船飞行速度',
  [BonusType.FlyTimeCom]: '喷气发动机舰船的飞行速度',
  [BonusType.FlyTimeImp]: '脉冲发动机舰船的飞行速度',
  [BonusType.FlyTimeHyp]: '超空间发动机舰船的飞行速度',
  [BonusType.FleetSlots]: '舰队插槽',
  [BonusType.Planets]: '行星',
  [BonusType.SpyPower]: '间谍力量',
  [BonusType.Expedition]: '探险',
  [BonusType.MoreFound]: '探险获利',
  [BonusType.BuildCost]: '降低建筑成本',
  [BonusType.FleetCost]: '降低舰队成本',
  [BonusType.TechCost]: '降低研究成本',
  [BonusType.DefenseCost]: '降低防御成本',
  [BonusType.DoubleAttack]: '加倍攻击的概率',
  [BonusType.DoubleShield]: '加倍护盾的概率',
  [BonusType.DoubleDefensive]: '加倍装甲的概率',
  [BonusType.DoubleAttackDamage]: '加倍攻击的伤害',
  [BonusType.DoubleShieldBonus]: '加倍护盾的密度',
  [BonusType.DoubleDefensiveBonus]: '加倍装甲的密度',
  [BonusType.Debris]: '战斗后的残骸',
  [BonusType.FuelConsum]: '减少重氢消耗',
  // [BonusType.GateCoolTime]: '跃迁传送门充电时间', // 未实现
  // [BonusType.DefRecovery]: '恢复装甲', // 未实现
  // [BonusType.Focusing]: '聚焦舰船', // 未实现
  // [BonusType.AntiFocusing]: '降低射速造成的伤害', // 未实现
  // [BonusType.AccurateShots]: '每轮摧毁的最大数量', // 未实现
  // [BonusType.ChainReaction]: '链式反应触发概率', // 未实现
  // [BonusType.ExpBoost]: '链式反应炸毁的最大单位数', // 未实现
  // [BonusType.ShieldDome]: '护盾的最大数量', // 未实现
  // [BonusType.OrbitalBases]: '防御轨道平台的最大数量', // 未实现
}

/**
 * 加成效果，即不同加成类型对应的加成效果值
 */
export type BonusEffects = Record<BonusType, number>

/**
 * 加成效果接口
 */
export interface IBonusEffect {
  bonus: Partial<BonusEffects>
}

/**
 * 有时间限制的加成效果接口
 */
export interface IBonusEffectWithTime extends IBonusEffect {
  /** 持续时间，单位毫秒 */
  time: number
}
