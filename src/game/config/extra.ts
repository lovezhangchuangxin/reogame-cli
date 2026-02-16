import { enumToArray } from '../../utils'
import {
  AllianceDevelop,
  Armory,
  BonusType,
  Camp,
  Ideology,
  MineralResearch,
  Officer,
  Politics,
  Race,
  Resource,
} from './enum'
import {
  AllianceDevelopConfig,
  ArmoryConfig,
  CampConfig,
  IdeologyConfig,
  MineralResearchConfig,
  OfficerConfig,
  PoliticsConfig,
  RaceConfig,
} from './types'

/**
 * 所有官员
 */
export const OfficerList = enumToArray(Officer)

/**
 * 所有官员配置
 */
export const OfficerConfigs: Record<Officer, OfficerConfig> = {
  [Officer.Geologist]: {
    name: '地质学家',
    description:
      '地质学家是天文矿物学和晶体学方面的专家。他协助他的团队进行冶金和化学研究，同时还负责星际通信，优化帝国沿线原材料的使用和提炼。',
    maxLevel: 20,
    requirements: {},
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.Resource]: 0.05,
    },
    icon: '/images/officers/1.png',
  },
  [Officer.FleetCommander]: {
    name: '舰队司令',
    description:
      '舰队司令是一位经验丰富的老兵，也是一位熟练的战略家。最艰难的战斗是能够了解情况并联系他们的海军上将下属，一个聪明的皇帝可以在战斗中依靠他们的帮助。',
    maxLevel: 20,
    requirements: {},
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.Attack]: 0.05,
      [BonusType.Defensive]: 0.05,
      [BonusType.Shield]: 0.05,
    },
    icon: '/images/officers/2.png',
  },
  [Officer.Engineer]: {
    name: '物理工程师',
    description: '工程师是能源管理方面的专家，在和平时期，它增加了所有殖民地的物理研究水平。',
    maxLevel: 10,
    requirements: {
      [Officer.Geologist]: 5,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.Attack]: 0.05,
      [BonusType.Defensive]: 0.05,
    },
    icon: '/images/officers/3.png',
  },
  [Officer.Technocrat]: {
    name: '机器修理专家',
    description:
      '机器修理专家公会由天才科学家组成，他们总是在人类所有逻辑都会被挑战的领域里找到他们。几千年来，从来没有一个普通人破解过技术官僚的密码。技术官僚的存在激励着帝国的研究人员。',
    maxLevel: 10,
    requirements: {
      [Officer.FleetCommander]: 5,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.FleetTime]: 0.05,
    },
    icon: '/images/officers/4.png',
  },
  [Officer.Inventor]: {
    name: '经济学家',
    description: '经济学家利用专业知识获取大量财富, 能够一个人能在短时间内建造一整座城市。',
    maxLevel: 3,
    requirements: {
      [Officer.Geologist]: 10,
      [Officer.Engineer]: 2,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.BuildTime]: 0.1,
    },
    icon: '/images/officers/5.png',
  },
  [Officer.Frankenstein]: {
    name: '科学怪人',
    description: '科学狂人是技术专家工会的一员，专注于技术的改进。',
    maxLevel: 3,
    requirements: {
      [Officer.Geologist]: 10,
      [Officer.Engineer]: 2,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.TechTime]: 0.1,
    },
    icon: '/images/officers/6.png',
  },
  [Officer.Warehouse]: {
    name: '仓储专家',
    description:
      '仓储专家是古老兄弟的一员，他的座右铭是胜利就是一切，这就是为什么我们需要巨大的存储空间，因此开发了一种新的存储技术。',
    maxLevel: 2,
    requirements: {
      [Officer.Inventor]: 1,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.ShipStorage]: 0.5,
    },
    icon: '/images/officers/7.png',
  },
  [Officer.Counterpart]: {
    name: '防务部长',
    description: '防务部长是帝国军队的一员，专注于工作，可以让您在短时间内建立起强大的防御。',
    maxLevel: 2,
    requirements: {
      [Officer.Frankenstein]: 1,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.DefenseTime]: 0.25,
    },
    icon: '/images/officers/8.png',
  },
  [Officer.Guardian]: {
    name: '守护者',
    description: '守护者是帝国军队的一员，它的目标是开发改善行星防御的技术，但是几乎不做事。',
    maxLevel: 1,
    requirements: {
      [Officer.Geologist]: 20,
      [Officer.Engineer]: 10,
      [Officer.Inventor]: 3,
      [Officer.Frankenstein]: 3,
      [Officer.Warehouse]: 2,
      [Officer.Counterpart]: 2,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {},
    icon: '/images/officers/9.png',
  },
  [Officer.Spy]: {
    name: '间谍专家',
    description: '间谍是一个神秘的人，没有人见过他的真面目，他的办事风格就是杀戮。',
    maxLevel: 2,
    requirements: {
      [Officer.FleetCommander]: 10,
      [Officer.Technocrat]: 5,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.SpyPower]: 1,
    },
    icon: '/images/officers/10.png',
  },
  [Officer.Commander]: {
    name: '指挥官',
    description:
      '指挥官是帝国军队的一员，掌握了管理舰队的艺术。他的大脑可以计算出大量舰队的轨迹，可以指挥大量舰队。',
    maxLevel: 3,
    requirements: {
      [Officer.FleetCommander]: 10,
      [Officer.Technocrat]: 5,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.FleetSlots]: 3,
    },
    icon: '/images/officers/11.png',
  },
  [Officer.Destroyer]: {
    name: '毁灭者',
    description:
      '毁灭者是帝国军队的一员，毫不留情。屠杀一切活物，只是为了好玩。它目前没有作战价值，但是有人需要他。',
    maxLevel: 1,
    requirements: {
      [Officer.Spy]: 1,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {},
    icon: '/images/officers/12.png',
  },
  [Officer.General]: {
    name: '残暴将军',
    description: '残暴将军是一个为帝国军队服务多年的人，制造商在他面前舰船只会飞的更快。',
    maxLevel: 3,
    requirements: {
      [Officer.Commander]: 1,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.FlyTime]: 0.1,
    },
    icon: '/images/officers/13.png',
  },
  [Officer.Conqueror]: {
    name: '征服者',
    description: '征服者是帝国军队的一员，它有能力驾驶一种特定类型的船只，这是其他人无法做到的。',
    maxLevel: 1,
    requirements: {
      [Officer.FleetCommander]: 20,
      [Officer.Technocrat]: 10,
      [Officer.Spy]: 2,
      [Officer.Commander]: 2,
      [Officer.Destroyer]: 1,
      [Officer.General]: 3,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {},
    icon: '/images/officers/14.png',
  },
  [Officer.Plunderer]: {
    name: '掠夺者',
    description: '帝国的所有军官都可以指挥的掠夺者，结合他们的技能来统治宇宙，几乎没有对手。',
    maxLevel: 1,
    requirements: {
      [Officer.Conqueror]: 1,
      [Officer.Guardian]: 1,
    },
    costs: {
      [Resource.DarkMatter]: 1000,
    },
    bonus: {
      [BonusType.Planets]: 2,
    },
    icon: '/images/officers/15.png',
  },
}

/**
 * 所有军械
 */
export const ArmoryList = enumToArray(Armory)

/**
 * 所有军械配置
 */
export const ArmoryConfigs: Record<Armory, ArmoryConfig> = {
  [Armory.Equipment]: {
    name: '装备',
    description: '装备是一种可以提高船只攻击的物品。',
    bonus: {
      [BonusType.Attack]: 0.001,
    },
    icon: '/images/armory/1.png',
  },
  [Armory.Armor]: {
    name: '装甲',
    description: '装甲是一种可以提高船只防御的物品。',
    bonus: {
      [BonusType.Defensive]: 0.001,
    },
    icon: '/images/armory/2.png',
  },
  [Armory.Shield]: {
    name: '护盾',
    description: '护盾是一种可以提高船只护盾的物品。',
    bonus: {
      [BonusType.Shield]: 0.001,
    },
    icon: '/images/armory/3.png',
  },
  [Armory.Resource]: {
    name: '资源',
    description: '资源是一种可以提高资源生产的物品。',
    bonus: {
      [BonusType.Resource]: 0.001,
    },
    icon: '/images/armory/4.png',
  },
  [Armory.FleetSpeed]: {
    name: '舰船飞行速度',
    description: '舰船飞行速度是一种可以提高舰船飞行速度的物品。',
    bonus: {
      [BonusType.FlyTime]: 0.001,
    },
    icon: '/images/armory/5.png',
  },
  [Armory.FleetCapacity]: {
    name: '舰队容量',
    description: '舰队容量是一种可以提高舰队容量的物品。',
    bonus: {
      [BonusType.ShipStorage]: 0.001,
    },
    icon: '/images/armory/6.png',
  },
  [Armory.BuildSpeed]: {
    name: '建筑速度',
    description: '建筑速度是一种可以提高建筑速度的物品。',
    bonus: {
      [BonusType.BuildTime]: 0.001,
    },
    icon: '/images/armory/7.png',
  },
  [Armory.ResearchSpeed]: {
    name: '研究速度',
    description: '研究速度是一种可以提高研究速度的物品。',
    bonus: {
      [BonusType.TechTime]: 0.001,
    },
    icon: '/images/armory/8.png',
  },
  [Armory.ShipSpeed]: {
    name: '造船速度',
    description: '造船速度是一种可以提高造船速度的物品。',
    bonus: {
      [BonusType.FleetTime]: 0.001,
    },
    icon: '/images/armory/9.png',
  },
  [Armory.DefenseSpeed]: {
    name: '防御速度',
    description: '防御速度是一种可以提高防御速度的物品。',
    bonus: {
      [BonusType.DefenseTime]: 0.001,
    },
    icon: '/images/armory/10.png',
  },
}

/**
 * 所有意识形态
 */
export const IdeologyList = enumToArray(Ideology)

/**
 * 所有意识形态配置
 */
export const IdeologyConfigs: Record<Ideology, IdeologyConfig> = {
  [Ideology.Liberalism]: {
    name: '自由主义',
    description: '主张个人自由、平等和有限政府干预，强调私有财产与市场经济。',
    costs: {
      [Resource.AntiMatter]: 1000,
    },
    bonus: {
      [BonusType.ShipStorage]: 0.01,
      [BonusType.FlyTime]: 0.02,
      [BonusType.FuelConsum]: 0.02,
    },
    ideologyCosts: {
      [Ideology.Anarchism]: -0.1,
      [Ideology.Communism]: -0.1,
      [Ideology.Socialism]: -0.5,
      [Ideology.Populism]: -0.1,
      [Ideology.Conservatism]: -0.1,
    },
    icon: '/images/ideology/1.png',
  },
  [Ideology.Anarchism]: {
    name: '主体主义',
    description: '以个体自我意识为核心，强调主观体验和人的主体性决定意义。',
    costs: {
      [Resource.AntiMatter]: 1000,
    },
    bonus: {
      [BonusType.Attack]: 0.02,
      [BonusType.Defensive]: 0.02,
      [BonusType.Shield]: 0.02,
    },
    ideologyCosts: {
      [Ideology.Liberalism]: -0.1,
      [Ideology.Communism]: -0.5,
      [Ideology.Socialism]: -0.1,
      [Ideology.Populism]: -0.1,
      [Ideology.Conservatism]: -0.1,
    },
    icon: '/images/ideology/2.png',
  },
  [Ideology.Communism]: {
    name: '共产主义',
    description: '追求无阶级、无私有制的社会，生产资料公有并按需分配。',
    costs: {
      [Resource.AntiMatter]: 1000,
    },
    bonus: {
      [BonusType.Resource]: 0.03,
      [BonusType.Energy]: 0.02,
      [BonusType.ResourceStorage]: 0.03,
    },
    ideologyCosts: {
      [Ideology.Liberalism]: -0.1,
      [Ideology.Anarchism]: -0.1,
      [Ideology.Socialism]: -0.1,
      [Ideology.Populism]: -0.1,
      [Ideology.Conservatism]: -0.5,
    },
    icon: '/images/ideology/3.png',
  },
  [Ideology.Socialism]: {
    name: '社会主义',
    description: '主张生产资料公有或国家调控，注重社会平等与福利分配。',
    costs: {
      [Resource.AntiMatter]: 1000,
    },
    bonus: {
      [BonusType.Metal]: 0.01,
      [BonusType.Crystal]: 0.02,
      [BonusType.Deuterium]: 0.02,
    },
    ideologyCosts: {
      [Ideology.Liberalism]: -0.1,
      [Ideology.Anarchism]: -0.1,
      [Ideology.Communism]: -0.1,
      [Ideology.Populism]: -0.5,
      [Ideology.Conservatism]: -0.1,
    },
    icon: '/images/ideology/4.png',
  },
  [Ideology.Populism]: {
    name: '民粹主义',
    description: '宣称代表“人民”对抗“精英”，常简化复杂议题为大众与权贵的对立。',
    costs: {
      [Resource.AntiMatter]: 1000,
    },
    bonus: {
      [BonusType.BuildTime]: 0.02,
      [BonusType.BuildCost]: 0.01,
      [BonusType.FleetCost]: 0.02,
    },
    ideologyCosts: {
      [Ideology.Liberalism]: -0.1,
      [Ideology.Anarchism]: -0.5,
      [Ideology.Communism]: -0.1,
      [Ideology.Socialism]: -0.1,
      [Ideology.Conservatism]: -0.1,
    },
    icon: '/images/ideology/5.png',
  },
  [Ideology.Conservatism]: {
    name: '保守主义',
    description: '维护传统秩序与社会稳定，反对激进变革，重视宗教、家庭等既有价值。',
    costs: {
      [Resource.AntiMatter]: 1000,
    },
    bonus: {
      [BonusType.DefenseTime]: 0.02,
      [BonusType.DefenseCost]: 0.01,
    },
    ideologyCosts: {
      [Ideology.Liberalism]: -0.5,
      [Ideology.Anarchism]: -0.1,
      [Ideology.Communism]: -0.1,
      [Ideology.Socialism]: -0.1,
      [Ideology.Populism]: -0.1,
    },
    icon: '/images/ideology/6.png',
  },
}

/**
 * 所有种族配置
 */
export const RaceConfigs: Record<Race, RaceConfig> = {
  [Race.RoyalGuard]: {
    name: '皇家宇宙军',
    description:
      '作为旧帝国时代的正统继承者，皇家宇宙军以“人类星际文明守护者”自居，拥有最先进的舰队与殖民体系。他们崇尚秩序与阶级，视科技为神圣使命，但内部腐败的贵族特权与僵化的官僚体制正逐渐侵蚀其理想主义根基。',
    costs: {
      [Resource.StarDust]: 10,
    },
    bonus: {
      [BonusType.Attack]: 0.25,
      [BonusType.Defensive]: 0.5,
      [BonusType.Shield]: 0.25,
      [BonusType.BuildTime]: 0.3,
      [BonusType.TechTime]: 0.95,
      [BonusType.Energy]: 0.25,
    },
    maxLevel: 1,
    icon: '/images/race/1.png',
  },
  [Race.UnitedNavy]: {
    name: '联合海军',
    description:
      '由商业城邦与自由行星联盟组成的军事联合体，信奉实用主义与贸易至上。他们的舰队或许缺乏帝国军的仪式感，却以灵活的战术与海盗式的生存智慧著称。联合海军本质是利益同盟，金钱与资源流动比忠诚更能决定其行动方向。',
    costs: {
      [Resource.StarDust]: 10,
    },
    bonus: {
      [BonusType.Attack]: 0.25,
      [BonusType.Defensive]: 0.25,
      [BonusType.Shield]: 0.25,
      [BonusType.BuildTime]: 0.35,
      [BonusType.Resource]: 0.95,
    },
    maxLevel: 1,
    icon: '/images/race/2.png',
  },
  [Race.Rebellion]: {
    name: '反抗组织',
    description:
      '分散在边缘殖民地的草根抵抗力量，成员多为受压迫的矿工、被征税逼至破产的农民。他们没有统一纲领，有的要求独立自治，有的单纯渴望复仇。尽管装备简陋，但对地形的熟悉与民众支持使其成为难以根除的“星际游击队”。',
    costs: {
      [Resource.StarDust]: 10,
    },
    bonus: {
      [BonusType.Attack]: 0.4,
      [BonusType.Defensive]: 0.3,
      [BonusType.Shield]: 0.3,
      [BonusType.TechTime]: 0.5,
      [BonusType.FlyTime]: 0.95,
    },
    maxLevel: 1,
    icon: '/images/race/3.png',
  },
  [Race.Extremist]: {
    name: '极端分子',
    description:
      '从宗教狂热者到AI净化派，这些团体以摧毁现有秩序为目标。他们可能驾驶装满以太炸弹的改装货船撞击空间站，或向恒星投放纳米机械病毒。主流势力视其为疯子的同时，也不得不承认——某些极端分子的技术突破，恰恰来自对禁忌领域的疯狂探索。',
    costs: {
      [Resource.StarDust]: 10,
    },
    bonus: {
      [BonusType.Attack]: 0.95,
      [BonusType.Defensive]: 0.3,
      [BonusType.Shield]: 0.25,
      [BonusType.ShipStorage]: 0.55,
      [BonusType.FlyTime]: 0.3,
    },
    maxLevel: 1,
    icon: '/images/race/4.png',
  },
}

/**
 * 所有政治体制配置
 */
export const PoliticsConfigs: Record<Politics, PoliticsConfig> = {
  [Politics.Imperialism]: {
    name: '帝国政体',
    description: '以君主为核心，实行中央集权，通常通过世袭或军事扩张维持统治。',
    costs: {
      [Resource.AntiMatter]: 10000,
    },
    bonus: {
      [BonusType.FleetCost]: 0.5,
    },
    maxLevel: 1,
    icon: '/images/politics/1.png',
  },
  [Politics.Republic]: {
    name: '共和政体',
    description: '国家元首由选举产生，权力依宪法分配，强调公共利益。',
    costs: {
      [Resource.AntiMatter]: 10000,
    },
    bonus: {
      [BonusType.BuildCost]: 0.5,
    },
    maxLevel: 1,
    icon: '/images/politics/2.png',
  },
  [Politics.Democracy]: {
    name: '民主政体',
    description: '主权在民，通过普选、代议制或多党竞争实现权力更迭。',
    costs: {
      [Resource.AntiMatter]: 10000,
    },
    bonus: {
      [BonusType.TechCost]: 0.5,
    },
    maxLevel: 1,
    icon: '/images/politics/3.png',
  },
  [Politics.Federation]: {
    name: '联邦政体',
    description: '中央与地方分权自治，宪法明确各自权限。',
    costs: {
      [Resource.AntiMatter]: 10000,
    },
    bonus: {
      [BonusType.DefenseCost]: 0.5,
    },
    maxLevel: 1,
    icon: '/images/politics/4.png',
  },
}

/**
 * 所有阵营配置
 */
export const CampConfigs: Record<Camp, CampConfig> = {
  [Camp.Order]: {
    name: '守序',
    description: '遵循规则与秩序，重视纪律与结构。',
    costs: {
      [Resource.AntiMatter]: 20000,
    },
    bonus: {
      [BonusType.DoubleDefensive]: 0.05,
      [BonusType.DoubleDefensiveBonus]: 0.25,
    },
    maxLevel: 1,
    icon: '/images/camp/1.png',
  },
  [Camp.Neutral]: {
    name: '中立',
    description: '平衡灵活与原则，不偏袒任何极端。',
    costs: {
      [Resource.AntiMatter]: 20000,
    },
    bonus: {
      [BonusType.DoubleShield]: 0.05,
      [BonusType.DoubleShieldBonus]: 0.25,
    },
    maxLevel: 1,
    icon: '/images/camp/2.png',
  },
  [Camp.Chaos]: {
    name: '混乱',
    description: '追求自由与变革，抗拒束缚与僵化。',
    costs: {
      [Resource.AntiMatter]: 20000,
    },
    bonus: {
      [BonusType.DoubleAttack]: 0.05,
      [BonusType.DoubleAttackDamage]: 0.25,
    },
    maxLevel: 1,
    icon: '/images/camp/3.png',
  },
}

/**
 * 所有矿物研究配置
 */
export const MineralResearchConfigs: Record<MineralResearch, MineralResearchConfig> = {
  [MineralResearch.Booster]: {
    name: '增压器',
    description: '增压器加强发射时的初速度，提高部分伤害。',
    bonus: {
      [BonusType.Attack]: 0.001,
    },
    costs: {
      [Resource.Aluminum]: 1,
      [Resource.Emerald]: 1,
      [Resource.Topaz]: 1,
    },
    icon: '/images/mineral/1.png',
  },
  [MineralResearch.Compensator]: {
    name: '补偿器',
    description: '针对装甲薄弱的部位进行强度补偿。',
    bonus: {
      [BonusType.Defensive]: 0.001,
    },
    costs: {
      [Resource.Beryl]: 1,
      [Resource.GoldMine]: 1,
      [Resource.IronOre]: 1,
    },
    icon: '/images/mineral/2.png',
  },
  [MineralResearch.Generator]: {
    name: '发电机',
    description: '通过提供稳定的电能提高护盾的强度。',
    bonus: {
      [BonusType.Shield]: 0.001,
    },
    costs: {
      [Resource.TitaniumOre]: 1,
      [Resource.Ruby]: 1,
      [Resource.IronOre]: 1,
    },
    icon: '/images/mineral/3.png',
  },
  [MineralResearch.AdvancedComponent]: {
    name: '高级部件',
    description: '高级部件加强钻头的硬度，提高资源产量。',
    bonus: {
      [BonusType.Resource]: 0.001,
    },
    costs: {
      [Resource.Emerald]: 1,
      [Resource.Topaz]: 1,
    },
    icon: '/images/mineral/4.png',
  },
  [MineralResearch.Mapper]: {
    name: '制图器',
    description: '有了高维地图，舰船飞的更快了。',
    bonus: {
      [BonusType.FlyTime]: 0.001,
    },
    costs: {
      [Resource.GoldMine]: 1,
      [Resource.Aluminum]: 1,
    },
    icon: '/images/mineral/5.png',
  },
  [MineralResearch.SolidBattery]: {
    name: '固态电池',
    description: '缩小电池体积，增加货舱容量',
    bonus: {
      [BonusType.ShipStorage]: 0.001,
    },
    costs: {
      [Resource.Ruby]: 1,
      [Resource.Aluminum]: 1,
    },
    icon: '/images/mineral/6.png',
  },
  [MineralResearch.QuantumTechnology]: {
    name: '量子科技',
    description: '有时候使用一些不确定性原理能加快建筑建造。',
    bonus: {
      [BonusType.BuildTime]: 0.001,
    },
    costs: {
      [Resource.Topaz]: 1,
    },
    icon: '/images/mineral/7.png',
  },
  [MineralResearch.Visioncone]: {
    name: '视锥',
    description: '聚焦于特定领域的方法提高了科技研究的进度。',
    bonus: {
      [BonusType.TechTime]: 0.001,
    },
    costs: {
      [Resource.IronOre]: 1,
    },
    icon: '/images/mineral/8.png',
  },
}

/**
 * 所有联盟发展配置
 */
export const AllianceDevelopConfigs: Record<AllianceDevelop, AllianceDevelopConfig> = {
  [AllianceDevelop.Alliance1]: {
    name: '甲级武器',
    description: '甲级武器',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.AttackA]: 0.01,
      [BonusType.DefensiveA]: 0.01,
      [BonusType.ShieldA]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/1.png',
  },
  [AllianceDevelop.Alliance2]: {
    name: '甲级装甲',
    description: '甲级装甲',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.AttackD]: 0.01,
      [BonusType.DefensiveD]: 0.01,
      [BonusType.ShieldD]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/2.png',
  },
  [AllianceDevelop.Alliance3]: {
    name: '制胜策略',
    description: '制胜策略',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.Attack]: 0.01,
      [BonusType.Defensive]: 0.01,
      [BonusType.Shield]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/3.png',
  },
  [AllianceDevelop.Alliance4]: {
    name: '精准提高',
    description: '精准提高',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.AttackLaser]: 0.01,
      [BonusType.AttackPlasma]: 0.01,
      [BonusType.AttackIon]: 0.01,
      [BonusType.AttackGravity]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/4.png',
  },
  [AllianceDevelop.Alliance5]: {
    name: '龟束甲缚',
    description: '龟束甲缚',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.DefensiveSlight]: 0.01,
      [BonusType.DefensiveSheavy]: 0.01,
      [BonusType.DefensiveSmedium]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/5.png',
  },
  [AllianceDevelop.Alliance6]: {
    name: '虚镜幻象',
    description: '虚镜幻象',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.ShieldSlight]: 0.01,
      [BonusType.ShieldSheavy]: 0.01,
      [BonusType.ShieldSmedium]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/6.png',
  },
  [AllianceDevelop.Alliance7]: {
    name: '学术大师',
    description: '学术大师',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.TechTime]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/7.png',
  },
  [AllianceDevelop.Alliance8]: {
    name: '自动机器',
    description: '自动机器',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.BuildTime]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/8.png',
  },
  [AllianceDevelop.Alliance9]: {
    name: '制造回流',
    description: '制造回流',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.FleetTime]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/9.png',
  },
  [AllianceDevelop.Alliance10]: {
    name: '防御工事',
    description: '防御工事',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.DefenseTime]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/10.png',
  },
  [AllianceDevelop.Alliance11]: {
    name: '效率爆发',
    description: '效率爆发',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.Resource]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/11.png',
  },
  [AllianceDevelop.Alliance12]: {
    name: '反复回收',
    description: '反复回收',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.Metal]: 0.01,
      [BonusType.Crystal]: 0.01,
      [BonusType.Deuterium]: 0.01,
      [BonusType.Energy]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/12.png',
  },
  [AllianceDevelop.Alliance13]: {
    name: '空间压缩',
    description: '空间压缩',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.ResourceStorage]: 0.01,
      [BonusType.ShipStorage]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/13.png',
  },
  [AllianceDevelop.Alliance14]: {
    name: '电机限位',
    description: '电机限位',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.FlyTime]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/14.png',
  },
  [AllianceDevelop.Alliance15]: {
    name: '空间扭曲',
    description: '空间扭曲',
    costs: {
      [Resource.StarDust]: 1,
    },
    bonus: {
      [BonusType.FlyTimeCom]: 0.01,
      [BonusType.FlyTimeHyp]: 0.01,
      [BonusType.FlyTimeImp]: 0.01,
    },
    maxLevel: 1000,
    icon: '/images/alliance_develop/15.png',
  },
}
