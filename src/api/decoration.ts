import { DecorationDefinition, DecorationType, UserDecorations } from '../game'
import { req } from './req'

export class DecorationApi {
  /**
   * 获取装饰列表
   */
  static async getDecorationList() {
    return req<DecorationDefinition[]>('POST', '/decoration/list')
  }

  /**
   * 获取用户装饰状态
   */
  static async getUserDecoration(userId: number) {
    return req<UserDecorations>('POST', '/decoration/getUserDecoration', {
      userId,
    })
  }

  /**
   * 获取当前用户的装饰状态
   */
  static async getMyDecoration() {
    return req<UserDecorations & { allDecorationIds?: string[] }>(
      'POST',
      '/decoration/getMyDecoration',
    )
  }

  /**
   * 激活装饰
   */
  static async activateDecoration(type: DecorationType, decorationId: string | null) {
    return req<void>('POST', '/decoration/activate', {
      type,
      decorationId,
    })
  }

  /**
   * 获取所有装饰（管理员）
   */
  static async getAllDecorations() {
    return req<DecorationDefinition[]>('POST', '/decoration/getAll')
  }

  /**
   * 添加装饰（管理员）
   */
  static async addDecoration(decoration: Omit<DecorationDefinition, 'id'>) {
    return req<string>('POST', '/decoration/add', { decoration })
  }

  /**
   * 更新装饰（管理员）
   */
  static async updateDecoration(decoration: DecorationDefinition) {
    return req<void>('POST', '/decoration/update', { decoration })
  }

  /**
   * 删除装饰（管理员）
   */
  static async deleteDecoration(id: string) {
    return req<void>('POST', '/decoration/delete', { id })
  }
}
