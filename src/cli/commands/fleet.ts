import { Command } from 'commander'
import { FleetApi } from '../../api/fleet'
import { FleetTaskType, Ship } from '../../game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取舰队列表
 */
async function getFleetList(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const planetId = options.planet ? parseInt(options.planet as string, 10) : undefined
    const result = await FleetApi.getMyFleetList(planetId)
    return success(result.data, '获取舰队列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 派遣舰队
 */
async function sendFleet(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { from, to, type, ships, resources, stayTime } = options
  if (!from || !to || !type || !ships) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供来源星球、目标坐标、任务类型和舰船')
  }

  try {
    // 解析坐标 "galaxy:system:planet"
    const [galaxy, system, planet] = (to as string).split(':').map(Number)
    if (!galaxy || !system || !planet) {
      return error(ErrorCode.CLI_PARAM_INVALID, '坐标格式错误，应为 "galaxy:system:planet"')
    }

    // 解析舰船 JSON
    let shipsData: [Ship, number][]
    try {
      const parsed = JSON.parse(ships as string)
      shipsData = Object.entries(parsed).map(([shipId, count]) => [
        parseInt(shipId, 10) as Ship,
        count as number,
      ])
    } catch {
      return error(ErrorCode.CLI_PARAM_INVALID, '舰船格式错误，应为 JSON 对象')
    }

    // 获取用户 ID
    const { GameApi } = await import('../../api/game')
    const userData = await GameApi.getMyData()
    const ownerId = userData.data?.id
    if (!ownerId) {
      return error(ErrorCode.CLI_NOT_AUTHENTICATED, '获取用户数据失败')
    }

    // 构建任务
    const task = {
      sourceId: parseInt(from as string, 10),
      targetId: (galaxy << 26) + (system << 20) + (planet << 10) + 1, // 行星类型
      targetType: 1, // PlanetType.Planet
      ownerId,
      type: parseInt(type as string, 10) as FleetTaskType,
      ships: shipsData,
      resources: resources ? JSON.parse(resources as string) : {},
      stayTime: stayTime ? parseInt(stayTime as string, 10) : 0,
      status: 0,
      startTime: Date.now(),
      arriveTime: Date.now() + 3600000, // 默认 1 小时
      acs: false,
    }

    const result = await FleetApi.addFleetTask(task)
    return success(result.data, '舰队已派遣')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 舰队返航
 */
async function returnFleet(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id } = options
  if (!id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供舰队任务 ID')
  }

  try {
    const result = await FleetApi.fleetReturn(id as string)
    return success(result, '舰队已返航')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取战报列表
 */
async function getBattleList(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const page = options.page ? parseInt(options.page as string, 10) : 1
    const size = options.size ? parseInt(options.size as string, 10) : 20

    // 需要从用户数据获取 universe
    const { GameApi } = await import('../../api/game')
    const userData = await GameApi.getMyData()
    const universe = userData.data?.universe

    if (!universe) {
      return error(ErrorCode.CLI_NOT_AUTHENTICATED, '获取用户数据失败')
    }

    const result = await FleetApi.getBattleDetails(universe, page, size)
    return success(result.data, '获取战报列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取战报详情
 */
async function getBattleDetail(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id } = options
  if (!id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供战报 ID')
  }

  try {
    const { GameApi } = await import('../../api/game')
    const userData = await GameApi.getMyData()
    const universe = userData.data?.universe

    if (!universe) {
      return error(ErrorCode.CLI_NOT_AUTHENTICATED, '获取用户数据失败')
    }

    const result = await FleetApi.getBattleDetailById(universe, id as string)
    return success(result.data, '获取战报详情成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 fleet 命令
 */
export function createFleetCommand(): Command {
  const cmd = new Command('fleet').description('舰队相关命令')

  cmd
    .command('list')
    .description('获取舰队列表')
    .option('--planet <id>', '星球 ID')
    .action(async (options) => {
      const result = await getFleetList(options)
      outputJSON(result)
    })

  cmd
    .command('send')
    .description('派遣舰队')
    .requiredOption('--from <id>', '来源星球 ID')
    .requiredOption('--to <coord>', '目标坐标 (galaxy:system:planet)')
    .requiredOption('--type <type>', '任务类型 (枚举值)')
    .requiredOption('--ships <json>', '舰船 JSON，如 \'{"300": 100}\'')
    .option('--resources <json>', '携带资源 JSON')
    .option('--stay-time <seconds>', '驻守时间（秒）')
    .action(async (options) => {
      const result = await sendFleet(options)
      outputJSON(result)
    })

  cmd
    .command('return')
    .description('舰队返航')
    .requiredOption('--id <id>', '舰队任务 ID')
    .action(async (options) => {
      const result = await returnFleet(options)
      outputJSON(result)
    })

  cmd
    .command('battle-list')
    .description('获取战报列表')
    .option('--page <n>', '页码', '1')
    .option('--size <n>', '每页数量', '20')
    .action(async (options) => {
      const result = await getBattleList(options)
      outputJSON(result)
    })

  cmd
    .command('battle')
    .description('获取战报详情')
    .requiredOption('--id <id>', '战报 ID')
    .action(async (options) => {
      const result = await getBattleDetail(options)
      outputJSON(result)
    })

  return cmd
}
