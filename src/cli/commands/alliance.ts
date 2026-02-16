import { Command } from 'commander'
import { AllianceApi } from '../../api/alliance'
import { AllianceRelation } from '../../game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取我的联盟
 */
async function getMyAlliance(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AllianceApi.getMyAlliance()
    return success(result.data, '获取联盟信息成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建联盟
 */
async function createAlliance(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { name, short } = options
  if (!name || !short) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供联盟名称和简称')
  }

  try {
    const result = await AllianceApi.createAlliance(name as string, short as string)
    return success(result.data, '创建联盟成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 解散联盟
 */
async function disbandAlliance(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { confirm } = options
  if (!confirm) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请使用 --confirm 确认解散联盟')
  }

  try {
    const result = await AllianceApi.disbandAlliance()
    return success(result, '解散联盟成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 申请加入联盟
 */
async function applyAlliance(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id } = options
  if (!id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供联盟 ID')
  }

  try {
    const result = await AllianceApi.applyAlliance(parseInt(id as string, 10))
    return success(result, '申请已提交')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 批准加入联盟
 */
async function joinAlliance(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { userId } = options
  if (!userId) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供用户 ID')
  }

  try {
    const result = await AllianceApi.joinAlliance(parseInt(userId as string, 10))
    return success(result, '批准成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 退出联盟
 */
async function leaveAlliance(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await AllianceApi.leaveAlliance()
    return success(result, '已退出联盟')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 移除联盟成员
 */
async function removeMember(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { userId } = options
  if (!userId) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供用户 ID')
  }

  try {
    const result = await AllianceApi.removeAllianceMember(parseInt(userId as string, 10))
    return success(result, '移除成员成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 转让盟主
 */
async function transferOwnership(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { userId } = options
  if (!userId) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供用户 ID')
  }

  try {
    const result = await AllianceApi.transferOwnership(parseInt(userId as string, 10))
    return success(result, '转让盟主成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取联盟排行
 */
async function getAllianceRank(options: Record<string, unknown>): Promise<CLIResponse> {
  try {
    const page = options.page ? parseInt(options.page as string, 10) : 1
    const size = options.size ? parseInt(options.size as string, 10) : 20

    const result = await AllianceApi.getAllianceRank(page, size)
    return success(result.data, '获取联盟排行成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 搜索联盟
 */
async function searchAlliance(options: Record<string, unknown>): Promise<CLIResponse> {
  const { keyword, page, size } = options
  if (!keyword) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供搜索关键词')
  }

  try {
    const pageNum = page ? parseInt(page as string, 10) : 1
    const sizeNum = size ? parseInt(size as string, 10) : 20

    const result = await AllianceApi.searchAlliance(pageNum, sizeNum, keyword as string)
    return success(result.data, '搜索联盟成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 设置联盟公告
 */
async function setNotice(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { content, inner } = options
  if (!content) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供公告内容')
  }

  try {
    const result = await AllianceApi.setAllianceNotice(content as string, !!inner)
    return success(result, '设置公告成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 设置联盟关系
 */
async function setRelation(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id, type } = options
  if (!id || !type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供联盟 ID 和关系类型')
  }

  try {
    const result = await AllianceApi.setAllianceRelation(
      parseInt(id as string, 10),
      parseInt(type as string, 10) as AllianceRelation,
    )
    return success(result, '设置关系成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 发送联盟消息
 */
async function sendMessage(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { content } = options
  if (!content) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供消息内容')
  }

  try {
    const result = await AllianceApi.sendAllianceMessage(content as string)
    return success(result, '发送消息成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 alliance 命令
 */
export function createAllianceCommand(): Command {
  const cmd = new Command('alliance').description('联盟相关命令')

  cmd
    .command('get')
    .description('获取我的联盟')
    .action(async () => {
      const result = await getMyAlliance()
      outputJSON(result)
    })

  cmd
    .command('create')
    .description('创建联盟')
    .requiredOption('-n, --name <name>', '联盟名称')
    .requiredOption('-s, --short <name>', '联盟简称')
    .action(async (options) => {
      const result = await createAlliance(options)
      outputJSON(result)
    })

  cmd
    .command('disband')
    .description('解散联盟')
    .option('--confirm', '确认解散')
    .action(async (options) => {
      const result = await disbandAlliance(options)
      outputJSON(result)
    })

  cmd
    .command('apply')
    .description('申请加入联盟')
    .requiredOption('--id <id>', '联盟 ID')
    .action(async (options) => {
      const result = await applyAlliance(options)
      outputJSON(result)
    })

  cmd
    .command('join')
    .description('批准用户加入联盟')
    .requiredOption('--user <id>', '用户 ID')
    .action(async (options) => {
      const result = await joinAlliance(options)
      outputJSON(result)
    })

  cmd
    .command('leave')
    .description('退出联盟')
    .action(async () => {
      const result = await leaveAlliance()
      outputJSON(result)
    })

  cmd
    .command('remove')
    .description('移除联盟成员')
    .requiredOption('--user <id>', '用户 ID')
    .action(async (options) => {
      const result = await removeMember(options)
      outputJSON(result)
    })

  cmd
    .command('transfer')
    .description('转让盟主')
    .requiredOption('--user <id>', '用户 ID')
    .action(async (options) => {
      const result = await transferOwnership(options)
      outputJSON(result)
    })

  cmd
    .command('rank')
    .description('获取联盟排行')
    .option('--page <n>', '页码', '1')
    .option('--size <n>', '每页数量', '20')
    .action(async (options) => {
      const result = await getAllianceRank(options)
      outputJSON(result)
    })

  cmd
    .command('search')
    .description('搜索联盟')
    .requiredOption('--keyword <text>', '搜索关键词')
    .option('--page <n>', '页码', '1')
    .option('--size <n>', '每页数量', '20')
    .action(async (options) => {
      const result = await searchAlliance(options)
      outputJSON(result)
    })

  cmd
    .command('set-notice')
    .description('设置联盟公告')
    .requiredOption('--content <text>', '公告内容')
    .option('--inner', '内部公告')
    .action(async (options) => {
      const result = await setNotice(options)
      outputJSON(result)
    })

  cmd
    .command('set-relation')
    .description('设置联盟关系')
    .requiredOption('--id <id>', '联盟 ID')
    .requiredOption('--type <type>', '关系类型 (枚举值)')
    .action(async (options) => {
      const result = await setRelation(options)
      outputJSON(result)
    })

  cmd
    .command('send-message')
    .description('发送联盟消息')
    .requiredOption('--content <text>', '消息内容')
    .action(async (options) => {
      const result = await sendMessage(options)
      outputJSON(result)
    })

  return cmd
}
