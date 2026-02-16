import {
  AllianceDevelop,
  AllianceRelation,
  Armory,
  BattleResult,
  BonusType,
  Building,
  BuyableElement,
  Camp,
  Defense,
  FleetTaskStatus,
  FleetTaskType,
  Ideology,
  MessageDataType,
  MessageType,
  MineralResearch,
  Officer,
  Politics,
  ProductInfo,
  Race,
  Resource_1,
  Resource_3,
  Resource_4,
  Ship,
  Technology,
  UniverseAllConfig,
  UserProductInfo,
  DecorationDefinition,
  UserDecorations,
} from '../config'

export * from './interface'
export * from './container'

/**
 * 游戏数据模型
 */
export interface GameModel {
  /** 游戏数据版本 */
  version: string
  /** 游戏开服时间 */
  openTime: number
  /** 玩家 id 计数器，新玩家注册时递增 */
  userIdCounter: number
  /** 宇宙 */
  universes: Record<number, Universe>
  /** 商品信息 */
  products: Record<string, ProductInfo>
  /** 装饰定义 */
  decorations: Record<string, DecorationDefinition>
  /** 消息 */
  messages: Record<string, Message>
  /** 邀请的玩家 id */
  invites: Record<number, number[]>
  /** 邀请奖励 */
  inviteRewards?: {
    /** 待领取奖励：邀请人ID -> 奖励记录数组 */
    pending: Record<number, InviteReward[]>
    /** 已领取历史 */
    claimed: Record<number, InviteRewardClaimed[]>
    /** 被邀请人签到记录：被邀请人ID -> 签到时间戳数组 */
    inviteeSignInDays: Record<number, number[]>
  }
}

/**
 * 宇宙
 */
export interface Universe {
  /** 宇宙 id，自动递增 */
  id: number
  /** 宇宙名称 */
  name: string
  /** 玩家 */
  users: Record<number, User>
  /** 星球 */
  planets: Record<number, Planet>
  /** 舰队任务 */
  fleetTasks: Record<string, FleetTask>
  /** 废墟 */
  debris: Record<number, DebrisInfo>
  /** 宇宙所有配置，缺省时使用默认配置 */
  config: UniverseAllConfig
  /** 订单信息 */
  orders: Record<string, Order>
  /** 联盟 */
  alliances: Record<number, Alliance>
  /** 联盟排行 */
  alliancesRank: {
    /** 上次更新的时间 */
    lastUpdate: number
    /** 排名 */
    rank: number[]
  }
  /** 积分排名 */
  pointsRank: {
    /** 上次更新的时间 */
    lastUpdate: number
    /** 排名，类型 -> 玩家 id */
    rank: Record<PointType, number[]>
  }
  /** 母星计算 */
  mainPlanetRank: {
    /** 上次更新的时间 */
    lastUpdate: number
  }
  /** 存储该宇宙的公告 */
  announcement: string
  /** 存储该宇宙联合攻击邀请信息 */
  ACSInviteInfo: ACSInviteInfo[]
  /** 宇宙诞生起计时 */
  gameTick: number
  /** 矿主相关 */
  mineralHost: {
    /** 矿物NPC运行计时 */
    mineralTick: number
    /** 矿主创建标记 */
    hostCreate: boolean
    /** 矿物行星的数量 */
    mineralPlanetSum: number
    /** 记录矿物行星的id */
    mineralPlanetId: number[]
    /** 矿物行星的品质等级，默认为10，管理员可控制的参数 */
    mineralLevel: number
    /**运行开关 */
    switch: boolean
  }
  /** 该宇宙的全频广播，聊天室 */
  chatMessage: ChatMessage[]
  /** 交易对 */
  amm: AMMModel[]
}

/**
 * 消息
 */
export interface ChatMessage {
  /** 消息 id */
  id: number
  /** 消息内容 */
  content: string
  /** 消息来源 id，即玩家 id */
  userId: number
  userName: string
  /** 玩家头像 URL */
  userAvatar?: string
  /** 玩家激活的装饰（只存储当前使用的，不存储拥有的列表） */
  userDecorations?: Pick<UserDecorations, 'activeAvatarFrame' | 'activeNameEffect'>
  /** 消息发送时间 */
  sentTime: number
  /** 玩家权限 */
  userRole: Role
  userAllianceId?: number
  userAllianceName?: string
}

/**
 * 用户权限
 */
export enum Role {
  /** 玩家 */
  User = 1,
  /** 管理员 */
  Admin = 2,
  /** VIP */
  VIP = 3,
}

/**
 * 用户的基础信息
 */
export interface UserBaseData {
  /** 用户 id */
  id: number
  /** 用户名 */
  username: string
  /** 所属宇宙编号 */
  universe: number
  /** 权限 */
  role: Role
  /** 是否是玩家，true为玩家，false为NPC */
  isRealman: boolean
}

/**
 * 玩家不敏感的信息
 */
export interface UserSafeData extends UserBaseData {
  /** 邮箱 */
  email: string
  /** 注册时间 */
  registerTime: number
  /** 最近一次在线时间 */
  onlineTime: number
  /** 封禁结束时间 */
  bannedTime: number
  /** 安全模式 */
  safeMode: boolean
  /** 安全模式结束时间 */
  safeModeTime: number
  /** 安全模式次数 */
  safeModeCount: number
  /** 头像 url */
  avatarUrl: string
  /** 联盟 id */
  allianceId?: number
  /** 战斗次数统计, win 胜利，lose 失败，draw 平局 */
  battleStats: { win: number; lose: number; draw: number }
  /** 积分数据 */
  points: UserPoints
  /** 母星id */
  mainPlanetId: number
  /** 装饰状态 */
  decorations?: UserDecorations
}

/**
 * 玩家
 */
export interface User extends UserSafeData {
  /** 最近登录的 IP */
  ip: string
  /** 密码 */
  password: string
  /** 拥有的星球 id */
  planets: number[]
  /** 母星的星球 id */
  mainPlanetId: number
  /** 第三类资源的数量 */
  resources_3: Partial<Record<Resource_3, number>>
  /** 第四类资源的数量 */
  resources_4: Partial<Record<Resource_4, number>>
  /** 科技等级 */
  technologies: Partial<Record<Technology, number>>
  /** 科技的研究队列 */
  technologiesQueue: BuildTask[]
  /** 所有建造（升级）任务队列中最早的一个的信息 */
  firstBuildTaskInfo?: BuildTask
  /** 官员等级 */
  officers: Partial<Record<Officer, number>>
  /** 军械等级 */
  armories: Partial<Record<Armory, number>>
  /** 意识形态等级 */
  ideologies: Partial<Record<Ideology, number>>
  /** 种族 */
  races: Partial<Record<Race, number>>
  /** 政治体制 */
  politicses: Partial<Record<Politics, number>>
  /** 阵营 */
  camps: Partial<Record<Camp, number>>
  /** 矿物研究 */
  mineralResearches: Partial<Record<MineralResearch, number>>
  /** 玩家的加成效果，正常玩家不应该有，这里是为了开发者测试方便加的 */
  _bonus: Partial<Record<BonusType, number>>
  /** 用户具有的商品，商品 id -> 剩余时间 */
  products: Record<string, UserProductInfo>
  /** 上次签到时间 */
  signInTime: number
  /** 消息 */
  messages: MessageRecord[]
  /** 玩家是否是 bot */
  isBot?: boolean
  /** 邀请人 id */
  inviterId?: number
  /** 设置 */
  setting: Partial<UserSetting>
  /** 探险幸运值系统 */
  expeditionLuck: ExpeditionLuckData
  /** 用户装饰 */
  decorations?: UserDecorations
}

/**
 * 玩家
 */
export interface NPC extends UserSafeData {
  /** 拥有的星球 id */
  planets: number[]
  /** 母星的星球 id */
  mainPlanetId: number
  /** 第四类资源的数量 */
  resources_4: Partial<Record<Resource_4, number>>
  /** 科技等级 */
  technologies: Partial<Record<Technology, number>>
}

/**
 * 星球类型
 */
export enum PlanetType {
  /** 行星 */
  Planet = 1,
  /** 卫星 */
  Moon = 3,
  /** 废墟 */
  Debris = 4,
}

/**
 * 舰队任务目的地名称
 */
export const PlanetTypeName = {
  [PlanetType.Planet]: '行星',
  [PlanetType.Moon]: '卫星',
  [PlanetType.Debris]: '废墟',
}

/**
 * 废墟信息
 */
export interface DebrisInfo {
  /** id */
  id: number
  /** 诞生的时间 */
  createTime: number
  /** 包含的资源 */
  resources: Partial<Record<Resource_1, number>>
}

/**
 * 星球的绝对坐标
 */
export interface Coordinate {
  /** 宇宙坐标 */
  universe: number
  /** 银河坐标 */
  galaxy: number
  /** 星系坐标 */
  system: number
  /** 星球坐标 */
  planet: number
}

/**
 * 星球参数
 */
export interface PlanetParams {
  /** 星球直径 */
  diameter: number
  /** 星球最大面积 */
  fieldMax: number
  /** 星球最低温度 */
  minTemperature: number
  /** 星球最高温度 */
  maxTemperature: number
}

/**
 * 星球基础数据
 */
export type PlanetBaseData = Pick<Planet, 'id' | 'name' | 'coordinate' | 'type' | 'image'>

/**
 * 舰队调度用的星球基础数据
 */
export type PlanetCallFleetData = Pick<
  Planet,
  'id' | 'name' | 'coordinate' | 'type' | 'ships' | 'resources_1'
>

/**
 * 星球
 */
export interface Planet {
  /** 星球 id = (universe << 26) + (galaxy << 20) + (system << 10) + (planet << 4) + type */
  id: number
  /** 星球名字 */
  name?: string
  /** 星球在星系的坐标 */
  coordinate: Coordinate
  /** 行星所有者 id */
  ownerId?: number
  /** 星球类型 */
  type: PlanetType
  /** 星球第一类资源的数量 */
  resources_1: Partial<Record<Resource_1, number>>
  /** 行星第二类资源 used 表示已经用了多少，has 表示有多少（第二类资源不需要存，每次用的时候算就行了） */
  // resources_2: Partial<Record<Resource_2, { used: number; has: number }>>
  /** 星球上的建筑等级 */
  buildings: Partial<Record<Building, number>>
  /** 星球上的舰船数量 */
  ships: Partial<Record<Ship, number>>
  /** 星球上的防御设施数量 */
  defenses: Partial<Record<Defense, number>>
  /** 上一次更新星球数据的时间 */
  lastUpdate: number
  /** 星球是否已经被摧毁 */
  destroyed: boolean
  /** 星球的图片 */
  image: string
  /** 建筑的建造队列 */
  buildingsQueue: BuildTask[]
  /** 舰船的建造队列 */
  shipsQueue: BuildTask[]
  /** 防御设施的建造队列 */
  defensesQueue: BuildTask[]
  /** 行星对应的卫星 id */
  moonId?: number
  /** 增加的领地面积 */
  fieldAdd?: number
  /** 是否为矿物行星 */
  isMineralPlanet: boolean
  /** 行星等级 */
  level: number
}

/**
 * 星系的额外信息
 */
export interface SystemExtraInfo {
  /** 星球在星系中的位置 */
  [index: number]: {
    /** 星球 id */
    id: number
    /** 星球名字 */
    name?: string
    /** 星球所有者 id */
    ownerId?: number
    /** 星球所有者名字 */
    ownerName?: string
    /** 星球所有者头像 */
    ownerAvatar?: string
    ownerRole?: Role
    /** 星球所有者装饰 */
    ownerDecorations?: UserDecorations
    /** 卫星 id */
    moonId?: number
    /** 卫星 名字 */
    moonName?: string
    /** 废墟信息 */
    debris?: DebrisInfo
    /** 联盟信息 */
    alliance?: {
      /** 联盟 id */
      id: number
      /** 联盟名称 */
      name: string
      /** 联盟简称 */
      shortName: string
    }
    /** 是否被摧毁 */
    isDestroyed: boolean
    /** 是否为矿物行星 */
    isMineralPlanet: boolean
  }
}

/**
 * 建造任务
 */
export interface BuildTask {
  /** 任务 id */
  id: string
  /** 任务来源 id，即任务是在哪个星球发布的 */
  sourceId: number
  /** 任务目标 */
  target: Building | Technology | Ship | Defense
  /** 增量，如 1 表示升级建筑或者建造 1 个建筑，-1 表示拆除建筑 */
  added: number
  /** 任务的开始时间，队列的第一个任务设置，后面的任务不需要设置 */
  startTime: number
  /** 第一个任务的结束时间，小于等于当前时间则表示任务完成 */
  endTime: number
  /** 一个任务的持续时间 */
  duration: number
}

/**
 * 舰队任务
 */
export interface FleetTask {
  /** 任务 id */
  id: string
  /** 任务类型 */
  type: FleetTaskType
  /** 任务状态 */
  status: FleetTaskStatus
  /** 任务来源 id，即任务是在哪个星球发布的 */
  sourceId: number
  /** 所属玩家 */
  ownerId: number
  /** 目标星球 id */
  targetId: number
  /** 目标星球的类型 行星、卫星、废墟*/
  targetType: PlanetType
  /** 舰队数量 */
  ships: [Ship, number][]
  /** 携带的资源 */
  resources: Partial<Record<Resource_1 | Resource_3 | Resource_4, number>>
  /** 任务的开始时间 */
  startTime: number
  /** 任务抵达时间 */
  arriveTime: number
  /** 驻守任务的驻守持续时间 */
  stayTime?: number
  /** 任务数据，如有更多数据类型请在后面补充 */
  data?: any & { _type: MessageDataType }
  /** 联合攻击开关 */
  acs: boolean
  /** 联合攻击舰队信息 */
  // acsFleet?: {
  //   //id 使用planetId，相同的就合并
  //   [id: number]: [Ship, number][]
  // }
  acsFleet?: Partial<Record<number, [Ship, number][]>>
  /** 联合攻击邀请信息（任务级） */
  acsUser?: ACSInvited[]
  /** 联合攻击掠夺的资源 */
  acsResources?: Partial<Record<Resource_1, number>>
}

/** 用于标记联合攻击的状态 */
export enum ACSState {
  /** 邀请中 */
  Invited,
  /** 已拒绝 */
  Reject,
  /** 已支援 */
  Assist,
  /** 已取消 */
  Cancel,
  /** 已完成 */
  Done,
  /** 发布者 */
  Onwer,
  /** 返航中 */
  Returnning,
}

/**
 * 标记联合攻击的状态名称
 */
export const ACSStateName = {
  [ACSState.Invited]: '邀请中',
  [ACSState.Reject]: '已拒绝',
  [ACSState.Assist]: '已支援',
  [ACSState.Cancel]: '已取消',
  [ACSState.Done]: '已完成',
  [ACSState.Onwer]: '发布者',
  [ACSState.Returnning]: '返航中',
}

/**
 * 联合攻击邀请信息（任务级）
 */
export interface ACSInvited {
  userId: number
  userName: string
  userPlanet: number[]
  // 是否处于被邀请状态
  state: ACSState
}

/**
 * 联合攻击邀请信息（宇宙级）
 */
export interface ACSInviteInfo {
  // 被邀请人信息
  userId: number
  userName: string

  // 队长信息
  ownerId: number
  ownerName: string

  taskId: string
  // 是否处于被邀请状态
  state: ACSState
  taskData: FleetTask
}

/**
 * 消息基础数据类型
 */
export interface MessageBaseData {
  /** 消息数据类型 */
  _type: MessageDataType
}

/**
 * 攻击任务数据
 */
export interface FleetAttackData {}

/**
 * 运输任务数据
 */
export interface FleetTransportData {}

/**
 * 探险任务数据
 */
export interface FleetExpeditionData {
  /** 获取的资源 */
  resources: Partial<Record<Resource_1, number>>
}

export interface ExpeditionLuckData {
  /** 幸运值累积 (0-100)，每次空手而归+15，获得奖励后清零 */
  luckPoints: number
  /** 连续探险次数 */
  consecutiveExpeditions: number
  /** 保底计数器，达到阈值必得稀有奖励 */
  pityCounter: number
  /** 上次探险时间 */
  lastExpeditionTime: number
}

/**
 * 侦察成功数据
 */
export interface FleetSpySuccessData extends MessageBaseData {
  targetId: number
  targetName: string
  targetUserId: number
  targetUserName: string
  ship?: Partial<Record<Ship, number>>
  defense?: Partial<Record<Defense, number>>
  building?: Partial<Record<Building, number>>
  technology?: Partial<Record<Technology, number>>
  resource_1?: Partial<Record<Resource_1, number>>
  /** 被发现的概率 */
  detectProb: number
}

/**
 * 发现别人侦察的数据
 */
export interface FleetDetectSpyData extends MessageBaseData {
  spy: string
  spyId: number
  planetId: number
}

/**
 * 侦察失败的数据
 */
export interface FleetSpyFailData extends MessageBaseData {
  planetId: number
}

/**
 * 战斗的简单信息
 */
export interface BattleInfo {
  /** id */
  id: string
  /** 攻击者名字 */
  attackerName: string
  /** 防守者名字 */
  defenderName: string
  // 战斗开始时间
  startTime: number
  // 进攻者舰队出发的星球 id
  sourceId: number
  // 战斗星球 id
  planetId: number
  // 战斗损失价值
  lossValue: number
  // 战斗掠夺资源
  taskResources: Partial<Record<Resource_1 | Resource_4, number>>
  // 战斗结果
  result: BattleResult
  // 联合攻击时的玩家名单
  attackerFleetUserList: string[]
  // 有驻守部队时的玩家名单
  defenderFleetUserList: string[]
  // 参与进攻的人数
  attackerFleetUserNum: number
  // 参与防守的人数
  defenderFleetUserNum: number
}

/**
 * 战斗详情
 */
export interface BattleDetail extends BattleInfo {
  // 攻击者 id
  attackerId: number
  // 防守者 id
  defenderId: number
  // 攻击者的舰队
  ships: Partial<Record<Ship, number>>
  // 防守者的单位
  defenders: Partial<Record<Ship | Defense, number>>
  // 攻击者的损失
  attackerLoss: Partial<Record<Ship, number>>[]
  // 防守者的损失
  defenderLoss: Partial<Record<Ship | Defense, number>>[]
  // 攻击者的攻防加成
  attackerBonus: Partial<Record<BonusType, number>>
  // 攻击者的攻防加成
  defenderBonus: Partial<Record<BonusType, number>>
}

/**
 * 消息
 */
export interface Message {
  /** 消息 id */
  id: string
  /** 消息类型 */
  type: MessageType
  /** 消息内容，系统消息可以是各种类型，玩家消息只能是字符串 */
  content: any
  /** 消息来源 id，即玩家 id，如果是系统消息，不需要传 */
  sourceId?: number
  /** 消息目标 id */
  targetIds: number[]
  /** 消息创建时间 */
  createTime: number
}

/**
 * 玩家的消息记录
 */
export interface MessageRecord {
  /** 消息 id */
  id: string
  /** 是否已读 */
  read?: boolean
}

/**
 * 简短的消息信息，用来展示在消息列表中
 */
export interface ShortMessage {
  /** 消息 id */
  id: string
  /** 消息类型 */
  type: MessageType
  /** 消息创建时间 */
  createTime: number
  /** 发送人 */
  sender?: string
  /** 是否已读 */
  read?: boolean
}

/**
 * 消息的详细信息
 */
export interface MessageDetail extends Message {
  /** 发送人 */
  sender: string
  /** 是否已读 */
  read?: boolean
}

/**
 * 订单信息
 */
export interface Order {
  /** 订单 id */
  id: string
  /** 订单创建时间 */
  createTime: number
  /** 订单是否是活跃状态，活跃表示订单可交易，否则不行 */
  active: boolean
  /** 订单类型，sell 表示卖单，buy 表示买单 */
  type: 'sell' | 'buy'
  /** 要交易的元素 */
  resourceType: BuyableElement
  /** 每个元素的价格 */
  price: number
  /** 发布者 id */
  userId: number
  /** 发布订单的星球 id */
  planetId: number
  /** 订单可交易的数量 */
  amount: number
  /** 订单的剩余数量 */
  remainingAmount: number
  /** 订单的总数 */
  totalAmount: number
}

/**
 * 交易记录
 */
export interface Transaction {
  /** 交易 id */
  id: string
  /** 交易类型，buy 买单，deal 卖单 */
  type: 'buy' | 'sell'
  /** 交易时间 */
  time: number
  /** 挂单人 id */
  ownerId: number
  /** 挂单人星球 id */
  ownerPlanetId: number
  /** dealer id */
  dealerId: number
  /** dealer 星球 id */
  dealerPlanetId: number
  /** 商品类型 */
  resourceType: BuyableElement
  /** 商品数量 */
  amount: number
  /** 商品价格 */
  price: number
}

/**
 * 积分数据
 */
export interface UserPoints {
  /** 总的积分 */
  total: number
  /** 建筑积分 */
  building: number
  /** 科技积分 */
  technology: number
  /** 舰船积分 */
  ship: number
  /** 防御设施积分 */
  defense: number
}

/**
 * 积分排名类型
 */
export type PointType = keyof UserPoints

/**
 * 联盟公开的信息
 */
export interface AlliancePublicInfo {
  /** 联盟 id */
  id: number
  /** 联盟名称 */
  name: string
  /** 联盟简称 */
  shortName: string
  /** 盟主 id */
  ownerId: number
  /** 成员 id 列表 */
  members: number[]
  /** 管理员 id 列表 */
  managers: number[]
  /** 联盟外部公告 */
  outerNotice: string
  /** 联盟关系，联盟 id -> 关系 */
  relations: Record<number, AllianceRelation>
  /** 联盟积分，即所有发展之和 */
  points: number
  /** 联盟创建时间 */
  createTime: number
}

/**
 * 联盟信息
 */
export interface Alliance extends AlliancePublicInfo {
  /** 联盟内部公告 */
  innerNotice: string
  /** 发展 */
  develop: Partial<Record<AllianceDevelop, number>>
  /** 申请加入联盟的人 */
  applicants: number[]
  /** 联盟关系申请，联盟 id -> 关系 */
  relationRequests: Record<number, AllianceRelation>
}

/**
 * 玩家设置
 */
export interface UserSetting {
  /** 是否显示音乐播发器 */
  showMusicPlayer: boolean
  /** 是否自动播放 */
  autoPlayMusic: boolean
}

/**
 * 邀请奖励
 */
export interface InviteReward {
  /** 奖励唯一ID */
  id: string
  /** 被邀请人ID */
  inviteeId: number
  /** 被邀请人用户名（快照） */
  inviteeName: string
  /** 第几天签到（1-7） */
  day: number
  /** 奖励金额（DarkMatter） */
  amount: number
  /** 奖励生成时间 */
  createTime: number
}

/**
 * 已领取的邀请奖励
 */
export interface InviteRewardClaimed extends InviteReward {
  /** 领取时间 */
  claimTime: number
}

/**
 * 充值状态
 */
export enum RechargeStatus {
  Success = 1,
  Failed,
  Pending,
}

/**
 * 充值记录
 */
export interface RechargeRecord {
  /** 记录 id */
  id: string
  /** 用户 id */
  userId: number
  /** 用户名快照 */
  username: string
  /** 宇宙 id */
  universeId: number
  /** 充值金额（元） */
  amount: number
  /** 获得的以太数量 */
  antiMatter: number
  /** 支付平台交易号 */
  tradeNo: string
  /** 商户订单号 */
  outTradeNo: string
  /** 充值状态 */
  status: RechargeStatus
  /** 充值时间 */
  time: number
}

/**
 * 充值记录分页数据
 */
export interface RechargePageData {
  /** 充值记录列表 */
  list: RechargeRecord[]
  /** 总数 */
  total: number
}

/**
 * 充值记录查询参数
 */
export interface RechargeQuery {
  /** 用户 id */
  userId?: number
  /** 用户名 */
  username?: string
}

/**
 * 平衡游戏内货币和现实货币的平衡的数据
 */
export interface AMMModel {
  /** 池子ID */
  poolId: string
  /** 池子名称 */
  name: string
  /** 代币A的总流动性 */
  tokenA: number
  /** 代币B的总流动性 */
  tokenB: number
  /** 交易手续费 */
  fee: number
  /** 恒积 */
  kvalue: number
  /** 滑点 */
  Slippage: number
  /** 日初基准价格 */
  priceD: number
  /** 周初基准价格 */
  priceW: number
  /** 月初基准价格 */
  priceM: number
}
