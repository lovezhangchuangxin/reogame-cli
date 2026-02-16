# OGame CLI 命令参考

本文档详细列出所有可用的命令及其参数。

## 目录

- [认证命令 (auth)](#认证命令-auth)
- [配置命令 (config)](#配置命令-config)
- [游戏命令 (game)](#游戏命令-game)
- [星球命令 (planet)](#星球命令-planet)
- [建筑命令 (building)](#建筑命令-building)
- [舰队命令 (fleet)](#舰队命令-fleet)
- [市场命令 (market)](#市场命令-market)
- [科技命令 (tech)](#科技命令-tech)
- [舰船命令 (ship)](#舰船命令-ship)
- [防御命令 (defense)](#防御命令-defense)
- [联盟命令 (alliance)](#联盟命令-alliance)
- [消息命令 (message)](#消息命令-message)
- [银河系命令 (galaxy)](#银河系命令-galaxy)
- [管理员命令 (admin)](#管理员命令-admin)
- [支付命令 (pay)](#支付命令-pay)
- [装饰命令 (decoration)](#装饰命令-decoration)

---

## 认证命令 (auth)

### `ogame auth login`

登录游戏。

```bash
ogame auth login -u <username> -p <password> -U <universe>
```

| 参数                    | 描述     |
| ----------------------- | -------- |
| `-u, --username <name>` | 用户名   |
| `-p, --password <pwd>`  | 密码     |
| `-U, --universe <id>`   | 宇宙编号 |

### `ogame auth logout`

退出登录。

```bash
ogame auth logout
```

### `ogame auth whoami`

查看当前登录用户。

```bash
ogame auth whoami
```

### `ogame auth register`

注册新账户。

```bash
ogame auth register -u <username> -p <password> -e <email> -c <code> -U <universe>
```

### `ogame auth send-code`

发送验证码。

```bash
ogame auth send-code -e <email>
```

### `ogame auth reset-password`

重置密码。

```bash
ogame auth reset-password -e <email> -c <code> -p <newPassword>
```

### `ogame auth refresh`

刷新 Token。

```bash
ogame auth refresh
```

---

## 配置命令 (config)

### `ogame config get`

获取当前配置。

```bash
ogame config get
```

### `ogame config set`

设置配置项。

```bash
ogame config set [options]
```

| 参数                | 描述       |
| ------------------- | ---------- |
| `--host <host>`     | 服务器地址 |
| `--port <port>`     | 端口号     |
| `--https`           | 使用 HTTPS |
| `--username <name>` | 默认用户名 |
| `--password <pwd>`  | 默认密码   |
| `--token <token>`   | 认证 Token |

### `ogame config reset`

重置配置。

```bash
ogame config reset
```

---

## 游戏命令 (game)

### `ogame game data`

获取游戏数据。

```bash
ogame game data
```

### `ogame game universe-list`

获取宇宙列表。

```bash
ogame game universe-list
```

### `ogame game universe-config`

获取宇宙配置。

```bash
ogame game universe-config -U <universe>
```

### `ogame game announcement`

获取公告。

```bash
ogame game announcement -U <universe>
```

### `ogame game sign-in`

每日签到。

```bash
ogame game sign-in --planet <id>
```

### `ogame game open-container`

开宝箱。

```bash
ogame game open-container --planet <id> [--amount <n>]
```

---

## 星球命令 (planet)

### `ogame planet list`

获取星球列表。

```bash
ogame planet list
```

### `ogame planet get`

获取星球详情。

```bash
ogame planet get --id <id>
```

### `ogame planet overview`

获取星球概览。

```bash
ogame planet overview
```

---

## 建筑命令 (building)

### `ogame building list`

获取建筑列表。

```bash
ogame building list --planet <id>
```

### `ogame building build`

建造建筑。

```bash
ogame building build --planet <id> --type <type> [--amount <n>]
```

### `ogame building cancel`

取消建造。

```bash
ogame building cancel --planet <id> --type <type>
```

### `ogame building accelerate`

加速建造。

```bash
ogame building accelerate --planet <id> --type <type>
```

### `ogame building queue`

获取建造队列。

```bash
ogame building queue --planet <id>
```

---

## 舰队命令 (fleet)

### `ogame fleet list`

获取舰队列表。

```bash
ogame fleet list
```

### `ogame fleet send`

派遣舰队。

```bash
ogame fleet send --from <id> --to <coord> --type <task> --ships <json> [--resources <json>]
```

| 参数                 | 描述                     |
| -------------------- | ------------------------ |
| `--from <id>`        | 起始星球 ID              |
| `--to <coord>`       | 目标坐标 (格式: "1:2:3") |
| `--type <task>`      | 任务类型 (枚举值)        |
| `--ships <json>`     | 舰船配置 (JSON)          |
| `--resources <json>` | 资源配置 (JSON)          |

### `ogame fleet return`

舰队返航。

```bash
ogame fleet return --id <fleetId>
```

### `ogame fleet battle-list`

获取战报列表。

```bash
ogame fleet battle-list [--page <n>] [--size <n>]
```

### `ogame fleet battle`

获取战报详情。

```bash
ogame fleet battle --id <id>
```

---

## 市场命令 (market)

### `ogame market orders`

获取订单列表。

```bash
ogame market orders [--resource <type>]
```

### `ogame market my-orders`

获取我的订单。

```bash
ogame market my-orders
```

### `ogame market create-order`

创建订单。

```bash
ogame market create-order --planet <id> --type <buy|sell> --resource <type> --price <n> --amount <n>
```

### `ogame market cancel-order`

取消订单。

```bash
ogame market cancel-order --id <id>
```

### `ogame market deal`

交易订单。

```bash
ogame market deal --id <id> --planet <id> --amount <n>
```

### `ogame market transactions`

获取交易记录。

```bash
ogame market transactions [--page <n>] [--size <n>]
```

### `ogame market products`

获取商品列表。

```bash
ogame market products
```

### `ogame market buy-product`

购买商品。

```bash
ogame market buy-product --id <id> --planet <id> --amount <n>
```

---

## 科技命令 (tech)

### `ogame tech list`

获取科技列表。

```bash
ogame tech list
```

### `ogame tech research`

研究科技。

```bash
ogame tech research --type <type>
```

### `ogame tech cancel`

取消研究。

```bash
ogame tech cancel
```

### `ogame tech accelerate`

加速研究。

```bash
ogame tech accelerate
```

### `ogame tech queue`

获取研究队列。

```bash
ogame tech queue
```

---

## 舰船命令 (ship)

### `ogame ship list`

获取舰船列表。

```bash
ogame ship list --planet <id>
```

### `ogame ship build`

建造舰船。

```bash
ogame ship build --planet <id> --type <type> [--amount <n>]
```

### `ogame ship cancel`

取消建造。

```bash
ogame ship cancel --planet <id> --type <type>
```

### `ogame ship accelerate`

加速建造。

```bash
ogame ship accelerate --planet <id> --type <type>
```

### `ogame ship queue`

获取建造队列。

```bash
ogame ship queue --planet <id>
```

---

## 防御命令 (defense)

### `ogame defense list`

获取防御列表。

```bash
ogame defense list --planet <id>
```

### `ogame defense build`

建造防御。

```bash
ogame defense build --planet <id> --type <type> [--amount <n>]
```

### `ogame defense cancel`

取消建造。

```bash
ogame defense cancel --planet <id> --type <type>
```

### `ogame defense accelerate`

加速建造。

```bash
ogame defense accelerate --planet <id> --type <type>
```

### `ogame defense queue`

获取建造队列。

```bash
ogame defense queue --planet <id>
```

---

## 联盟命令 (alliance)

### `ogame alliance get`

获取我的联盟。

```bash
ogame alliance get
```

### `ogame alliance create`

创建联盟。

```bash
ogame alliance create -n <name> -s <short>
```

### `ogame alliance disband`

解散联盟。

```bash
ogame alliance disband --confirm
```

### `ogame alliance apply`

申请加入联盟。

```bash
ogame alliance apply --id <id>
```

### `ogame alliance join`

批准用户加入。

```bash
ogame alliance join --user <id>
```

### `ogame alliance leave`

退出联盟。

```bash
ogame alliance leave
```

### `ogame alliance remove`

移除成员。

```bash
ogame alliance remove --user <id>
```

### `ogame alliance transfer`

转让盟主。

```bash
ogame alliance transfer --user <id>
```

### `ogame alliance rank`

获取联盟排行。

```bash
ogame alliance rank [--page <n>] [--size <n>]
```

### `ogame alliance search`

搜索联盟。

```bash
ogame alliance search --keyword <text> [--page <n>] [--size <n>]
```

### `ogame alliance set-notice`

设置公告。

```bash
ogame alliance set-notice --content <text> [--inner]
```

### `ogame alliance set-relation`

设置联盟关系。

```bash
ogame alliance set-relation --id <id> --type <type>
```

### `ogame alliance send-message`

发送联盟消息。

```bash
ogame alliance send-message --content <text>
```

---

## 消息命令 (message)

### `ogame message list`

获取消息列表。

```bash
ogame message list
```

### `ogame message get`

获取消息详情。

```bash
ogame message get --id <id>
```

### `ogame message read`

标记消息已读。

```bash
ogame message read [--id <id>] [--all]
```

### `ogame message chat`

获取聊天记录。

```bash
ogame message chat
```

### `ogame message send`

发送聊天消息。

```bash
ogame message send --content <text>
```

---

## 银河系命令 (galaxy)

### `ogame galaxy info`

获取星系信息。

```bash
ogame galaxy info -g <galaxy> -s <system>
```

### `ogame galaxy debris`

获取废墟信息。

```bash
ogame galaxy debris -g <galaxy> -s <system>
```

---

## 管理员命令 (admin)

> 需要管理员权限

### 日志管理

```bash
ogame admin log-files                    # 获取日志文件列表
ogame admin log-content --file <name>    # 获取日志内容
```

### 用户管理

```bash
ogame admin user-list                    # 获取玩家列表
ogame admin users [--page <n>] [--size <n>]  # 分页获取玩家
ogame admin user-config --universe <n> --id <id>  # 获取玩家配置
ogame admin set-user-config --universe <n> --id <id>  # 修改玩家配置
ogame admin set-banned-time --universe <n> --id <id> --time <ts>  # 修改封禁时间
ogame admin online-users                 # 获取在线用户
ogame admin user-planets --universe <n> --id <id>  # 获取用户星球
ogame admin set-announcement --universe <n> --content <text>  # 修改公告
ogame admin delete-user --universe <n> --id <id> --confirm  # 删除用户
```

### 多账户检测

```bash
ogame admin multi-account-ips            # 获取多账户 IP
ogame admin multi-account-stats          # 获取多账户统计
ogame admin refresh-multi-account        # 刷新多账户检测
```

### 系统维护

```bash
ogame admin check-db                     # 检查数据库
ogame admin mineral-host-status          # 获取矿主开关状态
ogame admin toggle-mineral-host          # 切换矿主开关
```

---

## 支付命令 (pay)

### `ogame pay create-order`

创建支付订单。

```bash
ogame pay create-order --pid <pid> --type <type> --trade-no <no> --notify-url <url> --return-url <url> --name <name> --money <amount> --sign-type <type>
```

### `ogame pay my-recharges`

获取我的充值记录。

```bash
ogame pay my-recharges [--page <n>] [--size <n>]
```

### `ogame pay all-recharges`

获取所有充值记录（管理员）。

```bash
ogame pay all-recharges [--page <n>] [--size <n>] [--user-id <id>] [--username <name>]
```

---

## 装饰命令 (decoration)

### `ogame decoration list`

获取装饰列表。

```bash
ogame decoration list
```

### `ogame decoration my`

获取我的装饰。

```bash
ogame decoration my
```

### `ogame decoration get`

获取用户装饰。

```bash
ogame decoration get --user-id <id>
```

### `ogame decoration activate`

激活装饰。

```bash
ogame decoration activate --type <type> [--id <id>]
```

### 管理员装饰命令

```bash
ogame decoration all                     # 获取所有装饰
ogame decoration add --type <type> --name <name> --style-class <class>  # 添加装饰
ogame decoration update --id <id> --type <type> --name <name> --style-class <class>  # 更新装饰
ogame decoration delete --id <id> --confirm  # 删除装饰
```
