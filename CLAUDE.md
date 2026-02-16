# reogame-cli

OGame CLI 工具，专为 AI Agent 设计，通过命令行调用游戏 API 实现自动化操作。

## 项目概述

- **用途**: 为 AI Agent 提供 OGame 游戏的命令行接口
- **技术栈**: TypeScript + Commander.js + Axios
- **Node.js**: >= 20.19.0
- **包管理器**: pnpm@10.22.0

## 目录结构

```
src/
├── api/              # API 请求层
│   ├── req.ts        # Axios 实例和通用请求方法
│   ├── types.ts      # API 类型定义
│   ├── user.ts       # 用户相关 API
│   ├── game.ts       # 游戏数据 API
│   ├── fleet.ts      # 舰队 API
│   ├── market.ts     # 市场 API
│   ├── alliance.ts   # 联盟 API
│   ├── message.ts    # 消息 API
│   ├── admin.ts      # 管理 API
│   └── pay.ts        # 支付 API
│
├── cli/              # CLI 命令层
│   ├── index.ts      # CLI 入口，命令注册
│   ├── types.ts      # CLI 类型定义
│   ├── commands/     # 命令实现
│   │   ├── auth.ts      # 登录/登出
│   │   ├── config.ts    # 配置管理
│   │   ├── game.ts      # 游戏信息
│   │   ├── planet.ts    # 行星管理
│   │   ├── building.ts  # 建筑操作
│   │   ├── fleet.ts     # 舰队操作
│   │   ├── market.ts    # 市场交易
│   │   ├── tech.ts      # 科技研究
│   │   ├── ship.ts      # 飞船建造
│   │   ├── defense.ts   # 防御设施
│   │   ├── alliance.ts  # 联盟管理
│   │   ├── message.ts   # 消息系统
│   │   ├── galaxy.ts    # 星系查看
│   │   ├── admin.ts     # 管理命令
│   │   ├── pay.ts       # 支付命令
│   │   └── decoration.ts # 装饰命令
│   ├── middleware/  # 中间件
│   │   ├── auth.ts      # 认证检查
│   │   ├── error.ts     # 错误处理
│   │   └── output.ts    # 输出格式化
│   └── constants/   # 常量
│       ├── messages.ts   # 提示消息
│       └── error-codes.ts # 错误码
│
├── config/           # 配置管理
│   ├── index.ts      # ConfigManager 单例
│   ├── types.ts      # 配置类型定义
│   └── crypto.ts     # 密码加密 (AES-256-GCM)
│
├── game/             # 游戏数据
│   ├── types/        # 游戏类型定义
│   └── config/       # 游戏配置数据
│       ├── building.ts    # 建筑配置
│       ├── technology.ts  # 科技配置
│       ├── ship.ts        # 飞船配置
│       ├── defense.ts     # 防御配置
│       ├── resource.ts    # 资源配置
│       └── ...
│
├── utils/            # 工具函数
├── index.ts          # 库导出入口
└── bin.ts            # CLI 入口
```

## 架构设计

### 三层架构

```
CLI 命令层 (cli/) → API 请求层 (api/) → 游戏服务器
        ↓
   配置层 (config/) ← 存储用户凭证和服务器配置
```

### 数据流

1. 用户/AI Agent 执行命令: `ogame <command> [subcommand] [options]`
2. CLI 层解析命令，调用对应 API
3. API 层通过 Axios 发送请求到游戏服务器
4. 响应经中间件处理后输出 JSON 格式结果

## 核心模块

### ConfigManager (src/config/index.ts)

单例模式，管理用户配置:

```typescript
// 配置存储位置
~/.ogame/aegmo.json

// 使用方式
import { configManager } from './config'

configManager.getServer() // { host, port, https }
configManager.getUser() // { username, password (自动解密), token }
configManager.setUser({ token: 'xxx' })
configManager.setServer({ host: 'new.host' })
```

### API 请求 (src/api/req.ts)

```typescript
import { req, instance, TokenExpiredError } from './api'

// 通用请求
const data = await req('GET', '/user/info')

// 捕获 Token 过期
try {
  await req('GET', '/protected/resource')
} catch (error) {
  if (error instanceof TokenExpiredError) {
    // 提示用户重新登录: ogame login
  }
}
```

### CLI 响应格式

所有命令输出统一格式:

```typescript
interface CLIResponse<T> {
  code: number // 0=成功, 非0=错误
  msg: string // 消息
  data?: T // 返回数据
  meta: {
    timestamp: number
    requestId?: string
  }
}
```

## 命令参考

### 认证

- `ogame login -u <username> -p <password>` - 登录
- `ogame logout` - 登出
- `ogame whoami` - 查看当前用户

### 配置

- `ogame config server --host <host> --port <port>` - 设置服务器
- `ogame config show` - 显示当前配置

### 游戏

- `ogame game info` - 游戏信息
- `ogame game resources` - 资源概览

### 行星

- `ogame planet list` - 行星列表
- `ogame planet info <id>` - 行星详情

### 建筑/科技/飞船/防御

- `ogame building list` - 建筑列表
- `ogame tech research <id>` - 研究科技
- `ogame ship build <type> <count>` - 建造飞船

### 舰队

- `ogame fleet list` - 舰队列表
- `ogame fleet send` - 派遣舰队

### 其他

- `ogame market` - 市场命令
- `ogame alliance` - 联盟命令
- `ogame message` - 消息命令
- `ogame galaxy` - 星系命令

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式 (热重载)
pnpm dev

# 构建
pnpm build

# 运行 CLI
pnpm cli --help

# 格式化代码
pnpm format
```

## 安全特性

- **密码加密存储**: 使用 AES-256-GCM 加密，密钥由机器特征派生
- **Token 自动管理**: 登录后自动存储，401 时自动清除并提示重新登录
- **配置文件权限**: 存储于用户目录 `~/.ogame/`

## AI Agent 集成建议

1. **使用 JSON 输出**: 默认启用 `-j, --json` 选项，便于解析
2. **静默模式**: 使用 `-q, --quiet` 仅输出数据
3. **错误处理**: 检查 `code` 字段判断成功/失败
4. **Token 过期**: 捕获 `TokenExpiredError` 或检查 code=401

## 发布配置

package.json `files` 字段控制发布内容:

- `dist/` - 编译产物
- `README.md`, `COMMANDS.md`, `LICENSE`
