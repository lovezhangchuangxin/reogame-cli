/**
 * 战斗相关的配置
 */

import { enumToArray } from '../../utils'
import {
  AttackType,
  Building,
  Defense,
  DefensiveType,
  EngineType,
  FleetTaskType,
  Officer,
  Resource,
  ShieldType,
  Ship,
  ShipGroup,
  Technology,
} from './enum'

import { PlanetType } from '../types'
import { DefenseConfig, ShipConfig } from './types'

/**
 * 所有舰船列表
 */
export const ShipList = enumToArray(Ship)

/**
 * 所有防御设施列表
 */
export const DefenseList = enumToArray(Defense)

/**
 * 舰队任务类型列表
 */
export const FleetTaskTypeList = enumToArray(FleetTaskType)

/**
 * 舰队任务类型目的地列表
 */
export const PlanetTypeNameList = enumToArray(PlanetType)
/**
 * 所有的攻击类型列表
 */
export const AttackTypeList = enumToArray(AttackType)

/**
 * 所有的护盾类型列表
 */
export const ShieldTypeList = enumToArray(ShieldType)

/**
 * 所有的装甲类型列表
 */
export const DefensiveTypeList = enumToArray(DefensiveType)

/**
 * 各种类型的攻击对护盾的伤害比例
 */
export const AttackToShield: Record<AttackType, Record<ShieldType, number>> = {
  [AttackType.Normal]: {
    [ShieldType.Light]: 0.7,
    [ShieldType.Medium]: 0.2,
    [ShieldType.Heavy]: 0.000015,
  },
  [AttackType.Laser]: {
    [ShieldType.Light]: 0.7,
    [ShieldType.Medium]: 0.2,
    [ShieldType.Heavy]: 0.000015,
  },
  [AttackType.Ion]: {
    [ShieldType.Light]: 0.6,
    [ShieldType.Medium]: 0.7,
    [ShieldType.Heavy]: 0.05,
  },
  [AttackType.Plasma]: {
    [ShieldType.Light]: 0.02,
    [ShieldType.Medium]: 0.4,
    [ShieldType.Heavy]: 0.55,
  },
  [AttackType.Gravity]: {
    [ShieldType.Light]: 0.025,
    [ShieldType.Medium]: 0.15,
    [ShieldType.Heavy]: 0.7,
  },
}

/**
 * 所有舰船的配置
 */
export const ShipConfigs: Record<Ship, ShipConfig> = {
  [Ship.SpyProbe]: {
    name: '间谍卫星',
    description: '间谍探测器是小型敏捷无人机，可以提供舰队和行星的数据，等级越高越不易被发现。',
    group: ShipGroup.Spy,
    requirements: {
      [Building.Hangar]: 2,
      [Technology.ShieldTech]: 1,
      [Technology.DefenceTech]: 1,
      [Technology.CombustionTech]: 1,
      [Technology.SpyTech]: 2,
    },
    costs: {
      [Resource.Crystal]: 1425,
    },
    attack: {},
    defense: {
      [DefensiveType.Light]: 1,
    },
    shield: {},
    engine: EngineType.Combustion,
    speed: 100000000,
    fuelConsumption: 1,
    capacity: 15,
    icon: '/images/ships/1.png',
  },
  [Ship.SolarSatellite]: {
    name: '太阳能卫星',
    description:
      '太阳能卫星是位于静止轨道上的太阳能电池简易平台，他们收集阳光并通过激光将其传递到地面站，可以提供大量电能，但是极易被击毁。',
    group: ShipGroup.Special,
    requirements: {
      [Building.Hangar]: 1,
      [Technology.ShieldTech]: 1,
      [Technology.DefenceTech]: 1,
      [Technology.EnergyTech]: 3,
    },
    costs: {
      [Resource.Metal]: 1900,
      [Resource.Crystal]: 4750,
    },
    attack: {},
    defense: {
      [DefensiveType.Light]: 200,
    },
    shield: {},
    engine: EngineType.Combustion,
    speed: 100000,
    fuelConsumption: 0,
    capacity: 0,
    icon: '/images/ships/2.png',
  },
  [Ship.LightHunter]: {
    name: '轻型战机',
    description:
      '这是所有人都会建造的第一艘战斗船，轻型战斗机是一艘敏捷的舰船，但本身很脆弱。如果数量众多，他们可以成为对任何帝国的巨大威胁。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 2,
      [Technology.MilitaryTech]: 2,
      [Technology.ShieldTech]: 2,
      [Technology.DefenceTech]: 2,
      [Technology.CombustionTech]: 2,
    },
    costs: {
      [Resource.Metal]: 2850,
      [Resource.Crystal]: 950,
    },
    attack: {
      [AttackType.Normal]: 50,
    },
    defense: {
      [DefensiveType.Light]: 400,
    },
    shield: {
      [ShieldType.Light]: 20,
    },
    engine: EngineType.Combustion,
    speed: 12500,
    fuelConsumption: 20,
    capacity: 50,
    icon: '/images/ships/3.png',
  },
  [Ship.SmallShipCargo]: {
    name: '小型货船',
    description: '轻型货物是一艘敏捷的舰船，可以快速将资源运送到其他星球。',
    group: ShipGroup.Transport,
    requirements: {
      [Building.Hangar]: 2,
      [Technology.ShieldTech]: 1,
      [Technology.DefenceTech]: 2,
      [Technology.CombustionTech]: 2,
    },
    costs: {
      [Resource.Metal]: 1900,
      [Resource.Crystal]: 1900,
    },
    attack: {
      [AttackType.Normal]: 15,
    },
    defense: {
      [DefensiveType.Light]: 400,
    },
    shield: {
      [ShieldType.Light]: 20,
    },
    engine: EngineType.Combustion,
    speed: 5000,
    fuelConsumption: 1,
    capacity: 5000,
    icon: '/images/ships/4.png',
  },
  [Ship.BigShipCargo]: {
    name: '大型货船',
    description: '这艘货船的载货能力比轻型货物大得多，并且由于改进的驱动装置，通常更快。',
    group: ShipGroup.Transport,
    requirements: {
      [Building.Hangar]: 2,
      [Technology.ShieldTech]: 2,
      [Technology.DefenceTech]: 3,
      [Technology.CombustionTech]: 4,
    },
    costs: {
      [Resource.Metal]: 5700,
      [Resource.Crystal]: 5700,
    },
    attack: {
      [AttackType.Normal]: 15,
    },
    defense: {
      [DefensiveType.Light]: 1200,
    },
    shield: {
      [ShieldType.Light]: 50,
    },
    engine: EngineType.Combustion,
    speed: 7500,
    fuelConsumption: 5,
    capacity: 250000,
    icon: '/images/ships/5.png',
  },
  [Ship.HeavyHunter]: {
    name: '重型战机',
    description: '这款战斗机的装甲更好，攻击力也比轻型战斗机高。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 3,
      [Technology.MilitaryTech]: 4,
      [Technology.ShieldTech]: 3,
      [Technology.DefenceTech]: 4,
      [Technology.ImpulseMotorTech]: 2,
    },
    costs: {
      [Resource.Metal]: 7600,
      [Resource.Crystal]: 3800,
    },
    attack: {
      [AttackType.Normal]: 70,
    },
    defense: {
      [DefensiveType.Medium]: 1100,
    },
    shield: {
      [ShieldType.Light]: 80,
    },
    engine: EngineType.Impulse,
    speed: 10000,
    fuelConsumption: 70,
    capacity: 100,
    icon: '/images/ships/6.png',
  },
  [Ship.ColonyShip]: {
    name: '殖民船',
    description: '无主的行星可以用这艘船殖民。',
    group: ShipGroup.Colony,
    requirements: {
      [Building.Hangar]: 4,
      [Technology.MilitaryTech]: 2,
      [Technology.ShieldTech]: 2,
      [Technology.DefenceTech]: 4,
      [Technology.ImpulseMotorTech]: 4,
    },
    costs: {
      [Resource.Metal]: 9500,
      [Resource.Crystal]: 19000,
      [Resource.Deuterium]: 9500,
    },
    attack: {
      [AttackType.Normal]: 100,
    },
    defense: {
      [DefensiveType.Light]: 3000,
    },
    shield: {
      [ShieldType.Light]: 200,
    },
    engine: EngineType.Impulse,
    speed: 10000,
    fuelConsumption: 1000,
    capacity: 50,
    icon: '/images/ships/7.png',
  },
  [Ship.Recycler]: {
    name: '回收船',
    description: '回收船可以从碎片场获取原材料。',
    group: ShipGroup.Recycler,
    requirements: {
      [Building.Hangar]: 4,
      [Technology.ShieldTech]: 3,
      [Technology.DefenceTech]: 4,
      [Technology.CombustionTech]: 5,
    },
    costs: {
      [Resource.Metal]: 9500,
      [Resource.Crystal]: 5700,
      [Resource.Deuterium]: 1900,
    },
    attack: {
      [AttackType.Normal]: 30,
    },
    defense: {
      [DefensiveType.Light]: 1600,
    },
    shield: {
      [ShieldType.Light]: 100,
    },
    engine: EngineType.Combustion,
    speed: 20000,
    fuelConsumption: 30,
    capacity: 2000000,
    icon: '/images/ships/8.png',
  },
  [Ship.Crusher]: {
    name: '巡洋舰',
    description:
      '洋舰的装甲重量几乎是重型战斗机的三倍，火力是重型战斗机的两倍多。此外，它们的速度非常快。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 4,
      [Technology.MilitaryTech]: 5,
      [Technology.ShieldTech]: 5,
      [Technology.DefenceTech]: 5,
      [Technology.ImpulseMotorTech]: 3,
      [Technology.IonicTech]: 5,
    },
    costs: {
      [Resource.Metal]: 14250,
      [Resource.Crystal]: 9025,
      [Resource.Deuterium]: 1900,
    },
    attack: {
      [AttackType.Ion]: 400,
    },
    defense: {
      [DefensiveType.Medium]: 2700,
    },
    shield: {
      [ShieldType.Medium]: 200,
    },
    engine: EngineType.Impulse,
    speed: 15000,
    fuelConsumption: 300,
    capacity: 800,
    icon: '/images/ships/9.png',
  },
  [Ship.Transporter]: {
    name: '军用运输机',
    description: '运输技术的发展迅速，如果采用正确的技术，它具有更大的运载能力，飞行速度更快。',
    group: ShipGroup.Transport,
    requirements: {
      [Building.Hangar]: 6,
      [Technology.ShieldTech]: 10,
      [Technology.DefenceTech]: 7,
      [Technology.ImpulseMotorTech]: 5,
      [Technology.HyperspaceTech]: 5,
    },
    costs: {
      [Resource.Metal]: 33250,
      [Resource.Crystal]: 19000,
      [Resource.Deuterium]: 1425,
    },
    attack: {
      [AttackType.Normal]: 150,
    },
    defense: {
      [DefensiveType.Medium]: 5500,
    },
    shield: {
      [ShieldType.Light]: 125,
    },
    engine: EngineType.Hyperspace,
    speed: 6000,
    fuelConsumption: 50,
    capacity: 80000000,
    icon: '/images/ships/10.png',
  },
  [Ship.Battleship]: {
    name: '战列舰',
    description:
      '战列舰是舰队的支柱。他们的重型加农炮、高速和厚重的装甲使他们成为需要认真对待的对手。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 5,
      [Technology.MilitaryTech]: 7,
      [Technology.ShieldTech]: 7,
      [Technology.DefenceTech]: 7,
      [Technology.HyperspaceMotorTech]: 3,
      [Technology.LaserTech]: 10,
    },
    costs: {
      [Resource.Metal]: 38950,
      [Resource.Crystal]: 16150,
    },
    attack: {
      [AttackType.Laser]: 600,
    },
    defense: {
      [DefensiveType.Medium]: 5500,
    },
    shield: {
      [ShieldType.Medium]: 350,
    },
    engine: EngineType.Hyperspace,
    speed: 10000,
    fuelConsumption: 250,
    capacity: 1500,
    icon: '/images/ships/11.png',
  },
  [Ship.BattleCruiser]: {
    name: '战列巡洋舰',
    description: '战列巡洋舰专门拦截敌方舰队。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 6,
      [Technology.MilitaryTech]: 8,
      [Technology.ShieldTech]: 8,
      [Technology.DefenceTech]: 8,
      [Technology.ImpulseMotorTech]: 5,
      [Technology.LaserTech]: 12,
      [Technology.HyperspaceMotorTech]: 4,
    },
    costs: {
      [Resource.Metal]: 47500,
      [Resource.Crystal]: 38000,
      [Resource.Deuterium]: 9500,
    },
    attack: {
      [AttackType.Laser]: 1450,
    },
    defense: {
      [DefensiveType.Medium]: 9750,
    },
    shield: {
      [ShieldType.Medium]: 350,
    },
    engine: EngineType.Hyperspace,
    speed: 10000,
    fuelConsumption: 250,
    capacity: 750,
    icon: '/images/ships/12.png',
  },
  [Ship.BattleRecycler]: {
    name: '战场回收船',
    description: '战场回收船',
    group: ShipGroup.Recycler,
    requirements: {
      [Building.Hangar]: 9,
      [Technology.ShieldTech]: 13,
      [Technology.DefenceTech]: 13,
      [Technology.HyperspaceMotorTech]: 8,
    },
    costs: {
      [Resource.Metal]: 950000,
      [Resource.Crystal]: 570000,
      [Resource.Deuterium]: 190000,
    },
    attack: {
      [AttackType.Normal]: 250,
    },
    defense: {
      [DefensiveType.Medium]: 160000,
    },
    shield: {
      [ShieldType.Medium]: 10000,
    },
    engine: EngineType.Hyperspace,
    speed: 7500,
    fuelConsumption: 100,
    capacity: 200000000,
    icon: '/images/ships/13.png',
  },
  [Ship.StarShip]: {
    name: '星际战舰',
    description: '星际战舰具有毁灭性的破坏力。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 6,
      [Technology.MilitaryTech]: 8,
      [Technology.ShieldTech]: 8,
      [Technology.DefenceTech]: 8,
      [Technology.ImpulseMotorTech]: 5,
      [Technology.LaserTech]: 12,
      [Technology.HyperspaceMotorTech]: 4,
    },
    costs: {
      [Resource.Metal]: 57000,
      [Resource.Crystal]: 475000,
      [Resource.Deuterium]: 14250,
    },
    attack: {
      [AttackType.Laser]: 1450,
    },
    defense: {
      [DefensiveType.Medium]: 9750,
    },
    shield: {
      [ShieldType.Medium]: 350,
    },
    engine: EngineType.Hyperspace,
    speed: 10000,
    fuelConsumption: 250,
    capacity: 750,
    icon: '/images/ships/14.png',
  },
  [Ship.PlanetCracker]: {
    name: '行星轰炸机',
    description: '轰炸机是专门为摧毁行星防御而设计的。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 6,
      [Technology.MilitaryTech]: 8,
      [Technology.ShieldTech]: 6,
      [Technology.DefenceTech]: 6,
      [Technology.ImpulseMotorTech]: 5,
      [Technology.PlasmaTech]: 5,
    },
    costs: {
      [Resource.Metal]: 66500,
      [Resource.Crystal]: 38000,
      [Resource.Deuterium]: 9500,
    },
    attack: {
      [AttackType.Plasma]: 1750,
    },
    defense: {
      [DefensiveType.Medium]: 9000,
    },
    shield: {
      [ShieldType.Medium]: 700,
    },
    engine: EngineType.Impulse,
    speed: 4000,
    fuelConsumption: 1000,
    capacity: 500,
    icon: '/images/ships/15.png',
  },
  [Ship.GiantShip]: {
    name: '巨帆级',
    description:
      '星际贸易的巨擘，也配备有先进的防御系统，能在浩瀚宇宙中穿梭自如，是星际探索与征服的得力助手',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 9,
      [Technology.MilitaryTech]: 13,
      [Technology.ShieldTech]: 13,
      [Technology.DefenceTech]: 13,
      [Technology.HyperspaceMotorTech]: 6,
      [Technology.LaserTech]: 17,
      [Technology.IonicTech]: 14,
    },
    costs: {
      [Resource.Metal]: 855000,
      [Resource.Crystal]: 665000,
      [Resource.Deuterium]: 190000,
    },
    attack: {
      [AttackType.Laser]: 8750,
      [AttackType.Ion]: 26250,
    },
    defense: {
      [DefensiveType.Heavy]: 170000,
    },
    shield: {
      [ShieldType.Heavy]: 15000,
    },
    engine: EngineType.Hyperspace,
    speed: 3500,
    fuelConsumption: 950,
    capacity: 500000,
    icon: '/images/ships/16.png',
  },
  [Ship.Moraleship]: {
    name: '堡垒级',
    description:
      '堡垒级是一种专为高强度战斗设计的星际战舰等级，以其坚固的装甲、强大的武器系统和卓越的能量管理能力而自豪。',
    group: ShipGroup.Special,
    requirements: {
      [Building.Hangar]: 9,
      [Technology.MilitaryTech]: 12,
      [Technology.ShieldTech]: 13,
      [Technology.DefenceTech]: 8,
      [Technology.HyperspaceMotorTech]: 9,
    },
    costs: {
      [Resource.Metal]: 2375000,
      [Resource.Crystal]: 2375000,
      [Resource.Deuterium]: 593750,
    },
    attack: {},
    defense: {
      [DefensiveType.Light]: 500000,
    },
    shield: {
      [ShieldType.Light]: 50,
    },
    engine: EngineType.Hyperspace,
    speed: 1,
    fuelConsumption: 1,
    capacity: 1,
    icon: '/images/ships/17.png',
  },
  [Ship.Destroyer]: {
    name: '毁灭级',
    description:
      '毁灭级是终极的战争机器，以其压倒性的火力、坚不可摧的装甲和强大的能量核心震撼登场。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 10,
      [Technology.MilitaryTech]: 16,
      [Technology.ShieldTech]: 14,
      [Technology.DefenceTech]: 14,
      [Technology.HyperspaceMotorTech]: 8,
      [Technology.LaserTech]: 19,
      [Technology.IonicTech]: 17,
    },
    costs: {
      [Resource.Metal]: 2850000,
      [Resource.Crystal]: 1900000,
      [Resource.Deuterium]: 190000,
    },
    attack: {
      [AttackType.Laser]: 67500,
      [AttackType.Ion]: 22500,
    },
    defense: {
      [DefensiveType.Heavy]: 400000,
    },
    shield: {
      [ShieldType.Heavy]: 40000,
    },
    engine: EngineType.Hyperspace,
    speed: 3000,
    fuelConsumption: 1150,
    capacity: 1000000,
    icon: '/images/ships/18.png',
  },
  [Ship.Fortress]: {
    name: '战争要塞',
    description: '战争要塞过去被称为死星，其破坏力是首屈一指的，可以摧毁卫星。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 10,
      [Technology.MilitaryTech]: 16,
      [Technology.ShieldTech]: 16,
      [Technology.DefenceTech]: 16,
      [Technology.HyperspaceMotorTech]: 8,
      [Technology.HyperspaceTech]: 10,
      [Technology.GravitonTech]: 1,
    },
    costs: {
      [Resource.Metal]: 5700000,
      [Resource.Crystal]: 3325000,
      [Resource.Deuterium]: 950000,
    },
    attack: {
      [AttackType.Gravity]: 150000,
    },
    defense: {
      [DefensiveType.Medium]: 950000,
    },
    shield: {
      [ShieldType.Medium]: 50000,
    },
    engine: EngineType.Hyperspace,
    speed: 200,
    fuelConsumption: 1,
    capacity: 1000000,
    icon: '/images/ships/19.png',
  },
  [Ship.Collector]: {
    name: '收集者',
    description: '经过多年的研究，收集者现在可以收集虚空物质了。',
    group: ShipGroup.Special,
    requirements: {
      [Building.Hangar]: 9,
      [Technology.ShieldTech]: 15,
      [Technology.DefenceTech]: 15,
      [Technology.HyperspaceMotorTech]: 9,
      [Technology.HyperspaceTech]: 11,
    },
    costs: {
      [Resource.Metal]: 5700000,
      [Resource.Crystal]: 6650000,
      [Resource.Deuterium]: 2850000,
    },
    attack: {
      [AttackType.Normal]: 250,
    },
    defense: {
      [DefensiveType.Medium]: 1300000,
    },
    shield: {
      [ShieldType.Medium]: 50000,
    },
    engine: EngineType.Hyperspace,
    speed: 100,
    fuelConsumption: 1000,
    capacity: 6000000000,
    icon: '/images/ships/20.png',
  },
  [Ship.BlackMoon]: {
    name: '黑月级',
    description: '流行的死星的继任者，更快但没那么强。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 11,
      [Technology.MilitaryTech]: 16,
      [Technology.ShieldTech]: 17,
      [Technology.DefenceTech]: 17,
      [Technology.HyperspaceMotorTech]: 10,
      [Technology.HyperspaceTech]: 11,
      [Technology.LaserTech]: 21,
      [Technology.GravitonTech]: 4,
    },
    costs: {
      [Resource.Metal]: 7600000,
      [Resource.Crystal]: 3800000,
      [Resource.Deuterium]: 475000,
    },
    attack: {
      [AttackType.Laser]: 30000,
      [AttackType.Gravity]: 170000,
    },
    defense: {
      [DefensiveType.Heavy]: 1000000,
    },
    shield: {
      [ShieldType.Heavy]: 90000,
    },
    engine: EngineType.Hyperspace,
    speed: 3000,
    fuelConsumption: 1250,
    capacity: 15000000,
    icon: '/images/ships/21.png',
  },
  [Ship.Guardian]: {
    name: '守卫级',
    description:
      '守卫级是一种重型防御型星际战舰，以其强大的护盾系统、坚固的装甲和精准的火力支援能力著称。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 13,
      [Technology.MilitaryTech]: 19,
      [Technology.ShieldTech]: 18,
      [Technology.DefenceTech]: 19,
      [Technology.HyperspaceMotorTech]: 12,
      [Technology.LaserTech]: 24,
      [Technology.IonicTech]: 21,
      [Technology.GravitonTech]: 7,
    },
    costs: {
      [Resource.Metal]: 28500000,
      [Resource.Crystal]: 9500000,
      [Resource.Deuterium]: 1900000,
    },
    attack: {
      [AttackType.Laser]: 245000,
      [AttackType.Ion]: 175000,
      [AttackType.Gravity]: 210000,
    },
    defense: {
      [DefensiveType.Heavy]: 3250000,
    },
    shield: {
      [ShieldType.Heavy]: 300000,
    },
    engine: EngineType.Hyperspace,
    speed: 2500,
    fuelConsumption: 3700,
    capacity: 1500000,
    icon: '/images/ships/22.png',
  },
  [Ship.BlackWanderer]: {
    name: '黑色流浪者',
    description:
      '它如同宇宙中的幽灵，穿梭于星际之间，执行着高风险、高回报的任务，是追求刺激与冒险的理想选择。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 14,
      [Technology.MilitaryTech]: 21,
      [Technology.ShieldTech]: 21,
      [Technology.DefenceTech]: 21,
      [Technology.HyperspaceMotorTech]: 14,
      [Technology.IonicTech]: 22,
      [Technology.LaserTech]: 20,
      [Technology.GravitonTech]: 10,
      [Officer.Destroyer]: 1,
    },
    costs: {
      [Resource.Metal]: 76000000,
      [Resource.Crystal]: 38000000,
      [Resource.Deuterium]: 6650000,
    },
    attack: {
      [AttackType.Laser]: 451000,
      [AttackType.Ion]: 451000,
      [AttackType.Plasma]: 451000,
      [AttackType.Gravity]: 451000,
    },
    defense: {
      [DefensiveType.Heavy]: 10000000,
    },
    shield: {
      [ShieldType.Heavy]: 950000,
    },
    engine: EngineType.Hyperspace,
    speed: 2200,
    fuelConsumption: 5800,
    capacity: 2000000,
    icon: '/images/ships/23.png',
  },
  [Ship.DeathShip]: {
    name: '死飞级',
    description:
      '能够在瞬间改变方向和速度，是星际战斗中的佼佼者，以其卓越的机动性和火力输出成为争相追逐的顶级装备。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 14,
      [Technology.MilitaryTech]: 22,
      [Technology.ShieldTech]: 21,
      [Technology.DefenceTech]: 21,
      [Technology.HyperspaceMotorTech]: 16,
      [Technology.LaserTech]: 27,
      [Technology.PlasmaTech]: 23,
      [Technology.GravitonTech]: 11,
      [Officer.General]: 1,
    },
    costs: {
      [Resource.Metal]: 209000000,
      [Resource.Crystal]: 104500000,
      [Resource.Deuterium]: 28500000,
    },
    attack: {
      [AttackType.Laser]: 705000,
      [AttackType.Ion]: 1175000,
      [AttackType.Gravity]: 2820000,
    },
    defense: {
      [DefensiveType.Heavy]: 20500000,
    },
    shield: {
      [ShieldType.Heavy]: 2000000,
    },
    engine: EngineType.Hyperspace,
    speed: 1600,
    fuelConsumption: 10000,
    capacity: 5000000,
    icon: '/images/ships/24.png',
  },
  [Ship.HolyShip]: {
    name: '圣像战舰',
    description: '绝对最坏的情况下使用，尽管速度非常缓慢。',
    group: ShipGroup.Battle,
    requirements: {
      [Building.Hangar]: 15,
      [Technology.MilitaryTech]: 23,
      [Technology.ShieldTech]: 23,
      [Technology.DefenceTech]: 23,
      [Technology.HyperspaceMotorTech]: 16,
      [Technology.HyperspaceTech]: 17,
      [Technology.LaserTech]: 28,
      [Technology.GravitonTech]: 12,
      [Officer.Conqueror]: 1,
    },
    costs: {
      [Resource.Metal]: 289750000,
      [Resource.Crystal]: 147250000,
      [Resource.Deuterium]: 38000000,
    },
    attack: {
      [AttackType.Laser]: 300000,
      [AttackType.Ion]: 1700000,
    },
    defense: {
      [DefensiveType.Heavy]: 40500000,
    },
    shield: {
      [ShieldType.Heavy]: 4000000,
    },
    engine: EngineType.Hyperspace,
    speed: 600,
    fuelConsumption: 10000,
    capacity: 50000000,
    icon: '/images/ships/25.png',
  },
}

/**
 * 所有防御设施的配置
 */
export const DefenseConfigs: Record<Defense, DefenseConfig> = {
  [Defense.SmallLaser]: {
    name: '轻型激光塔',
    description:
      '激光是简单的地面武器，它利用特殊的瞄准系统来追踪敌人，并发射高强度激光来切割目标的外壳。',
    requirements: {
      [Building.Hangar]: 2,
      [Technology.MilitaryTech]: 2,
      [Technology.ShieldTech]: 2,
      [Technology.DefenceTech]: 2,
      [Technology.LaserTech]: 3,
    },
    costs: {
      [Resource.Metal]: 1500,
      [Resource.Crystal]: 500,
    },
    attack: {
      [AttackType.Laser]: 250,
    },
    defense: {
      [DefensiveType.Light]: 2000,
    },
    shield: {
      [ShieldType.Light]: 500,
    },
    icon: '/images/defenses/1.png',
  },
  [Defense.MissileLauncher]: {
    name: '导弹发射器',
    description: '导弹发射器是一种简单但具有成本效益的防御措施。',
    requirements: {
      [Building.Hangar]: 2,
      [Technology.MilitaryTech]: 2,
      [Technology.ShieldTech]: 2,
      [Technology.DefenceTech]: 2,
    },
    costs: {
      [Resource.Metal]: 2000,
    },
    attack: {
      [AttackType.Normal]: 50,
    },
    defense: {
      [DefensiveType.Light]: 2000,
    },
    shield: {
      [ShieldType.Light]: 400,
    },
    icon: '/images/defenses/2.png',
  },
  [Defense.IonCannon]: {
    name: '离子大炮',
    description: '离子炮是一种发射带正电或带负电的粒子的离子束武器。',
    requirements: {
      [Building.Hangar]: 3,
      [Technology.MilitaryTech]: 3,
      [Technology.ShieldTech]: 4,
      [Technology.DefenceTech]: 3,
      [Technology.IonicTech]: 4,
    },
    costs: {
      [Resource.Metal]: 2000,
      [Resource.Crystal]: 6000,
    },
    attack: {
      [AttackType.Ion]: 200,
    },
    defense: {
      [DefensiveType.Medium]: 8000,
    },
    shield: {
      [ShieldType.Medium]: 5000,
    },
    icon: '/images/defenses/3.png',
  },
  [Defense.BigLaser]: {
    name: '重型激光塔',
    description: '重型激光是轻型激光的实用改进版本。',
    requirements: {
      [Building.Hangar]: 3,
      [Technology.MilitaryTech]: 3,
      [Technology.ShieldTech]: 3,
      [Technology.DefenceTech]: 3,
      [Technology.LaserTech]: 6,
    },
    costs: {
      [Resource.Metal]: 6000,
      [Resource.Crystal]: 2000,
    },
    attack: {
      [AttackType.Laser]: 400,
    },
    defense: {
      [DefensiveType.Light]: 8000,
    },
    shield: {
      [ShieldType.Light]: 800,
    },
    icon: '/images/defenses/4.png',
  },
  [Defense.GaussCannon]: {
    name: '高斯加农炮',
    description: '高斯加农炮以极高的速度发射高密度金属弹丸。',
    requirements: {
      [Building.Hangar]: 4,
      [Technology.MilitaryTech]: 6,
      [Technology.ShieldTech]: 6,
      [Technology.DefenceTech]: 6,
    },
    costs: {
      [Resource.Metal]: 20000,
      [Resource.Crystal]: 15000,
      [Resource.Deuterium]: 2000,
    },
    attack: {
      [AttackType.Normal]: 2200,
    },
    defense: {
      [DefensiveType.Medium]: 35000,
    },
    shield: {
      [ShieldType.Medium]: 4000,
    },
    icon: '/images/defenses/5.png',
  },
  [Defense.PlasmaCannon]: {
    name: '等离子炮',
    description:
      '等离子体炮使用一个大型核反应堆为电磁加速器提供动力，该加速器发射等离子体脉冲和环形电场。',
    requirements: {
      [Building.Hangar]: 5,
      [Technology.MilitaryTech]: 7,
      [Technology.ShieldTech]: 7,
      [Technology.DefenceTech]: 7,
      [Technology.PlasmaTech]: 5,
    },
    costs: {
      [Resource.Metal]: 50000,
      [Resource.Crystal]: 50000,
      [Resource.Deuterium]: 30000,
    },
    attack: {
      [AttackType.Plasma]: 13000,
    },
    defense: {
      [DefensiveType.Medium]: 100000,
    },
    shield: {
      [ShieldType.Medium]: 16000,
    },
    icon: '/images/defenses/6.png',
  },
  [Defense.HydrogenGun]: {
    name: '氢枪',
    description: '氢枪',
    requirements: {
      [Building.Hangar]: 7,
      [Technology.MilitaryTech]: 10,
      [Technology.ShieldTech]: 10,
      [Technology.DefenceTech]: 10,
      [Technology.LaserTech]: 14,
      [Technology.IonicTech]: 11,
    },
    costs: {
      [Resource.Metal]: 200000,
      [Resource.Crystal]: 150000,
      [Resource.Deuterium]: 50000,
    },
    attack: {
      [AttackType.Laser]: 7000,
      [AttackType.Ion]: 21000,
    },
    defense: {
      [DefensiveType.Medium]: 350000,
    },
    shield: {
      [ShieldType.Medium]: 45000,
    },
    icon: '/images/defenses/7.png',
  },
  [Defense.DoraGun]: {
    name: '朵拉枪',
    description: '朵拉枪',
    requirements: {
      [Building.Hangar]: 7,
      [Technology.MilitaryTech]: 11,
      [Technology.ShieldTech]: 11,
      [Technology.DefenceTech]: 11,
      [Technology.IonicTech]: 11,
      [Technology.PlasmaTech]: 8,
    },
    costs: {
      [Resource.Metal]: 350000,
      [Resource.Crystal]: 150000,
      [Resource.Deuterium]: 75000,
    },
    attack: {
      [AttackType.Ion]: 19000,
      [AttackType.Plasma]: 19000,
    },
    defense: {
      [DefensiveType.Medium]: 500000,
    },
    shield: {
      [ShieldType.Medium]: 45000,
    },
    icon: '/images/defenses/8.png',
  },
  [Defense.SmallShield]: {
    name: '小型护盾',
    description: '小型护盾',
    requirements: {
      [Building.Hangar]: 8,
      [Technology.ShieldTech]: 12,
    },
    costs: {
      [Resource.Metal]: 1000000,
      [Resource.Crystal]: 1000000,
    },
    attack: {},
    defense: {
      [DefensiveType.Light]: 2000000,
    },
    shield: {
      [ShieldType.Light]: 200000,
    },
    icon: '/images/defenses/9.png',
  },
  [Defense.MediumShield]: {
    name: '中型护盾',
    description: '中型护盾',
    requirements: {
      [Building.Hangar]: 10,
      [Technology.ShieldTech]: 15,
    },
    costs: {
      [Resource.Metal]: 5000000,
      [Resource.Crystal]: 5000000,
    },
    attack: {},
    defense: {
      [DefensiveType.Medium]: 10000000,
    },
    shield: {
      [ShieldType.Medium]: 1000000,
    },
    icon: '/images/defenses/10.png',
  },
  [Defense.HeavyShield]: {
    name: '重型护盾',
    description: '重型护盾',
    requirements: {
      [Building.Hangar]: 12,
      [Technology.ShieldTech]: 28,
    },
    costs: {
      [Resource.Metal]: 10000000,
      [Resource.Crystal]: 5000000,
      [Resource.Deuterium]: 2500000,
    },
    attack: {},
    defense: {
      [DefensiveType.Heavy]: 15000000,
    },
    shield: {
      [ShieldType.Heavy]: 100000000,
    },
    icon: '/images/defenses/11.png',
  },
  [Defense.PhotonCannon]: {
    name: '光子炮',
    description: '光子炮',
    requirements: {
      [Building.Hangar]: 10,
      [Technology.MilitaryTech]: 14,
      [Technology.ShieldTech]: 14,
      [Technology.DefenceTech]: 14,
      [Technology.IonicTech]: 14,
      [Technology.GravitonTech]: 5,
    },
    costs: {
      [Resource.Metal]: 2500000,
      [Resource.Crystal]: 1250000,
      [Resource.Deuterium]: 350000,
    },
    attack: {
      [AttackType.Ion]: 95300,
      [AttackType.Gravity]: 95300,
    },
    defense: {
      [DefensiveType.Heavy]: 3750000,
    },
    shield: {
      [ShieldType.Heavy]: 200000,
    },
    icon: '/images/defenses/12.png',
  },
  [Defense.ElectronGun]: {
    name: '轻子枪',
    description: '轻子枪',
    requirements: {
      [Building.Hangar]: 10,
      [Technology.MilitaryTech]: 18,
      [Technology.ShieldTech]: 18,
      [Technology.DefenceTech]: 18,
      [Technology.LaserTech]: 22,
      [Technology.GravitonTech]: 3,
    },
    costs: {
      [Resource.Metal]: 10000000,
      [Resource.Crystal]: 5000000,
      [Resource.Deuterium]: 1500000,
    },
    attack: {
      [AttackType.Laser]: 280000,
      [AttackType.Gravity]: 420000,
    },
    defense: {
      [DefensiveType.Heavy]: 15000000,
    },
    shield: {
      [ShieldType.Heavy]: 1000000,
    },
    icon: '/images/defenses/13.png',
  },
  [Defense.GravitonCannon]: {
    name: '引力子炮',
    description: '引力子炮',
    requirements: {
      [Building.Hangar]: 11,
      [Technology.MilitaryTech]: 17,
      [Technology.ShieldTech]: 17,
      [Technology.DefenceTech]: 17,
      [Technology.GravitonTech]: 1,
    },
    costs: {
      [Resource.Metal]: 15000000,
      [Resource.Crystal]: 15000000,
    },
    attack: {
      [AttackType.Gravity]: 1000000,
    },
    defense: {
      [DefensiveType.Heavy]: 30000000,
    },
    shield: {
      [ShieldType.Heavy]: 1600000,
    },
    icon: '/images/defenses/14.png',
  },
  [Defense.ProtonGun]: {
    name: '质子枪',
    description:
      '经过多年的引力研究，研究人员已经开发出一种重力炮，可以产生小的集中引力场，可以向敌人射击。',
    requirements: {
      [Building.Hangar]: 12,
      [Technology.MilitaryTech]: 18,
      [Technology.ShieldTech]: 18,
      [Technology.DefenceTech]: 18,
      [Technology.PlasmaTech]: 18,
      [Technology.GravitonTech]: 8,
    },
    costs: {
      [Resource.Metal]: 25000000,
      [Resource.Crystal]: 18000000,
      [Resource.Deuterium]: 3000000,
    },
    attack: {
      [AttackType.Plasma]: 500000,
      [AttackType.Gravity]: 1500000,
    },
    defense: {
      [DefensiveType.Heavy]: 43000000,
    },
    shield: {
      [ShieldType.Heavy]: 2000000,
    },
    icon: '/images/defenses/15.png',
  },
  [Defense.ParticleCannon]: {
    name: '粒子发射器',
    description: '粒子发射器',
    requirements: {
      [Building.Hangar]: 13,
      [Technology.MilitaryTech]: 19,
      [Technology.ShieldTech]: 19,
      [Technology.DefenceTech]: 19,
      [Technology.IonicTech]: 21,
      [Technology.PlasmaTech]: 18,
      [Technology.GravitonTech]: 7,
    },
    costs: {
      [Resource.Metal]: 45000000,
      [Resource.Crystal]: 30000000,
      [Resource.Deuterium]: 8500000,
    },
    attack: {
      [AttackType.Ion]: 1050000,
      [AttackType.Plasma]: 1050000,
      [AttackType.Gravity]: 1400000,
    },
    defense: {
      [DefensiveType.Heavy]: 75000000,
    },
    shield: {
      [ShieldType.Heavy]: 5000000,
    },
    icon: '/images/defenses/16.png',
  },
  [Defense.CanyonCannon]: {
    name: '峡谷炮',
    description: '峡谷炮',
    requirements: {
      [Building.Hangar]: 13,
      [Technology.MilitaryTech]: 20,
      [Technology.ShieldTech]: 20,
      [Technology.DefenceTech]: 20,
      [Technology.IonicTech]: 22,
      [Technology.GravitonTech]: 7,
    },
    costs: {
      [Resource.Metal]: 80000000,
      [Resource.Crystal]: 60000000,
      [Resource.Deuterium]: 20000000,
    },
    attack: {
      [AttackType.Ion]: 4500000,
      [AttackType.Gravity]: 1500000,
    },
    defense: {
      [DefensiveType.Heavy]: 140000000,
    },
    shield: {
      [ShieldType.Heavy]: 10000000,
    },
    icon: '/images/defenses/17.png',
  },
  [Defense.QuantumCannon]: {
    name: '量子枪',
    description: '量子枪',
    requirements: {
      [Building.Hangar]: 14,
      [Building.NanoFactory]: 17,
      [Technology.MilitaryTech]: 22,
      [Technology.ShieldTech]: 22,
      [Technology.DefenceTech]: 22,
      [Technology.IonicTech]: 24,
      [Technology.PlasmaTech]: 21,
      [Technology.GravitonTech]: 12,
    },
    costs: {
      [Resource.Metal]: 280000000,
      [Resource.Crystal]: 150000000,
      [Resource.Deuterium]: 40000000,
    },
    attack: {
      [AttackType.Ion]: 1400000,
      [AttackType.Plasma]: 4200000,
      [AttackType.Gravity]: 8400000,
    },
    defense: {
      [DefensiveType.Heavy]: 430000000,
    },
    shield: {
      [ShieldType.Heavy]: 30000000,
    },
    icon: '/images/defenses/18.png',
  },
  [Defense.OrbitDefensePlatform]: {
    name: '轨道防御平台',
    description: '轨道防御平台',
    requirements: {
      [Building.Hangar]: 18,
      [Technology.MilitaryTech]: 28,
      [Technology.ShieldTech]: 28,
      [Technology.DefenceTech]: 28,
      [Technology.LaserTech]: 34,
      [Technology.IonicTech]: 30,
      [Technology.PlasmaTech]: 26,
      [Technology.GravitonTech]: 30,
    },
    costs: {
      [Resource.Metal]: 5000000000,
      [Resource.Crystal]: 2000000000,
      [Resource.Deuterium]: 500000000,
    },
    attack: {
      [AttackType.Laser]: 150000000,
      [AttackType.Ion]: 150000000,
      [AttackType.Plasma]: 250000000,
      [AttackType.Gravity]: 450000000,
    },
    defense: {
      [DefensiveType.Heavy]: 7000000000,
    },
    shield: {
      [ShieldType.Heavy]: 2000000000,
    },
    icon: '/images/defenses/19.png',
  },
}
