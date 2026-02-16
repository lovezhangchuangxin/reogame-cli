import { AxiosError } from 'axios'
import { CLIResponse } from '../types'
import { ErrorCode, ErrorMessages } from '../constants'
import { generateRequestId } from './output'

/**
 * 处理错误并返回 CLI 响应
 */
export function handleError(error: unknown): CLIResponse {
  // Axios 网络错误
  if (error instanceof AxiosError) {
    // 有响应，透传 API 错误
    if (error.response) {
      return {
        code: error.response.data?.code ?? ErrorCode.SERVER_ERROR,
        msg: error.response.data?.msg ?? error.message,
        data: error.response.data,
        meta: {
          timestamp: Date.now(),
          requestId: generateRequestId(),
        },
      }
    }

    // 网络层错误
    if (error.code === 'ECONNREFUSED') {
      return {
        code: ErrorCode.NETWORK_ERROR,
        msg: '无法连接到服务器',
        meta: {
          timestamp: Date.now(),
          requestId: generateRequestId(),
        },
      }
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return {
        code: ErrorCode.TIMEOUT,
        msg: '请求超时',
        meta: {
          timestamp: Date.now(),
          requestId: generateRequestId(),
        },
      }
    }

    // 其他网络错误
    return {
      code: ErrorCode.NETWORK_ERROR,
      msg: error.message,
      meta: {
        timestamp: Date.now(),
        requestId: generateRequestId(),
      },
    }
  }

  // 普通错误
  if (error instanceof Error) {
    return {
      code: ErrorCode.UNKNOWN_ERROR,
      msg: error.message,
      meta: {
        timestamp: Date.now(),
        requestId: generateRequestId(),
      },
    }
  }

  // 未知错误
  return {
    code: ErrorCode.UNKNOWN_ERROR,
    msg: ErrorMessages[ErrorCode.UNKNOWN_ERROR],
    meta: {
      timestamp: Date.now(),
      requestId: generateRequestId(),
    },
  }
}

/**
 * 导出 generateRequestId 供 output.ts 使用
 */
export { generateRequestId }
