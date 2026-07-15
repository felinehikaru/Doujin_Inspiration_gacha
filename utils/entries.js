// utils/entries.js
// ============================================================
//  ⚠️ 词条库 - 所有词条数据都在这里，修改或新增词条只需编辑此文件
//  格式：
//   {id:"编号", text:"词条名", category:"分类",
//    desc:"描述",
//    tags:[ tag ]
//    }
// ============================================================


const entries=[
//==========  world  世界背景  ==============
{
  id:"001", text:"星尘邮局AU", category:"world",
  desc:"宇宙深处的邮局，专门投递那些永远收不到回信的信件。",
  tags:[ "宇宙幻想", "特殊职业"]
},
{
  id:"002", text:"潮汐守望塔AU", category:"world",
  desc:"海边的古老石塔，守塔人记录着每一次异常涨潮。",
  tags:[ "海洋幻想", "守护"]
},
{
  id:"003", text:"迷雾剧院AU", category:"scene",
  desc:"终年被白雾笼罩的老剧院，每晚都会上演不同的故事。",
  tags:[ "神秘空间", "戏剧"]
},
{
  id:"004", text:"琥珀森林AU", category:"world",
  desc:"树木的汁液会凝结成琥珀，里面封存着远古的记忆碎片。",
  tags:[ "奇幻自然", "远古秘密"]
},
{
  id:"005", text:"银盐暗房AU", category:"scene",
  desc:"老式胶卷冲洗店，暗房里的照片总是比现实多出一个身影。",
  tags:[ "摄影", "悬疑"]
},
{
  id:"006", text:"孤岛灯塔AU", category:"scene",
  desc:"与世隔绝的灯塔上，两个人守着光也守着彼此。",
  tags:[ "孤岛", "守望"]
},
{
  id:"007", text:"星河拍卖行AU", category:"world",
  desc:"拍卖星辰碎片的地方，每个拍品背后都藏着一个星系的故事。",
  tags:[ "宇宙幻想", "拍卖"]
},
{
  id:"008", text:"雪花玻璃球AU", category:"world",
  desc:"制作手工雪花玻璃球的工坊，摇一摇就能看到另一个世界。",
  tags:[ "幻想道具", "异世界"]
},
{
  id:"009", text:"深渊观测站AU", category:"scene",
  desc:"建在海底最深处的观测站，两个人记录着深渊中的异常信号。",
  tags:[ "深海", "探索"]
},
{
  id:"010", text:"黄昏书店AU", category:"scene",
  desc:"只在黄昏时分营业的书店，每本书里都夹着一片干枯的花瓣。",
  tags:[ "书店", "治愈"]
},
{
  id:"011", text:"午夜列车AU", category:"scene",
  desc:"只在午夜出现的列车，乘客无法预知下一站会通向哪里。",
  tags:[ "旅行幻想", "未知目的地"]
},
{
  id:"012", text:"云端学院AU", category:"world",
  desc:"建立在云层之上的学院，学生学习操控各种奇妙能力。",
  tags:[ "校园幻想", "特殊能力"]
},
{
  id:"013", text:"机械城AU", category:"world",
  desc:"由齿轮与机械构成的城市，人们追寻失落的科技秘密。",
  tags:[ "机械幻想", "科技世界"]
},
{
  id:"014", text:"魔法图书馆AU", category:"world",
  desc:"收藏所有魔法典籍的巨大图书馆，管理员守护禁忌知识。",
  tags:[ "魔法", "知识秘藏"]
},
{
  id:"015", text:"旧城区侦探事务所AU", category:"scene",
  desc:"隐藏在老街深处的侦探事务所，接受各种离奇委托。",
  tags:[ "侦探", "都市谜案"]
},
{
  id:"016", text:"未来都市AU", category:"world",
  desc:"科技高度发展的未来城市，人类与人工智能共同生活。",
  tags:[ "未来科技", "都市"]
},
{
  id:"017", text:"梦境管理局AU", category:"world",
  desc:"负责管理人类梦境的机构，处理异常梦境事件。",
  tags:[ "梦境", "幻想机构"]
},
{
  id:"018", text:"时间旅馆AU", category:"world",
  desc:"位于时间夹缝中的旅馆，接待来自不同年代的客人。",
  tags:[ "时间穿越", "特殊地点"]
},
{
  id:"161", text:"主题乐园AU", category:"world",
  desc:"拥有特殊规则的主题乐园，游客将在其中经历不同故事。",
  tags:[ "幻想娱乐", "特殊规则"]
},
{
  id:"162", text:"蒸汽时代AU", category:"world",
  desc:"以蒸汽机械为核心发展的世界，人类探索新的科技方向。",
  tags:[ "蒸汽朋克", "机械"]
},
{
  id:"163", text:"末日避难所AU", category:"world",
  desc:"灾难后的世界，人们在封闭设施中寻找生存方式。",
  tags:[ "末日", "生存"]
},
{
  id:"164", text:"海洋文明AU", category:"world",
  desc:"人类建立海底城市，发展独特海洋文明。",
  tags:[ "海洋", "文明"]
},
{
  id:"165", text:"魔法都市AU", category:"world",
  desc:"魔法与现代城市结合，人们使用魔法生活。",
  tags:[ "魔法", "都市"]
},
{
  id:"166", text:"灵异调查局AU", category:"world",
  desc:"专门处理异常事件的机构，调查未知现象。",
  tags:[ "灵异", "调查"]
},
{
  id:"167", text:"妖怪共存AU", category:"world",
  desc:"人类与非人类生命共同生活的世界。",
  tags:[ "妖怪", "共存"]
},
{
  id:"168", text:"星际殖民AU", category:"world",
  desc:"人类探索宇宙，在未知星球建立新的家园。",
  tags:[ "星际", "探索"]
},
{
  id:"169", text:"学院都市AU", category:"world",
  desc:"拥有特殊教育体系的城市，学生学习各种能力。",
  tags:[ "学院", "能力"]
},
{
  id:"170", text:"异世界冒险AU", category:"world",
  desc:"角色进入陌生世界，展开寻找归途的旅程。",
  tags:[ "异世界", "冒险"]
},
{
  id:"171", text:"仙侠修行AU", category:"world",
  desc:"存在灵力与修行体系的世界，人们追寻更高境界。",
  tags:[ "仙侠", "修行"]
},
{
  id:"172", text:"西幻王国AU", category:"world",
  desc:"骑士、魔法师与王国共同存在的幻想世界。",
  tags:[ "西幻", "王国"]
},
{
  id:"173", text:"武侠江湖AU", category:"world",
  desc:"门派林立的江湖世界，各方势力争夺秘密。",
  tags:[ "武侠", "江湖"]
},
{
  id:"174", text:"吸血鬼都市AU", category:"world",
  desc:"人类与吸血鬼共同存在的现代城市。",
  tags:[ "吸血鬼", "都市幻想"]
},
{
  id:"175", text:"妖魔退治AU", category:"world",
  desc:"专门处理妖魔事件的世界，存在特殊职业者。",
  tags:[ "妖魔", "驱魔"]
},
{
  id:"176", text:"异能管理局AU", category:"world",
  desc:"管理特殊能力者的组织，负责维持社会秩序。",
  tags:[ "异能", "组织"]
},
{
  id:"177", text:"平行世界AU", category:"world",
  desc:"存在多个不同世界线，角色可能遇见另一个自己。",
  tags:[ "平行世界", "命运"]
},
{
  id:"178", text:"时间循环AU", category:"world",
  desc:"某一天不断重复，需要寻找循环结束的方法。",
  tags:[ "时间", "循环"]
},
{
  id:"179", text:"人工智能共生AU", category:"world",
  desc:"人工智能与人类共同生活并产生复杂关系。",
  tags:[ "AI", "共生"]
},
{
  id:"180", text:"灾后重建AU", category:"world",
  desc:"经历重大灾难后的世界，人们重新建立文明。",
  tags:[ "灾难", "重建"]
},
{
  id:"181", text:"现代都市AU", category:"world",
  desc:"普通现代城市背景，角色在日常生活中展开故事。",
  tags:[ "现代", "都市"]
},
{
  id:"182", text:"校园青春AU", category:"world",
  desc:"以校园生活为背景，围绕成长与相遇展开故事。",
  tags:[ "校园", "青春"]
},
{
  id:"183", text:"娱乐圈AU", category:"world",
  desc:"以演艺行业为背景，角色面对公众与个人生活的矛盾。",
  tags:[ "娱乐圈", "公众身份"]
},
{
  id:"184", text:"职场都市AU", category:"world",
  desc:"以职场环境为背景，描写工作与人际关系。",
  tags:[ "职场", "都市"]
},
{
  id:"185", text:"刑侦推理AU", category:"world",
  desc:"围绕案件调查展开，角色寻找隐藏真相。",
  tags:[ "推理", "案件"]
},
{
  id:"186", text:"末世生存AU", category:"world",
  desc:"灾难后的世界，人类为了生存不断寻找希望。",
  tags:[ "末世", "生存"]
},
{
  id:"187", text:"克苏鲁幻想AU", category:"world",
  desc:"面对未知存在与不可理解力量的幻想世界。",
  tags:[ "未知恐惧", "神秘"]
},
{
  id:"188", text:"童话改编AU", category:"world",
  desc:"重新演绎经典童话设定，加入新的角色关系。",
  tags:[ "童话", "改编"]
},
{
  id:"189", text:"神话体系AU", category:"world",
  desc:"借鉴神话传说建立世界背景。",
  tags:[ "神话", "传说"]
},
{
  id:"190", text:"学院竞技AU", category:"world",
  desc:"学生通过比赛与挑战展现能力，展开竞争。",
  tags:[ "竞技", "学院"]
},

//=========  relationship  关系设定   ===========

{
  id:"019", text:"花店老板与失忆客人", category:"relationship",
  desc:"经营花店的人遇见失去记忆的客人，两人在相处中寻找过去。",
  tags:[ "失忆", "相遇"]
},
{
  id:"020", text:"宿敌合作关系", category:"relationship",
  desc:"长期对立的两个人因为共同目标被迫合作。",
  tags:[ "对立合作", "关系转变"]
},
{
  id:"021", text:"青梅竹马重逢", category:"relationship",
  desc:"多年未见的旧友再次相遇，重新面对曾经未说出口的话。",
  tags:[ "旧识", "重逢"]
},
{
  id:"022", text:"秘密守护者关系", category:"relationship",
  desc:"一方隐藏身份默默守护另一方，却无法说明原因。",
  tags:[ "守护", "隐藏身份"]
},
{
  id:"023", text:"竞争对手关系", category:"relationship",
  desc:"实力相近的两人在竞争中逐渐了解彼此。",
  tags:[ "竞争", "相互理解"]
},
{
  id:"024", text:"契约关系", category:"relationship",
  desc:"双方因为某种约定绑定在一起，需要共同完成目标。",
  tags:[ "契约", "绑定关系"]
},
{
  id:"025", text:"师徒关系", category:"relationship",
  desc:"拥有经验的一方指导另一方成长，在过程中建立特殊羁绊。",
  tags:[ "指导", "成长"]
},
{
  id:"026", text:"陌生同居关系", category:"relationship",
  desc:"原本陌生的两个人因为特殊原因开始共同生活。",
  tags:[ "日常相处", "磨合"]
},
{
  id:"027", text:"秘密搭档关系", category:"relationship",
  desc:"两人作为隐藏身份的搭档行动，彼此信任又有所保留。",
  tags:[ "合作", "秘密"]
},
{
  id:"028", text:"双向误会关系", category:"relationship",
  desc:"双方因为误解产生距离，却始终无法真正放下对方。",
  tags:[ "误会", "情感拉扯"]
},
{
  id:"029", text:"失散重逢关系", category:"relationship",
  desc:"曾经分离的两人在多年后再次相遇。",
  tags:[ "重逢", "过去羁绊"]
},
{
  id:"030", text:"伪装身份关系", category:"relationship",
  desc:"其中一人隐藏真实身份接近另一人，两人在相处中逐渐产生信任。",
  tags:[ "身份秘密", "信任建立"]
},
{
  id:"031", text:"冷淡上司与新人", category:"relationship",
  desc:"性格差异巨大的两人在工作中不断磨合。",
  tags:[ "职场", "性格反差"]
},
{
  id:"032", text:"救命恩人关系", category:"relationship",
  desc:"因为一次意外相遇，一方成为另一方的重要恩人。",
  tags:[ "救助", "恩情"]
},
{
  id:"033", text:"互相利用关系", category:"relationship",
  desc:"双方最初只是为了各自目的合作，却逐渐改变看法。",
  tags:[ "利益合作", "关系变化"]
},
{
  id:"034", text:"秘密交换关系", category:"relationship",
  desc:"两人交换彼此隐藏的秘密，并因此建立特殊联系。",
  tags:[ "秘密", "信任"]
},
{
  id:"035", text:"守护与被守护关系", category:"relationship",
  desc:"一方习惯保护别人，另一方逐渐学会回应这份保护。",
  tags:[ "守护", "依赖"]
},
{
  id:"036", text:"失忆前任关系", category:"relationship",
  desc:"曾经亲密的人再次相遇，其中一人已经忘记过去。",
  tags:[ "失忆", "旧情"]
},
{
  id:"037", text:"欢喜冤家关系", category:"relationship",
  desc:"两人经常争吵，却在关键时刻总会站在对方身边。",
  tags:[ "斗嘴", "默契"]
},
{
  id:"038", text:"跨越阵营关系", category:"relationship",
  desc:"来自不同立场的两个人，在冲突中逐渐理解彼此。",
  tags:[ "阵营冲突", "理解"]
},
{
  id:"039", text:"匿名通信关系", category:"relationship",
  desc:"两人通过匿名方式交流，却不知道现实中的身份。",
  tags:[ "匿名", "通信"]
},

//=========  character  角色身份   ===========

{
  id:"040", text:"天才研究者", category:"character",
  desc:"拥有超常能力或知识水平的研究型角色。",
  tags:[ "天才", "研究"]
},
{
  id:"041", text:"冷面执行者", category:"character",
  desc:"外表冷静理性，负责完成重要任务的角色。",
  tags:[ "冷静", "执行者"]
},
{
  id:"042", text:"隐藏身份者", category:"character",
  desc:"拥有秘密身份，需要隐藏真实背景的角色。",
  tags:[ "伪装", "秘密"]
},
{
  id:"043", text:"失忆角色", category:"character",
  desc:"失去部分记忆，需要重新认识世界和自己的角色。",
  tags:[ "记忆缺失", "自我探索"]
},
{
  id:"044", text:"理想主义者", category:"character",
  desc:"相信某种信念，并愿意为之行动的角色。",
  tags:[ "信念", "坚持"]
},
{
  id:"045", text:"嘴硬心软角色", category:"character",
  desc:"表面冷淡强硬，实际上非常关心他人的角色。",
  tags:[ "反差", "温柔"]
},
{
  id:"046", text:"观察者角色", category:"character",
  desc:"习惯观察环境和他人，不轻易表达想法的角色。",
  tags:[ "观察", "分析"]
},
{
  id:"047", text:"冒险者角色", category:"character",
  desc:"喜欢探索未知领域，追求新鲜经历的角色。",
  tags:[ "探索", "行动"]
},
{
  id:"048", text:"守护者角色", category:"character",
  desc:"承担保护责任，总是在关键时刻出现的角色。",
  tags:[ "保护", "责任"]
},
{
  id:"049", text:"反派转变角色", category:"character",
  desc:"曾经站在对立面，后来开始改变想法的角色。",
  tags:[ "转变", "成长"]
},
{
  id:"050", text:"天生领导者", category:"character",
  desc:"拥有号召力和决策能力，能够带领他人的角色。",
  tags:[ "领导", "责任感"]
},
{
  id:"051", text:"神秘旅人", category:"character",
  desc:"身份未知的旅人，总是在关键时刻出现在故事中。",
  tags:[ "未知身份", "旅途"]
},
{
  id:"052", text:"失落王族", category:"character",
  desc:"拥有特殊血统，却隐藏真实身份生活的角色。",
  tags:[ "王族", "隐藏身份"]
},
{
  id:"053", text:"普通人卷入事件", category:"character",
  desc:"原本过着普通生活，却意外进入特殊事件中心的角色。",
  tags:[ "普通人", "意外卷入"]
},
{
  id:"054", text:"天赋觉醒者", category:"character",
  desc:"原本未知的能力在某个契机下突然觉醒的角色。",
  tags:[ "能力觉醒", "成长"]
},
{
  id:"055", text:"执着追寻者", category:"character",
  desc:"为了某个目标不断前进，即使遭遇困难也不会放弃。",
  tags:[ "执念", "追寻"]
},
{
  id:"056", text:"温柔治愈者", category:"character",
  desc:"擅长安慰和帮助他人，给予周围人温暖的角色。",
  tags:[ "治愈", "温柔"]
},
{
  id:"057", text:"危险调查者", category:"character",
  desc:"主动追查未知事件，寻找隐藏真相的角色。",
  tags:[ "调查", "真相"]
},
{
  id:"058", text:"孤独天才", category:"character",
  desc:"拥有卓越才能，却习惯独自行动的角色。",
  tags:[ "天才", "孤独"]
},
{
  id:"059", text:"背负秘密者", category:"character",
  desc:"隐藏重要过去，无法轻易向他人坦白的角色。",
  tags:[ "秘密", "过去"]
},
{
  id:"060", text:"守约之人", category:"character",
  desc:"将承诺看得极重，即使困难也会遵守约定的角色。",
  tags:[ "承诺", "责任"]
},  {
  id:"061", text:"禁忌知识研究者", category:"character",
  desc:"研究被禁止领域知识，为寻找真相不断探索的角色。",
  tags:[ "禁忌知识", "研究"]
},
{
  id:"062", text:"流浪艺术家", category:"character",
  desc:"四处旅行创作，用作品记录不同地方故事的角色。",
  tags:[ "艺术", "旅行"]
},
{
  id:"063", text:"机械改造者", category:"character",
  desc:"通过机械技术改变自身或他人能力的角色。",
  tags:[ "机械", "改造"]
},
{
  id:"064", text:"梦境引导者", category:"character",
  desc:"能够进入或引导他人梦境，探索潜意识世界的角色。",
  tags:[ "梦境", "引导"]
},
{
  id:"065", text:"古老传承者", category:"character",
  desc:"继承古老力量或知识，肩负延续使命的角色。",
  tags:[ "传承", "使命"]
},
{
  id:"066", text:"叛逆继承人", category:"character",
  desc:"拥有继承资格，却拒绝按照传统道路前进的角色。",
  tags:[ "继承", "反抗"]
},
{
  id:"067", text:"失踪归来者", category:"character",
  desc:"曾经消失多年，再次出现并带回未知秘密的角色。",
  tags:[ "失踪", "归来"]
},
{
  id:"068", text:"双重身份者", category:"character",
  desc:"同时拥有两种身份，需要隐藏其中一面的角色。",
  tags:[ "双重身份", "伪装"]
},
{
  id:"069", text:"异世界居民", category:"character",
  desc:"来自不同世界，拥有独特文化背景的角色。",
  tags:[ "异世界", "文化差异"]
},
{
  id:"070", text:"规则维护者", category:"character",
  desc:"负责维持某种秩序，却面临规则与现实冲突的角色。",
  tags:[ "秩序", "规则"]
},
{
  id:"071", text:"未来预言者", category:"character",
  desc:"能够窥见未来片段，却无法改变所有结果的角色。",
  tags:[ "预言", "未来"]
},
{
  id:"072", text:"秘密收藏家", category:"character",
  desc:"收集各种稀有物品，并隐藏其中秘密的角色。",
  tags:[ "收藏", "秘密"]
},
{
  id:"073", text:"边境守卫者", category:"character",
  desc:"守护世界边界，阻止未知危险进入的角色。",
  tags:[ "守卫", "边境"]
},
{
  id:"074", text:"失控实验体", category:"character",
  desc:"因为实验产生变化，需要寻找自身存在意义的角色。",
  tags:[ "实验", "异变"]
},
{
  id:"075", text:"时间旅者", category:"character",
  desc:"穿越不同时间线，寻找某个重要答案的角色。",
  tags:[ "时间", "旅行"]
},
{
  id:"076", text:"记忆修复师", category:"character",
  desc:"帮助他人修复破碎记忆，探索过去真相的角色。",
  tags:[ "记忆", "修复"]
},
{
  id:"077", text:"古城守护者", category:"character",
  desc:"守护古老城市秘密，等待命运中的继承者。",
  tags:[ "古城", "守护"]
},
{
  id:"078", text:"异能使用者", category:"character",
  desc:"拥有特殊能力，需要学习控制力量的角色。",
  tags:[ "异能", "能力"]
},
{
  id:"079", text:"亡灵引路人", category:"character",
  desc:"负责引导亡灵前往归处，了解生死边界的角色。",
  tags:[ "亡灵", "引导"]
},
{
  id:"080", text:"传说记录者", category:"character",
  desc:"记录世界传说与历史，将故事流传下去的角色。",
  tags:[ "记录", "传说"]
},
{
  id:"081", text:"废墟探索者", category:"character",
  desc:"探索失落文明遗迹，寻找被遗忘历史的角色。",
  tags:[ "遗迹", "探索"]
},
{
  id:"082", text:"魔法工匠", category:"character",
  desc:"制作魔法物品与特殊工具，拥有独特技艺的角色。",
  tags:[ "魔法制作", "工匠"]
},
{
  id:"083", text:"星际航行者", category:"character",
  desc:"穿梭星际之间，寻找未知世界的角色。",
  tags:[ "星际", "冒险"]
},
{
  id:"084", text:"情报商人", category:"character",
  desc:"掌握大量秘密信息，以交换情报为生的角色。",
  tags:[ "情报", "交易"]
},
{
  id:"085", text:"梦境旅人", category:"character",
  desc:"能够进入他人梦境，在梦中寻找答案的角色。",
  tags:[ "梦境", "探索"]
},
{
  id:"086", text:"守护灵", category:"character",
  desc:"陪伴某人存在的特殊灵体，承担保护职责。",
  tags:[ "灵体", "守护"]
},
{
  id:"087", text:"被诅咒者", category:"character",
  desc:"身负未知诅咒，在寻找解除方法的角色。",
  tags:[ "诅咒", "命运"]
},
{
  id:"088", text:"秘密组织成员", category:"character",
  desc:"隶属于神秘组织，执行特殊任务的角色。",
  tags:[ "组织", "秘密"]
},
{
  id:"089", text:"边缘研究者", category:"character",
  desc:"研究少有人涉及领域，追寻未知答案的角色。",
  tags:[ "研究", "未知"]
},
{
  id:"090", text:"命运选择者", category:"character",
  desc:"面对重要选择，需要决定未来方向的角色。",
  tags:[ "命运", "选择"]
},
{
  id:"091", text:"命运观测者", category:"character",
  desc:"能够观察命运轨迹，却无法轻易改变结果的角色。",
  tags:[ "命运", "观察"]
},
{
  id:"092", text:"孤塔守夜人", category:"character",
  desc:"独自在高塔中守护秘密，等待某个重要时刻到来。",
  tags:[ "孤独", "守护"]
},
{
  id:"093", text:"异界访客", category:"character",
  desc:"来自未知世界的访客，试图理解陌生环境。",
  tags:[ "异世界", "适应"]
},
{
  id:"094", text:"流亡贵族", category:"character",
  desc:"失去原本身份，在陌生地方重新生活的角色。",
  tags:[ "流亡", "贵族"]
},
{
  id:"095", text:"秘密医生", category:"character",
  desc:"隐藏真实目的，为特殊对象提供治疗的角色。",
  tags:[ "医疗", "秘密"]
},
{
  id:"096", text:"遗迹解读者", category:"character",
  desc:"能够解析古代文字与遗迹信息，寻找历史真相的角色。",
  tags:[ "遗迹", "解读"]
},
{
  id:"097", text:"机械生命体", category:"character",
  desc:"拥有自我意识的机械存在，探索自身意义。",
  tags:[ "机械", "生命"]
},
{
  id:"098", text:"失落文明后裔", category:"character",
  desc:"继承消失文明血脉，寻找族群过去的角色。",
  tags:[ "文明", "传承"]
},
{
  id:"099", text:"秘密信使", category:"character",
  desc:"负责传递重要信息，在危险之间穿梭的角色。",
  tags:[ "信使", "秘密任务"]
},
{
  id:"100", text:"旅途记录者", category:"character",
  desc:"记录沿途见闻，将经历整理成故事的角色。",
  tags:[ "旅行", "记录"]
},

//====================  conflict  冲突矛盾  ==================

{
  id:"101", text:"身份错位", category:"conflict",
  desc:"因为某种原因，两人的身份发生错误交换，需要寻找解决方法。",
  tags:[ "身份交换", "误会"]
},
{
  id:"102", text:"记忆冲突", category:"conflict",
  desc:"不同的记忆版本产生矛盾，导致真相无法确认。",
  tags:[ "记忆", "真相"]
},
{
  id:"103", text:"立场对立", category:"conflict",
  desc:"双方站在不同阵营，为了各自目标产生冲突。",
  tags:[ "阵营", "对立"]
},
{
  id:"104", text:"秘密暴露", category:"conflict",
  desc:"隐藏的重要秘密被发现，引发关系变化。",
  tags:[ "秘密", "危机"]
},
{
  id:"105", text:"时间限制", category:"conflict",
  desc:"必须在规定时间内完成目标，否则将面临严重后果。",
  tags:[ "倒计时", "危机"]
},
{
  id:"106", text:"能力失控", category:"conflict",
  desc:"拥有的力量无法控制，造成意外事件。",
  tags:[ "失控", "能力"]
},
{
  id:"107", text:"被迫选择", category:"conflict",
  desc:"面对无法兼顾的选择，需要放弃其中一项。",
  tags:[ "选择", "牺牲"]
},
{
  id:"108", text:"信任危机", category:"conflict",
  desc:"因为误解或事件导致双方信任受到影响。",
  tags:[ "信任", "误会"]
},
{
  id:"109", text:"规则限制", category:"conflict",
  desc:"受到某种规则约束，无法自由行动。",
  tags:[ "规则", "限制"]
},
{
  id:"110", text:"过去追责", category:"conflict",
  desc:"过去发生的事件重新出现，需要面对曾经的问题。",
  tags:[ "过去", "追查"]
},
{
  id:"111", text:"资源争夺", category:"conflict",
  desc:"双方为了争夺有限资源产生竞争与冲突。",
  tags:[ "竞争", "资源"]
},
{
  id:"112", text:"秘密任务", category:"conflict",
  desc:"执行隐藏任务过程中，需要面对未知危险。",
  tags:[ "任务", "隐藏"]
},
{
  id:"113", text:"错误判断", category:"conflict",
  desc:"因为错误的信息或判断，导致事件走向失控。",
  tags:[ "误判", "危机"]
},
{
  id:"114", text:"无法逃避的约定", category:"conflict",
  desc:"过去做出的承诺成为现在必须面对的责任。",
  tags:[ "约定", "责任"]
},
{
  id:"115", text:"失控实验", category:"conflict",
  desc:"实验过程中发生异常，引发未知后果。",
  tags:[ "实验", "异常"]
},
{
  id:"116", text:"世界危机", category:"conflict",
  desc:"整个世界面临重大威胁，需要共同寻找解决方法。",
  tags:[ "灾难", "拯救"]
},
{
  id:"117", text:"追捕逃亡", category:"conflict",
  desc:"一方被追捕，需要寻找逃离和反击的方法。",
  tags:[ "追捕", "逃亡"]
},
{
  id:"118", text:"真相隐藏", category:"conflict",
  desc:"事件背后存在隐藏真相，需要逐步调查揭开。",
  tags:[ "谜团", "调查"]
},
{
  id:"119", text:"记忆篡改", category:"conflict",
  desc:"有人改变或制造虚假的记忆，影响现实判断。",
  tags:[ "记忆", "操控"]
},
{
  id:"120", text:"命运偏差", category:"conflict",
  desc:"原本确定的命运轨迹发生改变，引发连锁影响。",
  tags:[ "命运", "变化"]
},
{
  id:"121", text:"环境变化", category:"conflict",
  desc:"原本稳定的环境突然改变，迫使角色适应新的情况。",
  tags:[ "环境", "变化"]
},
{
  id:"122", text:"资源枯竭", category:"conflict",
  desc:"重要资源逐渐消失，导致各方产生矛盾。",
  tags:[ "资源", "危机"]
},
{
  id:"123", text:"信仰冲突", category:"conflict",
  desc:"不同信念之间产生无法轻易调和的矛盾。",
  tags:[ "信仰", "理念"]
},
{
  id:"124", text:"身份曝光", category:"conflict",
  desc:"隐藏身份突然公开，引发新的局势变化。",
  tags:[ "身份", "暴露"]
},
{
  id:"125", text:"失去能力", category:"conflict",
  desc:"原本拥有的能力突然消失，需要重新面对困境。",
  tags:[ "能力", "失落"]
},
{
  id:"126", text:"孤立无援", category:"conflict",
  desc:"角色被迫独自面对困难，无法获得外界帮助。",
  tags:[ "孤立", "困境"]
},
{
  id:"127", text:"目标冲突", category:"conflict",
  desc:"不同角色拥有互相矛盾的目标，需要做出选择。",
  tags:[ "目标", "矛盾"]
},
{
  id:"128", text:"错误交易", category:"conflict",
  desc:"一次错误的交易导致无法预料的后果。",
  tags:[ "交易", "意外"]
},
{
  id:"129", text:"遗失重要物品", category:"conflict",
  desc:"关键物品失踪，使事件陷入危机。",
  tags:[ "失物", "寻找"]
},
{
  id:"130", text:"未知威胁", category:"conflict",
  desc:"无法确认来源的危险逐渐逼近。",
  tags:[ "危险", "未知"]
},


//=================  scene  特殊场景 =================

{
  id:"131", text:"场景转换", category:"scene",
  desc:"角色被迫进入陌生环境，需要适应新的规则和生活方式。",
  tags:[ "环境变化", "适应"]
},
{
  id:"132", text:"废弃城市", category:"scene",
  desc:"曾经繁荣的城市如今无人居住，隐藏着过去的秘密。",
  tags:[ "废墟", "探索"]
},
{
  id:"133", text:"地下迷宫", category:"scene",
  desc:"隐藏在地下的复杂空间，等待探索者寻找出口。",
  tags:[ "迷宫", "冒险"]
},
{
  id:"134", text:"古老遗迹", category:"scene",
  desc:"保存着过去文明痕迹的遗迹，隐藏未知信息。",
  tags:[ "历史", "探索"]
},
{
  id:"135", text:"雨夜街道", category:"scene",
  desc:"下着雨的城市街道，适合发生偶然相遇或秘密事件。",
  tags:[ "城市", "雨夜"]
},
{
  id:"136", text:"无人车站", category:"scene",
  desc:"长期无人使用的车站，等待某个特殊乘客出现。",
  tags:[ "车站", "等待"]
},
{
  id:"137", text:"旧宅邸", category:"scene",
  desc:"保存着家族历史的老宅，其中隐藏许多未解之谜。",
  tags:[ "宅邸", "秘密"]
},
{
  id:"138", text:"雪山基地", category:"scene",
  desc:"位于雪山深处的基地，与外界隔绝。",
  tags:[ "极寒", "研究"]
},
{
  id:"139", text:"海底城市", category:"scene",
  desc:"建立在海洋深处的城市，拥有独特文明。",
  tags:[ "海洋", "幻想"]
},
{
  id:"140", text:"空中庭园", category:"scene",
  desc:"漂浮于天空中的庭园，只有特殊方法才能进入。",
  tags:[ "天空", "幻想"]
},
{
  id:"141", text:"镜像空间", category:"scene",
  desc:"与现实相似却存在细微差异的特殊空间。",
  tags:[ "镜像", "异空间"]
},
{
  id:"142", text:"梦境空间", category:"scene",
  desc:"由意识构成的特殊领域，现实规则在这里失效。",
  tags:[ "梦境", "幻想"]
},
{
  id:"143", text:"时间停滞区域", category:"scene",
  desc:"时间停止流动的区域，进入者无法正常离开。",
  tags:[ "时间", "异常"]
},
{
  id:"144", text:"秘密实验室", category:"scene",
  desc:"隐藏在城市或偏远地区的研究场所。",
  tags:[ "实验", "秘密"]
},
{
  id:"145", text:"魔法集市", category:"scene",
  desc:"售卖各种奇妙物品的特殊市场。",
  tags:[ "魔法", "交易"]
},
{
  id:"146", text:"星际港口", category:"scene",
  desc:"连接不同星球的交通枢纽，各种旅人聚集于此。",
  tags:[ "星际", "旅行"]
},
{
  id:"147", text:"边境小镇", category:"scene",
  desc:"位于两个区域交界处的小镇，隐藏许多故事。",
  tags:[ "边境", "小镇"]
},
{
  id:"148", text:"古代王城", category:"scene",
  desc:"曾经辉煌的王国中心，留下大量历史遗迹。",
  tags:[ "王城", "历史"]
},
{
  id:"149", text:"漂浮岛屿", category:"scene",
  desc:"悬浮在天空中的岛屿，拥有独特生态环境。",
  tags:[ "天空", "奇幻"]
},
{
  id:"150", text:"无人森林", category:"scene",
  desc:"人迹罕至的森林，隐藏未知生物和秘密。",
  tags:[ "森林", "未知"]
},
{
  id:"151", text:"荒漠遗迹", category:"scene",
  desc:"隐藏在沙漠中的古老遗迹，等待探索者发现过去秘密。",
  tags:[ "遗迹", "荒漠"]
},
{
  id:"152", text:"午夜酒馆", category:"scene",
  desc:"只在深夜营业的酒馆，聚集来自各地的特殊客人。",
  tags:[ "酒馆", "夜晚"]
},
{
  id:"153", text:"旧时代剧场", category:"scene",
  desc:"保存着过去时代风格的剧场，经常发生奇妙事件。",
  tags:[ "剧场", "旧时代"]
},
{
  id:"154", text:"机械工坊", category:"scene",
  desc:"制造各种机械装置的工坊，隐藏特殊技术。",
  tags:[ "机械", "制作"]
},
{
  id:"155", text:"云海之城", category:"scene",
  desc:"建立在云层之上的城市，与地面世界隔绝。",
  tags:[ "天空", "城市"]
},
{
  id:"156", text:"幽灵车站", category:"scene",
  desc:"传闻会出现不存在列车的神秘车站。",
  tags:[ "灵异", "车站"]
},
{
  id:"157", text:"魔法森林", category:"scene",
  desc:"充满魔法力量的森林，居住着各种奇妙生命。",
  tags:[ "魔法", "森林"]
},
{
  id:"158", text:"深海研究所", category:"scene",
  desc:"位于海底的研究设施，探索未知生命与现象。",
  tags:[ "深海", "研究"]
},
{
  id:"159", text:"未来都市街区", category:"scene",
  desc:"高度科技化城市中的生活区域。",
  tags:[ "未来", "都市"]
},
{
  id:"160", text:"遗忘之地", category:"scene",
  desc:"被世界遗忘的区域，隐藏着失落历史。",
  tags:[ "失落", "秘密"]
},

//============ theme 主题氛围=================

{
  id:"191", text:"身份互换AU", category:"theme",
  desc:"角色因为特殊原因交换身份，需要适应彼此的生活。",
  tags:[ "身份交换", "反差"]
},
{
  id:"192", text:"穿越改写AU", category:"theme",
  desc:"角色来到过去或故事之外，尝试改变原本的发展。",
  tags:[ "穿越", "改变命运"]
},
{
  id:"193", text:"双线叙事AU", category:"theme",
  desc:"两个时间线或视角同时展开，逐渐连接真相。",
  tags:[ "双线", "叙事"]
},
{
  id:"194", text:"群像冒险AU", category:"theme",
  desc:"多个角色共同行动，每个人都有自己的故事线。",
  tags:[ "群像", "冒险"]
},
{
  id:"195", text:"治愈日常AU", category:"theme",
  desc:"围绕平静生活展开，描写角色之间温暖互动。",
  tags:[ "日常", "治愈"]
},
{
  id:"196", text:"悬疑解谜AU", category:"theme",
  desc:"围绕谜题展开调查，通过线索寻找真相。",
  tags:[ "悬疑", "解谜"]
},
{
  id:"197", text:"命运纠缠AU", category:"theme",
  desc:"角色之间存在特殊联系，无法轻易摆脱彼此影响。",
  tags:[ "命运", "羁绊"]
},
{
  id:"198", text:"救赎成长AU", category:"theme",
  desc:"角色在相遇后逐渐改变，面对过去并成长。",
  tags:[ "救赎", "成长"]
},
{
  id:"199", text:"秘密揭露AU", category:"theme",
  desc:"隐藏多年的秘密逐渐曝光，引发故事变化。",
  tags:[ "秘密", "真相"]
},
{
  id:"200", text:"奇幻冒险AU", category:"theme",
  desc:"角色进入未知领域，经历探索与冒险。",
  tags:[ "幻想", "冒险"]
},
];
module.exports=entries;