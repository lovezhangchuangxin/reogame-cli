import { ChatMessage, MessageDetail, ShortMessage } from '../game'
import { req } from './req'

export class MessageApi {
  /**
   * 获取我的消息列表
   */
  static async getMyMessageList() {
    return req<ShortMessage[]>('POST', '/message/getMyMessageList')
  }

  /**
   * 获取玩家指定 id 的消息
   */
  static async getMessageById(messageId: string) {
    return req<MessageDetail>('POST', '/message/getMessageById', { messageId })
  }

  /**
   * 将消息标记为已读
   */
  static async readMessage(messageId: string | string[]) {
    return req<void>('POST', '/message/readMessage', { messageId })
  }

  /**
   * 获取聊天室记录
   */
  static async getChatMessage() {
    return req<ChatMessage[]>('POST', '/message/getChatMessage')
  }

  /**
   * 发送聊天室记录
   */
  static async sendChatMessage(message: string) {
    return req<ChatMessage[]>('POST', '/message/sendChatMessage', { message })
  }

  /**
   * 删除单条聊天消息（管理员功能）
   */
  static async deleteChatMessage(messageId: number) {
    return req<void>('POST', '/admin/deleteChatMessage', { messageId })
  }
}
