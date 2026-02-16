import { Command } from 'commander'
import { AdminApi } from '../../api/admin'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取日志文件列表
 */
async function getLogFiles(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.getLogFiles()
    return success(result.data, '获取日志文件列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取日志内容
 */
async function getLogContent(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { file, cursor, limit, level, module, traceId, userId, startTime, endTime } = options
  if (!file) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供日志文件名')
  }

  try {
    const result = await AdminApi.getLogContent(
      file as string,
      cursor ? parseInt(cursor as string, 10) : 0,
      limit ? parseInt(limit as string, 10) : 200,
      {
        level: level as string,
        module: module as string,
        traceId: traceId as string,
        userId: userId as string,
        startTime: startTime as string,
        endTime: endTime as string,
      },
    )
    return success(result.data, '获取日志内容成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取玩家列表
 */
async function getUserList(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.getUserList()
    return success(result.data, '获取玩家列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 分页获取玩家数据
 */
async function getUserListByPage(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { page, size, universe, username, id } = options

  try {
    const query: Record<string, unknown> = {}
    if (universe) query.universe = parseInt(universe as string, 10)
    if (username) query.username = username
    if (id) query.id = parseInt(id as string, 10)

    const result = await AdminApi.getUserListByPage(
      query,
      page ? parseInt(page as string, 10) : 1,
      size ? parseInt(size as string, 10) : 20,
    )
    return success(result.data, '获取玩家列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取玩家信息
 */
async function checkUserConfig(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { universe, id } = options
  if (!universe || !id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供宇宙编号和玩家 ID')
  }

  try {
    const result = await AdminApi.checkUserConfig(
      parseInt(universe as string, 10),
      parseInt(id as string, 10),
    )
    return success(result.data, '获取玩家配置成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 修改玩家配置
 */
async function changeUserConfig(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { universe, id, darkMatter, antiMatter, starDust, container } = options
  if (!universe || !id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供宇宙编号和玩家 ID')
  }

  try {
    const config = {
      DarkMatter: darkMatter ? parseInt(darkMatter as string, 10) : 0,
      AntiMatter: antiMatter ? parseInt(antiMatter as string, 10) : 0,
      StarDust: starDust ? parseInt(starDust as string, 10) : 0,
      Container: container ? parseInt(container as string, 10) : 0,
    }

    const result = await AdminApi.changeUserConfig(
      parseInt(universe as string, 10),
      parseInt(id as string, 10),
      config,
    )
    return success(result.data, '修改玩家配置成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 修改封禁时间
 */
async function changeBannedTime(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { universe, id, time } = options
  if (!universe || !id || time === undefined) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供宇宙编号、玩家 ID 和封禁时间')
  }

  try {
    const result = await AdminApi.changeBannedTime(
      parseInt(universe as string, 10),
      parseInt(id as string, 10),
      parseInt(time as string, 10),
    )
    return success(result, '修改封禁时间成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取在线用户
 */
async function getOnlineUsers(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.getOnlineUsers()
    return success(result.data, '获取在线用户成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取用户星球
 */
async function getUserPlanets(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { universe, id } = options
  if (!universe || !id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供宇宙编号和玩家 ID')
  }

  try {
    const result = await AdminApi.getUserPlanets(
      parseInt(universe as string, 10),
      parseInt(id as string, 10),
    )
    return success(result.data, '获取用户星球成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 修改公告
 */
async function changeAnnouncement(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { universe, content } = options
  if (!universe || !content) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供宇宙编号和公告内容')
  }

  try {
    const result = await AdminApi.changeAnnouncement(
      parseInt(universe as string, 10),
      content as string,
    )
    return success(result, '修改公告成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 删除用户
 */
async function deleteUser(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { universe, id, confirm } = options
  if (!universe || !id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供宇宙编号和玩家 ID')
  }
  if (!confirm) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请使用 --confirm 确认删除')
  }

  try {
    const result = await AdminApi.deleteUser(
      parseInt(universe as string, 10),
      parseInt(id as string, 10),
    )
    return success(result, '删除用户成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取多账户 IP
 */
async function getMultiUserIps(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.getMultiUserIps()
    return success(result.data, '获取多账户 IP 成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取多账户统计
 */
async function getMultiAccountStatistics(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.getMultiAccountStatistics()
    return success(result.data, '获取多账户统计成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 刷新多账户检测
 */
async function refreshMultiAccountDetection(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.refreshMultiAccountDetection()
    return success(result.data, '刷新多账户检测成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 检查数据库
 */
async function checkLeveldb(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.checkLeveldb()
    return success(result.data, '检查数据库成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取矿主开关状态
 */
async function getMineralHostStatus(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.getMineralHostStatus()
    return success(result.data, '获取矿主开关状态成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 切换矿主开关
 */
async function toggleMineralHost(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AdminApi.MineralHostSwitch()
    return success(result.data, '切换矿主开关成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 admin 命令
 */
export function createAdminCommand(): Command {
  const cmd = new Command('admin').description('管理员命令')

  // 日志相关
  cmd
    .command('log-files')
    .description('获取日志文件列表')
    .action(async () => {
      const result = await getLogFiles()
      outputJSON(result)
    })

  cmd
    .command('log-content')
    .description('获取日志内容')
    .requiredOption('--file <name>', '日志文件名')
    .option('--cursor <n>', '游标位置', '0')
    .option('--limit <n>', '行数限制', '200')
    .option('--level <level>', '日志级别过滤')
    .option('--module <module>', '模块过滤')
    .option('--trace-id <id>', '追踪 ID')
    .option('--user-id <id>', '用户 ID')
    .option('--start-time <time>', '开始时间')
    .option('--end-time <time>', '结束时间')
    .action(async (options) => {
      const result = await getLogContent(options)
      outputJSON(result)
    })

  // 用户管理
  cmd
    .command('user-list')
    .description('获取玩家列表')
    .action(async () => {
      const result = await getUserList({})
      outputJSON(result)
    })

  cmd
    .command('users')
    .description('分页获取玩家数据')
    .option('--page <n>', '页码', '1')
    .option('--size <n>', '每页数量', '20')
    .option('--universe <n>', '宇宙编号')
    .option('--username <name>', '用户名')
    .option('--id <id>', '玩家 ID')
    .action(async (options) => {
      const result = await getUserListByPage(options)
      outputJSON(result)
    })

  cmd
    .command('user-config')
    .description('获取玩家配置')
    .requiredOption('--universe <n>', '宇宙编号')
    .requiredOption('--id <id>', '玩家 ID')
    .action(async (options) => {
      const result = await checkUserConfig(options)
      outputJSON(result)
    })

  cmd
    .command('set-user-config')
    .description('修改玩家配置')
    .requiredOption('--universe <n>', '宇宙编号')
    .requiredOption('--id <id>', '玩家 ID')
    .option('--dark-matter <n>', '暗物质')
    .option('--anti-matter <n>', '反物质')
    .option('--star-dust <n>', '星尘')
    .option('--container <n>', '容器')
    .action(async (options) => {
      const result = await changeUserConfig(options)
      outputJSON(result)
    })

  cmd
    .command('set-banned-time')
    .description('修改封禁时间')
    .requiredOption('--universe <n>', '宇宙编号')
    .requiredOption('--id <id>', '玩家 ID')
    .requiredOption('--time <timestamp>', '封禁时间戳')
    .action(async (options) => {
      const result = await changeBannedTime(options)
      outputJSON(result)
    })

  cmd
    .command('online-users')
    .description('获取在线用户')
    .action(async () => {
      const result = await getOnlineUsers()
      outputJSON(result)
    })

  cmd
    .command('user-planets')
    .description('获取用户星球')
    .requiredOption('--universe <n>', '宇宙编号')
    .requiredOption('--id <id>', '玩家 ID')
    .action(async (options) => {
      const result = await getUserPlanets(options)
      outputJSON(result)
    })

  cmd
    .command('set-announcement')
    .description('修改公告')
    .requiredOption('--universe <n>', '宇宙编号')
    .requiredOption('--content <text>', '公告内容')
    .action(async (options) => {
      const result = await changeAnnouncement(options)
      outputJSON(result)
    })

  cmd
    .command('delete-user')
    .description('删除用户')
    .requiredOption('--universe <n>', '宇宙编号')
    .requiredOption('--id <id>', '玩家 ID')
    .option('--confirm', '确认删除')
    .action(async (options) => {
      const result = await deleteUser(options)
      outputJSON(result)
    })

  // 多账户检测
  cmd
    .command('multi-account-ips')
    .description('获取多账户 IP')
    .action(async () => {
      const result = await getMultiUserIps()
      outputJSON(result)
    })

  cmd
    .command('multi-account-stats')
    .description('获取多账户统计')
    .action(async () => {
      const result = await getMultiAccountStatistics()
      outputJSON(result)
    })

  cmd
    .command('refresh-multi-account')
    .description('刷新多账户检测')
    .action(async () => {
      const result = await refreshMultiAccountDetection()
      outputJSON(result)
    })

  // 系统维护
  cmd
    .command('check-db')
    .description('检查数据库')
    .action(async () => {
      const result = await checkLeveldb()
      outputJSON(result)
    })

  cmd
    .command('mineral-host-status')
    .description('获取矿主开关状态')
    .action(async () => {
      const result = await getMineralHostStatus()
      outputJSON(result)
    })

  cmd
    .command('toggle-mineral-host')
    .description('切换矿主开关')
    .action(async () => {
      const result = await toggleMineralHost()
      outputJSON(result)
    })

  return cmd
}
