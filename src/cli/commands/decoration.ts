import { Command } from 'commander'
import { DecorationApi } from '../../api/decoration'
import { DecorationType } from '../../game'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取装饰列表
 */
async function getDecorationList(): Promise<CLIResponse> {
  try {
    const result = await DecorationApi.getDecorationList()
    return success(result.data, '获取装饰列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取我的装饰
 */
async function getMyDecoration(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await DecorationApi.getMyDecoration()
    return success(result.data, '获取我的装饰成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取用户装饰
 */
async function getUserDecoration(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { userId } = options
  if (!userId) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供用户 ID')
  }

  try {
    const result = await DecorationApi.getUserDecoration(parseInt(userId as string, 10))
    return success(result.data, '获取用户装饰成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 激活装饰
 */
async function activateDecoration(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { type, id } = options
  if (!type) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供装饰类型')
  }

  try {
    const result = await DecorationApi.activateDecoration(
      type as DecorationType,
      id ? (id as string) : null,
    )
    return success(result.data, '激活装饰成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取所有装饰（管理员）
 */
async function getAllDecorations(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await DecorationApi.getAllDecorations()
    return success(result.data, '获取所有装饰成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 添加装饰（管理员）
 */
async function addDecoration(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { type, name, styleClass, description, previewUrl, enabled } = options
  if (!type || !name || !styleClass) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供装饰类型、名称和样式类')
  }

  try {
    const result = await DecorationApi.addDecoration({
      type: type as DecorationType,
      name: name as string,
      styleClass: styleClass as string,
      description: description as string,
      previewUrl: previewUrl as string,
      enabled: enabled !== undefined ? enabled === 'true' : true,
    })
    return success(result.data, '添加装饰成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 更新装饰（管理员）
 */
async function updateDecoration(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id, type, name, styleClass, description, previewUrl, enabled } = options
  if (!id || !type || !name || !styleClass) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供装饰 ID、类型、名称和样式类')
  }

  try {
    const result = await DecorationApi.updateDecoration({
      id: id as string,
      type: type as DecorationType,
      name: name as string,
      styleClass: styleClass as string,
      description: description as string,
      previewUrl: previewUrl as string,
      enabled: enabled !== undefined ? enabled === 'true' : true,
    })
    return success(result.data, '更新装饰成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 删除装饰（管理员）
 */
async function deleteDecoration(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id, confirm } = options
  if (!id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供装饰 ID')
  }
  if (!confirm) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请使用 --confirm 确认删除')
  }

  try {
    const result = await DecorationApi.deleteDecoration(id as string)
    return success(result.data, '删除装饰成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 decoration 命令
 */
export function createDecorationCommand(): Command {
  const cmd = new Command('decoration').description('装饰系统命令')

  cmd
    .command('list')
    .description('获取装饰列表')
    .action(async () => {
      const result = await getDecorationList()
      outputJSON(result)
    })

  cmd
    .command('my')
    .description('获取我的装饰')
    .action(async () => {
      const result = await getMyDecoration()
      outputJSON(result)
    })

  cmd
    .command('get')
    .description('获取用户装饰')
    .requiredOption('--user-id <id>', '用户 ID')
    .action(async (options) => {
      const result = await getUserDecoration(options)
      outputJSON(result)
    })

  cmd
    .command('activate')
    .description('激活装饰')
    .requiredOption('--type <n>', '装饰类型')
    .option('--id <id>', '装饰 ID（不提供则取消激活）')
    .action(async (options) => {
      const result = await activateDecoration(options)
      outputJSON(result)
    })

  // 管理员命令
  cmd
    .command('all')
    .description('获取所有装饰（管理员）')
    .action(async () => {
      const result = await getAllDecorations()
      outputJSON(result)
    })

  cmd
    .command('add')
    .description('添加装饰（管理员）')
    .requiredOption('--type <type>', '装饰类型')
    .requiredOption('--name <name>', '装饰名称')
    .requiredOption('--style-class <class>', '样式类名')
    .option('--description <text>', '装饰描述')
    .option('--preview-url <url>', '预览图 URL')
    .option('--enabled <bool>', '是否启用', 'true')
    .action(async (options) => {
      const result = await addDecoration(options)
      outputJSON(result)
    })

  cmd
    .command('update')
    .description('更新装饰（管理员）')
    .requiredOption('--id <id>', '装饰 ID')
    .requiredOption('--type <type>', '装饰类型')
    .requiredOption('--name <name>', '装饰名称')
    .requiredOption('--style-class <class>', '样式类名')
    .option('--description <text>', '装饰描述')
    .option('--preview-url <url>', '预览图 URL')
    .option('--enabled <bool>', '是否启用', 'true')
    .action(async (options) => {
      const result = await updateDecoration(options)
      outputJSON(result)
    })

  cmd
    .command('delete')
    .description('删除装饰（管理员）')
    .requiredOption('--id <id>', '装饰 ID')
    .option('--confirm', '确认删除')
    .action(async (options) => {
      const result = await deleteDecoration(options)
      outputJSON(result)
    })

  return cmd
}
