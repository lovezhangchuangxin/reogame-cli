---
name: ogame-player
description: 星环之路（Reogame）太空战争策略游戏AI玩家。教AI理解游戏机制、资源管理、建筑升级、科技研发、舰队操作、战斗策略和扩张规划。当用户提到星环之路、星怒、ogame、reogame时自动触发。
---

# 星环之路 AI 玩家指南

你是一个游戏星环之路的AI玩家，需要理解并执行游戏中的各种操作。你可以通过全局下载 https://www.npmjs.com/package/reogame-cli 这个npm，从而通过命令行的 ogame 命令来操作本游戏的各种接口，遇到不懂的命令及时通过多层级的 help 命令查询，不要自己瞎猜。

## 核心目标

1. **资源平衡**: 维持金属、水晶、重氢的合理生产比例
2. **科技发展**: 按优先级研究科技提升实力
3. **军事建设**: 建造舰队和防御保护星球
4. **领土扩张**: 殖民新星球扩大帝国版图

## 快速参考

| 主题     | 详细文档                                         |
| -------- | ------------------------------------------------ |
| 资源系统 | [reference/resources.md](reference/resources.md) |
| 建筑系统 | [reference/buildings.md](reference/buildings.md) |
| 科技系统 | [reference/tech.md](reference/tech.md)           |
| 舰船系统 | [reference/ships.md](reference/ships.md)         |
| 防御系统 | [reference/defense.md](reference/defense.md)     |
| 战斗系统 | [reference/combat.md](reference/combat.md)       |
| 舰队任务 | [reference/fleet.md](reference/fleet.md)         |
| 综合策略 | [reference/strategy.md](reference/strategy.md)   |

## 辅助工具脚本

### 战斗模拟器

```bash
python scripts/combat_simulator.py '<攻击舰队>' '<防御配置>' [攻击加成%] [防御加成%]
```

**舰队格式**: `unit_name:count,unit_name:count`

**可用舰船**: light_fighter, heavy_fighter, cruiser, battleship, battlecruiser, bomber, destroyer, small_cargo, large_cargo, recycler, espionage_probe

**可用防御**: rocket_launcher, heavy_laser, ion_cannon, gauss_cannon, plasma_turret, small_shield, large_shield

**示例**:

```bash
python scripts/combat_simulator.py 'battleship:50,cruiser:30' 'rocket_launcher:100,heavy_laser:50'
```

### 资源计算器

```bash
python scripts/resource_calculator.py cost <建筑ID> <当前等级> [目标等级]
python scripts/resource_calculator.py production <建筑ID> <等级>
python scripts/resource_calculator.py energy '<建筑配置JSON>'
```

**可用建筑**: metal_mine, crystal_mine, deuterium_synthesizer, solar_plant, metal_storage, crystal_storage, deuterium_storage

**示例**:

```bash
python scripts/resource_calculator.py cost metal_mine 10 15
python scripts/resource_calculator.py production solar_plant 15
```

## 游戏决策框架

### 资源管理优先级

```
能源平衡 → 基础资源生产 → 存储扩容 → 高级资源
```

**能源是基础**: 所有资源建筑生产都消耗电能，电能为负时建筑效率小于1

### 科技研发路线

```
能源技术 → 引擎技术(燃烧→脉冲→超空间) → 武器技术线 → 资源科技
```

### 建筑升级策略

**前期 (1-3天)**:

- 金属加工厂 Lv.10-15
- 水晶开采厂 Lv.8-12
- 太阳能电站 Lv.10-15
- 机器人工厂 Lv.3-5
- 研究院 Lv.5-8

**中期 (1-2周)**:

- 重氢精炼厂 Lv.8-10
- 造船厂 Lv.5-8
- 机器人工厂 Lv.5
- 仓库建筑 Lv.5-8

**后期**:

- 纳米机器人工厂
- 卫星基地
- 四大模块

### 舰队配置建议

**侦察舰队**: 间谍卫星 x50
**运输舰队**: 大型货船 x10 + 护卫舰
**攻击舰队**: 战列舰 + 巡洋舰 (2:1比例)
**回收舰队**: 回收船 x5

## 决策检查清单

执行任何操作前检查:

- [ ] 能源是否充足 (效率 >= 80%)
- [ ] 资源是否够用
- [ ] 是否有队列空位
- [ ] 前置条件是否满足
- [ ] 风险评估完成

## 风险管理

1. **防御投资**: 主星球必须有防御设施
2. **情报收集**: 攻击前必须侦察
3. **资源分散**: 不要集中存放

## 紧急情况处理

**能源危机**: 优先升级太阳能电站或建造太阳能卫星
**遭受攻击**:

1. 侦察敌方实力
2. 评估能否防守
3. 不能防守则FS舰队和资源

## 高级策略

### 资源转换

- 聚变反应堆非常消耗重氢
- 商店中有分类为“转换”的资源，可以将“金属”、“水晶”、“重氢”彼此之间转换

### 时机选择

- **建设**: 资源充足时立即开始
- **攻击**: 确保在线时间充裕
- **扩张**: 防御力量足够时

### 效率优化

- 保持5个建筑队列满
- 科技研究不间断
- 舰队任务持续执行
- 资源不溢出仓库
