/**
 * 建筑相关配置
 */

import { enumToArray } from '../../utils'
import { PlanetType } from '../types'
import { Building, Resource, Resource_1, Resource_2, Technology } from './enum'
import { ResourceList_1, ResourceList_2 } from './resource'
import { ElementBaseConfig } from './types'

/**
 * 所有建筑
 */
export const BuildingList = enumToArray(Building)

/**
 * 建筑配置类型
 */
export interface BuildingConfig extends ElementBaseConfig {
  /** 最大等级 */
  maxLevel?: number
  /** 升级基数，建筑升级的公式是一个指数函数，`factor` 就是底数 */
  factor: number
  /** 建筑资源产量公式，使用 eval 解析 */
  production?: Partial<Record<Resource, string>>
  /** 建筑资源存储公式，使用 eval 解析 */
  storage?: Partial<Record<Resource, string>>
  /** 建筑所在位置是行星还是卫星，[1]是行星，[3]是卫星，[1,3]是行星和卫星都有 */
  positionType: PlanetType[]
  /** 图片 */
  icon: string
}

/**
 * 所有建筑配置
 */
export const BuildingConfigs: Record<Building, BuildingConfig> = {
  [Building.MetalMine]: {
    name: '金属加工厂',
    description: '金属矿提供一切生产活动所需的基本资源，可用来建造建筑物和研究科技、制造战舰。',
    requirements: {
      [Building.SolarPlant]: 1,
    },
    costs: {
      [Resource.Metal]: 60,
      [Resource.Crystal]: 15,
    },
    factor: 1.5,
    production: {
      [Resource.Metal]: '30 * level * Math.pow(1.1, level)',
      [Resource.Energy]: '-10 * level * Math.pow(1.1, level)',
    },
    positionType: [1],
    icon: '/images/buildings/1.png',
  },
  [Building.CrystalMine]: {
    name: '水晶开采厂',
    description: '水晶是生产电子元件和生产合金的主要资源之一。',
    requirements: {
      [Building.SolarPlant]: 1,
    },
    costs: {
      [Resource.Metal]: 48,
      [Resource.Crystal]: 24,
    },
    factor: 1.5,
    production: {
      [Resource.Crystal]: '30 * level * Math.pow(1.1, level)',
      [Resource.Energy]: '-10 * level * Math.pow(1.1, level)',
    },
    positionType: [1],
    icon: '/images/buildings/2.png',
  },
  [Building.DeuteriumSintetizer]: {
    name: '重氢精炼厂',
    description: '重氢是舰船的燃料，可以从深海中提取，重氢属于稀有物质，相当珍贵而且重要。',
    requirements: {
      [Building.SolarPlant]: 1,
    },
    costs: {
      [Resource.Metal]: 225,
      [Resource.Crystal]: 75,
    },
    factor: 1.8,
    production: {
      [Resource.Deuterium]: '30 * level * Math.pow(1.1, level)',
      [Resource.Energy]: '-30 * level * Math.pow(1.1, level)',
    },
    positionType: [1],
    icon: '/images/buildings/3.png',
  },
  [Building.SolarPlant]: {
    name: '太阳能电站',
    description:
      '太阳能发电站将光能转换为电能，以提供几乎所有的建筑物使用，特别是相当耗费能量的资源建筑。',
    requirements: {},
    costs: {
      [Resource.Metal]: 75,
      [Resource.Crystal]: 30,
    },
    factor: 1.5,
    production: {
      [Resource.Energy]: '30 * level * Math.pow(1.1, level)',
    },
    positionType: [1],
    icon: '/images/buildings/4.png',
  },
  [Building.University]: {
    name: '星际学院',
    description:
      '为了更快的发展超级科技，政府创办星际学院，将最优秀的科学家集中起来，缩短研究时间。',
    requirements: {
      [Building.RobotFactory]: 10,
      [Building.Laboratory]: 22,
      [Building.NanoFactory]: 4,
      [Technology.ComputerTech]: 12,
      [Technology.IntergalacticTech]: 3,
    },
    costs: {
      [Resource.Metal]: 200,
      [Resource.Crystal]: 100,
    },
    factor: 2.0,
    production: {
      [Resource.Tech]: '30 * level',
    },
    positionType: [1],
    icon: '/images/buildings/5.png',
  },
  [Building.FusionPlant]: {
    name: '聚变反应堆',
    description: '核电站利用重氢来生产电力，级别越高消耗重氢的速度越快，提供的电量也越大。',
    requirements: {
      [Building.DeuteriumSintetizer]: 5,
      [Technology.EnergyTech]: 3,
    },
    costs: {
      [Resource.Metal]: 900,
      [Resource.Crystal]: 360,
      [Resource.Deuterium]: 180,
    },
    factor: 2.0,
    production: {
      [Resource.Energy]: '100 * level * Math.pow(1.1, level)',
      [Resource.Deuterium]: '-10 * level * Math.pow(1.1, level)',
    },
    positionType: [1],
    icon: '/images/buildings/6.png',
  },
  [Building.RobotFactory]: {
    name: '机器人工厂',
    description:
      '机器人工厂提供便宜且高效的劳动力用于基础建设，每提升一级，建筑物升级的速度也就越快。',
    requirements: {
      [Building.SolarPlant]: 1,
    },
    costs: {
      [Resource.Metal]: 400,
      [Resource.Crystal]: 120,
      [Resource.Deuterium]: 200,
    },
    factor: 1.5,
    production: {
      [Resource.Fleet]: '30 * level ',
      [Resource.Build]: '40 * level',
      [Resource.Defense]: '30 * level ',
    },
    positionType: [1, 3],
    icon: '/images/buildings/7.png',
  },
  [Building.NanoFactory]: {
    name: '纳米机器人工厂',
    description: '纳米机器人工厂是用来生产纳米等级的微型机器人，进一步增加生产力。',
    requirements: {
      [Building.RobotFactory]: 5,
      [Technology.ComputerTech]: 10,
    },
    costs: {
      [Resource.Metal]: 1000,
      [Resource.Crystal]: 500,
      [Resource.Deuterium]: 200,
    },
    factor: 1.5,
    production: {
      [Resource.Fleet]: '60 * level ',
      [Resource.Build]: '60 * level ',
      [Resource.Defense]: '60 * level ',
    },
    positionType: [1, 3],
    icon: '/images/buildings/8.png',
  },
  [Building.Hangar]: {
    name: '造船厂',
    description: '所有宇宙舰船都必须在造船场里进行建造，他是星际时代最基础，也是不可缺的建筑。',
    requirements: {
      [Building.RobotFactory]: 2,
    },
    costs: {
      [Resource.Metal]: 400,
      [Resource.Crystal]: 200,
      [Resource.Deuterium]: 100,
    },
    factor: 1.5,
    production: {
      [Resource.Fleet]: '20 * level ',
      [Resource.Defense]: '40 * level ',
    },
    positionType: [1, 3],
    icon: '/images/buildings/9.png',
  },
  [Building.MetalStorage]: {
    name: '金属仓库',
    description: '随着金属矿的仓库的等级提升，可以储存更多的金属矿。',
    requirements: {
      [Building.RobotFactory]: 3,
      [Technology.ComputerTech]: 3,
      [Technology.EnergyTech]: 2,
    },
    costs: {
      [Resource.Metal]: 1000,
      [Resource.Crystal]: 0,
    },
    factor: 1.5,
    storage: {
      [Resource.Metal]: 'Math.floor(2.5 * Math.pow(1.8331954764, level)) * 5000',
    },
    positionType: [1, 3],
    icon: '/images/buildings/10.png',
  },
  [Building.CrystalStorage]: {
    name: '水晶仓库',
    description: '随着水晶矿仓库的等级提升，将会有更多的空间来放置这种重要物资。',
    requirements: {
      [Building.RobotFactory]: 3,
      [Technology.ComputerTech]: 3,
      [Technology.EnergyTech]: 2,
    },
    costs: {
      [Resource.Metal]: 1000,
      [Resource.Crystal]: 500,
    },
    factor: 1.5,
    storage: {
      [Resource.Crystal]: 'Math.floor(2.5 * Math.pow(1.8331954764, level)) * 5000',
    },
    positionType: [1, 3],
    icon: '/images/buildings/11.png',
  },
  [Building.DeuteriumStorage]: {
    name: '重氢仓库',
    description: '随着该建筑的升级，我们可以储存更多的重氢资源。',
    requirements: {
      [Building.RobotFactory]: 3,
      [Technology.ComputerTech]: 3,
      [Technology.EnergyTech]: 2,
    },
    costs: {
      [Resource.Metal]: 1000,
      [Resource.Crystal]: 1000,
    },
    factor: 1.5,
    storage: {
      [Resource.Deuterium]: 'Math.floor(2.5 * Math.pow(1.8331954764, level)) * 5000',
    },
    positionType: [1, 3],
    icon: '/images/buildings/12.png',
  },
  [Building.Laboratory]: {
    name: '研究院',
    description:
      '研究实验室是星际殖民者重要的建筑之一，而它所研究的科技决定了一个殖民的实力究竟如何。',
    requirements: {
      [Building.SolarPlant]: 1,
    },
    costs: {
      [Resource.Metal]: 200,
      [Resource.Crystal]: 400,
    },
    factor: 1.5,
    production: {
      [Resource.Tech]: '10 * level ',
    },
    positionType: [1],
    icon: '/images/buildings/13.png',
  },
  [Building.Terraformer]: {
    name: '地形改造机',
    description:
      '使用大量的能量能创造出一整块大陆，在这个建筑物里生产着特别设计的纳米机器人，以确保创造出的陆块的可用性和品质。',
    requirements: {
      [Building.NanoFactory]: 1,
      [Technology.EnergyTech]: 12,
    },
    costs: {
      [Resource.Metal]: 1500,
      [Resource.Crystal]: 1000,
    },
    factor: 1.8,
    production: {
      [Resource.Energy]: '-60 * level * Math.pow(1.1, level)',
    },
    positionType: [1],
    icon: '/images/buildings/14.png',
  },
  // [Building.AllyDeposit]: {
  //   name: '联盟空间站',
  //   description:
  //     '联盟太空站建立以后，允许友好舰队停泊在轨道上空，以协助防御，并提供舰队所需的燃料。',
  //   requirements: {
  //     [Building.NanoFactory]: 5,
  //   },
  //   costs: {
  //     [Resource.Metal]: 2000,
  //     [Resource.Crystal]: 2000,
  //     [Resource.Deuterium]: 0,
  //   },
  //   factor: 2.0,
  //   positionType: [1, 3],
  // },
  [Building.MoonBase]: {
    name: '卫星基地',
    description: '卫星上面没有大气层，因此必须在其他建筑物定居之前建立卫星基地。',
    requirements: {},
    costs: {
      [Resource.Metal]: 2000,
      [Resource.Crystal]: 2000,
      [Resource.Deuterium]: 1000,
    },
    factor: 1.5,
    positionType: [3],
    icon: '/images/buildings/15.png',
  },
  [Building.PhalaxSensor]: {
    name: '传感器阵列',
    description: '传感器阵列允许您监控舰队动向，等级越高，传感器方阵的覆盖范围就越大。',
    requirements: {
      [Building.MoonBase]: 1,
    },
    costs: {
      [Resource.Metal]: 2000,
      [Resource.Crystal]: 2000,
      [Resource.Deuterium]: 1000,
    },
    factor: 1.5,
    positionType: [3],
    icon: '/images/buildings/16.png',
  },
  // [Building.Jumpgate]: {
  //   name: '跃迁传送门',
  //   description:
  //     '跃迁传送门是巨大的传送装置，能够瞬间将庞大的舰队传送到宇宙的各个角落，而不需要任何时间。',
  //   requirements: {
  //     [Building.Hangar]: 1,
  //   },
  //   costs: {
  //     [Resource.Metal]: 2000,
  //     [Resource.Crystal]: 2000,
  //     [Resource.Deuterium]: 1000,
  //   },
  //   factor: 1.5,
  //   positionType: [3],
  // },
  [Building.ResourceModule]: {
    name: '资源模块',
    description: '资源模块增加金属、水晶、重氢的效率。',
    requirements: {
      [Building.RobotFactory]: 5,
      [Technology.ComputerTech]: 7,
      [Technology.EnergyTech]: 7,
      [Technology.GravitonTech]: 1,
    },
    costs: {
      [Resource.Metal]: 500,
      [Resource.Crystal]: 500,
      [Resource.Deuterium]: 500,
    },
    factor: 1.5,
    production: {
      [Resource.Metal]: '60 * level * Math.pow(1.1, level)',
      [Resource.Crystal]: '60 * level * Math.pow(1.1, level)',
      [Resource.Deuterium]: '60 * level * Math.pow(1.1, level)',
    },
    positionType: [1],
    icon: '/images/buildings/17.png',
  },
  [Building.DefensiveModule]: {
    name: '防御模块',
    description: '防御模块增加创造、防御设施的效率。',
    requirements: {
      [Building.RobotFactory]: 5,
      [Technology.ComputerTech]: 7,
      [Technology.EnergyTech]: 7,
      [Technology.GravitonTech]: 1,
    },
    costs: {
      [Resource.Metal]: 500,
      [Resource.Crystal]: 500,
      [Resource.Deuterium]: 500,
    },
    factor: 1.5,
    production: {
      [Resource.Build]: '20 * level ',
      [Resource.Defense]: '20 * level ',
    },
    positionType: [1],
    icon: '/images/buildings/18.png',
  },
  [Building.MilitaryModule]: {
    name: '军工模块',
    description: '军工模块增加船厂的效率。',
    requirements: {
      [Building.RobotFactory]: 5,
      [Technology.ComputerTech]: 7,
      [Technology.EnergyTech]: 7,
      [Technology.GravitonTech]: 1,
    },
    costs: {
      [Resource.Metal]: 500,
      [Resource.Crystal]: 500,
      [Resource.Deuterium]: 500,
    },
    factor: 1.5,
    production: {
      [Resource.Fleet]: '60 * level ',
    },
    positionType: [1],
    icon: '/images/buildings/19.png',
  },
  [Building.ResearchModule]: {
    name: '研究模块',
    description: '研究模块增加科学的效率。',
    requirements: {
      [Building.RobotFactory]: 5,
      [Technology.ComputerTech]: 7,
      [Technology.EnergyTech]: 7,
      [Technology.GravitonTech]: 1,
    },
    costs: {
      [Resource.Metal]: 500,
      [Resource.Crystal]: 500,
      [Resource.Deuterium]: 500,
    },
    factor: 1.5,
    production: {
      [Resource.Tech]: '60 * level ',
    },
    positionType: [1],
    icon: '/images/buildings/20.png',
  },
}

/**
 * 预先计算与每种资源生产、消耗、存储有关的建筑
 */
export const ResProdBuildingsMap = Object.entries(BuildingConfigs).reduce(
  (map, [key, config]) => {
    const building = +key as Building
    Object.keys(config.storage || {}).forEach((res) => {
      const resource = +res as Resource_1 | Resource_2
      if (!map[resource]) {
        map[resource] = {
          storage: [],
          production: [],
        }
      }

      map[resource].storage.push(building)
    })

    Object.keys(config.production || {}).forEach((res) => {
      const resource = +res as Resource_1 | Resource_2
      if (!map[resource]) {
        map[resource] = {
          storage: [],
          production: [],
        }
      }

      map[resource].production.push(building)
    })

    return map
  },
  {} as Record<
    Resource_1 | Resource_2,
    {
      /** 与该资源容量有关的建筑 */
      storage: Building[]
      /** 与该资源产出或者消耗有关的建筑 */
      production: Building[]
    }
  >,
)
;[...ResourceList_1, ...ResourceList_2].forEach((type) => {
  if (!ResProdBuildingsMap[type]) {
    ResProdBuildingsMap[type] = {
      storage: [],
      production: [],
    }
  }
})
