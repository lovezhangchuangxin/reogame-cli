import { Command } from 'commander'

/**
 * CLI 响应结构
 */
export interface CLIResponse<T = unknown> {
  /** 状态码，0 表示成功 */
  code: number
  /** 消息，错误时包含错误原因 */
  msg: string
  /** 返回数据 */
  data?: T
  /** 元数据 */
  meta: CLIMeta
}

/**
 * CLI 元数据
 */
export interface CLIMeta {
  /** 时间戳 */
  timestamp: number
  /** 请求 ID */
  requestId?: string
}

/**
 * 命令处理器类型
 */
export type CommandHandler<T = unknown> = (
  options: Record<string, unknown>,
  command: Command,
) => Promise<CLIResponse<T>>

/**
 * 分页参数
 */
export interface PaginationOptions {
  page: number
  pageSize: number
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  list: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

/**
 * 全局选项
 */
export interface GlobalOptions {
  /** 强制 JSON 输出 */
  json?: boolean
  /** 静默模式 */
  quiet?: boolean
  /** 详细输出 */
  verbose?: boolean
  /** 禁用颜色 */
  noColor?: boolean
  /** 指定配置文件路径 */
  config?: string
  /** 指定服务器地址 */
  server?: string
}
