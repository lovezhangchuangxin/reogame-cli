import { Command } from 'commander'
import { MessageApi } from '../../api/message'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取消息列表
 */
async function getMessageList(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await MessageApi.getMyMessageList()
    return success(result.data, '获取消息列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取消息详情
 */
async function getMessage(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id } = options
  if (!id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供消息 ID')
  }

  try {
    const result = await MessageApi.getMessageById(id as string)
    return success(result.data, '获取消息详情成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 标记消息已读
 */
async function readMessage(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id, all } = options

  try {
    if (all) {
      // 获取所有消息 ID 并标记已读
      const listResult = await MessageApi.getMyMessageList()
      const ids = listResult.data?.map((m: { id: string }) => m.id) || []
      if (ids.length > 0) {
        await MessageApi.readMessage(ids)
      }
      return success(null, '已标记所有消息为已读')
    }

    if (!id) {
      return error(ErrorCode.CLI_PARAM_MISSING, '请提供消息 ID 或使用 --all')
    }

    await MessageApi.readMessage(id as string)
    return success(null, '已标记为已读')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取聊天记录
 */
async function getChatMessages(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await MessageApi.getChatMessage()
    return success(result.data, '获取聊天记录成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 发送聊天消息
 */
async function sendChatMessage(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { content } = options
  if (!content) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供消息内容')
  }

  try {
    const result = await MessageApi.sendChatMessage(content as string)
    return success(result.data, '发送消息成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 message 命令
 */
export function createMessageCommand(): Command {
  const cmd = new Command('message').description('消息相关命令')

  cmd
    .command('list')
    .description('获取消息列表')
    .action(async () => {
      const result = await getMessageList()
      outputJSON(result)
    })

  cmd
    .command('get')
    .description('获取消息详情')
    .requiredOption('--id <id>', '消息 ID')
    .action(async (options) => {
      const result = await getMessage(options)
      outputJSON(result)
    })

  cmd
    .command('read')
    .description('标记消息已读')
    .option('--id <id>', '消息 ID')
    .option('--all', '标记所有消息已读')
    .action(async (options) => {
      const result = await readMessage(options)
      outputJSON(result)
    })

  cmd
    .command('chat')
    .description('获取聊天记录')
    .action(async () => {
      const result = await getChatMessages()
      outputJSON(result)
    })

  cmd
    .command('send')
    .description('发送聊天消息')
    .requiredOption('--content <text>', '消息内容')
    .action(async (options) => {
      const result = await sendChatMessage(options)
      outputJSON(result)
    })

  return cmd
}
