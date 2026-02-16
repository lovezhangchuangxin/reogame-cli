import { Command } from 'commander'
import { UserApi } from '../../api/user'
import { configManager } from '../../config'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { ErrorCode } from '../constants'

/**
 * 登录
 */
async function login(options: Record<string, unknown>): Promise<CLIResponse> {
  const { username, password, universe } = options

  if (!username || !password || !universe) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供用户名、密码和宇宙编号')
  }

  try {
    const result = await UserApi.login({
      universe: parseInt(universe as string, 10),
      username: username as string,
      password: password as string,
    })

    // 保存 token 和用户信息（密码会自动加密存储）
    configManager.setUser({
      username: username as string,
      password: password as string,
      token: result.data.token,
    })

    return success({ token: result.data.token, user: result.data.user }, '登录成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 登出
 */
async function logout(): Promise<CLIResponse> {
  configManager.setUser({ token: '' })
  return success(null, '已登出')
}

/**
 * 获取当前用户信息
 */
async function whoami(): Promise<CLIResponse> {
  const token = configManager.getUser().token

  if (!token) {
    return error(ErrorCode.CLI_NOT_AUTHENTICATED, '未登录，请先执行 ogame auth login')
  }

  try {
    const user = await UserApi.getMyInfo()
    return success(user, '获取用户信息成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 注册
 */
async function register(options: Record<string, unknown>): Promise<CLIResponse> {
  const { username, password, email, universe, code } = options

  if (!username || !password || !email || !universe || !code) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供用户名、密码、邮箱、宇宙编号和验证码')
  }

  try {
    const result = await UserApi.register(
      {
        universe: parseInt(universe as string, 10),
        username: username as string,
        password: password as string,
        email: email as string,
      },
      code as string,
    )

    // 保存 token（密码会自动加密存储）
    configManager.setUser({
      username: username as string,
      password: password as string,
      token: result.data.token,
    })

    return success({ token: result.data.token, user: result.data.user }, '注册成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 发送验证码
 */
async function sendCode(options: Record<string, unknown>): Promise<CLIResponse> {
  const { email } = options

  if (!email) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供邮箱地址')
  }

  try {
    const result = await UserApi.sendVerification(email as string)
    return success(result, '验证码已发送')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 重置密码
 */
async function resetPassword(options: Record<string, unknown>): Promise<CLIResponse> {
  const { email, code } = options

  if (!email || !code) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供邮箱和验证码')
  }

  try {
    const result = await UserApi.resetPassword(email as string, code as string)
    return success(result, '密码重置成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 刷新 Token
 */
async function refreshToken(): Promise<CLIResponse> {
  const token = configManager.getUser().token

  if (!token) {
    return error(ErrorCode.CLI_NOT_AUTHENTICATED, '未登录，请先执行 ogame auth login')
  }

  try {
    const result = await UserApi.refreshToken()
    configManager.setUser({ token: result.data.token })
    return success({ token: result.data.token }, 'Token 已刷新')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 auth 命令
 */
export function createAuthCommand(): Command {
  const cmd = new Command('auth').description('认证相关命令')

  cmd
    .command('login')
    .description('登录')
    .requiredOption('-u, --username <username>', '用户名')
    .requiredOption('-p, --password <password>', '密码')
    .requiredOption('-U, --universe <universe>', '宇宙编号')
    .action(async (options) => {
      const result = await login(options)
      outputJSON(result)
    })

  cmd
    .command('logout')
    .description('登出')
    .action(async () => {
      const result = await logout()
      outputJSON(result)
    })

  cmd
    .command('whoami')
    .description('获取当前用户信息')
    .action(async () => {
      const result = await whoami()
      outputJSON(result)
    })

  cmd
    .command('register')
    .description('注册新账户')
    .requiredOption('-u, --username <username>', '用户名')
    .requiredOption('-p, --password <password>', '密码')
    .requiredOption('-e, --email <email>', '邮箱')
    .requiredOption('-U, --universe <universe>', '宇宙编号')
    .requiredOption('--code <code>', '验证码')
    .action(async (options) => {
      const result = await register(options)
      outputJSON(result)
    })

  cmd
    .command('send-code')
    .description('发送验证码')
    .requiredOption('-e, --email <email>', '邮箱地址')
    .action(async (options) => {
      const result = await sendCode(options)
      outputJSON(result)
    })

  cmd
    .command('reset-password')
    .description('重置密码')
    .requiredOption('-e, --email <email>', '邮箱地址')
    .requiredOption('--code <code>', '验证码')
    .action(async (options) => {
      const result = await resetPassword(options)
      outputJSON(result)
    })

  cmd
    .command('refresh')
    .description('刷新 Token')
    .action(async () => {
      const result = await refreshToken()
      outputJSON(result)
    })

  return cmd
}
