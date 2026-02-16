import { Command } from 'commander'
import { configManager } from '../../config'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { ErrorCode } from '../constants'

/**
 * 获取配置
 */
async function getConfig(): Promise<CLIResponse> {
  const config = configManager.get()
  return success(config, '获取配置成功')
}

/**
 * 设置配置
 */
async function setConfig(options: Record<string, unknown>): Promise<CLIResponse> {
  const updates: Partial<{
    server: { host?: string; port?: number; https?: boolean }
    user: { username?: string; password?: string; token?: string }
  }> = {}

  // 服务器配置
  if (options.host || options.port || options.https !== undefined) {
    updates.server = {}
    if (options.host) updates.server.host = options.host as string
    if (options.port) updates.server.port = parseInt(options.port as string, 10)
    if (options.https !== undefined) updates.server.https = !!options.https
  }

  // 用户配置
  if (options.username || options.password || options.token) {
    updates.user = {}
    if (options.username) updates.user.username = options.username as string
    if (options.password) updates.user.password = options.password as string
    if (options.token) updates.user.token = options.token as string
  }

  if (Object.keys(updates).length === 0) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供要设置的配置项')
  }

  configManager.update(updates)
  return success(configManager.get(), '配置已更新')
}

/**
 * 重置配置
 */
async function resetConfig(): Promise<CLIResponse> {
  configManager.reset()
  return success(configManager.get(), '配置已重置')
}

/**
 * 创建 config 命令
 */
export function createConfigCommand(): Command {
  const cmd = new Command('config').description('配置管理命令')

  cmd
    .command('get')
    .description('获取当前配置')
    .action(async () => {
      const result = await getConfig()
      outputJSON(result)
    })

  cmd
    .command('set')
    .description('设置配置')
    .option('--host <host>', '服务器地址')
    .option('--port <port>', '服务器端口')
    .option('--https', '使用 HTTPS')
    .option('--no-https', '不使用 HTTPS')
    .option('--username <username>', '用户名')
    .option('--password <password>', '密码')
    .option('--token <token>', '认证 Token')
    .action(async (options) => {
      const result = await setConfig(options)
      outputJSON(result)
    })

  cmd
    .command('reset')
    .description('重置为默认配置')
    .action(async () => {
      const result = await resetConfig()
      outputJSON(result)
    })

  return cmd
}
