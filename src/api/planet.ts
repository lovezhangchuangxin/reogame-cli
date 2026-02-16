import { PlanetOverview, PointType } from '../game'
import { req } from './req'

export class PlanetApi {
  /**
   * 更新星球名称
   */
  static async updatePlanetName(planetId: number, name: string) {
    return req('POST', '/planet/updatePlanetName', { planetId, name })
  }

  /**
   * 增加星球面积
   */
  static async addPlanetField(planetId: number, addField: number) {
    return req('POST', '/planet/addPlanetField', { planetId, addField })
  }

  /**
   * 制造卫星
   */
  static async makeMoon(planetId: number) {
    return req('POST', '/planet/makeMoon', { planetId })
  }

  /**
   * 摧毁星球
   */
  static async distoryPlanet(planetId: number) {
    return req('POST', '/planet/distoryPlanet', { planetId })
  }

  /**
   * 获取星球总览数据
   */
  static async getPlanetOverviews() {
    return req<PlanetOverview[]>('POST', '/planet/getPlanetOverviews')
  }

  /**
   * 分页获取积分排名
   */
  static async getPointsRank(type: PointType, page: number, pageSize: number) {
    return req<{
      total: number
      list: {
        id: number
        username: string
        point: number
        allianceId: number
      }[]
      lastUpdate: number
    }>('POST', '/planet/getPointsRank', { type, page, pageSize })
  }

  /**
   * 获取随机一个矿物行星的id
   */
  static async researchMineralPlanet() {
    return req<number>('POST', '/planet/researchMineralPlanet')
  }

  /**
   * 迁移星球到新坐标
   */
  static async migratePlanet(
    planetId: number,
    targetCoordinate: {
      galaxy: number
      system: number
      planet: number
    },
  ) {
    return req('POST', '/planet/migratePlanet', { planetId, targetCoordinate })
  }
}
