import { Command } from 'commander'
import { GameApi } from '../../api/game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取星系信息
 */
async function getGalaxyInfo(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { galaxy, system } = options
  if (!galaxy || !system) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供银河和星系坐标')
  }

  try {
    // 获取用户数据以获取宇宙编号
    const userData = await GameApi.getMyData()
    const universe = userData.data?.universe

    if (!universe) {
      return error(ErrorCode.CLI_NOT_AUTHENTICATED, '获取用户数据失败')
    }

    const result = await GameApi.getGalaxyExtraInfo(
      universe,
      parseInt(galaxy as string, 10),
      parseInt(system as string, 10),
    )
    return success(result.data, '获取星系信息成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取废墟信息
 */
async function getDebrisInfo(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { galaxy, system } = options
  if (!galaxy || !system) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供银河和星系坐标')
  }

  try {
    const userData = await GameApi.getMyData()
    const universe = userData.data?.universe

    if (!universe) {
      return error(ErrorCode.CLI_NOT_AUTHENTICATED, '获取用户数据失败')
    }

    const result = await GameApi.getDebris(
      universe,
      parseInt(galaxy as string, 10),
      parseInt(system as string, 10),
    )
    return success(result.data, '获取废墟信息成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 galaxy 命令
 */
export function createGalaxyCommand(): Command {
  const cmd = new Command('galaxy').description('银河系相关命令')

  cmd
    .command('info')
    .description('获取星系信息')
    .requiredOption('-g, --galaxy <n>', '银河坐标')
    .requiredOption('-s, --system <n>', '星系坐标')
    .action(async (options) => {
      const result = await getGalaxyInfo(options)
      outputJSON(result)
    })

  cmd
    .command('debris')
    .description('获取废墟信息')
    .requiredOption('-g, --galaxy <n>', '银河坐标')
    .requiredOption('-s, --system <n>', '星系坐标')
    .action(async (options) => {
      const result = await getDebrisInfo(options)
      outputJSON(result)
    })

  return cmd
}
