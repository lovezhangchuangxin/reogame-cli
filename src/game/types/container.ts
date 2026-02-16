import { CountableElement } from '../config'

/**
 * 宝箱类型
 */
export enum ContainerType {
  /** 普通 */
  N,
  /** 稀有 */
  R,
  /** 非常稀有 */
  SR,
  /** 非常非常稀有 */
  SSR,
}

/**
 * 不同宝箱类型对应的概率
 */
export const ContainerTypeProbability: Record<ContainerType, number> = {
  [ContainerType.N]: 0.7,
  [ContainerType.R]: 0.25,
  [ContainerType.SR]: 0.04,
  [ContainerType.SSR]: 0.01,
}

/**
 * 宝箱包含的物品类型
 */
export type ContainerItemType = CountableElement

/**
 * 不同宝箱类型对应的物品价值
 */
export const ContainerTypeValue: Record<ContainerType, number> = {
  [ContainerType.N]: 1e5,
  [ContainerType.R]: 1e6,
  [ContainerType.SR]: 1e7,
  [ContainerType.SSR]: 1e8,
}

/**
 * 不同宝箱类型对应的物品及数量
 */
export type ContainerTypeItems = Record<ContainerType, [ContainerItemType, number][]>
