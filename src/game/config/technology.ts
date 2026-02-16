/**
 * 科技相关配置
 */

import { enumToArray } from '../../utils'
import { IBonusEffect } from './bonus'
import { BonusType, Building, Resource, Technology } from './enum'
import { ElementBaseConfig } from './types'

/**
 * 所有科技
 */
export const TechnologyList = enumToArray(Technology)

/**
 * 科技配置类型
 */
export interface TechnologyConfig extends ElementBaseConfig, IBonusEffect {
  /** 最大等级 */
  maxLevel?: number
  /** 升级基数，科技升级的公式是一个指数函数，`factor` 就是底数 */
  factor: number
}

/**
 * 所有科技配置
 */
export const TechnologyConfigs: Record<Technology, TechnologyConfig> = {
  [Technology.SpyTech]: {
    name: '间谍技术',
    description:
      '研究间谍技术使谍报人员能更专业地进行间谍活动，获取情报的同时避免暴露任何信息，可以使用这项技术获得有关其他行星和卫星的信息。',
    requirements: {
      [Building.Laboratory]: 3,
    },
    costs: {
      [Resource.Metal]: 200,
      [Resource.Crystal]: 100,
    },
    factor: 1.8,
    bonus: {},
    icon: '/images/technologies/1.png',
  },
  [Technology.ComputerTech]: {
    name: '计算机技术',
    description: '计算机技术通过增加计算机容量，可以指挥更多的舰队，增加舰船的编队槽位。',
    requirements: {
      [Building.Laboratory]: 1,
    },
    costs: {
      [Resource.Metal]: 400,
      [Resource.Crystal]: 200,
    },
    factor: 1.5,
    bonus: { [BonusType.FleetSlots]: 1 },
    icon: '/images/technologies/2.png',
  },
  [Technology.MilitaryTech]: {
    name: '武器技术',
    description: '武器技术使武器系统更高效，每级武器技术都会使舰船的武器强度增加。',
    requirements: {
      [Building.Laboratory]: 4,
    },
    costs: {
      [Resource.Metal]: 800,
      [Resource.Crystal]: 400,
    },
    factor: 1.8,
    bonus: {
      [BonusType.Attack]: 0.1,
    },
    icon: '/images/technologies/3.png',
  },
  [Technology.ShieldTech]: {
    name: '护盾技术',
    description: '护盾技术使舰船和防御设施上的屏蔽更加高效，每级护盾技术都会使护盾的强度增加。',
    requirements: {
      [Building.Laboratory]: 6,
      [Technology.EnergyTech]: 3,
    },
    costs: {
      [Resource.Metal]: 1000,
      [Resource.Crystal]: 500,
    },
    factor: 1.8,
    bonus: { [BonusType.Shield]: 0.1 },
    icon: '/images/technologies/4.png',
  },
  [Technology.DefenceTech]: {
    name: '装甲技术',
    description: '特殊合金改善了舰船和结构的装甲，每级装甲技术可以增加装甲的强度。',
    requirements: {
      [Building.Laboratory]: 2,
    },
    costs: {
      [Resource.Metal]: 1200,
      [Resource.Crystal]: 600,
    },
    factor: 1.6,
    bonus: { [BonusType.Defensive]: 0.1 },
    icon: '/images/technologies/5.png',
  },
  [Technology.EnergyTech]: {
    name: '能源技术',
    description: '能源技术可以增加电能生产效率，对于许多新技术来说，能源技术是必要的。',
    requirements: {
      [Building.Laboratory]: 1,
    },
    costs: {
      [Resource.Metal]: 1400,
      [Resource.Crystal]: 700,
    },
    factor: 1.5,
    bonus: { [BonusType.Energy]: 0.1 },
    icon: '/images/technologies/6.png',
  },
  [Technology.HyperspaceTech]: {
    name: '超空间技术',
    description:
      '通过整合高纬度空间，现在可以通过一种更经济、更高效的新型驱动器进行旅行，超空间技术可以增加使用超空间发动机的舰船的飞行速度。',
    requirements: {
      [Building.Laboratory]: 7,
      [Technology.ShieldTech]: 5,
    },
    costs: {
      [Resource.Metal]: 1600,
      [Resource.Crystal]: 800,
    },
    factor: 2,
    bonus: { [BonusType.FlyTimeHyp]: 0.05 },
    icon: '/images/technologies/7.png',
  },
  [Technology.CombustionTech]: {
    name: '燃烧引擎',
    description:
      '这种引擎器的发展使大量舰船行动更快，燃烧引擎可以增加使用喷气发动机的舰船的飞行速度。',
    requirements: {
      [Building.Laboratory]: 1,
      [Technology.EnergyTech]: 1,
    },
    costs: {
      [Resource.Metal]: 1800,
      [Resource.Crystal]: 900,
    },
    factor: 1.5,
    bonus: { [BonusType.FlyTimeCom]: 0.1 },
    icon: '/images/technologies/8.png',
  },
  [Technology.ImpulseMotorTech]: {
    name: '脉冲引擎',
    description:
      '脉冲引擎基于化学反应和特殊物理结构驱动大量舰船，脉冲引擎可以增加使用脉冲发动机的舰船的飞行速度。',
    requirements: {
      [Building.Laboratory]: 2,
      [Technology.EnergyTech]: 1,
    },
    costs: {
      [Resource.Metal]: 2000,
      [Resource.Crystal]: 1000,
    },
    factor: 1.6,
    bonus: { [BonusType.FlyTimeImp]: 0.1 },
    icon: '/images/technologies/9.png',
  },
  [Technology.HyperspaceMotorTech]: {
    name: '超空间引擎',
    description: '通过扭曲舰船周围的空间，超空间引擎可以增加使用超空间引擎的舰船的飞行速度。',
    requirements: {
      [Building.Laboratory]: 7,
      [Technology.HyperspaceTech]: 3,
    },
    costs: {
      [Resource.Metal]: 2200,
      [Resource.Crystal]: 1100,
    },
    factor: 2.5,
    bonus: { [BonusType.FlyTimeCom]: 0.3 },
    icon: '/images/technologies/10.png',
  },
  [Technology.LaserTech]: {
    name: '激光技术',
    description: '聚焦光会产生光束，当它照射到物体上时会造成伤害，激光技术可以增加激光攻击伤害。',
    requirements: {
      [Building.Laboratory]: 1,
      [Technology.EnergyTech]: 2,
    },
    costs: {
      [Resource.Metal]: 2400,
      [Resource.Crystal]: 1200,
    },
    factor: 1.6,
    bonus: {
      [BonusType.AttackLaser]: 0.02,
    },
    icon: '/images/technologies/11.png',
  },
  [Technology.IonicTech]: {
    name: '离子技术',
    description: '致命的加速离子束，冲击物体时会造成巨大的伤害，离子技术可以增加离子攻击伤害。',
    requirements: {
      [Building.Laboratory]: 4,
      [Technology.LaserTech]: 5,
      [Technology.EnergyTech]: 4,
    },
    costs: {
      [Resource.Metal]: 2600,
      [Resource.Crystal]: 1300,
    },
    factor: 1.8,
    bonus: {
      [BonusType.AttackIon]: 0.04,
    },
    icon: '/images/technologies/12.png',
  },
  [Technology.PlasmaTech]: {
    name: '等离子技术',
    description: '离子技术的进一步发展，加速了高能等离子体，等离子技术可以增加等离子攻击伤害。',
    requirements: {
      [Building.Laboratory]: 5,
      [Technology.LaserTech]: 10,
      [Technology.IonicTech]: 5,
      [Technology.EnergyTech]: 8,
    },
    costs: {
      [Resource.Metal]: 2800,
      [Resource.Crystal]: 1400,
    },
    factor: 2.5,
    bonus: { [BonusType.AttackPlasma]: 0.06 },
    icon: '/images/technologies/13.png',
  },
  [Technology.IntergalacticTech]: {
    name: '星际市场网络',
    description: '针对星际市场网络的研究可以使你具有更多的订单数量。',
    requirements: {
      [Building.Laboratory]: 5,
      [Technology.CombustionTech]: 3,
      [Technology.HyperspaceTech]: 3,
    },
    costs: {
      [Resource.Metal]: 3000,
      [Resource.Crystal]: 1500,
    },
    factor: 3.5,
    bonus: { [BonusType.ResearchSlotPlanet]: 1 },
    icon: '/images/technologies/14.png',
  },
  [Technology.ExpeditionTech]: {
    name: '探险技术',
    description: '借助对天体物理学研究，舰船可以进行长时间的探险。增加这项技术的可以殖民更多星球。',
    requirements: {
      [Building.Laboratory]: 3,
      [Technology.SpyTech]: 3,
      [Technology.ImpulseMotorTech]: 3,
    },
    costs: {
      [Resource.Metal]: 3200,
      [Resource.Crystal]: 1600,
    },
    factor: 1.6,
    bonus: { [BonusType.Planets]: 1 },
    icon: '/images/technologies/15.png',
  },
  [Technology.MetalProcTech]: {
    name: '矿物质研究',
    description: '矿物质研究可以增加金属产量。',
    requirements: {
      [Building.Laboratory]: 8,
      [Technology.EnergyTech]: 5,
    },
    costs: {
      [Resource.Metal]: 3400,
      [Resource.Crystal]: 1700,
    },
    factor: 1.5,
    bonus: { [BonusType.Metal]: 0.02 },
    icon: '/images/technologies/16.png',
  },
  [Technology.CrystalProcTech]: {
    name: '半晶体研究',
    description: '半晶体研究可以增加水晶产量。',
    requirements: {
      [Building.Laboratory]: 8,
      [Technology.EnergyTech]: 5,
    },
    costs: {
      [Resource.Metal]: 3600,
      [Resource.Crystal]: 1800,
    },
    factor: 1.5,
    bonus: { [BonusType.Crystal]: 0.02 },
    icon: '/images/technologies/17.png',
  },
  [Technology.DeuteriumProcTech]: {
    name: '燃料研究',
    description: '燃料研究可以增加重氢产量。',
    requirements: {
      [Building.Laboratory]: 8,
      [Technology.EnergyTech]: 5,
    },
    costs: {
      [Resource.Metal]: 3800,
      [Resource.Deuterium]: 1900,
    },
    factor: 1.5,
    bonus: { [BonusType.Deuterium]: 0.02 },
    icon: '/images/technologies/18.png',
  },
  [Technology.GravitonTech]: {
    name: '引力子研究',
    description:
      '发射聚束引力子粒子可以产生人工重力场，从而摧毁舰船甚至卫星，引力子研究可以增加引力攻击伤害。',
    requirements: {
      [Building.Laboratory]: 12,
    },
    costs: {
      [Resource.Metal]: 4000,
      [Resource.Crystal]: 2000,
    },
    factor: 2.5,
    bonus: {
      [BonusType.AttackGravity]: 0.1,
    },
    icon: '/images/technologies/19.png',
  },
}
