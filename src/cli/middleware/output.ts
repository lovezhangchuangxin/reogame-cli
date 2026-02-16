import { CLIResponse } from '../types'
import { ErrorCode, ErrorMessages } from '../constants'

/**
 * 生成请求 ID
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
}

/**
 * 创建成功响应
 */
export function success<T>(data: T, msg = '操作成功'): CLIResponse<T> {
  return {
    code: ErrorCode.SUCCESS,
    msg,
    data,
    meta: {
      timestamp: Date.now(),
      requestId: generateRequestId(),
    },
  }
}

/**
 * 创建错误响应
 */
export function error(code: ErrorCode | number, msg?: string, data?: unknown): CLIResponse {
  return {
    code,
    msg: msg || ErrorMessages[code as ErrorCode] || '未知错误',
    data,
    meta: {
      timestamp: Date.now(),
      requestId: generateRequestId(),
    },
  }
}

/**
 * 从 API 响应创建 CLI 响应（透传）
 */
export function fromAPI<T>(response: { code: number; msg: string; data?: T }): CLIResponse<T> {
  return {
    code: response.code,
    msg: response.msg,
    data: response.data,
    meta: {
      timestamp: Date.now(),
      requestId: generateRequestId(),
    },
  }
}

/**
 * 输出 JSON
 */
export function outputJSON(data: unknown): void {
  console.log(JSON.stringify(data, null, 2))
}
