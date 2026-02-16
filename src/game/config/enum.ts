/**
 * 所有枚举类型的定义
 */

/**
 * 第一类资源类型
 */
export enum Resource_1 {
  /** 金属 */
  Metal = 1,
  /** 水晶 */
  Crystal,
  /** 重氢 */
  Deuterium,
}

/**
 * 第二类资源类型
 */
export enum Resource_2 {
  /** 电能 */
  Energy = 10,
  /** 创造 */
  Build,
  /** 研究 */
  Tech,
  /** 舰船 */
  Fleet,
  /** 防御 */
  Defense,
}

/**
 * 第三类资源类型
 */
export enum Resource_3 {
  /** 金币 */
  DarkMatter = 20,
  /** 以太 */
  AntiMatter,
  /** 星尘 */
  StarDust,
  /** 宝箱 */
  Container,
}

/**
 * 第四类资源类型
 */
export enum Resource_4 {
  /** 铝土矿 */
  Aluminum = 30,
  /** 绿柱石 */
  Beryl,
  /** 钛铁矿 */
  TitaniumOre,
  /** 绿宝石 */
  Emerald,
  /** 黄金矿 */
  GoldMine,
  /** 红玛瑙 */
  Ruby,
  /** 孔雀石 */
  Topaz,
  /** 黄铁矿 */
  IronOre,
}

/**
 * 资源类型
 */
export const Resource = {
  ...Resource_1,
  ...Resource_2,
  ...Resource_3,
  ...Resource_4,
}

export type Resource = Resource_1 | Resource_2 | Resource_3 | Resource_4

export type Element =
  | Building
  | Technology
  | Ship
  | Defense
  | Officer
  | Armory
  | Ideology
  | Race
  | Politics
  | Camp
  | MineralResearch

export type AllElement = Resource | Element

/**
 * 建筑类型
 */
export enum Building {
  /** 金属加工厂 */
  MetalMine = 100,
  /** 水晶开采厂 */
  CrystalMine,
  /** 重氢精炼厂 */
  DeuteriumSintetizer,
  /** 太阳能电站 */
  SolarPlant,
  /** 星际学院 */
  University,
  /** 聚变反应堆 */
  FusionPlant,
  /** 机器人工厂 */
  RobotFactory,
  /** 纳米机器人工厂 */
  NanoFactory,
  /** 造船厂 */
  Hangar,
  /** 金属仓库 */
  MetalStorage,
  /** 水晶仓库 */
  CrystalStorage,
  /** 重氢仓库 */
  DeuteriumStorage,
  /** 研究院 */
  Laboratory,
  /** 地形改造机 */
  Terraformer,
  // /** 联盟空间站 */
  // AllyDeposit,
  /** 月球基地 */
  MoonBase,
  /** 传感器阵列 */
  PhalaxSensor,
  // /** 跃迁传送门 */
  // Jumpgate,
  /** 资源模块 */
  ResourceModule,
  /** 防御模块 */
  DefensiveModule,
  /** 军工模块 */
  MilitaryModule,
  /** 研究模块 */
  ResearchModule,
}

/**
 * 科技类型
 */
export enum Technology {
  /** 间谍技术 */
  SpyTech = 200,
  /** 计算机技术 */
  ComputerTech,
  /** 武器技术 */
  MilitaryTech,
  /** 护盾技术 */
  ShieldTech,
  /** 装甲技术 */
  DefenceTech,
  /** 能源技术 */
  EnergyTech,
  /** 超空间技术 */
  HyperspaceTech,
  /** 燃烧引擎 */
  CombustionTech,
  /** 脉冲引擎 */
  ImpulseMotorTech,
  /** 超空间引擎 */
  HyperspaceMotorTech,
  /** 激光技术 */
  LaserTech,
  /** 离子技术 */
  IonicTech,
  /** 等离子技术 */
  PlasmaTech,
  /** 星际研究网络 */
  IntergalacticTech,
  /** 探险技术 */
  ExpeditionTech,
  /** 矿物质研究 */
  MetalProcTech,
  /** 半晶体研究 */
  CrystalProcTech,
  /** 燃料研究 */
  DeuteriumProcTech,
  /** 引力子研究 */
  GravitonTech,
}

/**
 * 舰船类型
 */
export enum Ship {
  /** 小型货船 */
  SmallShipCargo = 300,
  /** 轻型战机 */
  LightHunter,
  /** 重型货船 */
  BigShipCargo,
  /**太阳能卫星 */
  SolarSatellite,
  /** 间谍卫星 */
  SpyProbe,
  /** 重型战机 */
  HeavyHunter,
  /** 巡洋舰 */
  Crusher,
  /** 战列巡洋舰 */
  BattleCruiser,
  /** 战列舰 */
  Battleship,
  /**殖民船 */
  ColonyShip,
  /**回收船 */
  Recycler,
  /** 军用运输机 */
  Transporter,
  /** 战场回收船 */
  BattleRecycler,
  /** 星际战舰 */
  StarShip,
  /** 行星轰炸机 */
  PlanetCracker,
  /** 巨帆级 */
  GiantShip,
  /** 斗志级 */
  Moraleship,
  /**毁灭级 */
  Destroyer,
  /** 战争要塞 */
  Fortress,
  /** 收集者 */
  Collector,
  /**黑月级 */
  BlackMoon,
  /** 守卫级 */
  Guardian,
  /** 黑色流浪者 */
  BlackWanderer,
  /**死飞级 */
  DeathShip,
  /** 圣像战舰 */
  HolyShip,
}

/**
 * 防御设施类型
 */
export enum Defense {
  /** 导弹发射器 */
  MissileLauncher = 400,
  /** 轻型激光塔 */
  SmallLaser,
  /**离子大炮 */
  IonCannon,
  /** 重型激光塔 */
  BigLaser,
  /** 高斯加农炮 */
  GaussCannon,
  /** 等离子炮 */
  PlasmaCannon,
  /** 氢枪 */
  HydrogenGun,
  /** 朵拉枪 */
  DoraGun,
  /** 小型护盾 */
  SmallShield,
  /** 中型护盾 */
  MediumShield,
  /** 重型护盾 */
  HeavyShield,
  /** 光子炮 */
  PhotonCannon,
  /** 轻子枪 */
  ElectronGun,
  /** 引力子炮 */
  GravitonCannon,
  /** 质子枪 */
  ProtonGun,
  /** 粒子发射器 */
  ParticleCannon,
  /** 峡谷炮 */
  CanyonCannon,
  /** 量子枪 */
  QuantumCannon,
  /** 轨道防御平台 */
  OrbitDefensePlatform,
}

/**
 * 官员
 */
export enum Officer {
  /** 地质学家 */
  Geologist = 500,
  /** 舰队司令 */
  FleetCommander,
  /** 工程师 */
  Engineer,
  /** 技术专家 */
  Technocrat,
  /**大发明家 */
  Inventor,
  /** 科学狂人 */
  Frankenstein,
  /** 仓库专家 */
  Warehouse,
  /** 国防部长 */
  Counterpart,
  /** 守护者 */
  Guardian,
  /** 间谍 */
  Spy,
  /** 指挥官 */
  Commander,
  /** 毁灭者 */
  Destroyer,
  /** 将军 */
  General,
  /** 征服者 */
  Conqueror,
  /** 掠夺者 */
  Plunderer,
}

/**
 * 军械库
 */
export enum Armory {
  /** 装备 */
  Equipment = 600,
  /** 装甲 */
  Armor,
  /** 护盾 */
  Shield,
  /** 资源 */
  Resource,
  /** 舰队速度 */
  FleetSpeed,
  /** 舰队容量 */
  FleetCapacity,
  /** 建筑物的建造速度 */
  BuildSpeed,
  /** 研究速度 */
  ResearchSpeed,
  /** 造船速度 */
  ShipSpeed,
  /** 防御建造速度 */
  DefenseSpeed,
}

/**
 * 意识形态
 */
export enum Ideology {
  /** 自由主义 */
  Liberalism = 700,
  /**无政府主义 */
  Anarchism,
  /**共产主义 */
  Communism,
  /** 社会主义 */
  Socialism,
  /**民粹主义 */
  Populism,
  /** 保守主义 */
  Conservatism,
}

/**
 * 种族
 */
export enum Race {
  /** 皇家宇宙军 */
  RoyalGuard = 800,
  /** 联合海军 */
  UnitedNavy,
  /** 反抗组织 */
  Rebellion,
  /** 极端分子 */
  Extremist,
}

/**
 * 政治体制
 */
export enum Politics {
  /** 帝国政体 */
  Imperialism = 900,
  /** 共和政体 */
  Republic,
  /** 民主政体 */
  Democracy,
  /** 联邦政体 */
  Federation,
}

/**
 * 阵营
 */
export enum Camp {
  /** 秩序 */
  Order = 1000,
  /** 中立 */
  Neutral,
  /** 混乱 */
  Chaos,
}

/**
 * 矿物研究
 */
export enum MineralResearch {
  /** 增压器   */
  Booster = 1100,
  /** 补偿器 */
  Compensator,
  /** 发电机 */
  Generator,
  /** 高级部件 */
  AdvancedComponent,
  /** 制图器 */
  Mapper,
  /** 固态电池 */
  SolidBattery,
  /** 量子科技 */
  QuantumTechnology,
  /** 视锥 */
  Visioncone,
}

/**
 * 联盟发展
 */
export enum AllianceDevelop {
  Alliance1 = 1,
  Alliance2,
  Alliance3,
  Alliance4,
  Alliance5,
  Alliance6,
  Alliance7,
  Alliance8,
  Alliance9,
  Alliance10,
  Alliance11,
  Alliance12,
  Alliance13,
  Alliance14,
  Alliance15,
}

/**
 * 攻击类型
 */
export enum AttackType {
  /** 常规 */
  Normal,
  /** 激光 */
  Laser,
  /** 离子 */
  Ion,
  /** 等离子体 */
  Plasma,
  /** 引力 */
  Gravity,
}

/**
 * 攻击类型名称
 */
export const AttackTypeName = {
  [AttackType.Normal]: '标准攻击',
  [AttackType.Laser]: '激光攻击',
  [AttackType.Ion]: '离子攻击',
  [AttackType.Plasma]: '等离子体攻击',
  [AttackType.Gravity]: '引力攻击',
}

/**
 * 装甲类型
 */
export enum DefensiveType {
  /** 轻型 */
  Light,
  /** 中型 */
  Medium,
  /** 重型 */
  Heavy,
}

/**
 * 装甲类型名称
 */
export const DefensiveTypeName = {
  [DefensiveType.Light]: '轻型装甲',
  [DefensiveType.Medium]: '中型装甲',
  [DefensiveType.Heavy]: '重型装甲',
}

/**
 * 护盾类型
 */
export enum ShieldType {
  /** 轻型 */
  Light,
  /** 中型 */
  Medium,
  /** 重型 */
  Heavy,
}

/**
 * 护盾类型名称
 */
export const ShieldTypeName = {
  [ShieldType.Light]: '轻型护盾',
  [ShieldType.Medium]: '中型护盾',
  [ShieldType.Heavy]: '重型护盾',
}

/**
 * 引擎类型
 */
export enum EngineType {
  /** 燃烧 */
  Combustion,
  /** 脉冲 */
  Impulse,
  /** 超空间 */
  Hyperspace,
}

/**
 * 引擎类型名称
 */
export const EngineTypeName = {
  [EngineType.Combustion]: '燃烧引擎',
  [EngineType.Impulse]: '脉冲引擎',
  [EngineType.Hyperspace]: '超空间引擎',
}

/**
 * 舰船分组类型
 */
export enum ShipGroup {
  /** 战斗组 */
  Battle,
  /** 运输组 */
  Transport,
  /** 侦察组 */
  Spy,
  /** 回收组 */
  Recycler,
  /** 殖民组 */
  Colony,
  /** 特殊组 */
  Special,
}

/**
 * 舰队分组名称
 */
export const ShipGroupName = {
  [ShipGroup.Battle]: '战斗',
  [ShipGroup.Transport]: '运输',
  [ShipGroup.Spy]: '侦察',
  [ShipGroup.Recycler]: '回收',
  [ShipGroup.Colony]: '殖民',
  [ShipGroup.Special]: '特殊',
}

/**
 * 舰队任务类型
 */
export enum FleetTaskType {
  /** 运输 */
  Transport,
  /** 攻击 */
  Attack,
  /** 驻守 */
  Defend,
  /** 侦察 */
  Spy,
  /** 殖民 */
  Colony,
  /** 回收 */
  Recycler,
  /** 探险 */
  Expedition,
  /** 部署 */
  Deploy,
}

/**
 * 舰队任务名称
 */
export const FleetTaskName = {
  [FleetTaskType.Transport]: '运输',
  [FleetTaskType.Attack]: '攻击',
  [FleetTaskType.Defend]: '驻守',
  [FleetTaskType.Spy]: '侦察',
  [FleetTaskType.Colony]: '殖民',
  [FleetTaskType.Recycler]: '回收',
  [FleetTaskType.Expedition]: '探险',
  [FleetTaskType.Deploy]: '部署',
}

/**
 * 舰队任务状态
 */
export enum FleetTaskStatus {
  /** 出发中 */
  Departure,
  /** 停留中 */
  Stay,
  /** 返回中 */
  Return,
  /** 已完成 */
  Complete,
}

/**
 * 战斗结果
 */
export enum BattleResult {
  /** 胜利 */
  Win,
  /** 失败 */
  Lose,
  /** 平局 */
  Draw,
}

/**
 * 加成类型
 */
export enum BonusType {
  /** 攻击时的攻击 */
  AttackA = 1,
  /** 攻击时的装甲 */
  DefensiveA,
  /** 攻击时的护盾 */
  ShieldA,
  /** 防御时的攻击 */
  AttackD,
  /** 防御时的装甲 */
  DefensiveD,
  /** 防御时的护盾 */
  ShieldD,
  /** 攻击 */
  Attack,
  /** 激光攻击 */
  AttackLaser,
  /** 离子攻击 */
  AttackIon,
  /** 等离子体攻击 */
  AttackPlasma,
  /** 引力攻击 */
  AttackGravity,
  /** 装甲 */
  Defensive,
  /** 轻型装甲 */
  DefensiveSlight,
  /** 中型装甲 */
  DefensiveSmedium,
  /** 重型装甲 */
  DefensiveSheavy,
  /** 护盾 */
  Shield,
  /** 轻型护盾 */
  ShieldSlight,
  /** 中型护盾 */
  ShieldSmedium,
  /** 重型护盾 */
  ShieldSheavy,
  /** 建造时间 */
  BuildTime,
  /** 建筑队列 */
  BuildSlots,
  /** 研究时间 */
  TechTime,
  /** 研究队列 */
  ResearchSlots,
  /** 星际市场网络 */
  ResearchSlotPlanet,
  /** 造船时间 */
  FleetTime,
  /** 造船队列 */
  FleetBuildSlots,
  /** 防御建造时间 */
  DefenseTime,
  /** 防御建造队列 */
  DefenseBuildSlots,
  /** 资源生产 */
  Resource,
  /** 金属开采 */
  Metal,
  /** 水晶开采 */
  Crystal,
  /** 重氢开采 */
  Deuterium,
  /** 能源生产 */
  Energy,
  /** 资源存储 */
  ResourceStorage,
  /** 舰船载货量 */
  ShipStorage,
  /** 舰船飞行速度 */
  FlyTime,
  /** 喷气发动机舰船的飞行速度 */
  FlyTimeCom,
  /** 脉冲发动机舰船的飞行速度 */
  FlyTimeImp,
  /** 超空间发动机舰船的飞行速度 */
  FlyTimeHyp,
  /** 舰队插槽 */
  FleetSlots,
  /** 行星 */
  Planets,
  /** 间谍力量 */
  SpyPower,
  /** 探险 */
  Expedition,
  /** 探险获利 */
  MoreFound,
  /** 降低建筑成本 */
  BuildCost,
  /** 降低舰队成本 */
  FleetCost,
  /** 降低研究成本 */
  TechCost,
  /** 降低防御成本 */
  DefenseCost,
  /** 加倍攻击的概率 */
  DoubleAttack,
  /** 加倍护盾的概率 */
  DoubleShield,
  /** 加倍装甲的概率 */
  DoubleDefensive,
  /** 加倍攻击的伤害 */
  DoubleAttackDamage,
  /** 加倍护盾的密度 */
  DoubleShieldBonus,
  /** 加倍装甲的密度 */
  DoubleDefensiveBonus,
  /** 战斗后的残骸 */
  Debris,
  /** 减少重氢消耗 */
  FuelConsum,
  // /** 恢复防御 */
  // DefRecovery,
  // /** 聚焦舰船 */
  // Focusing,
  // /** 降低射速造成的伤害 */
  // AntiFocusing,
  // /** 每轮摧毁的最大数量 */
  // AccurateShots,
  // /** 链式反应触发概率 */
  // ChainReaction,
  // /** 链式反应炸毁的最大单位数 */
  // ExpBoost,
  // /** 跃迁传送门充电时间 */
  // GateCoolTime,
  // /** 护盾的最大数量 */
  // ShieldDome,
  // /** 防御轨道平台的最大数量 */
  // OrbitalBases,
}

/**
 * 消息类型
 */
export enum MessageType {
  /** 间谍报告 */
  Spy,
  /** 作战报告 */
  Battle,
  /** 聊天消息 */
  Chat,
  /** 系统消息 */
  System,
  /** 交易消息 */
  Trade,
  /** 联盟消息 */
  Alliance,
  /** 运输报告 */
  Transport,
  /** 游戏消息 */
  Game,
  /** 探险报告 */
  Expedition,
  /** 部署报告 */
  Deploy,
  /** 侦察报告 */
  Sensor,
}

/**
 * 消息类型名称
 */
export const MessageTypeName = {
  [MessageType.Spy]: '间谍报告',
  [MessageType.Battle]: '作战报告',
  [MessageType.Chat]: '聊天消息',
  [MessageType.System]: '系统消息',
  [MessageType.Trade]: '交易消息',
  [MessageType.Alliance]: '联盟消息',
  [MessageType.Transport]: '运输报告',
  [MessageType.Game]: '游戏消息',
  [MessageType.Expedition]: '探险报告',
  [MessageType.Deploy]: '部署报告',
  [MessageType.Sensor]: '感应报告',
}

/**
 * 消息数据类型
 */
export enum MessageDataType {
  /** 侦察成功数据 */
  SpySuccess,
  /** 侦察失败数据，目的地星球无人 */
  SpyFail,
  /** 发现别人侦察 */
  DetectSpy,
}

/**
 * 联盟关系
 */
export enum AllianceRelation {
  /** 无 */
  None = 1,
  /** 结盟，不可相互攻击 */
  Ally,
}

/**
 * 联盟关系名称
 */
export const AllianceRelationName = {
  [AllianceRelation.None]: '普通',
  [AllianceRelation.Ally]: '结盟',
}

/**
 * 需要发起请求的联盟关系
 */
export const AllianceRelationNeedRequest = [AllianceRelation.Ally]

/**
 * 等级
 */
export enum Level {
  I = 1,
  II,
  III,
  IV,
  V,
  VI,
  VII,
  VIII,
}

/**
 * 意识形态名称
 */
export const IdeologyName = {
  [Ideology.Liberalism]: '自由主义',
  [Ideology.Anarchism]: '无政府主义',
  [Ideology.Communism]: '共产主义',
  [Ideology.Socialism]: '社会主义',
  [Ideology.Populism]: '民粹主义',
  [Ideology.Conservatism]: '保守主义',
}

/**
 * 种族名称
 */
export const RaceName = {
  [Race.RoyalGuard]: '皇家宇宙军',
  [Race.UnitedNavy]: '联合海军',
  [Race.Rebellion]: '反抗组织',
  [Race.Extremist]: '极端分子',
}

/**
 * 政体名称
 */
export const PoliticsName = {
  [Politics.Imperialism]: '帝国政体',
  [Politics.Republic]: '共和政体',
  [Politics.Democracy]: '民主政体',
  [Politics.Federation]: '联邦政体',
}

/**
 * 阵营名称
 */
export const CampName = {
  [Camp.Order]: '秩序',
  [Camp.Neutral]: '中立',
  [Camp.Chaos]: '混乱',
}

/**
 * 装饰类型
 */
export enum DecorationType {
  /** 头像框 */
  AvatarFrame = 'avatar_frame',
  /** 名字特效 */
  NameEffect = 'name_effect',
}

/**
 * 装饰类型名称
 */
export const DecorationTypeName = {
  [DecorationType.AvatarFrame]: '头像框',
  [DecorationType.NameEffect]: '名字特效',
}
