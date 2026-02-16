import { Command } from 'commander'
import { GameApi } from '../../api/game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取星球列表
 */
async function getPlanetList(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const userData = await GameApi.getMyData()
    const user = userData.data
    if (!user) {
      return error(ErrorCode.CLI_NOT_AUTHENTICATED, '获取用户数据失败')
    }

    // 获取所有星球信息
    const planetsResult = await GameApi.getMyAllPlanetsInfo(user.universe, user.id)
    return success(planetsResult.data, '获取星球列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取星球详情
 */
async function getPlanetInfo(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id } = options
  if (!id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const result = await GameApi.getMyPlanetInfo(parseInt(id as string, 10))
    return success(result.data, '获取星球详情成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取星球总览（包含资源和队列信息）
 */
async function getPlanetOverview(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const userData = await GameApi.getMyData()
    const user = userData.data
    if (!user) {
      return error(ErrorCode.CLI_NOT_AUTHENTICATED, '获取用户数据失败')
    }

    // 获取所有星球信息
    const planetsResult = await GameApi.getMyAllPlanetsInfo(user.universe, user.id)

    // 构建概览数据
    const overview = {
      user: {
        id: user.id,
        username: user.username,
        universe: user.universe,
        points: user.points,
      },
      planets: planetsResult.data,
    }

    return success(overview, '获取星球总览成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 planet 命令
 */
export function createPlanetCommand(): Command {
  const cmd = new Command('planet').description('星球相关命令')

  cmd
    .command('list')
    .description('获取星球列表')
    .action(async () => {
      const result = await getPlanetList()
      outputJSON(result)
    })

  cmd
    .command('get')
    .description('获取星球详情')
    .requiredOption('--id <id>', '星球 ID')
    .action(async (options) => {
      const result = await getPlanetInfo(options)
      outputJSON(result)
    })

  cmd
    .command('overview')
    .description('获取星球总览')
    .action(async () => {
      const result = await getPlanetOverview()
      outputJSON(result)
    })

  return cmd
}
