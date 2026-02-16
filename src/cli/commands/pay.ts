import { Command } from 'commander'
import { PayApi } from '../../api/pay'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 创建支付订单
 */
async function createOrder(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { pid, type, tradeNo, notifyUrl, returnUrl, name, money, signType } = options
  if (!pid || !type || !tradeNo || !notifyUrl || !returnUrl || !name || !money || !signType) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供完整的订单参数')
  }

  try {
    const result = await PayApi.createOrder({
      pid: pid as string,
      type: type as string,
      out_trade_no: tradeNo as string,
      notify_url: notifyUrl as string,
      return_url: returnUrl as string,
      name: name as string,
      money: money as string,
      sign_type: signType as string,
    })
    return success(result.data, '创建订单成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取我的充值记录
 */
async function getMyRecharges(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { page, size } = options

  try {
    const result = await PayApi.getMyRecharges(
      page ? parseInt(page as string, 10) : 1,
      size ? parseInt(size as string, 10) : 20,
    )
    return success(result.data, '获取充值记录成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取所有充值记录（管理员）
 */
async function getAllRecharges(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { page, size, userId, username } = options

  try {
    const result = await PayApi.getAllRecharges(
      page ? parseInt(page as string, 10) : 1,
      size ? parseInt(size as string, 10) : 20,
      userId ? parseInt(userId as string, 10) : undefined,
      username ? (username as string) : undefined,
    )
    return success(result.data, '获取充值记录成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 pay 命令
 */
export function createPayCommand(): Command {
  const cmd = new Command('pay').description('支付相关命令')

  cmd
    .command('create-order')
    .description('创建支付订单')
    .requiredOption('--pid <pid>', '商户 ID')
    .requiredOption('--type <type>', '支付类型')
    .requiredOption('--trade-no <no>', '商户订单号')
    .requiredOption('--notify-url <url>', '异步通知地址')
    .requiredOption('--return-url <url>', '同步跳转地址')
    .requiredOption('--name <name>', '商品名称')
    .requiredOption('--money <amount>', '金额')
    .requiredOption('--sign-type <type>', '签名类型')
    .action(async (options) => {
      const result = await createOrder(options)
      outputJSON(result)
    })

  cmd
    .command('my-recharges')
    .description('获取我的充值记录')
    .option('--page <n>', '页码', '1')
    .option('--size <n>', '每页数量', '20')
    .action(async (options) => {
      const result = await getMyRecharges(options)
      outputJSON(result)
    })

  cmd
    .command('all-recharges')
    .description('获取所有充值记录（管理员）')
    .option('--page <n>', '页码', '1')
    .option('--size <n>', '每页数量', '20')
    .option('--user-id <id>', '用户 ID')
    .option('--username <name>', '用户名')
    .action(async (options) => {
      const result = await getAllRecharges(options)
      outputJSON(result)
    })

  return cmd
}
