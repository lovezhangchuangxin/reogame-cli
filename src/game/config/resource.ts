/**
 * 资源相关配置
 */

import { enumToArray } from '../../utils'
import { Resource } from './enum'

/**
 * 所有资源
 */
export const ResourceList = enumToArray(Resource)

/**
 * 第一类基础资源
 */
export const ResourceList_1 = [Resource.Metal, Resource.Crystal, Resource.Deuterium]

/**
 * 第二类特殊资源，用来加速生产的资源
 */
export const ResourceList_2 = [
  Resource.Energy,
  Resource.Build,
  Resource.Tech,
  Resource.Fleet,
  Resource.Defense,
]

/**
 * 第三类氪金资源
 */
export const ResourceList_3 = [
  Resource.DarkMatter,
  Resource.AntiMatter,
  Resource.StarDust,
  Resource.Container,
]

/**
 * 第四类矿物资源
 */
export const ResourceList_4 = [
  Resource.Aluminum,
  Resource.Beryl,
  Resource.TitaniumOre,
  Resource.Emerald,
  Resource.GoldMine,
  Resource.Ruby,
  Resource.Topaz,
  Resource.IronOre,
]

/**
 * 资源类型对应的中文名称
 */
export const ResourceName: Record<Resource, string> = {
  [Resource.Metal]: '金属',
  [Resource.Crystal]: '水晶',
  [Resource.Deuterium]: '重氢',
  [Resource.Energy]: '能量',
  [Resource.Build]: '创造',
  [Resource.Tech]: '科学',
  [Resource.Fleet]: '船厂',
  [Resource.Defense]: '防御',
  [Resource.DarkMatter]: '金币',
  [Resource.AntiMatter]: '以太',
  [Resource.StarDust]: '星尘',
  [Resource.Container]: '宝箱',
  [Resource.Aluminum]: '铝土矿',
  [Resource.Beryl]: '绿柱石',
  [Resource.TitaniumOre]: '钛铁矿',
  [Resource.Emerald]: '绿宝石',
  [Resource.GoldMine]: '黄金矿',
  [Resource.Ruby]: '红玛瑙',
  [Resource.Topaz]: '孔雀石',
  [Resource.IronOre]: '黄铁矿',
}

/**
 * 不同资源类型对应的前端背景颜色
 */
export const ResourceColor: Record<Resource, string> = {
  [Resource.Metal]: '#795F60',
  [Resource.Crystal]: '#3B6096',
  [Resource.Deuterium]: '#1E6838',
  [Resource.Energy]: '#CE8F43',
  [Resource.Build]: '#923600',
  [Resource.Tech]: '#1E3E76',
  [Resource.Fleet]: '#644A06',
  [Resource.Defense]: '#393547',
  [Resource.DarkMatter]: '#eeff00ff',
  [Resource.AntiMatter]: '#75000eff',
  [Resource.StarDust]: '#b1ae00ff',
  [Resource.Container]: '#DFAF51',
  [Resource.Aluminum]: '#CEDDDF',
  [Resource.Beryl]: '#30D77E',
  [Resource.TitaniumOre]: '#6D8177',
  [Resource.Emerald]: '#3CEC21',
  [Resource.GoldMine]: '#F5EE2A',
  [Resource.Ruby]: '#E92C45',
  [Resource.Topaz]: '#148E24',
  [Resource.IronOre]: '#817400',
}
