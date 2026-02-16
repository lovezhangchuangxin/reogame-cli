#!/usr/bin/env python3
"""
星际愤怒资源计算器
计算资源生产、建筑成本、升级时间等
"""

import json
import sys
from dataclasses import dataclass
from typing import Dict, Optional

# 建筑配置
BUILDINGS = {
    "metal_mine": {
        "name": "金属加工厂",
        "base_cost": {"metal": 60, "crystal": 15},
        "base_production": 30,  # 每小时
        "base_energy": 10,
        "growth_factor": 1.5,
    },
    "crystal_mine": {
        "name": "水晶开采厂",
        "base_cost": {"metal": 48, "crystal": 24},
        "base_production": 20,
        "base_energy": 10,
        "growth_factor": 1.6,
    },
    "deuterium_synthesizer": {
        "name": "重氢精炼厂",
        "base_cost": {"metal": 225, "crystal": 75},
        "base_production": 10,
        "base_energy": 20,
        "growth_factor": 1.5,
    },
    "solar_plant": {
        "name": "太阳能电站",
        "base_cost": {"metal": 75, "crystal": 30},
        "base_production": 20,  # 电能产出
        "base_energy": 0,
        "growth_factor": 1.5,
    },
    "metal_storage": {
        "name": "金属仓库",
        "base_cost": {"metal": 1000},
        "base_capacity": 10000,
        "growth_factor": 2.0,
    },
    "crystal_storage": {
        "name": "水晶仓库",
        "base_cost": {"metal": 1000, "crystal": 500},
        "base_capacity": 10000,
        "growth_factor": 2.0,
    },
    "deuterium_storage": {
        "name": "重氢仓库",
        "base_cost": {"metal": 1000, "crystal": 1000},
        "base_capacity": 10000,
        "growth_factor": 2.0,
    },
}


def calculate_upgrade_cost(building_id: str, current_level: int, target_level: int = None) -> Dict:
    """计算建筑升级成本"""
    if building_id not in BUILDINGS:
        return {"error": f"未知建筑: {building_id}"}

    building = BUILDINGS[building_id]
    factor = building["growth_factor"]
    base_cost = building["base_cost"]

    if target_level is None:
        target_level = current_level + 1

    total_cost = {"metal": 0, "crystal": 0, "deuterium": 0}

    for level in range(current_level, target_level):
        for resource, amount in base_cost.items():
            cost = int(amount * (factor ** level))
            total_cost[resource] += cost

    return {
        "building": building["name"],
        "from_level": current_level,
        "to_level": target_level,
        "total_cost": total_cost,
    }


def calculate_production(building_id: str, level: int, bonus: float = 0, efficiency: float = 1.0) -> Dict:
    """计算资源建筑产出"""
    if building_id not in BUILDINGS:
        return {"error": f"未知建筑: {building_id}"}

    building = BUILDINGS[building_id]

    if "base_production" not in building:
        return {"error": f"{building['name']}不是生产建筑"}

    base = building["base_production"]
    factor = building["growth_factor"]

    production = base * level * \
        (factor ** (level - 1)) * (1 + bonus) * efficiency

    energy_consumption = 0
    if building.get("base_energy", 0) > 0:
        energy_consumption = building["base_energy"] * \
            level * (factor ** (level - 1))

    return {
        "building": building["name"],
        "level": level,
        "production_per_hour": int(production),
        "production_per_day": int(production * 24),
        "energy_consumption": int(energy_consumption),
    }


def calculate_storage(building_id: str, level: int, bonus: float = 0) -> Dict:
    """计算仓库容量"""
    if building_id not in BUILDINGS:
        return {"error": f"未知建筑: {building_id}"}

    building = BUILDINGS[building_id]

    if "base_capacity" not in building:
        return {"error": f"{building['name']}不是仓库建筑"}

    base = building["base_capacity"]
    factor = building["growth_factor"]

    capacity = base * (factor ** level) * (1 + bonus)

    return {
        "building": building["name"],
        "level": level,
        "capacity": int(capacity),
    }


def calculate_upgrade_time(base_cost: Dict, robotics_level: int = 0, nanite_level: int = 0) -> Dict:
    """计算升级时间（小时）"""
    total_cost = sum(base_cost.values())

    # 基础时间（小时）
    base_hours = total_cost / 2500

    # 机器人工厂加速
    robotics_bonus = 1 + robotics_level * 0.1

    # 纳米工厂加速
    nanite_bonus = 1 + nanite_level * 0.5

    final_hours = base_hours / (robotics_bonus * nanite_bonus)

    return {
        "hours": round(final_hours, 2),
        "minutes": int(final_hours * 60),
        "formatted": format_time(final_hours),
    }


def format_time(hours: float) -> str:
    """格式化时间"""
    h = int(hours)
    m = int((hours - h) * 60)
    return f"{h}小时{m}分钟"


def calculate_energy_balance(buildings: Dict[str, int]) -> Dict:
    """计算能源平衡"""
    production = 0
    consumption = 0

    for building_id, level in buildings.items():
        if building_id == "solar_plant":
            prod = calculate_production(building_id, level)
            production += prod.get("production_per_hour", 0)
        elif building_id in ["metal_mine", "crystal_mine", "deuterium_synthesizer"]:
            prod = calculate_production(building_id, level)
            consumption += prod.get("energy_consumption", 0)

    efficiency = min(1.0, production / consumption) if consumption > 0 else 1.0

    return {
        "production": production,
        "consumption": consumption,
        "balance": production - consumption,
        "efficiency": f"{efficiency * 100:.1f}%",
    }


def main():
    if len(sys.argv) < 2:
        print("星际愤怒资源计算器")
        print()
        print("用法:")
        print(
            "  计算升级成本: python resource_calculator.py cost <建筑ID> <当前等级> [目标等级]")
        print("  计算产量: python resource_calculator.py production <建筑ID> <等级>")
        print("  计算容量: python resource_calculator.py storage <仓库ID> <等级>")
        print("  计算能源: python resource_calculator.py energy <建筑配置JSON>")
        print()
        print("可用建筑ID:", ", ".join(BUILDINGS.keys()))
        print()
        print("示例:")
        print("  python resource_calculator.py cost metal_mine 10 15")
        print("  python resource_calculator.py production metal_mine 15")
        print(
            "  python resource_calculator.py energy '{\"metal_mine\":15,\"crystal_mine\":10,\"solar_plant\":15}'")
        sys.exit(1)

    command = sys.argv[1]

    if command == "cost":
        if len(sys.argv) < 4:
            print("错误: 需要建筑ID和当前等级")
            sys.exit(1)

        building_id = sys.argv[2]
        current_level = int(sys.argv[3])
        target_level = int(sys.argv[4]) if len(sys.argv) > 4 else None

        result = calculate_upgrade_cost(
            building_id, current_level, target_level)
        print(json.dumps(result, indent=2, ensure_ascii=False))

    elif command == "production":
        if len(sys.argv) < 4:
            print("错误: 需要建筑ID和等级")
            sys.exit(1)

        building_id = sys.argv[2]
        level = int(sys.argv[3])

        result = calculate_production(building_id, level)
        print(json.dumps(result, indent=2, ensure_ascii=False))

    elif command == "storage":
        if len(sys.argv) < 4:
            print("错误: 需要仓库ID和等级")
            sys.exit(1)

        building_id = sys.argv[2]
        level = int(sys.argv[3])

        result = calculate_storage(building_id, level)
        print(json.dumps(result, indent=2, ensure_ascii=False))

    elif command == "energy":
        if len(sys.argv) < 3:
            print("错误: 需要建筑配置JSON")
            sys.exit(1)

        buildings = json.loads(sys.argv[2])
        result = calculate_energy_balance(buildings)
        print(json.dumps(result, indent=2, ensure_ascii=False))

    else:
        print(f"未知命令: {command}")
        sys.exit(1)


if __name__ == "__main__":
    main()
