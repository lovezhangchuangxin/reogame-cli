import { ACSInviteInfo, BattleDetail, FleetTask, Ship } from '../game'
import { req } from './req'

export class FleetApi {
  /**
   * 获取我的舰队列表
   */
  static async getMyFleetList(planetId?: number) {
    return req<FleetTask[]>('POST', '/fleet/getMyFleetList', { planetId })
  }

  /**
   * 添加舰队
   */
  static async addFleetTask(task: Omit<FleetTask, 'id'>) {
    return req<FleetTask>('POST', '/fleet/addFleetTask', task)
  }

  /**
   * 分页获取战报
   */
  static async getBattleDetails(universeId: number, page: number, pageSize: number) {
    return req<{ data: BattleDetail[]; total: number }>('POST', '/fleet/getBattleDetails', {
      universeId,
      page,
      pageSize,
    })
  }

  /**
   * 获取指定战报
   */
  static async getBattleDetailById(universeId: number, id: string) {
    return req<BattleDetail>('POST', '/fleet/getBattleDetailById', {
      universeId,
      id,
    })
  }

  /**
   * 舰队返航
   */
  static async fleetReturn(id: string) {
    return req('POST', '/fleet/fleetReturn', { id })
  }

  /**
   * 舰队立即到达
   */
  static async fleetArriveNow(id: string) {
    return req('POST', '/fleet/fleetArriveNow', { id })
  }

  /**
   * 联合攻击发布
   */
  static async actionACS(id: string) {
    return req('POST', '/fleet/actionACS', { id })
  }

  /**
   * 联合攻击取消
   */
  static async cancelACS(id: string) {
    return req('POST', '/fleet/cancelACS', { id })
  }

  /**
   * 联合攻击：邀请
   */
  static async inviteACS(id: string, invitedUserId: string) {
    return req('POST', '/fleet/inviteACS', { id, invitedUserId })
  }

  /**
   * 获取联合攻击邀请
   */
  static async getInviteACS() {
    return req<ACSInviteInfo[]>('POST', '/fleet/getInviteACS')
  }

  /**
   * 拒绝联合攻击邀请
   */
  static async ACSReject(taskId: string) {
    return req('POST', '/fleet/ACSReject', { taskId })
  }

  /**
   * 支援联合攻击邀请
   */
  static async ACSAssist(
    taskId: string,
    fleet: Partial<Record<number, [Ship, number][]>>,
    startTime: number,
    arriveTime: number,
  ) {
    return req('POST', '/fleet/ACSAssist', {
      taskId,
      fleet,
      startTime,
      arriveTime,
    })
  }
}
