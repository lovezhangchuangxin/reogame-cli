import { Command } from 'commander'
import { GameApi } from '../../api/game'
import { BuildTaskTarget } from '../../game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取科技列表
 */
async function getTechList(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await GameApi.getMyData()
    const technologies = result.data?.technologies || {}
    const queue = result.data?.technologiesQueue || []
    return success({ technologies, queue }, '获取科技列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 研究科技
 */
async function researchTech(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { type, amount, planetId } = options
  if (!type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供科技类型')
  }

  try {
    // 如果没有指定星球ID，获取主星球ID
    let targetPlanetId = planetId ? parseInt(planetId as string, 10) : 0
    if (!targetPlanetId) {
      const userData = await GameApi.getMyData()
      targetPlanetId = userData.data?.mainPlanetId || 0
    }

    const added = amount ? parseInt(amount as string, 10) : 1
    const result = await GameApi.addBuildTask(
      targetPlanetId,
      parseInt(type as string, 10),
      added,
    )
    return success(result, '科技研究已开始')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 取消研究
 */
async function cancelTech(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { type, planetId } = options
  if (!type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供科技类型')
  }

  try {
    // 如果没有指定星球ID，获取主星球ID
    let targetPlanetId = planetId ? parseInt(planetId as string, 10) : 0
    if (!targetPlanetId) {
      const userData = await GameApi.getMyData()
      targetPlanetId = userData.data?.mainPlanetId || 0
    }

    const result = await GameApi.cancelLastTaskQueue(
      targetPlanetId,
      parseInt(type as string, 10) as BuildTaskTarget,
    )
    return success(result, '取消研究成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 加速研究
 */
async function accelerateTech(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { type, planetId } = options
  if (!type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供科技类型')
  }

  try {
    // 如果没有指定星球ID，获取主星球ID
    let targetPlanetId = planetId ? parseInt(planetId as string, 10) : 0
    if (!targetPlanetId) {
      const userData = await GameApi.getMyData()
      targetPlanetId = userData.data?.mainPlanetId || 0
    }

    const result = await GameApi.accelerateBuildTask(
      targetPlanetId,
      parseInt(type as string, 10) as BuildTaskTarget,
    )
    return success(result, '加速研究成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取研究队列
 */
async function getTechQueue(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await GameApi.getMyData()
    const queue = result.data?.technologiesQueue || []
    return success(queue, '获取研究队列成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 tech 命令
 */
export function createTechCommand(): Command {
  const cmd = new Command('tech').description('科技相关命令')

  cmd
    .command('list')
    .description('获取科技列表')
    .action(async () => {
      const result = await getTechList()
      outputJSON(result)
    })

  cmd
    .command('research')
    .description('研究科技')
    .requiredOption('--type <type>', '科技类型 (枚举值)')
    .option('--amount <n>', '研究等级增量', '1')
    .option('--planet-id <id>', '星球ID (不指定则使用主星球)')
    .action(async (options) => {
      const result = await researchTech(options)
      outputJSON(result)
    })

  cmd
    .command('cancel')
    .description('取消研究')
    .requiredOption('--type <type>', '科技类型 (枚举值)')
    .option('--planet-id <id>', '星球ID (不指定则使用主星球)')
    .action(async (options) => {
      const result = await cancelTech(options)
      outputJSON(result)
    })

  cmd
    .command('accelerate')
    .description('加速研究')
    .requiredOption('--type <type>', '科技类型 (枚举值)')
    .option('--planet-id <id>', '星球ID (不指定则使用主星球)')
    .action(async (options) => {
      const result = await accelerateTech(options)
      outputJSON(result)
    })

  cmd
    .command('queue')
    .description('获取研究队列')
    .action(async () => {
      const result = await getTechQueue()
      outputJSON(result)
    })

  return cmd
}
