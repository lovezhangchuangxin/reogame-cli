import { BuyableElement, Order, ProductInfo, Transaction } from '../game'
import { req } from './req'

export class MarketApi {
  /**
   * 获取指定资源的所有订单
   */
  static async getResourceOrders(resourceType: BuyableElement) {
    return req<Order[]>('POST', '/market/getResourceOrders', { resourceType })
  }

  /**
   * 获取玩家的订单
   */
  static async getUserOrders() {
    return req<Order[]>('POST', '/market/getUserOrders')
  }

  /**
   * 创建订单
   */
  static async createOrder(
    planetId: number,
    type: 'buy' | 'sell',
    resourceType: BuyableElement,
    price: number,
    amount: number,
  ) {
    return req<Order>('POST', '/market/createOrder', {
      planetId,
      type,
      resourceType,
      price,
      amount,
    })
  }

  /**
   * 取消订单
   */
  static async cancelOrder(orderId: string) {
    return req('POST', '/market/cancelOrder', { orderId })
  }

  /**
   * deal 订单
   */
  static async dealOrder(planetId: number, orderId: string, amount: number) {
    return req<{ amount: number }>('POST', '/market/dealOrder', {
      planetId,
      orderId,
      amount,
    })
  }

  /**
   * 获取玩家的交易记录
   */
  static async getUserTransactions(page: number, pageSize: number) {
    return req<{
      data: Transaction[]
      total: number
      users: Record<number, string>
    }>('POST', '/market/getUserTransactions', {
      page,
      pageSize,
    })
  }

  /**
   * 修改订单价格
   */
  static async changeOrderPrice(orderId: string, price: number) {
    return req('POST', '/market/changeOrderPrice', { orderId, price })
  }

  /**
   * 订单扩容
   */
  static async extendOrder(orderId: string, add: number) {
    return req('POST', '/market/extendOrder', { orderId, add })
  }

  /**
   * 获取市场商品
   */
  static async getMarketProducts() {
    return req<ProductInfo[]>('POST', '/market/getMarketProducts', {
      statusList: ['on'],
    })
  }

  /**
   * 购买商品
   */
  static async buyProduct(planetId: number, productId: string, amount: number) {
    return req('POST', '/market/buyProduct', { planetId, productId, amount })
  }

  /**
   * 添加商品
   */
  static async addProduct(product: Omit<ProductInfo, 'id'>) {
    return req<string>('POST', '/market/addProduct', { product })
  }

  /**
   * 更新商品
   */
  static async updateProduct(product: ProductInfo) {
    return req<boolean>('POST', '/market/updateProduct', { product })
  }

  /**
   * 获取商品分类
   */
  static async getProductCategories() {
    return req<string[]>('POST', '/market/getProductCategories')
  }
}
