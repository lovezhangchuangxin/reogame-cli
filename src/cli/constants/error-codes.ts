/**
 * CLI 错误码定义
 * 注：API 层错误直接透传，此处仅定义 CLI 层和网络层错误
 */
export enum ErrorCode {
  /** 成功 */
  SUCCESS = 0,

  // CLI 层错误 10xxx
  /** 未登录 */
  CLI_NOT_AUTHENTICATED = 10001,
  /** 配置文件错误 */
  CLI_CONFIG_ERROR = 10002,
  /** 参数缺失 */
  CLI_PARAM_MISSING = 10003,
  /** 参数格式错误 */
  CLI_PARAM_INVALID = 10004,

  // 网络层错误 50xxx
  /** 网络错误 */
  NETWORK_ERROR = 50001,
  /** 服务器错误 */
  SERVER_ERROR = 50002,
  /** 请求超时 */
  TIMEOUT = 50003,
  /** 未知错误 */
  UNKNOWN_ERROR = 50004,
}

/**
 * 错误码对应的默认消息
 */
export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.SUCCESS]: '操作成功',
  [ErrorCode.CLI_NOT_AUTHENTICATED]: '未登录，请先执行 ogame auth login',
  [ErrorCode.CLI_CONFIG_ERROR]: '配置文件错误',
  [ErrorCode.CLI_PARAM_MISSING]: '缺少必要参数',
  [ErrorCode.CLI_PARAM_INVALID]: '参数格式错误',
  [ErrorCode.NETWORK_ERROR]: '网络连接失败',
  [ErrorCode.SERVER_ERROR]: '服务器错误',
  [ErrorCode.TIMEOUT]: '请求超时',
  [ErrorCode.UNKNOWN_ERROR]: '未知错误',
}
