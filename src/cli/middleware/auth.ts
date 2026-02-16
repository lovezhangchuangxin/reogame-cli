import { configManager } from '../../config'
import { ErrorCode, ErrorMessages } from '../constants'
import { CLIResponse } from '../types'
import { generateRequestId } from './error'

/**
 * 检查是否已登录
 */
export function requireAuth(): { token: string } | CLIResponse {
  const user = configManager.getUser()

  if (!user.token) {
    return {
      code: ErrorCode.CLI_NOT_AUTHENTICATED,
      msg: ErrorMessages[ErrorCode.CLI_NOT_AUTHENTICATED],
      meta: {
        timestamp: Date.now(),
        requestId: generateRequestId(),
      },
    }
  }

  return { token: user.token }
}

/**
 * 获取当前 token
 */
export function getToken(): string | null {
  return configManager.getUser().token || null
}

/**
 * 检查是否有 token（不返回错误响应）
 */
export function isAuthenticated(): boolean {
  return !!configManager.getUser().token
}
