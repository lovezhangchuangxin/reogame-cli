import { Command } from 'commander'
import { MarketApi } from '../../api/market'
import { CLIResponse } from '../types'
import { success, error, outputJSON } from '../middleware/output'
import { handleError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { ErrorCode } from '../constants'

/**
 * 获取订单列表
 */
async function getOrders(options: Record<string, unknown>): Promise<CLIResponse> {
  const { resource } = options
  if (!resource) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供资源类型')
  }

  try {
    const result = await MarketApi.getResourceOrders(parseInt(resource as string, 10))
    return success(result.data, '获取订单列表成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取我的订单
 */
async function getMyOrders(): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const result = await MarketApi.getUserOrders()
    return success(result.data, '获取我的订单成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建订单
 */
async function createOrder(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { planet, type, resource, price, amount } = options
  if (!planet || !type || !resource || !price || !amount) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供星球ID、订单类型、资源类型、价格和数量')
  }

  try {
    const result = await MarketApi.createOrder(
      parseInt(planet as string, 10),
      type as 'buy' | 'sell',
      parseInt(resource as string, 10),
      parseFloat(price as string),
      parseInt(amount as string, 10),
    )
    return success(result.data, '创建订单成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 取消订单
 */
async function cancelOrder(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id } = options
  if (!id) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供订单 ID')
  }

  try {
    const result = await MarketApi.cancelOrder(id as string)
    return success(result, '取消订单成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 交易订单
 */
async function dealOrder(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id, planet, amount } = options
  if (!id || !planet || !amount) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供订单ID、星球ID和交易数量')
  }

  try {
    const result = await MarketApi.dealOrder(
      parseInt(planet as string, 10),
      id as string,
      parseInt(amount as string, 10),
    )
    return success(result.data, '交易成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取交易记录
 */
async function getTransactions(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  try {
    const page = options.page ? parseInt(options.page as string, 10) : 1
    const size = options.size ? parseInt(options.size as string, 10) : 20

    const result = await MarketApi.getUserTransactions(page, size)
    return success(result.data, '获取交易记录成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 获取市场商品
 */
async function getProducts(): Promise<CLIResponse> {
  try {
    const result = await MarketApi.getMarketProducts()
    return success(result.data, '获取市场商品成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 购买商品
 */
async function buyProduct(options: Record<string, unknown>): Promise<CLIResponse> {
  const authResult = requireAuth()
  if ('code' in authResult) return authResult

  const { id, planet, amount } = options
  if (!id || !planet || !amount) {
    return error(ErrorCode.CLI_PARAM_MISSING, '请提供商品ID、星球ID和购买数量')
  }

  try {
    const result = await MarketApi.buyProduct(
      parseInt(planet as string, 10),
      id as string,
      parseInt(amount as string, 10),
    )
    return success(result, '购买成功')
  } catch (err) {
    return handleError(err)
  }
}

/**
 * 创建 market 命令
 */
export function createMarketCommand(): Command {
  const cmd = new Command('market').description('市场相关命令')

  cmd
    .command('orders')
    .description('获取订单列表')
    .requiredOption('--resource <type>', '资源类型 (枚举值)')
    .action(async (options) => {
      const result = await getOrders(options)
      outputJSON(result)
    })

  cmd
    .command('my-orders')
    .description('获取我的订单')
    .action(async () => {
      const result = await getMyOrders()
      outputJSON(result)
    })

  cmd
    .command('create-order')
    .description('创建订单')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--type <type>', '订单类型 (buy|sell)')
    .requiredOption('--resource <type>', '资源类型 (枚举值)')
    .requiredOption('--price <price>', '单价')
    .requiredOption('--amount <n>', '数量')
    .action(async (options) => {
      const result = await createOrder(options)
      outputJSON(result)
    })

  cmd
    .command('cancel-order')
    .description('取消订单')
    .requiredOption('--id <id>', '订单 ID')
    .action(async (options) => {
      const result = await cancelOrder(options)
      outputJSON(result)
    })

  cmd
    .command('deal')
    .description('交易订单')
    .requiredOption('--id <id>', '订单 ID')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--amount <n>', '交易数量')
    .action(async (options) => {
      const result = await dealOrder(options)
      outputJSON(result)
    })

  cmd
    .command('transactions')
    .description('获取交易记录')
    .option('--page <n>', '页码', '1')
    .option('--size <n>', '每页数量', '20')
    .action(async (options) => {
      const result = await getTransactions(options)
      outputJSON(result)
    })

  cmd
    .command('products')
    .description('获取市场商品')
    .action(async () => {
      const result = await getProducts()
      outputJSON(result)
    })

  cmd
    .command('buy-product')
    .description('购买商品')
    .requiredOption('--id <id>', '商品 ID')
    .requiredOption('--planet <id>', '星球 ID')
    .requiredOption('--amount <n>', '购买数量')
    .action(async (options) => {
      const result = await buyProduct(options)
      outputJSON(result)
    })

  return cmd
}
