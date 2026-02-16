# reogame-cli

> AI Agent 友好的 OGame 命令行工具

专为 AI Agent 设计的 OGame CLI，通过命令行调用游戏中的所有接口，实现自动化游戏操作。

## 特性

- **AI 友好**: 所有输出均为结构化 JSON 格式
- **完整覆盖**: 覆盖所有游戏 API 功能
- **标准化响应**: 统一的 `{code, msg, data}` 输出格式
- **模块化设计**: 资源导向的二级命令结构

## 安装

```bash
npm install reogame-cli -g
```

## 快速开始

### 1. 配置服务器

```bash
ogame config set --host your-server.com --port 443 --https
```

### 2. 登录游戏

```bash
ogame auth login -u username -p password -U 1
```

### 3. 获取游戏数据

```bash
# 获取我的数据
ogame game data

# 获取星球列表
ogame planet list

# 获取星球详情
ogame planet get --id 67108865
```

## 命令概览

| 命令               | 描述             |
| ------------------ | ---------------- |
| `ogame auth`       | 认证相关命令     |
| `ogame config`     | 配置管理命令     |
| `ogame game`       | 游戏相关命令     |
| `ogame planet`     | 星球相关命令     |
| `ogame building`   | 建筑相关命令     |
| `ogame fleet`      | 舰队相关命令     |
| `ogame market`     | 市场相关命令     |
| `ogame tech`       | 科技相关命令     |
| `ogame ship`       | 舰船相关命令     |
| `ogame defense`    | 防御设施相关命令 |
| `ogame alliance`   | 联盟相关命令     |
| `ogame message`    | 消息相关命令     |
| `ogame galaxy`     | 银河系相关命令   |
| `ogame admin`      | 管理员命令       |
| `ogame pay`        | 支付相关命令     |
| `ogame decoration` | 装饰系统命令     |

## 输出格式

所有命令输出标准 JSON 格式：

```json
{
  "code": 0,
  "msg": "操作成功",
  "data": { ... },
  "meta": {
    "timestamp": 1708051200000,
    "requestId": "req_abc123"
  }
}
```

### 错误响应

```json
{
  "code": 10001,
  "msg": "用户名或密码错误",
  "data": null,
  "meta": {
    "timestamp": 1708051200000,
    "requestId": "req_abc123"
  }
}
```

## AI Agent 使用示例

```bash
# 获取当前游戏状态
ogame game data

# 获取所有星球概览
ogame planet list

# 检查建造队列
ogame building queue --planet 67108865

# 派遣舰队攻击
ogame fleet send --from 67108865 --to "1:2:3" --type attack --ships '{"300": 100}'

# 查看市场订单
ogame market orders --resource 1

# 创建卖单
ogame market create-order --planet 67108865 --type sell --resource 1 --price 2 --amount 10000

# 获取星系信息
ogame galaxy info -g 1 -s 2
```

## 全局选项

| 选项              | 描述                   |
| ----------------- | ---------------------- |
| `-V, --version`   | 显示版本号             |
| `-h, --help`      | 显示帮助               |
| `-j, --json`      | 强制 JSON 输出（默认） |
| `-q, --quiet`     | 静默模式，只输出数据   |
| `-v, --verbose`   | 详细输出，包含调试信息 |
| `--no-color`      | 禁用颜色输出           |
| `--config <path>` | 指定配置文件路径       |
| `--server <url>`  | 指定服务器地址         |

## 详细命令文档

查看 [COMMANDS.md](./COMMANDS.md) 获取所有命令的详细说明。

## 开发

```bash
# 开发模式
pnpm dev

# 构建
pnpm build

# 运行 CLI
pnpm cli --help
```

## License

MIT
