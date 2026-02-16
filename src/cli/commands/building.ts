import { Command } from 'commander'
import { GameApi } from '../../api/game'
import { BuildTaskTarget } from '../../game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取建筑列表（从星球信息中提取）
 */
async function getBuildingList(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet } = options
  if (!planet) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const result = await GameApi.getMyPlanetInfo(parseInt(planet as string, 10))
    const buildings = result.data?.buildings || {}
    const queue = result.data?.buildingsQueue || []
    return success({ buildings, queue }, '获取建筑列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 建造/升级建筑
 */
async function buildBuilding(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type, amount } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和建筑类型')
  }

  try {
    const added = amount ? parseInt(amount as string, 10) : 1
    const result = await GameApi.addBuildTask(
      parseInt(planet as string, 10),
      parseInt(type as string, 10),
      added,
    )
    return success(result, '建筑任务已添加')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 取消建造任务
 */
async function cancelBuilding(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和建筑类型')
  }

  try {
    const result = await GameApi.cancelLastTaskQueue(
      parseInt(planet as string, 10),
      parseInt(type as string, 10) as BuildTaskTarget,
    )
    return success(result, '取消建造任务成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 加速建造
 */
async function accelerateBuilding(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和建筑类型')
  }

  try {
    const result = await GameApi.accelerateBuildTask(
      parseInt(planet as string, 10),
      parseInt(type as string, 10),
    )
    return success(result, '加速建造成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取建造队列
 */
async function getBuildingQueue(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet } = options
  if (!planet) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const result = await GameApi.getMyPlanetInfo(parseInt(planet as string, 10))
    const queue = result.data?.buildingsQueue || []
    return success(queue, '获取建造队列成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 building 命令
 */
export function createBuildingCommand(): Command {
  const cmd = new Command('building').description('建筑相关命令')

  cmd
    .command('list')
    .description('获取建筑列表')
    .requiredOption('--planet <id>', '星球 ID')
    .action(async (options) => {
      const result = await getBuildingList(options)
      outputJSON(result)
    })

  cmd
    .command('build')
    .description('建造/升级建筑')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '建筑类型 (枚举值)')
    .option('--amount <n>', '建造数量/等级增量', '1')
    .action(async (options) => {
      const result = await buildBuilding(options)
      outputJSON(result)
    })

  cmd
    .command('cancel')
    .description('取消建造任务')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '建筑类型 (枚举值)')
    .action(async (options) => {
      const result = await cancelBuilding(options)
      outputJSON(result)
    })

  cmd
    .command('accelerate')
    .description('加速建造')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '建筑类型 (枚举值)')
    .action(async (options) => {
      const result = await accelerateBuilding(options)
      outputJSON(result)
    })

  cmd
    .command('queue')
    .description('获取建造队列')
    .requiredOption('--planet <id>', '星球 ID')
    .action(async (options) => {
      const result = await getBuildingQueue(options)
      outputJSON(result)
    })

  return cmd
}
