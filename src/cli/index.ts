import { Command } from 'commander'
import { createAuthCommand } from './commands/auth'
import { createConfigCommand } from './commands/config'
import { createGameCommand } from './commands/game'
import { createPlanetCommand } from './commands/planet'
import { createBuildingCommand } from './commands/building'
import { createFleetCommand } from './commands/fleet'
import { createMarketCommand } from './commands/market'
import { createTechCommand } from './commands/tech'
import { createShipCommand } from './commands/ship'
import { createDefenseCommand } from './commands/defense'
import { createAllianceCommand } from './commands/alliance'
import { createMessageCommand } from './commands/message'
import { createGalaxyCommand } from './commands/galaxy'
import { createAdminCommand } from './commands/admin'
import { createPayCommand } from './commands/pay'
import { createDecorationCommand } from './commands/decoration'
import packageJson from '../../package.json'

/**
 * 创建 CLI 程序
 */
export function createCLI(): Command {
  const program = new Command()

  program
    .name('ogame')
    .description('OGame CLI for AI Agents')
    .version(packageJson.version)
    .option('-j, --json', 'Force JSON output', true)
    .option('-q, --quiet', 'Quiet mode, only output data')
    .option('-v, --verbose', 'Verbose output with debug info')
    .option('--no-color', 'Disable color output')
    .option('--config <path>', 'Specify config file path')
    .option('--server <host>', 'Override server host')

  // 注册子命令
  program.addCommand(createAuthCommand())
  program.addCommand(createConfigCommand())
  program.addCommand(createGameCommand())
  program.addCommand(createPlanetCommand())
  program.addCommand(createBuildingCommand())
  program.addCommand(createFleetCommand())
  program.addCommand(createMarketCommand())
  program.addCommand(createTechCommand())
  program.addCommand(createShipCommand())
  program.addCommand(createDefenseCommand())
  program.addCommand(createAllianceCommand())
  program.addCommand(createMessageCommand())
  program.addCommand(createGalaxyCommand())
  program.addCommand(createAdminCommand())
  program.addCommand(createPayCommand())
  program.addCommand(createDecorationCommand())

  return program
}

/**
 * 运行 CLI
 */
export async function runCLI(argv: string[] = process.argv): Promise<void> {
  const program = createCLI()
  await program.parseAsync(argv)
}

export * from './types'
export * from './constants'
