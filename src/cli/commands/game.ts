import { Command } from 'commander'
import { GameApi } from '../../api/game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取游戏数据
 */
async function getGameData(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await GameApi.getMyData()
    return success(result.data, '获取游戏数据成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取宇宙列表
 */
async function getUniverseList(): Promise<CLIResponse> {
  try {
    const result = await GameApi.getUniverseList()
    return success(result.data, '获取宇宙列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取宇宙配置
 */
async function getUniverseConfig(options: Record<string, unknown>): Promise<CLIResponse> {
  try {
    const universeId = options.universe ? parseInt(options.universe as string, 10) : undefined
    const result = await GameApi.getUniverseConfig(universeId)
    return success(result.data, '获取宇宙配置成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取公告
 */
async function getAnnouncement(options: Record<string, unknown>): Promise<CLIResponse> {
  try {
    const universeId = options.universe ? parseInt(options.universe as string, 10) : undefined
    const result = await GameApi.getAnnouncement(universeId as number)
    return success(result.data, '获取公告成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 每日签到
 */
async function signIn(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet } = options
  if (!planet) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const result = await GameApi.signIn(parseInt(planet as string, 10))
    return success(result.data, '签到成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 开宝箱
 */
async function openContainer(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, amount } = options
  if (!planet) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const num = amount ? parseInt(amount as string, 10) : 1
    const result = await GameApi.openContainer(parseInt(planet as string, 10), num)
    return success(result.data, '开宝箱成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 game 命令
 */
export function createGameCommand(): Command {
  const cmd = new Command('game').description('游戏相关命令')

  cmd
    .command('data')
    .description('获取我的游戏数据')
    .action(async () => {
      const result = await getGameData()
      outputJSON(result)
    })

  cmd
    .command('universe-list')
    .description('获取宇宙列表')
    .action(async () => {
      const result = await getUniverseList()
      outputJSON(result)
    })

  cmd
    .command('universe-config')
    .description('获取宇宙配置')
    .option('-U, --universe <id>', '宇宙编号')
    .action(async (options) => {
      const result = await getUniverseConfig(options)
      outputJSON(result)
    })

  cmd
    .command('announcement')
    .description('获取公告')
    .requiredOption('-U, --universe <id>', '宇宙编号')
    .action(async (options) => {
      const result = await getAnnouncement(options)
      outputJSON(result)
    })

  cmd
    .command('sign-in')
    .description('每日签到')
    .requiredOption('--planet <id>', '星球 ID')
    .action(async (options) => {
      const result = await signIn(options)
      outputJSON(result)
    })

  cmd
    .command('open-container')
    .description('开宝箱')
    .requiredOption('--planet <id>', '星球 ID')
    .option('--amount <n>', '开宝箱数量', '1')
    .action(async (options) => {
      const result = await openContainer(options)
      outputJSON(result)
    })

  return cmd
}
