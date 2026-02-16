import { Command } from 'commander'
import { GameApi } from '../../api/game'
import { BuildTaskTarget } from '../../game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取舰船列表
 */
async function getShipList(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet } = options
  if (!planet) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const result = await GameApi.getMyPlanetInfo(parseInt(planet as string, 10))
    const ships = result.data?.ships || {}
    const queue = result.data?.shipsQueue || []
    return success({ ships, queue }, '获取舰船列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 建造舰船
 */
async function buildShip(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type, amount } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和舰船类型')
  }

  try {
    const added = amount ? parseInt(amount as string, 10) : 1
    const result = await GameApi.addBuildTask(
      parseInt(planet as string, 10),
      parseInt(type as string, 10),
      added,
    )
    return success(result, '舰船建造任务已添加')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 取消舰船建造
 */
async function cancelShip(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和舰船类型')
  }

  try {
    // taskType 3 = 舰船
    const result = await GameApi.cancelLastTaskQueue(
      parseInt(planet as string, 10),
      parseInt(type as string, 10) as BuildTaskTarget,
    )
    return success(result, '取消舰船建造成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 加速舰船建造
 */
async function accelerateShip(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和舰船类型')
  }

  try {
    const result = await GameApi.accelerateBuildTask(
      parseInt(planet as string, 10),
      parseInt(type as string, 10) as BuildTaskTarget,
    )
    return success(result, '加速舰船建造成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取舰船建造队列
 */
async function getShipQueue(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet } = options
  if (!planet) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const result = await GameApi.getMyPlanetInfo(parseInt(planet as string, 10))
    const queue = result.data?.shipsQueue || []
    return success(queue, '获取舰船建造队列成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 ship 命令
 */
export function createShipCommand(): Command {
  const cmd = new Command('ship').description('舰船相关命令')

  cmd
    .command('list')
    .description('获取舰船列表')
    .requiredOption('--planet <id>', '星球 ID')
    .action(async (options) => {
      const result = await getShipList(options)
      outputJSON(result)
    })

  cmd
    .command('build')
    .description('建造舰船')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '舰船类型 (枚举值)')
    .option('--amount <n>', '建造数量', '1')
    .action(async (options) => {
      const result = await buildShip(options)
      outputJSON(result)
    })

  cmd
    .command('cancel')
    .description('取消舰船建造')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '舰船类型 (枚举值)')
    .action(async (options) => {
      const result = await cancelShip(options)
      outputJSON(result)
    })

  cmd
    .command('accelerate')
    .description('加速舰船建造')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '舰船类型 (枚举值)')
    .action(async (options) => {
      const result = await accelerateShip(options)
      outputJSON(result)
    })

  cmd
    .command('queue')
    .description('获取舰船建造队列')
    .requiredOption('--planet <id>', '星球 ID')
    .action(async (options) => {
      const result = await getShipQueue(options)
      outputJSON(result)
    })

  return cmd
}
