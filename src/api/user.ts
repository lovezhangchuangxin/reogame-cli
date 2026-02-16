import { PlayerInfo, User, UserSafeData } from '../game'
import { req } from './req'

export class UserApi {
  /**
   * 注册
   */
  static async register(
    user: Pick<User, 'universe' | 'username' | 'password' | 'email'>,
    verification: string,
    inviter?: { universeId: number; userId: number },
  ) {
    return req<{
      token: string
      user: User
    }>('POST', '/login/register', { user, verification, inviter })
  }

  /**
   * 登录
   */
  static async login(user: Pick<User, 'universe' | 'username' | 'password'>) {
    return req<{
      token: string
      user: User
    }>('POST', '/login', user)
  }

  /**
   * 获取我的信息
   */
  static async getMyInfo() {
    return req<User>('GET', '/user/me')
  }

  /**
   * 获取用户信息
   */
  static async getUserInfo(universe: number, id: number) {
    return req<UserSafeData>('GET', '/user/info', {
      universe,
      id,
    })
  }

  /**
   * 获取所有用户信息
   */
  static async getAllUserInfo(universe: number) {
    return req<UserSafeData[]>('GET', '/user/allInfo', {
      universe,
    })
  }

  /**
   * 发送验证码
   */
  static async sendVerification(email: string) {
    return req<{ verification: string }>('POST', '/login/verification', {
      email,
    })
  }

  /**
   * 管理员获取验证码
   */
  static async getVerification(email: string) {
    return req<{ verification: string | null }>('POST', '/user/verification', {
      email,
    })
  }

  /**
   * 重置密码（登录界面的忘记密码时使用）
   */
  static async resetPassword(email: string, verification: string) {
    return req<{ verification: string }>('POST', '/login/reset', {
      email,
      verification,
    })
  }

  /**
   * 刷新 token
   */
  static async refreshToken() {
    return req<{ token: string }>('POST', '/user/refreshToken')
  }

  /**
   * 修改密码（设置界面使用）
   */
  static async changePassword(oldPassword: string, newPassword: string) {
    return req('POST', '/user/changePassword', {
      oldPassword,
      newPassword,
    })
  }

  /**
   * 激活安全模式
   */
  static async actionSF() {
    return req('POST', '/user/actionSF')
  }

  /**
   * 补充安全模式
   */
  static async addSF() {
    return req('POST', '/user/addSF')
  }

  /**
   * 获取在线人数
   */
  static async getOnlineCount(universe?: number) {
    return req<number>('POST', '/user/getOnlineCount', { universe })
  }

  /**
   * 获取用户名
   */
  static async getUserName(universe: number, id: number) {
    return req<string>('POST', '/user/getUserName', { universe, id })
  }

  /**
   * 获取玩家信息
   */
  static async getPlayerInfos(ids: number[]) {
    return req<Record<number, PlayerInfo>>('POST', '/user/getPlayerInfos', {
      ids,
    })
  }

  /**
   * 获取邀请人的信息
   */
  static async getInviterInfos() {
    return req<{
      inviter: Record<number, PlayerInfo>
      invitees: Record<number, PlayerInfo>
    }>('POST', '/user/getInviterInfos')
  }

  /**
   * 播放器设置
   */
  static async musicSetting(showPlayer: boolean, autoPlay: boolean) {
    return req('POST', '/user/musicSetting', { showPlayer, autoPlay })
  }

  /**
   * 删除账户
   */
  static async deleteAccount() {
    return req('POST', '/user/deleteAccount')
  }

  /**
   * 更新用户信息
   */
  static async updateUserInfo(info: Partial<User>) {
    return req('POST', '/user/updateInfo', info)
  }
}
