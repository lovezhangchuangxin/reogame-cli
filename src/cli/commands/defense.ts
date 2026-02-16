import { Command } from 'commander'
import { GameApi } from '../../api/game'
import { BuildTaskTarget } from '../../game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取防御列表
 */
async function getDefenseList(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet } = options
  if (!planet) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const result = await GameApi.getMyPlanetInfo(parseInt(planet as string, 10))
    const defenses = result.data?.defenses || {}
    const queue = result.data?.defensesQueue || []
    return success({ defenses, queue }, '获取防御列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 建造防御
 */
async function buildDefense(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type, amount } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和防御类型')
  }

  try {
    const added = amount ? parseInt(amount as string, 10) : 1
    const result = await GameApi.addBuildTask(
      parseInt(planet as string, 10),
      parseInt(type as string, 10),
      added,
    )
    return success(result, '防御建造任务已添加')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 取消防御建造
 */
async function cancelDefense(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和防御类型')
  }

  try {
    const result = await GameApi.cancelLastTaskQueue(
      parseInt(planet as string, 10),
      parseInt(type as string, 10) as BuildTaskTarget,
    )
    return success(result, '取消防御建造成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 加速防御建造
 */
async function accelerateDefense(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type } = options
  if (!planet || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID 和防御类型')
  }

  try {
    const result = await GameApi.accelerateBuildTask(
      parseInt(planet as string, 10),
      parseInt(type as string, 10) as BuildTaskTarget,
    )
    return success(result, '加速防御建造成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取防御建造队列
 */
async function getDefenseQueue(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet } = options
  if (!planet) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球 ID')
  }

  try {
    const result = await GameApi.getMyPlanetInfo(parseInt(planet as string, 10))
    const queue = result.data?.defensesQueue || []
    return success(queue, '获取防御建造队列成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 defense 命令
 */
export function createDefenseCommand(): Command {
  const cmd = new Command('defense').description('防御设施相关命令')

  cmd
    .command('list')
    .description('获取防御列表')
    .requiredOption('--planet <id>', '星球 ID')
    .action(async (options) => {
      const result = await getDefenseList(options)
      outputJSON(result)
    })

  cmd
    .command('build')
    .description('建造防御设施')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '防御类型 (枚举值)')
    .option('--amount <n>', '建造数量', '1')
    .action(async (options) => {
      const result = await buildDefense(options)
      outputJSON(result)
    })

  cmd
    .command('cancel')
    .description('取消防御建造')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '防御类型 (枚举值)')
    .action(async (options) => {
      const result = await cancelDefense(options)
      outputJSON(result)
    })

  cmd
    .command('accelerate')
    .description('加速防御建造')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '防御类型 (枚举值)')
    .action(async (options) => {
      const result = await accelerateDefense(options)
      outputJSON(result)
    })

  cmd
    .command('queue')
    .description('获取防御建造队列')
    .requiredOption('--planet <id>', '星球 ID')
    .action(async (options) => {
      const result = await getDefenseQueue(options)
      outputJSON(result)
    })

  return cmd
}
