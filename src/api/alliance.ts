import { Alliance, AlliancePublicInfo, AllianceRelation } from '../game'
import { req } from './req'

export class AllianceApi {
  /**
   * 获取我的联盟
   */
  static async getMyAlliance() {
    return req<Alliance | undefined>('POST', '/alliance/getMyAlliance')
  }

  /**
   * 创建联盟
   */
  static async createAlliance(name: string, shortName: string) {
    return req<Alliance>('POST', '/alliance/createAlliance', {
      name,
      shortName,
    })
  }

  /**
   * 解散联盟
   */
  static async disbandAlliance() {
    return req('POST', '/alliance/disbandAlliance')
  }

  /**
   * 申请加入联盟
   */
  static async applyAlliance(allianceId: number) {
    return req('POST', '/alliance/applyAlliance', {
      allianceId,
    })
  }

  /**
   * 管理员批准加入联盟
   */
  static async joinAlliance(applicantId: number) {
    return req('POST', '/alliance/joinAlliance', {
      applicantId,
    })
  }

  /**
   * 退出联盟
   */
  static async leaveAlliance() {
    return req('POST', '/alliance/leaveAlliance')
  }

  /**
   * 移除联盟成员
   */
  static async removeAllianceMember(memberId: number) {
    return req('POST', '/alliance/removeAllianceMember', {
      memberId,
    })
  }

  /**
   * 购买联盟发展
   */
  static async buyAllianceDevelop(developId: number, amount: number) {
    return req<{ amount: number }>('POST', '/alliance/buyAllianceDevelop', {
      developId,
      amount,
    })
  }

  /**
   * 修改管理员
   */
  static async changeManager(memberId: number, setManager: boolean) {
    return req('POST', '/alliance/changeManager', {
      memberId,
      setManager,
    })
  }

  /**
   * 设置联盟公告
   */
  static async setAllianceNotice(notice: string, isInner: boolean) {
    return req('POST', '/alliance/setAllianceNotice', {
      notice,
      isInner,
    })
  }

  /**
   * 申请联盟关系
   */
  static async applyAllianceRelation(allianceId: number, relation: AllianceRelation) {
    return req('POST', '/alliance/applyAllianceRelation', {
      allianceId,
      relation,
    })
  }

  /**
   * 批准联盟关系
   */
  static async setAllianceRelation(allianceId: number, relation: AllianceRelation) {
    return req('POST', '/alliance/setAllianceRelation', {
      allianceId,
      relation,
    })
  }

  /**
   * 发送联盟消息
   */
  static async sendAllianceMessage(message: string) {
    return req('POST', '/alliance/sendAllianceMessage', {
      message,
    })
  }

  /**
   * 修改联盟名称或简称
   */
  static async changeAllianceName(name?: string, shortName?: string) {
    return req('POST', '/alliance/changeAllianceName', {
      name,
      shortName,
    })
  }

  /**
   * 分页获取排行榜
   */
  static async getAllianceRank(page: number, pageSize: number) {
    return req<{
      lastUpdate: number
      total: number
      list: (AlliancePublicInfo | undefined)[]
    }>('POST', '/alliance/getAllianceRank', {
      page,
      pageSize,
    })
  }

  /**
   * 分页搜索联盟
   */
  static async searchAlliance(page: number, pageSize: number, keyword: string) {
    return req<{ total: number; list: (AlliancePublicInfo | undefined)[] }>(
      'POST',
      '/alliance/searchAlliance',
      {
        page,
        pageSize,
        keyword,
      },
    )
  }

  /**
   * 转让盟主
   */
  static async transferOwnership(memberId: number) {
    return req('POST', '/alliance/transferOwnership', {
      memberId,
    })
  }

  /**
   * 获取联盟的公开信息
   */
  static async getAlliancePublicInfo(allianceId: number) {
    return req<AlliancePublicInfo | undefined>('POST', '/alliance/getAlliancePublicInfo', {
      allianceId,
    })
  }
}
