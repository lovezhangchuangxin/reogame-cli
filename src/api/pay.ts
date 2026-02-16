import { RechargePageData } from '../game'
import { req } from './req'

export interface CreateOrderParams {
  pid: string
  type: string
  out_trade_no: string
  notify_url: string
  return_url: string
  name: string
  money: string
  sitename?: string
  sign_type: string
}

export interface CreateOrderResult {
  pid: string
  type: string
  out_trade_no: string
  notify_url: string
  return_url: string
  name: string
  money: string
  sitename: string
  sign_type: string
  sign: string
}

export class PayApi {
  /**
   * 创建支付订单
   */
  static async createOrder(params: CreateOrderParams) {
    return req<CreateOrderResult>('POST', '/pay/createOrder', params)
  }

  /**
   * 获取当前用户的充值记录
   */
  static async getMyRecharges(page: number, pageSize: number) {
    return req<RechargePageData>('GET', '/pay/myRecharges', { page, pageSize })
  }

  /**
   * 管理员获取所有充值记录
   */
  static async getAllRecharges(page: number, pageSize: number, userId?: number, username?: string) {
    return req<RechargePageData>('GET', '/pay/allRecharges', {
      page,
      pageSize,
      userId,
      username,
    })
  }
}
