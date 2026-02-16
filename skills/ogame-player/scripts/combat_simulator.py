#!/usr/bin/env python3
"""
星际愤怒战斗模拟器
模拟舰队与防御/敌方舰队之间的战斗
基于游戏实际配置数据
"""

import json
import sys
from dataclasses import dataclass
from typing import List, Dict

# 所有舰船配置 (基于游戏实际数据)
SHIPS = {
    # 侦察组
    "spy_probe": {
        "name": "间谍卫星", "attack": 0, "shield": 0, "armor": 1,
        "cost": 1425, "group": "侦察", "speed": 100000000, "engine": "燃烧"
    },
    # 特殊组
    "solar_satellite": {
        "name": "太阳能卫星", "attack": 0, "shield": 0, "armor": 200,
        "cost": 6650, "group": "特殊", "speed": 100000, "engine": "燃烧"
    },
    # 战斗组 - 轻型
    "light_fighter": {
        "name": "轻型战机", "attack": 50, "shield": 20, "armor": 400,
        "attack_type": "标准", "cost": 3800, "group": "战斗", "speed": 12500, "engine": "燃烧"
    },
    # 运输组
    "small_cargo": {
        "name": "小型货船", "attack": 15, "shield": 20, "armor": 400,
        "attack_type": "标准", "cost": 3800, "capacity": 5000, "group": "运输", "speed": 5000, "engine": "燃烧"
    },
    "large_cargo": {
        "name": "大型货船", "attack": 15, "shield": 50, "armor": 1200,
        "attack_type": "标准", "cost": 11400, "capacity": 250000, "group": "运输", "speed": 7500, "engine": "燃烧"
    },
    "transporter": {
        "name": "军用运输机", "attack": 150, "shield": 125, "armor": 5500,
        "attack_type": "标准", "cost": 53675, "capacity": 80000000, "group": "运输", "speed": 6000, "engine": "超空间"
    },
    # 战斗组 - 中型
    "heavy_fighter": {
        "name": "重型战机", "attack": 70, "shield": 80, "armor": 1100,
        "attack_type": "标准", "cost": 11400, "group": "战斗", "speed": 10000, "engine": "脉冲"
    },
    "cruiser": {
        "name": "巡洋舰", "attack": 400, "shield": 200, "armor": 2700,
        "attack_type": "离子", "cost": 25175, "group": "战斗", "speed": 15000, "engine": "脉冲"
    },
    "battleship": {
        "name": "战列舰", "attack": 600, "shield": 350, "armor": 5500,
        "attack_type": "激光", "cost": 55100, "group": "战斗", "speed": 10000, "engine": "超空间"
    },
    "battle_cruiser": {
        "name": "战列巡洋舰", "attack": 1450, "shield": 350, "armor": 9750,
        "attack_type": "激光", "cost": 95000, "group": "战斗", "speed": 10000, "engine": "超空间"
    },
    "star_ship": {
        "name": "星际战舰", "attack": 1450, "shield": 350, "armor": 9750,
        "attack_type": "激光", "cost": 546250, "group": "战斗", "speed": 10000, "engine": "超空间"
    },
    "planet_cracker": {
        "name": "行星轰炸机", "attack": 1750, "shield": 700, "armor": 9000,
        "attack_type": "等离子", "cost": 114000, "group": "战斗", "speed": 4000, "engine": "脉冲"
    },
    # 战斗组 - 重型
    "giant_ship": {
        "name": "巨帆级", "attack": 35000, "shield": 15000, "armor": 170000,
        "attack_type": "混合", "cost": 1710000, "group": "战斗", "speed": 3500, "engine": "超空间"
    },
    "fortress_ship": {
        "name": "堡垒级", "attack": 0, "shield": 50, "armor": 500000,
        "attack_type": "无", "cost": 5343750, "group": "特殊", "speed": 1, "engine": "超空间"
    },
    "destroyer": {
        "name": "毁灭级", "attack": 90000, "shield": 40000, "armor": 400000,
        "attack_type": "混合", "cost": 4940000, "group": "战斗", "speed": 3000, "engine": "超空间"
    },
    "death_star": {
        "name": "战争要塞", "attack": 150000, "shield": 50000, "armor": 950000,
        "attack_type": "引力", "cost": 9975000, "group": "战斗", "speed": 200, "engine": "超空间"
    },
    "black_moon": {
        "name": "黑月级", "attack": 200000, "shield": 90000, "armor": 1000000,
        "attack_type": "混合", "cost": 11875000, "group": "战斗", "speed": 3000, "engine": "超空间"
    },
    "guardian": {
        "name": "守卫级", "attack": 630000, "shield": 300000, "armor": 3250000,
        "attack_type": "混合", "cost": 39900000, "group": "战斗", "speed": 2500, "engine": "超空间"
    },
    "black_wanderer": {
        "name": "黑色流浪者", "attack": 1804000, "shield": 950000, "armor": 10000000,
        "attack_type": "全能", "cost": 120650000, "group": "战斗", "speed": 2200, "engine": "超空间"
    },
    "death_ship": {
        "name": "死飞级", "attack": 4700000, "shield": 2000000, "armor": 20500000,
        "attack_type": "混合", "cost": 342000000, "group": "战斗", "speed": 1600, "engine": "超空间"
    },
    "holy_ship": {
        "name": "圣像战舰", "attack": 2000000, "shield": 4000000, "armor": 40500000,
        "attack_type": "混合", "cost": 475000000, "group": "战斗", "speed": 600, "engine": "超空间"
    },
    # 殖民组
    "colony_ship": {
        "name": "殖民船", "attack": 100, "shield": 200, "armor": 3000,
        "attack_type": "标准", "cost": 38000, "group": "殖民", "speed": 10000, "engine": "脉冲"
    },
    # 回收组
    "recycler": {
        "name": "回收船", "attack": 30, "shield": 100, "armor": 1600,
        "attack_type": "标准", "cost": 17100, "capacity": 2000000, "group": "回收", "speed": 20000, "engine": "燃烧"
    },
    "battle_recycler": {
        "name": "战场回收船", "attack": 250, "shield": 10000, "armor": 160000,
        "attack_type": "标准", "cost": 1710000, "capacity": 200000000, "group": "回收", "speed": 7500, "engine": "超空间"
    },
    # 特殊组
    "collector": {
        "name": "收集者", "attack": 250, "shield": 50000, "armor": 1300000,
        "attack_type": "标准", "cost": 15200000, "capacity": 6000000000, "group": "特殊", "speed": 100, "engine": "超空间"
    },
}

# 所有防御设施配置 (基于游戏实际数据)
DEFENSE = {
    # 基础防御
    "missile_launcher": {
        "name": "导弹发射器", "attack": 50, "shield": 400, "armor": 2000,
        "attack_type": "标准", "cost": 2000
    },
    "small_laser": {
        "name": "轻型激光塔", "attack": 250, "shield": 500, "armor": 2000,
        "attack_type": "激光", "cost": 2000
    },
    "heavy_laser": {
        "name": "重型激光塔", "attack": 400, "shield": 800, "armor": 8000,
        "attack_type": "激光", "cost": 8000
    },
    "ion_cannon": {
        "name": "离子大炮", "attack": 200, "shield": 5000, "armor": 8000,
        "attack_type": "离子", "cost": 8000
    },
    "gauss_cannon": {
        "name": "高斯加农炮", "attack": 2200, "shield": 4000, "armor": 35000,
        "attack_type": "标准", "cost": 37000
    },
    "plasma_cannon": {
        "name": "等离子炮", "attack": 13000, "shield": 16000, "armor": 100000,
        "attack_type": "等离子", "cost": 130000
    },
    # 高级防御
    "hydrogen_gun": {
        "name": "氢枪", "attack": 28000, "shield": 45000, "armor": 350000,
        "attack_type": "混合", "cost": 400000
    },
    "dora_gun": {
        "name": "朵拉枪", "attack": 38000, "shield": 45000, "armor": 500000,
        "attack_type": "混合", "cost": 575000
    },
    # 护盾系统
    "small_shield": {
        "name": "小型护盾", "attack": 0, "shield": 200000, "armor": 2000000,
        "attack_type": "无", "cost": 2000000
    },
    "medium_shield": {
        "name": "中型护盾", "attack": 0, "shield": 1000000, "armor": 10000000,
        "attack_type": "无", "cost": 10000000
    },
    "heavy_shield": {
        "name": "重型护盾", "attack": 0, "shield": 100000000, "armor": 15000000,
        "attack_type": "无", "cost": 17500000
    },
    # 终极防御
    "photon_cannon": {
        "name": "光子炮", "attack": 190600, "shield": 200000, "armor": 3750000,
        "attack_type": "混合", "cost": 4100000
    },
    "electron_gun": {
        "name": "轻子枪", "attack": 700000, "shield": 1000000, "armor": 15000000,
        "attack_type": "混合", "cost": 16500000
    },
    "graviton_cannon": {
        "name": "引力子炮", "attack": 1000000, "shield": 1600000, "armor": 30000000,
        "attack_type": "引力", "cost": 30000000
    },
    "proton_gun": {
        "name": "质子枪", "attack": 2000000, "shield": 2000000, "armor": 43000000,
        "attack_type": "混合", "cost": 46000000
    },
    "particle_cannon": {
        "name": "粒子发射器", "attack": 3500000, "shield": 5000000, "armor": 75000000,
        "attack_type": "混合", "cost": 83500000
    },
    "canyon_cannon": {
        "name": "峡谷炮", "attack": 6000000, "shield": 10000000, "armor": 140000000,
        "attack_type": "混合", "cost": 160000000
    },
    "quantum_cannon": {
        "name": "量子枪", "attack": 14000000, "shield": 30000000, "armor": 430000000,
        "attack_type": "混合", "cost": 470000000
    },
    "orbit_defense_platform": {
        "name": "轨道防御平台", "attack": 1000000000, "shield": 2000000000, "armor": 7000000000,
        "attack_type": "全能", "cost": 7500000000
    },
}


@dataclass
class Unit:
    """战斗单位"""
    name: str
    count: int
    attack: float
    shield: float
    armor: float
    cost: int
    attack_type: str

    def total_power(self) -> float:
        """计算总战力"""
        return self.count * (self.attack + self.shield + self.armor)


def parse_fleet(fleet_str: str) -> List[Unit]:
    """解析舰队字符串，格式: unit_name:count,unit_name:count"""
    units = []
    for part in fleet_str.split(","):
        if ":" not in part:
            continue
        name, count_str = part.strip().split(":")
        count = int(count_str)

        # 查找舰船或防御
        if name in SHIPS:
            data = SHIPS[name]
        elif name in DEFENSE:
            data = DEFENSE[name]
        else:
            print(f"警告: 未知单位 '{name}'，跳过")
            continue

        units.append(Unit(
            name=data["name"],
            count=count,
            attack=data["attack"],
            shield=data["shield"],
            armor=data["armor"],
            cost=data["cost"],
            attack_type=data.get("attack_type", "标准")
        ))

    return units


def simulate_combat(attacker: List[Unit], defender: List[Unit],
                    attacker_bonus: float = 0, defender_bonus: float = 0) -> Dict:
    """模拟战斗"""

    # 计算双方总战力
    attacker_power = sum(u.total_power() * (1 + attacker_bonus)
                         for u in attacker)
    defender_power = sum(u.total_power() * (1 + defender_bonus)
                         for u in defender)

    # 计算双方总成本
    attacker_cost = sum(u.count * u.cost for u in attacker)
    defender_cost = sum(u.count * u.cost for u in defender)

    # 战斗结果估算
    power_ratio = attacker_power / \
        defender_power if defender_power > 0 else float('inf')

    if power_ratio >= 5:
        result = "攻击方碾压"
        attacker_loss_pct = 0.02
        defender_loss_pct = 0.98
    elif power_ratio >= 3:
        result = "攻击方大胜"
        attacker_loss_pct = 0.05
        defender_loss_pct = 0.95
    elif power_ratio >= 2:
        result = "攻击方胜利"
        attacker_loss_pct = 0.15
        defender_loss_pct = 0.80
    elif power_ratio >= 1.5:
        result = "攻击方小胜"
        attacker_loss_pct = 0.30
        defender_loss_pct = 0.60
    elif power_ratio >= 1:
        result = "势均力敌"
        attacker_loss_pct = 0.50
        defender_loss_pct = 0.50
    elif power_ratio >= 0.67:
        result = "防守方小胜"
        attacker_loss_pct = 0.60
        defender_loss_pct = 0.30
    elif power_ratio >= 0.5:
        result = "防守方胜利"
        attacker_loss_pct = 0.80
        defender_loss_pct = 0.15
    else:
        result = "防守方大胜"
        attacker_loss_pct = 0.95
        defender_loss_pct = 0.05

    # 计算损失
    attacker_loss = int(attacker_cost * attacker_loss_pct)
    defender_loss = int(defender_cost * defender_loss_pct)

    # 残骸计算 (30%进入残骸)
    debris = int((attacker_loss + defender_loss) * 0.3)

    # 战利品计算
    loot = int(defender_cost * 0.3) if power_ratio >= 1 else 0

    if power_ratio >= 3:
        recommendation = "强烈建议攻击"
    elif power_ratio >= 2:
        recommendation = "建议攻击"
    elif power_ratio >= 1.5:
        recommendation = "谨慎攻击"
    elif power_ratio >= 1:
        recommendation = "风险较高"
    else:
        recommendation = "不建议攻击"

    return {
        "result": result,
        "power_ratio": round(power_ratio, 2),
        "attacker_power": int(attacker_power),
        "defender_power": int(defender_power),
        "attacker_cost": attacker_cost,
        "defender_cost": defender_cost,
        "attacker_loss": attacker_loss,
        "defender_loss": defender_loss,
        "debris": debris,
        "potential_loot": loot,
        "net_gain": loot - attacker_loss,
        "recommendation": recommendation
    }


def list_units():
    """列出所有可用单位"""
    print("\n" + "="*60)
    print("可用舰船:")
    print("="*60)
    for key, data in SHIPS.items():
        print(
            f"  {key:20} - {data['name']:12} 战力:{data['attack']+data['shield']+data['armor']:>10,} 成本:{data['cost']:>12,}")

    print("\n" + "="*60)
    print("可用防御:")
    print("="*60)
    for key, data in DEFENSE.items():
        print(
            f"  {key:25} - {data['name']:12} 战力:{data['attack']+data['shield']+data['armor']:>12,} 成本:{data['cost']:>12,}")
    print("="*60)


def main():
    if len(sys.argv) < 2:
        print("星际愤怒战斗模拟器")
        print()
        print("用法:")
        print("  python combat_simulator.py list                              # 列出所有单位")
        print("  python combat_simulator.py <攻击舰队> <防御配置> [攻击加成] [防御加成]")
        print()
        print("舰队格式: unit_name:count,unit_name:count")
        print()
        list_units()
        print()
        print("示例:")
        print("  python combat_simulator.py 'battleship:50,cruiser:30' 'small_laser:100,heavy_laser:50'")
        print("  python combat_simulator.py 'light_fighter:500,heavy_fighter:200' 'missile_launcher:200,ion_cannon:50'")
        sys.exit(1)

    if sys.argv[1] == "list":
        list_units()
        sys.exit(0)

    if len(sys.argv) < 3:
        print("错误: 需要攻击舰队和防御配置")
        sys.exit(1)

    attacker_str = sys.argv[1]
    defender_str = sys.argv[2]
    attacker_bonus = float(sys.argv[3]) / 100 if len(sys.argv) > 3 else 0
    defender_bonus = float(sys.argv[4]) / 100 if len(sys.argv) > 4 else 0

    attacker = parse_fleet(attacker_str)
    defender = parse_fleet(defender_str)

    if not attacker:
        print("错误: 攻击舰队为空")
        sys.exit(1)

    if not defender:
        print("错误: 防御配置为空")
        sys.exit(1)

    result = simulate_combat(
        attacker, defender, attacker_bonus, defender_bonus)

    print("\n" + "="*60)
    print("战斗模拟结果")
    print("="*60)
    print(f"\n战斗结果: {result['result']}")
    print(f"战力比: {result['power_ratio']}:1")
    print(f"\n攻击方:")
    print(f"  总战力: {result['attacker_power']:,}")
    print(f"  舰队价值: {result['attacker_cost']:,}")
    print(f"  预计损失: {result['attacker_loss']:,}")
    print(f"\n防守方:")
    print(f"  总战力: {result['defender_power']:,}")
    print(f"  防御价值: {result['defender_cost']:,}")
    print(f"  预计损失: {result['defender_loss']:,}")
    print(f"\n战后收益:")
    print(f"  残骸: {result['debris']:,}")
    print(f"  潜在战利品: {result['potential_loot']:,}")
    print(f"  净收益: {result['net_gain']:,}")
    print(f"\n建议: {result['recommendation']}")
    print("="*60)


if __name__ == "__main__":
    main()
