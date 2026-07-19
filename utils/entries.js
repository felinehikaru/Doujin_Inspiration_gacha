// utils/entries.js
// ============================================================
//  ⚠️ 词条库 - 所有词条数据都在这里，修改或新增词条只需编辑此文件
//  格式：
//   {id:"编号", text:"词条名", category:"分类",
//    desc:"描述",
//    tags:[ tag ]
//    }
// ============================================================

const entries = [

  // ================== world 世界背景 ==================
  
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
    id:"004", text:"星河拍卖行AU", category:"world",
    desc:"拍卖星辰碎片的地方，每个拍品背后都藏着一个星系的故事。",
    tags:[ "宇宙幻想", "拍卖"]
  },
  {
    id:"005", text:"雪花玻璃球AU", category:"world",
    desc:"制作手工雪花玻璃球的工坊，摇一摇就能看到另一个世界。",
    tags:[ "幻想道具", "异世界"]
  },
  {
    id:"006", text:"云端学院AU", category:"world",
    desc:"建立在云层之上的学院，学生学习操控各种奇妙能力。",
    tags:[ "校园幻想", "特殊能力"]
  },
  {
    id:"007", text:"机械城AU", category:"world",
    desc:"由齿轮与机械构成的城市，人们追寻失落的科技秘密。",
    tags:[ "机械幻想", "科技世界"]
  },
  {
    id:"008", text:"魔法图书馆AU", category:"world",
    desc:"收藏所有魔法典籍的巨大图书馆，管理员守护禁忌知识。",
    tags:[ "魔法", "知识秘藏"]
  },
  {
    id:"009", text:"未来都市AU", category:"world",
    desc:"科技高度发展的未来城市，人类与人工智能共同生活。",
    tags:[ "未来科技", "都市"]
  },
  {
    id:"010", text:"梦境管理局AU", category:"world",
    desc:"负责管理人类梦境的机构，处理异常梦境事件。",
    tags:[ "梦境", "幻想机构"]
  },
  {
    id:"011", text:"时间旅馆AU", category:"world",
    desc:"位于时间夹缝中的旅馆，接待来自不同年代的客人。",
    tags:[ "时间穿越", "特殊地点"]
  },
  {
    id:"012", text:"主题乐园AU", category:"world",
    desc:"拥有特殊规则的主题乐园，游客将在其中经历不同故事。",
    tags:[ "幻想娱乐", "特殊规则"]
  },
  {
    id:"013", text:"蒸汽时代AU", category:"world",
    desc:"以蒸汽机械为核心发展的世界，人类探索新的科技方向。",
    tags:[ "蒸汽朋克", "机械"]
  },
  {
    id:"014", text:"末日避难所AU", category:"world",
    desc:"灾难后的世界，人们在封闭设施中寻找生存方式。",
    tags:[ "末日", "生存"]
  },
  {
    id:"015", text:"海洋文明AU", category:"world",
    desc:"人类建立海底城市，发展独特海洋文明。",
    tags:[ "海洋", "文明"]
  },
  {
    id:"016", text:"魔法都市AU", category:"world",
    desc:"魔法与现代城市结合，人们使用魔法生活。",
    tags:[ "魔法", "都市"]
  },
  {
    id:"017", text:"灵异调查局AU", category:"world",
    desc:"专门处理异常事件的机构，调查未知现象。",
    tags:[ "灵异", "调查"]
  },
  {
    id:"018", text:"妖怪共存AU", category:"world",
    desc:"人类与非人类生命共同生活的世界。",
    tags:[ "妖怪", "共存"]
  },
  {
    id:"019", text:"星际殖民AU", category:"world",
    desc:"人类探索宇宙，在未知星球建立新的家园。",
    tags:[ "星际", "探索"]
  },
  {
    id:"020", text:"学院都市AU", category:"world",
    desc:"拥有特殊教育体系的城市，学生学习各种能力。",
    tags:[ "学院", "能力"]
  },
  {
    id:"021", text:"异世界冒险AU", category:"world",
    desc:"角色进入陌生世界，展开寻找归途的旅程。",
    tags:[ "异世界", "冒险"]
  },
  {
    id:"022", text:"仙侠修行AU", category:"world",
    desc:"存在灵力与修行体系的世界，人们追寻更高境界。",
    tags:[ "仙侠", "修行"]
  },
  {
    id:"023", text:"西幻王国AU", category:"world",
    desc:"骑士、魔法师与王国共同存在的幻想世界。",
    tags:[ "西幻", "王国"]
  },
  {
    id:"024", text:"武侠江湖AU", category:"world",
    desc:"门派林立的江湖世界，各方势力争夺秘密。",
    tags:[ "武侠", "江湖"]
  },
  {
    id:"025", text:"吸血鬼都市AU", category:"world",
    desc:"人类与吸血鬼共同存在的现代城市。",
    tags:[ "吸血鬼", "都市幻想"]
  },
  {
    id:"026", text:"妖魔退治AU", category:"world",
    desc:"专门处理妖魔事件的世界，存在特殊职业者。",
    tags:[ "妖魔", "驱魔"]
  },
  {
    id:"027", text:"异能管理局AU", category:"world",
    desc:"管理特殊能力者的组织，负责维持社会秩序。",
    tags:[ "异能", "组织"]
  },
  {
    id:"028", text:"平行世界AU", category:"world",
    desc:"存在多个不同世界线，角色可能遇见另一个自己。",
    tags:[ "平行世界", "命运"]
  },
  {
    id:"029", text:"时间循环AU", category:"world",
    desc:"某一天不断重复，需要寻找循环结束的方法。",
    tags:[ "时间", "循环"]
  },
  {
    id:"030", text:"人工智能共生AU", category:"world",
    desc:"人工智能与人类共同生活并产生复杂关系。",
    tags:[ "AI", "共生"]
  },
  {
    id:"031", text:"灾后重建AU", category:"world",
    desc:"经历重大灾难后的世界，人们重新建立文明。",
    tags:[ "灾难", "重建"]
  },
  {
    id:"032", text:"现代都市AU", category:"world",
    desc:"普通现代城市背景，角色在日常生活中展开故事。",
    tags:[ "现代", "都市"]
  },
  {
    id:"033", text:"校园青春AU", category:"world",
    desc:"以校园生活为背景，围绕成长与相遇展开故事。",
    tags:[ "校园", "青春"]
  },
  {
    id:"034", text:"娱乐圈AU", category:"world",
    desc:"以演艺行业为背景，角色面对公众与个人生活的矛盾。",
    tags:[ "娱乐圈", "公众身份"]
  },
  {
    id:"035", text:"职场都市AU", category:"world",
    desc:"以职场环境为背景，描写工作与人际关系。",
    tags:[ "职场", "都市"]
  },
  {
    id:"036", text:"刑侦推理AU", category:"world",
    desc:"围绕案件调查展开，角色寻找隐藏真相。",
    tags:[ "推理", "案件"]
  },
  {
    id:"037", text:"末世生存AU", category:"world",
    desc:"灾难后的世界，人类为了生存不断寻找希望。",
    tags:[ "末世", "生存"]
  },
  {
    id:"038", text:"克苏鲁幻想AU", category:"world",
    desc:"面对未知存在与不可理解力量的幻想世界。",
    tags:[ "未知恐惧", "神秘"]
  },
  {
    id:"039", text:"童话改编AU", category:"world",
    desc:"重新演绎经典童话设定，加入新的角色关系。",
    tags:[ "童话", "改编"]
  },
  {
    id:"040", text:"神话体系AU", category:"world",
    desc:"借鉴神话传说建立世界背景。",
    tags:[ "神话", "传说"]
  },
  {
    id:"041", text:"学院竞技AU", category:"world",
    desc:"学生通过比赛与挑战展现能力，展开竞争。",
    tags:[ "竞技", "学院"]
  },
  {
    id:"042", text:"鸣虫山谷AU", category:"world",
    desc:"夜晚会响起无数虫鸣的山谷，每种鸣叫都对应一个古老的传说。",
    tags:[ "山谷", "传说"]
  },
  {
    id:"043", text:"蒸汽列车AU", category:"world",
    desc:"永不靠站的蒸汽列车，乘客们在下车之前都互不相识。",
    tags:[ "蒸汽", "列车"]
  },
  {
    id:"044", text:"浮空集市AU", category:"world",
    desc:"漂浮在空中的集市，每个月圆之夜才会出现。",
    tags:[ "集市", "月圆"]
  },
  {
    id:"045", text:"回声隧道AU", category:"world",
    desc:"喊出的声音会在隧道里回荡很久，久到回声里出现了别的内容。",
    tags:[ "回声", "神秘"]
  },
  {
    id:"046", text:"云朵牧场AU", category:"world",
    desc:"在云层上放牧云朵的人，用云朵制作不同形状的雨。",
    tags:[ "云朵", "幻想"]
  },
  {
    id:"047", text:"雨铃巷AU", category:"world",
    desc:"挂满风铃的小巷，每串风铃只能在雨中发出声音。",
    tags:[ "风铃", "雨巷"]
  },
  {
    id:"048", text:"墨迹工坊AU", category:"world",
    desc:"手工制墨的老作坊，用不同情绪调出不同颜色的墨，或者纸上的字迹会随着时间改变颜色。",
    tags:[ "制墨", "手工"]
  },
  {
    id:"049", text:"夜光花田AU", category:"world",
    desc:"夜晚会发光的巨大花田，两个人负责守护花期的秘密。",
    tags:[ "花田", "发光"]
  },
  {
    id:"050", text:"孤岛邮筒AU", category:"world",
    desc:"海中央孤岛上的红色邮筒，投进去的信件会出现在收信人的梦里。",
    tags:[ "邮筒", "梦境"]
  },
  {
    id:"051", text:"冰晶矿洞AU", category:"world",
    desc:"终年结冰的矿洞里，开采出来的冰晶会映出人的过去。",
    tags:[ "矿洞", "冰晶"]
  },
  {
    id:"052", text:"铁棍宇宙", category:"world",
    desc:"谁第一名谁就得拿着这个铁棍！",
    tags:[ "搞笑", "竞技"]
  },
  {
    id:"053", text:"乐队PA", category:"world",
    desc:"当他们组乐队。",
    tags:[ "音乐", "乐队"]
  },
  {
    id:"054", text:"ABO设定", category:"world",
    desc:"第二性别、信息素与社会规则带来身份差异和本能拉扯。",
    tags:[ "ABO", "身份"]
  },
  {
    id:"055", text:"民国AU", category:"world",
    desc:"乱世烟火里，理想、家国和私情互相撕扯。",
    tags:[ "民国", "历史"]
  },
  {
    id:"056", text:"无限流", category:"world",
    desc:"恐怖副本与规则谜题中并肩求生。",
    tags:[ "无限流", "副本"]
  },
  {
    id:"057", text:"全息网游", category:"world",
    desc:"游戏身份与现实身份交错，线上线下双线心动。",
    tags:[ "网游", "全息"]
  },
  {
    id:"058", text:"赛博朋克", category:"world",
    desc:"霓虹都市、机械义体、数据秘密和反抗者。",
    tags:[ "赛博", "科幻"]
  },
  {
    id:"059", text:"星际机甲", category:"world",
    desc:"军校、舰队、精神力和并肩作战。",
    tags:[ "星际", "机甲"]
  },
  {
    id:"060", text:"魔法学院", category:"world",
    desc:"课程、禁书、社团竞争和古老预言。",
    tags:[ "魔法", "学院"]
  },
  {
    id:"061", text:"电竞AU", category:"world",
    desc:"赛场胜负、训练室日常和并肩夺冠。",
    tags:[ "电竞", "竞技"]
  },
  {
    id:"062", text:"宫廷AU", category:"world",
    desc:"权谋、身份、礼法与不能明说的偏爱。",
    tags:[ "宫廷", "权谋"]
  },
  {
    id:"063", text:"蒸汽朋克", category:"world",
    desc:"齿轮、飞艇、工厂城市和反叛计划。",
    tags:[ "蒸汽朋克", "机械"]
  },
  {
    id:"064", text:"蒸汽波", category:"world",
    desc:"复古霓虹、低保真画质和浪漫主义的虚拟空间。",
    tags:[ "蒸汽波", "复古"]
  },
  {
    id:"065", text:"山海经AU", category:"world",
    desc:"异兽、神草、古国遗民，神话与冒险交织。",
    tags:[ "山海经", "神话"]
  },
  {
    id:"066", text:"西游AU", category:"world",
    desc:"取经路上的妖与佛，在羁绊中重新定义正邪。",
    tags:[ "西游", "神话"]
  },
  {
    id:"067", text:"三国AU", category:"world",
    desc:"群雄逐鹿，智谋与忠义在乱世中碰撞。",
    tags:[ "三国", "历史"]
  },
  {
    id:"068", text:"大唐AU", category:"world",
    desc:"盛世长安，文人侠客与宫廷秘辛。",
    tags:[ "大唐", "历史"]
  },
  {
    id:"069", text:"大宋AU", category:"world",
    desc:"市井风情、词话雅集，风雅中暗藏波澜。",
    tags:[ "大宋", "历史"]
  },
  {
    id:"070", text:"维多利亚AU", category:"world",
    desc:"工业革命、绅士淑女与哥特迷雾。",
    tags:[ "维多利亚", "历史"]
  },
  {
    id:"071", text:"海盗AU", category:"world",
    desc:"海上宝藏、自由与背叛，浪涛间的宿命。",
    tags:[ "海盗", "冒险"]
  },
  {
    id:"072", text:"牛仔AU", category:"world",
    desc:"西部荒野、快枪手与孤胆浪漫。",
    tags:[ "牛仔", "西部"]
  },
  {
    id:"073", text:"黑帮AU", category:"world",
    desc:"地下秩序、忠诚与背叛，刀尖上的情义。",
    tags:[ "黑帮", "犯罪"]
  },
  {
    id:"074", text:"特工AU", category:"world",
    desc:"谍影重重，身份伪装与致命吸引。",
    tags:[ "特工", "谍战"]
  },
  {
    id:"075", text:"狼人AU", category:"world",
    desc:"月圆之夜的野性，族群与个人的冲突。",
    tags:[ "狼人", "奇幻"]
  },
  {
    id:"076", text:"人鱼AU", category:"world",
    desc:"深海歌谣、陆地与海洋的边界之恋。",
    tags:[ "人鱼", "海洋"]
  },
  {
    id:"077", text:"天使恶魔AU", category:"world",
    desc:"天堂与地狱的边界，信仰与欲望的较量。",
    tags:[ "天使", "恶魔"]
  },
  {
    id:"078", text:"克苏鲁现代", category:"world",
    desc:"都市怪谈，未知存在让日常逐渐失控。",
    tags:[ "克苏鲁", "都市"]
  },
  {
    id:"079", text:"公路片AU", category:"world",
    desc:"漫长旅途、偶然相遇和自我寻找。",
    tags:[ "公路", "旅行"]
  },
  {
    id:"080", text:"音乐剧AU", category:"world",
    desc:"歌声、舞蹈与藏在台词里的告白。",
    tags:[ "音乐剧", "艺术"]
  },
  {
    id:"081", text:"马戏团AU", category:"world",
    desc:"帐篷下的奇异人生，每个人都有自己的秘密。",
    tags:[ "马戏团", "奇幻"]
  },
  {
    id:"082", text:"菜市场AU", category:"world",
    desc:"摊位之间的明争暗斗，一把葱引发的爱情故事。",
    tags:[ "日常", "市井"]
  },
  {
    id:"083", text:"快递驿站AU", category:"world",
    desc:"每天取件的固定时间，成了两人心照不宣的约定。",
    tags:[ "日常", "驿站"]
  },
  {
    id:"084", text:"深夜大排档AU", category:"world",
    desc:"油烟与烟火气里，藏着最真实的人间情话。",
    tags:[ "市井", "夜晚"]
  },
  {
    id:"085", text:"公交终点站AU", category:"world",
    desc:"每天最后一班车的终点，只有他们两个人下车。",
    tags:[ "公交", "日常"]
  },
  {
    id:"086", text:"公共澡堂AU", category:"world",
    desc:"水雾缭绕中，坦诚相见的不仅是身体。",
    tags:[ "日常", "幽默"]
  },
  {
    id:"087", text:"乡村支教AU", category:"world",
    desc:"黄土高坡上的教室，两个人撑起一群孩子的未来。",
    tags:[ "乡村", "教育"]
  },
  {
    id:"088", text:"加油站AU", category:"world",
    desc:"深夜来加油的常客，和值夜班的人产生了微妙联系。",
    tags:[ "日常", "夜晚"]
  },
  {
    id:"089", text:"修车铺AU", category:"world",
    desc:"满手机油的人，偏偏有最温柔的一双手。",
    tags:[ "日常", "手工"]
  },
  {
    id:"090", text:"理发店AU", category:"world",
    desc:"剪刀与推子之间，慢慢剪出了感情。",
    tags:[ "日常", "理发"]
  },
  {
    id:"091", text:"照相馆AU", category:"world",
    desc:"记录别人的珍贵瞬间，自己的珍贵记忆也悄然生成。",
    tags:[ "照相馆", "日常"]
  },
  {
    id:"092", text:"花店AU", category:"world",
    desc:"每天卖花的人，终于等到了想送花的那个人。",
    tags:[ "花店", "日常"]
  },
  {
    id:"093", text:"烘焙坊AU", category:"world",
    desc:"面粉与糖霜之间，揉进了说不出口的心意。",
    tags:[ "烘焙", "日常"]
  },
  {
    id:"094", text:"宠物医院AU", category:"world",
    desc:"一起救助流浪动物的人，心也慢慢靠在一起。",
    tags:[ "宠物", "日常"]
  },
  {
    id:"095", text:"健身房AU", category:"world",
    desc:"举铁时互相辅助的双手，渐渐有了不一样的温度。",
    tags:[ "健身", "日常"]
  },
  {
    id:"096", text:"自习室AU", category:"world",
    desc:"考研路上并肩而坐的人，成了彼此最坚定的支撑。",
    tags:[ "自习室", "校园"]
  },
  
  {
    id:"098", text:"灯塔看守AU", category:"world",
    desc:"孤岛上的两个人，守着光也守着彼此。",
    tags:[ "灯塔", "守望"]
  },
  {
    id:"099", text:"天文台AU", category:"world",
    desc:"仰望星空的人，终于在地球上找到了想一起看星星的人。",
    tags:[ "天文台", "星空"]
  },
  {
    id:"100", text:"博物馆AU", category:"world",
    desc:"在古老文物之间，找到了属于这个时代的共鸣。",
    tags:[ "博物馆", "历史"]
  },
  {
    id:"101", text:"梦境管理局AU", category:"world",
    desc:"专门管理人类梦境的机构，入梦师与梦境罪犯的猫鼠游戏。",
    tags:[ "梦境", "管理局"]
  },
  {
    id:"102", text:"废墟图书馆AU", category:"world",
    desc:"世界毁灭后的最后一座图书馆，每本书里封印着一个消失的文明。",
    tags:[ "废墟", "图书馆"]
  },
  {
    id:"103", text:"移动城堡AU", category:"world",
    desc:"用机械腿行走的城堡里，住着一位怪脾气的魔法师和误入的旅人。",
    tags:[ "移动城堡", "魔法"]
  },
  {
    id:"104", text:"回声电台AU", category:"world",
    desc:"深夜播出神秘信号的电台，只有特定的人才能接收到其中的秘密。",
    tags:[ "电台", "神秘"]
  },
  {
    id:"105", text:"彼岸花店AU", category:"world",
    desc:"开在阴阳交界处的花店，店主用花帮亡灵完成未了的心愿。",
    tags:[ "彼岸花", "亡灵"]
  },
  {
    id:"106", text:"潮汐观测站AU", category:"world",
    desc:"建在悬崖边上的观测站，两个人负责记录每月的异常大潮。",
    tags:[ "潮汐", "观测站"]
  },
  {
    id:"107", text:"飞艇竞速AU", category:"world",
    desc:"天空中的飞艇赛场上，胜负之间藏着跨越阵营的默契。",
    tags:[ "飞艇", "竞速"]
  },
  {
    id:"108", text:"钟表修理铺AU", category:"world",
    desc:"修表匠能修复的不只是机械，还有被卡在时间里的人。",
    tags:[ "钟表", "修理"]
  },
  {
    id:"109", text:"镜中世界AU", category:"world",
    desc:"镜子对面是另一个镜像世界，而两个世界的边界正在模糊。",
    tags:[ "镜像", "异世界"]
  },
  {
    id:"110", text:"风筝信使AU", category:"world",
    desc:"在信号不通的山区，风筝是唯一的通信方式，传信的人也传着情。",
    tags:[ "风筝", "信使"]
  },
  {
    id:"111", text:"深海采矿站AU", category:"world",
    desc:"万米海底的采矿平台上，两个人与黑暗和压力共处。",
    tags:[ "深海", "采矿"]
  },
  
  {
    id:"113", text:"废弃游乐园AU", category:"world",
    desc:"停运多年的游乐园里，夜间亮起的灯光吸引了两个守夜人。",
    tags:[ "游乐园", "废弃"]
  },
  {
    id:"114", text:"候鸟驿站AU", category:"world",
    desc:"候鸟迁徙路线上的驿站，每年同一时间都会遇见同一个人。",
    tags:[ "候鸟", "驿站"]
  },
  {
    id:"115", text:"熔岩研究所AU", category:"world",
    desc:"研究地底岩浆的前哨站，高温环境下的谨慎与靠近。",
    tags:[ "熔岩", "研究"]
  },
  {
    id:"116", text:"回声山谷AU", category:"world",
    desc:"喊一声能听到七次回声的山谷，秘密在这里被无限放大。",
    tags:[ "回声", "山谷"]
  },
  {
    id:"117", text:"星河渡口AU", category:"world",
    desc:"连接各个星系的渡口，等船的人总在固定时间相遇。",
    tags:[ "星河", "渡口"]
  },
  {
    id:"118", text:"古董电话亭AU", category:"world",
    desc:"街角的老式电话亭能接通过去的某个时间点。",
    tags:[ "电话亭", "时间"]
  },
  {
    id:"119", text:"永夜城堡AU", category:"world",
    desc:"被诅咒永远处于黑夜的城堡，闯入者必须找出诅咒的源头。",
    tags:[ "永夜", "城堡"]
  },
  {
    id:"120", text:"气球邮局AU", category:"world",
    desc:"用氦气球寄信的邮局，收信人取决于风向与缘分。",
    tags:[ "气球", "邮局"]
  },
  {
    id:"121", text:"低温休眠舱AU", category:"world",
    desc:"星际旅行中苏醒时间错位的两个人，在空旷的飞船里相依。",
    tags:[ "低温", "星际"]
  },
  {
    id:"122", text:"稻荷神社AU", category:"world",
    desc:"被狐狸守护的神社里，来祈福的人都会遇到一只奇怪的白狐。",
    tags:[ "神社", "狐狸"]
  },
  {
    id:"123", text:"悬崖书店AU", category:"world",
    desc:"凿在悬崖壁上的书店，来买书的人要先走过一段危险的栈道。",
    tags:[ "悬崖", "书店"]
  },
  {
    id:"124", text:"沙漏工坊AU", category:"world",
    desc:"制造沙漏的作坊，每个沙漏里装的其实是不同人的时间。",
    tags:[ "沙漏", "工坊"]
  },
  {
    id:"125", text:"萤火森林AU", category:"world",
    desc:"夜晚会发光的森林里，有两个人守着不让任何人闯入。",
    tags:[ "萤火", "森林"]
  },
  
  {
    id:"127", text:"冰封港口AU", category:"world",
    desc:"终年结冰的港口，破冰船上的两个人一起开辟航道。",
    tags:[ "冰封", "港口"]
  },
  {
    id:"128", text:"回音壁AU", category:"world",
    desc:"长城脚下的回音壁前，在这里说过的话会被某个特定的人听见。",
    tags:[ "回音壁", "约定"]
  },
  {
    id:"129", text:"琥珀工坊AU", category:"world",
    desc:"用树脂封存记忆的工匠，但封存者自己却忘了一切。",
    tags:[ "琥珀", "工坊"]
  },
  {
    id:"130", text:"流星观测站AU", category:"world",
    desc:"建在沙漠深处的流星观测站，每年英仙座流星雨时会有人赴约。",
    tags:[ "流星", "观测站"]
  },
  {
    id:"131", text:"缆车终点站AU", category:"world",
    desc:"通往山顶的缆车终点站，大雪封山时只有两个人留守。",
    tags:[ "缆车", "终点站"]
  },
  {
    id:"132", text:"贝壳沙滩AU", category:"world",
    desc:"退潮后会露出贝壳滩的海岸，两个人每天来捡同一片海。",
    tags:[ "贝壳", "沙滩"]
  },
  {
    id:"133", text:"钢笔修理铺AU", category:"world",
    desc:"修理古董钢笔的店铺，每支笔里都藏着一段旧日情书。",
    tags:[ "钢笔", "修理"]
  },
  {
    id:"134", text:"雾都暗巷AU", category:"world",
    desc:"终年被雾气笼罩的城市，暗巷里的灯火指引着迷途者。",
    tags:[ "雾都", "暗巷"]
  },
  {
    id:"135", text:"雨季咖啡馆AU", category:"world",
    desc:"只在雨天营业的咖啡馆，来的人都是在等雨停也在等人。",
    tags:[ "雨季", "咖啡馆"]
  },
  {
    id:"136", text:"栈桥尽头AU", category:"world",
    desc:"伸向海面几百米的栈桥，尽头处有一盏灯和一个守灯人。",
    tags:[ "栈桥", "守灯"]
  },
  
  {
    id:"138", text:"回声洞穴AU", category:"world",
    desc:"喊出的声音会被储存起来，第二天再播放出来。",
    tags:[ "回声", "洞穴"]
  },
  {
    id:"139", text:"风车山谷AU", category:"world",
    desc:"布满风车的山谷，每座风车转动时都会发出不同的音符。",
    tags:[ "风车", "山谷"]
  },
  {
    id:"140", text:"月光码头AU", category:"world",
    desc:"月光洒在海面时才会出现的码头，船只会来接有缘人。",
    tags:[ "月光", "码头"]
  },
  {
    id:"141", text:"聊斋AU", category:"world",
    desc:"狐妖、书生、古寺与因果轮回，人妖殊途却情难自禁。",
    tags:[ "聊斋", "神话"]
  },
  {
    id:"142", text:"大唐西域AU", category:"world",
    desc:"丝绸之路上的商旅、僧人与刺客，黄沙下的秘密与传说。",
    tags:[ "大唐", "西域"]
  },
  {
    id:"143", text:"南宋临安AU", category:"world",
    desc:"西湖畔的酒楼、瓦舍勾栏、词人墨客，风月中的暗流涌动。",
    tags:[ "南宋", "临安"]
  },
  {
    id:"144", text:"魏晋风骨AU", category:"world",
    desc:"竹林七贤、清谈、丹药与名士风流，放浪形骸下的真心。",
    tags:[ "魏晋", "名士"]
  },
  {
    id:"145", text:"民国AU", category:"world",
    desc:"天津租界、洋行、戏院与权力游戏，乱世中的家国与私情。",
    tags:[ "北洋", "军阀"]
  },
  {
    id:"146", text:"知青下乡AU", category:"world",
    desc:"广阔天地的青春岁月，艰苦环境中滋生的纯粹情感。",
    tags:[ "知青", "乡村"]
  },
  {
    id:"147", text:"香港九龙城寨AU", category:"world",
    desc:"三不管地带的江湖义气、黑帮火拼与底层挣扎。",
    tags:[ "九龙城寨", "黑帮"]
  },
  {
    id:"148", text:"上海滩AU", category:"world",
    desc:"十里洋场、旗袍、百乐门与码头帮派，纸醉金迷背后的情深。",
    tags:[ "上海滩", "民国"]
  },
  {
    id:"149", text:"巴西贫民窟AU", category:"world",
    desc:"足球、桑巴、暴力与希望，底层人民的生命力与爱。",
    tags:[ "贫民窟", "巴西"]
  },
  {
    id:"150", text:"北欧神话AU", category:"world",
    desc:"阿斯加德的诸神黄昏、巨人、符文与命运纠缠。",
    tags:[ "北欧", "神话"]
  },
  {
    id:"151", text:"希腊神话AU", category:"world",
    desc:"奥林匹斯山的神祇、英雄试炼与无法逃脱的宿命。",
    tags:[ "希腊", "神话"]
  },
  {
    id:"152", text:"埃及神话AU", category:"world",
    desc:"尼罗河畔的法老、祭司与亡灵书，穿越生死的契约。",
    tags:[ "埃及", "神话"]
  },
  {
    id:"153", text:"日本战国AU", category:"world",
    desc:"武士、大名、忍者与茶道，乱世中并肩的忠诚与背叛。",
    tags:[ "日本战国", "武士"]
  },
  {
    id:"154", text:"印第安部落AU", category:"world",
    desc:"草原上的狩猎、图腾、祖灵与部落间的恩怨。",
    tags:[ "印第安", "部落"]
  },
  {
    id:"155", text:"南极科考AU", category:"world",
    desc:"极昼极夜中的封闭空间，极端环境下的依赖与暗生情愫。",
    tags:[ "南极", "科考"]
  },
  {
    id:"156", text:"太空殖民AU", category:"world",
    desc:"星际航行、外星殖民与人类文明的存续，在浩瀚宇宙中同行。",
    tags:[ "太空", "殖民"]
  },
  {
    id:"157", text:"水下城市AU", category:"world",
    desc:"深海中的乌托邦，蓝光与珊瑚之间的秘密恋情。",
    tags:[ "水下", "城市"]
  },
  {
    id:"158", text:"地心探险AU", category:"world",
    desc:"穿越地壳的神秘旅程，未知生物与绝境中的互相扶持。",
    tags:[ "地心", "探险"]
  },
  {
    id:"159", text:"时间管理局AU", category:"world",
    desc:"穿越不同时代的公务员，防止历史被篡改，在执行任务中产生羁绊。",
    tags:[ "时间", "管理局"]
  },
  {
    id:"160", text:"异世界食堂AU", category:"world",
    desc:"连接各个时空的神秘餐厅，不同世界的人在美食中相遇。",
    tags:[ "异世界", "食堂"]
  },
  
  // ================== relationship 关系设定 ==================
  
  {
    id:"161", text:"花店老板与失忆客人", category:"relationship",
    desc:"经营花店的人遇见失去记忆的客人，两人在相处中寻找过去。",
    tags:[ "失忆", "相遇"]
  },
  {
    id:"162", text:"宿敌合作关系", category:"relationship",
    desc:"长期对立的两个人因为共同目标被迫合作。",
    tags:[ "对立合作", "关系转变"]
  },
  {
    id:"163", text:"青梅竹马重逢", category:"relationship",
    desc:"多年未见的旧友再次相遇，重新面对曾经未说出口的话。",
    tags:[ "旧识", "重逢"]
  },
  {
    id:"164", text:"秘密守护者关系", category:"relationship",
    desc:"一方隐藏身份默默守护另一方，却无法说明原因。",
    tags:[ "守护", "隐藏身份"]
  },
  {
    id:"165", text:"竞争对手关系", category:"relationship",
    desc:"实力相近的两人在竞争中逐渐了解彼此。",
    tags:[ "竞争", "相互理解"]
  },
  {
    id:"166", text:"契约关系", category:"relationship",
    desc:"双方因为某种约定绑定在一起，需要共同完成目标。",
    tags:[ "契约", "绑定关系"]
  },
  {
    id:"167", text:"师徒关系", category:"relationship",
    desc:"拥有经验的一方指导另一方成长，在过程中建立特殊羁绊。",
    tags:[ "指导", "成长"]
  },
  {
    id:"168", text:"陌生同居关系", category:"relationship",
    desc:"原本陌生的两个人因为特殊原因开始共同生活。",
    tags:[ "日常相处", "磨合"]
  },
  {
    id:"169", text:"秘密搭档关系", category:"relationship",
    desc:"两人作为隐藏身份的搭档行动，彼此信任又有所保留。",
    tags:[ "合作", "秘密"]
  },
  {
    id:"170", text:"双向误会关系", category:"relationship",
    desc:"双方因为误解产生距离，却始终无法真正放下对方。",
    tags:[ "误会", "情感拉扯"]
  },
  {
    id:"171", text:"失散重逢关系", category:"relationship",
    desc:"曾经分离的两人在多年后再次相遇。",
    tags:[ "重逢", "过去羁绊"]
  },
  {
    id:"172", text:"伪装身份关系", category:"relationship",
    desc:"其中一人隐藏真实身份接近另一人，两人在相处中逐渐产生信任。",
    tags:[ "身份秘密", "信任建立"]
  },
  {
    id:"173", text:"冷淡上司与新人", category:"relationship",
    desc:"性格差异巨大的两人在工作中不断磨合。",
    tags:[ "职场", "性格反差"]
  },
  {
    id:"174", text:"救命恩人关系", category:"relationship",
    desc:"因为一次意外相遇，一方成为另一方的重要恩人。",
    tags:[ "救助", "恩情"]
  },
  {
    id:"175", text:"互相利用关系", category:"relationship",
    desc:"双方最初只是为了各自目的合作，却逐渐改变看法。",
    tags:[ "利益合作", "关系变化"]
  },
  {
    id:"176", text:"秘密交换关系", category:"relationship",
    desc:"两人交换彼此隐藏的秘密，并因此建立特殊联系。",
    tags:[ "秘密", "信任"]
  },
  {
    id:"177", text:"守护与被守护关系", category:"relationship",
    desc:"一方习惯保护别人，另一方逐渐学会回应这份保护。",
    tags:[ "守护", "依赖"]
  },
  {
    id:"178", text:"失忆前任关系", category:"relationship",
    desc:"曾经亲密的人再次相遇，其中一人已经忘记过去。",
    tags:[ "失忆", "旧情"]
  },
  {
    id:"179", text:"欢喜冤家关系", category:"relationship",
    desc:"两人经常争吵，却在关键时刻总会站在对方身边。",
    tags:[ "斗嘴", "默契"]
  },
  {
    id:"180", text:"跨越阵营关系", category:"relationship",
    desc:"来自不同立场的两个人，在冲突中逐渐理解彼此。",
    tags:[ "阵营冲突", "理解"]
  },
  {
    id:"181", text:"匿名通信关系", category:"relationship",
    desc:"两人通过匿名方式交流，却不知道现实中的身份。",
    tags:[ "匿名", "通信"]
  },
  {
    id:"182", text:"回声恋", category:"relationship",
    desc:"两个人的心跳声会在同一个频率上产生共振，彼此能听到对方的心跳。",
    tags:[ "心跳", "共鸣"]
  },
  {
    id:"183", text:"替罪羊", category:"relationship",
    desc:"一方总是替另一方背锅，背到后来成了习惯也成了羁绊。",
    tags:[ "羁绊", "习惯"]
  },
  {
    id:"184", text:"影子邮差", category:"relationship",
    desc:"专门替人送匿名信的人，从不露面却与收信人产生了奇妙的联系。",
    tags:[ "匿名", "通信"]
  },
  {
    id:"185", text:"倒影恋人", category:"relationship",
    desc:"在水边能看到另一个人的倒影，但那个人其实不在身边。",
    tags:[ "倒影", "距离"]
  },
  {
    id:"186", text:"回声信使", category:"relationship",
    desc:"靠回声传递消息的两个人，声音成了唯一的纽带。",
    tags:[ "回声", "通信"]
  },
  {
    id:"187", text:"借名关系", category:"relationship",
    desc:"一方借用另一方的名字生活，后来两个人一起用同一个名字。",
    tags:[ "借名", "绑定"]
  },
  {
    id:"188", text:"替身写手", category:"relationship",
    desc:"替别人写情书的人，写到最后爱上了收信人。",
    tags:[ "替身", "情书"]
  },
  {
    id:"189", text:"隔世搭档", category:"relationship",
    desc:"分别生活在不同时代的人，靠遗留的物件传递信息。",
    tags:[ "隔世", "搭档"]
  },
  
  {
    id:"191", text:"倒计时搭档", category:"relationship",
    desc:"两个人手腕上都有倒计时，时间到了才会知道彼此的关系。",
    tags:[ "倒计时", "命运"]
  },
  {
    id:"192", text:"借火关系", category:"relationship",
    desc:"在寒夜里共享一根火柴的人，火光熄灭后关系却亮了。",
    tags:[ "借火", "寒夜"]
  },
  {
    id:"193", text:"替身信使", category:"relationship",
    desc:"替已故之人送最后一封信的人，遇到了收信人的后人。",
    tags:[ "替身", "信使"]
  },
  {
    id:"194", text:"回声战友", category:"relationship",
    desc:"在战场中靠声音判断对方位置的人，没见面却已是生死之交。",
    tags:[ "回声", "战友"]
  },
  {
    id:"195", text:"借墨关系", category:"relationship",
    desc:"写字的墨用完了，向陌生人借墨，从此用同一种墨写信。",
    tags:[ "借墨", "通信"]
  },
  {
    id:"196", text:"隔空搭档", category:"relationship",
    desc:"分别在不同的时空解决同一个案件，靠留下的线索同步行动。",
    tags:[ "隔空", "搭档"]
  },
  {
    id:"197", text:"替身园丁", category:"relationship",
    desc:"替人照料花园的人，在花开花落间照顾到了人心。",
    tags:[ "替身", "园丁"]
  },
  {
    id:"198", text:"回声琴师", category:"relationship",
    desc:"在山谷中弹琴的人，回声里总有另一个人的和声。",
    tags:[ "回声", "音乐"]
  },
  {
    id:"199", text:"借宿关系", category:"relationship",
    desc:"在暴风雨中借宿陌生人家里，第二天雨停了心却留下了。",
    tags:[ "借宿", "相遇"]
  },
  {
    id:"200", text:"替身舞伴", category:"relationship",
    desc:"替别人参加舞会的人，和临时的舞伴跳出了真实的默契。",
    tags:[ "替身", "舞伴"]
  },
  {
    id:"201", text:"回声好友", category:"relationship",
    desc:"对着山崖喊话的人，和在山崖那边刚好听见的陌生人。",
    tags:[ "回声", "相遇"]
  },
  {
    id:"202", text:"借光关系", category:"relationship",
    desc:"在黑暗中共用一盏灯的人，光灭了却再也分不开。",
    tags:[ "借光", "黑暗"]
  },
  {
    id:"203", text:"替身画师", category:"relationship",
    desc:"替人画遗像的人，画着画着遗像里的人活了过来。",
    tags:[ "替身", "画师"]
  },
  {
    id:"204", text:"回声知己", category:"relationship",
    desc:"在不同的城市对着同一个月亮自言自语，月亮把话传给了彼此。",
    tags:[ "回声", "知己"]
  },
  {
    id:"205", text:"借路关系", category:"relationship",
    desc:"在陌生城市问路的人，和指路的人从此走上了同一条路。",
    tags:[ "借路", "相遇"]
  },
  {
    id:"206", text:"替身琴师", category:"relationship",
    desc:"替人弹奏求婚曲目的人，听完曲子的人却爱上了弹琴的人。",
    tags:[ "替身", "琴师"]
  },
  {
    id:"207", text:"回声旅伴", category:"relationship",
    desc:"在旅途中听到另一个人的脚步声，节奏和自己完全同步。",
    tags:[ "回声", "旅伴"]
  },
  {
    id:"208", text:"借风关系", category:"relationship",
    desc:"在风大的山顶把想说的话写下来，风会把纸条吹到另一个人手里。",
    tags:[ "借风", "通信"]
  },
  {
    id:"209", text:"替身信差", category:"relationship",
    desc:"替收信困难的人转交信件，转着转着成了两个人的专属邮差。",
    tags:[ "替身", "信差"]
  },
  {
    id:"210", text:"回声书友", category:"relationship",
    desc:"在图书馆里同一本书的借阅卡上反复出现，从未见面却已熟悉。",
    tags:[ "回声", "书友"]
  },
  {
    id:"211", text:"借雪关系", category:"relationship",
    desc:"在初雪里写下名字的人，和另一个也在雪里写下名字的人。",
    tags:[ "借雪", "初雪"]
  },
  {
    id:"212", text:"强强联合", category:"relationship",
    desc:"两位高手势均力敌，互相欣赏也互相较劲。",
    tags:[ "强强", "竞争"]
  },
  {
    id:"213", text:"竹马竹马", category:"relationship",
    desc:"从小一起长大，最熟悉的人反而最难开口。",
    tags:[ "青梅竹马", "旧识"]
  },
  {
    id:"214", text:"天降系", category:"relationship",
    desc:"突然闯入生命的人，打乱所有计划。",
    tags:[ "天降", "相遇"]
  },
  {
    id:"215", text:"双向暗恋", category:"relationship",
    desc:"两个人都以为自己在单箭头，其实早已双向奔赴。",
    tags:[ "暗恋", "双向"]
  },
  {
    id:"216", text:"宿敌变恋人", category:"relationship",
    desc:"立场对立的人在一次次交锋里看见彼此。",
    tags:[ "对立合作", "关系转变"]
  },
  {
    id:"217", text:"顶流与素人", category:"relationship",
    desc:"巨大曝光差异下，真心必须穿过流言。",
    tags:[ "娱乐圈", "身份差异"]
  },
  {
    id:"218", text:"甲方乙方", category:"relationship",
    desc:"合作里互相挑剔，交付之外暗自偏心。",
    tags:[ "职场", "合作"]
  },
  {
    id:"219", text:"伪装情侣", category:"relationship",
    desc:"为了目标假装亲密，却越来越难分真假。",
    tags:[ "伪装", "身份"]
  },
  {
    id:"220", text:"地下恋情", category:"relationship",
    desc:"不能公开的关系，让每次靠近都更珍贵。",
    tags:[ "地下", "秘密"]
  },
  {
    id:"221", text:"灵魂伴侣", category:"relationship",
    desc:"命运绑定的另一半，初见即知彼此特别。",
    tags:[ "灵魂", "伴侣"]
  },
  {
    id:"222", text:"破镜重圆", category:"relationship",
    desc:"分开后重新相遇，发现爱意从未消散。",
    tags:[ "重逢", "旧情"]
  },
  {
    id:"223", text:"并肩作战", category:"relationship",
    desc:"战场上的信任，比任何誓言都坚固。",
    tags:[ "作战", "信任"]
  },
  {
    id:"224", text:"互相救赎", category:"relationship",
    desc:"在彼此最黑暗的时刻，成为唯一的光。",
    tags:[ "救赎", "治愈"]
  },
  {
    id:"225", text:"亦敌亦友", category:"relationship",
    desc:"竞争与欣赏交织，界限越来越模糊。",
    tags:[ "竞争", "理解"]
  },
  {
    id:"226", text:"损友变真爱", category:"relationship",
    desc:"日常互损中，悄悄滋生了不一样的情感。",
    tags:[ "损友", "真爱"]
  },
  {
    id:"227", text:"暗恋成真", category:"relationship",
    desc:"多年的默默关注，终于得到回应。",
    tags:[ "暗恋", "成真"]
  },
  {
    id:"228", text:"双向奔赴", category:"relationship",
    desc:"两个人都主动朝对方走去，没有错过。",
    tags:[ "双向", "奔赴"]
  },
  {
    id:"229", text:"守护者与被守护者", category:"relationship",
    desc:"一方默默付出，另一方逐渐察觉。",
    tags:[ "守护", "依赖"]
  },
  {
    id:"230", text:"理想主义与现实派", category:"relationship",
    desc:"理念不同却互相吸引，在碰撞中寻找平衡。",
    tags:[ "理想", "现实"]
  },
  {
    id:"231", text:"艺术家与鉴赏家", category:"relationship",
    desc:"创造与理解，最懂彼此的人。",
    tags:[ "艺术", "理解"]
  },
  {
    id:"232", text:"作家与编辑", category:"relationship",
    desc:"文字与修改之间，藏着无法言说的默契。",
    tags:[ "写作", "编辑"]
  },
  {
    id:"233", text:"健身搭子", category:"relationship",
    desc:"一起流汗的伙伴，感情在运动中升温。",
    tags:[ "健身", "搭子"]
  },
  {
    id:"234", text:"游戏队友", category:"relationship",
    desc:"虚拟世界的配合，延伸到现实中的默契。",
    tags:[ "游戏", "队友"]
  },
  {
    id:"235", text:"读书会成员", category:"relationship",
    desc:"思想交流中，发现彼此灵魂的共鸣。",
    tags:[ "读书", "共鸣"]
  },
  {
    id:"236", text:"咖啡店常客", category:"relationship",
    desc:"固定的座位和相同的点单，成为默契。",
    tags:[ "咖啡店", "日常"]
  },
  {
    id:"237", text:"死对头变家属", category:"relationship",
    desc:"从见面就掐到被迫成为一家人，别扭中慢慢接受彼此。",
    tags:[ "对立", "关系转变"]
  },
  {
    id:"238", text:"热搜CP", category:"relationship",
    desc:"被网友强行凑对的两个人，从尴尬避嫌到假戏真做。",
    tags:[ "娱乐圈", "CP"]
  },
  {
    id:"239", text:"笔友关系", category:"relationship",
    desc:"通过信件交换心事，从未见过面却已经爱上对方的灵魂。",
    tags:[ "笔友", "通信"]
  },
  {
    id:"240", text:"匿名网友", category:"relationship",
    desc:"在网络上亲密无间，现实中却互不认识，身份揭晓时冲击力十足。",
    tags:[ "匿名", "网友"]
  },
  {
    id:"241", text:"跨界合作", category:"relationship",
    desc:"不同领域的人因为一个项目走到一起，碰撞出奇妙火花。",
    tags:[ "跨界", "合作"]
  },
  {
    id:"242", text:"互补搭档", category:"relationship",
    desc:"一个冲动一个冷静，配合起来天衣无缝。",
    tags:[ "互补", "搭档"]
  },
  {
    id:"243", text:"同行冤家", category:"relationship",
    desc:"同行业的竞争对手，却在私下里互相欣赏。",
    tags:[ "同行", "竞争"]
  },
  {
    id:"244", text:"嘴硬心软", category:"relationship",
    desc:"嘴上从不饶人，行动却处处照顾对方的类型。",
    tags:[ "嘴硬心软", "反差"]
  },
  {
    id:"245", text:"默默付出", category:"relationship",
    desc:"做了很多却从不邀功，只希望对方过得好。",
    tags:[ "默默", "付出"]
  },
  {
    id:"246", text:"一眼万年", category:"relationship",
    desc:"第一眼看到就知道，这个人对自己很特别。",
    tags:[ "一眼", "宿命"]
  },
  {
    id:"247", text:"日久生情", category:"relationship",
    desc:"一开始毫无感觉，相处久了才发现离不开。",
    tags:[ "日久", "生情"]
  },
  {
    id:"248", text:"互怼日常", category:"relationship",
    desc:"每天都要斗嘴，却成了彼此最重要的习惯。",
    tags:[ "互怼", "日常"]
  },
  {
    id:"249", text:"共犯关系", category:"relationship",
    desc:"一起做过某件不能说的秘密，从此绑在一起。",
    tags:[ "共犯", "秘密"]
  },
  {
    id:"250", text:"约定关系", category:"relationship",
    desc:"因为一个承诺而联系在一起，慢慢超越了约定本身。",
    tags:[ "约定", "承诺"]
  },
  {
    id:"251", text:"对手变知己", category:"relationship",
    desc:"在不断的竞争中，成了最了解对方的人。",
    tags:[ "竞争", "知己"]
  },
  {
    id:"252", text:"旁观者与主角", category:"relationship",
    desc:"一方是聚光灯下的焦点，一方是静静注视的观众。",
    tags:[ "旁观", "注视"]
  },
  {
    id:"253", text:"引路人", category:"relationship",
    desc:"被对方指引着走出困境，从此视对方为特别的存在。",
    tags:[ "引导", "依赖"]
  },
  {
    id:"254", text:"同病相怜", category:"relationship",
    desc:"因为有相似的伤痛而靠近，在彼此身上找到慰藉。",
    tags:[ "同病", "慰藉"]
  },
  {
    id:"255", text:"唯一读者", category:"relationship",
    desc:"只有对方能读懂自己的作品，也只有对方能走进自己的心。",
    tags:[ "唯一", "理解"]
  },
  {
    id:"256", text:"替身伴侣", category:"relationship",
    desc:"一方被当作另一个人来爱，真相揭晓时该走还是该留。",
    tags:[ "替身", "伴侣"]
  },
  {
    id:"257", text:"时空旅伴", category:"relationship",
    desc:"在不同时代穿梭时总能遇见同一个人，但对方每次都不认识自己。",
    tags:[ "时空", "旅伴"]
  },
  {
    id:"258", text:"谎言共犯", category:"relationship",
    desc:"共同编造一个巨大谎言的人，在谎言里建立了最真实的关系。",
    tags:[ "谎言", "共犯"]
  },
  {
    id:"259", text:"镜像对手", category:"relationship",
    desc:"跟对方处处相反，却成了全世界最了解彼此的人。",
    tags:[ "镜像", "对手"]
  },
  {
    id:"260", text:"遗书受益人", category:"relationship",
    desc:"收到一封陌生人的遗书，被委托完成三件事，在这个过程中认识了写信人的朋友。",
    tags:[ "遗书", "委托"]
  },
  {
    id:"261", text:"赔罪关系", category:"relationship",
    desc:"一方亏欠另一方，用各种方式道歉补偿，却在过程中动心。",
    tags:[ "赔罪", "补偿"]
  },
  {
    id:"262", text:"借命关系", category:"relationship",
    desc:"一方救过另一方的命，被救的人从此把对方视为生命中最重要的人。",
    tags:[ "借命", "救命"]
  },
  {
    id:"263", text:"忘年交", category:"relationship",
    desc:"年龄差距悬殊却意外合拍，在彼此身上看到自己的过去与未来。",
    tags:[ "忘年", "知己"]
  },
  {
    id:"264", text:"同行旅伴", category:"relationship",
    desc:"在旅途中结伴同行的人，旅程结束时发现舍不得分开。",
    tags:[ "旅行", "旅伴"]
  },
  {
    id:"265", text:"账本关系", category:"relationship",
    desc:"每一笔付出都被记在账本上，算不清的帐变成了还不清的情。",
    tags:[ "账本", "羁绊"]
  },
  {
    id:"266", text:"赎罪搭档", category:"relationship",
    desc:"两个都有罪孽的人，约定一起完成十件好事来赎回自己。",
    tags:[ "赎罪", "搭档"]
  },
  {
    id:"267", text:"摆渡人与乘客", category:"relationship",
    desc:"每天摆渡同一条河的人，和每天都坐船过河的人。",
    tags:[ "摆渡", "日常"]
  },
  {
    id:"268", text:"借书关系", category:"relationship",
    desc:"在图书馆里通过借书卡上的名字认识，借走的书成了对话的媒介。",
    tags:[ "借书", "图书馆"]
  },
  {
    id:"269", text:"天敌变知音", category:"relationship",
    desc:"本该是水火不容的两个物种或阵营，却成了唯一的知己。",
    tags:[ "天敌", "知音"]
  },
  {
    id:"270", text:"试镜对手", category:"relationship",
    desc:"争夺同一个角色的两个人，在试镜过程中被彼此的气质吸引。",
    tags:[ "试镜", "对手"]
  },
  {
    id:"271", text:"影子关系", category:"relationship",
    desc:"一方像另一方的影子，形影不离却永远没有自己的姓名。",
    tags:[ "影子", "依附"]
  },
  {
    id:"272", text:"领航员与探索者", category:"relationship",
    desc:"在未知领域中引路的人和跟随的人，信任在每一步中建立。",
    tags:[ "领航", "探索"]
  },
  {
    id:"273", text:"拆弹搭档", category:"relationship",
    desc:"一起拆除炸弹的两个人，每次任务都是一次生死托付。",
    tags:[ "拆弹", "生死"]
  },
  {
    id:"274", text:"加密关系", category:"relationship",
    desc:"用密码和暗号交流的两个人，破译彼此比破译任何情报都难。",
    tags:[ "加密", "暗号"]
  },
  {
    id:"275", text:"替唱关系", category:"relationship",
    desc:"不能发声的人找了代唱，在歌声里藏住了自己的真心。",
    tags:[ "替唱", "歌声"]
  },
  {
    id:"276", text:"隔世知己", category:"relationship",
    desc:"隔着生死界限交流的两个人，一方已逝但灵魂未散。",
    tags:[ "隔世", "知己"]
  },
  {
    id:"277", text:"倒时差恋人", category:"relationship",
    desc:"永远生活在不同时区的两个人，用错位的时间经营一段感情。",
    tags:[ "时差", "恋人"]
  },
  {
    id:"278", text:"读心者与自闭者", category:"relationship",
    desc:"能听见心声的人，却唯独听不到那个想听的人的任何声音。",
    tags:[ "读心", "自闭"]
  },
  {
    id:"279", text:"回信人", category:"relationship",
    desc:"专门替人写回信的人，写了无数封信却从未写过属于自己的那一封。",
    tags:[ "回信", "替身"]
  },
  {
    id:"280", text:"单方面宿敌", category:"relationship",
    desc:"一方把对方当作宿敌，另一方却完全不知道这个人是谁。",
    tags:[ "单方面", "宿敌"]
  },
  {
    id:"281", text:"守夜人与守墓人", category:"relationship",
    desc:"守灯塔的人和守墓园的人，在各自的位置上遥望对方的光。",
    tags:[ "守夜", "守墓"]
  },
  {
    id:"282", text:"试味搭档", category:"relationship",
    desc:"试毒的人配菜的人，在每一口食物里确认对方平安。",
    tags:[ "试味", "搭档"]
  },
  {
    id:"283", text:"拼图搭档", category:"relationship",
    desc:"一起完成一幅千片拼图的两个人，拼完那天关系也完整了。",
    tags:[ "拼图", "搭档"]
  },
  {
    id:"284", text:"回声伴侣", category:"relationship",
    desc:"一个人喊话另一个人回应，靠回声确定彼此的存在。",
    tags:[ "回声", "伴侣"]
  },
  {
    id:"285", text:"倒带恋人", category:"relationship",
    desc:"关系从分手开始倒着发展，先经历结束再经历开始。",
    tags:[ "倒带", "恋人"]
  },
  
  // ================== character 角色身份 ==================
  
  {
    id:"286", text:"天才研究者", category:"character",
    desc:"拥有超常能力或知识水平的研究型角色。",
    tags:[ "天才", "研究"]
  },
  {
    id:"287", text:"冷面执行者", category:"character",
    desc:"外表冷静理性，负责完成重要任务的角色。",
    tags:[ "冷静", "执行者"]
  },
  {
    id:"288", text:"隐藏身份者", category:"character",
    desc:"拥有秘密身份，需要隐藏真实背景的角色。",
    tags:[ "伪装", "秘密"]
  },
  {
    id:"289", text:"失忆角色", category:"character",
    desc:"失去部分记忆，需要重新认识世界和自己的角色。",
    tags:[ "记忆缺失", "自我探索"]
  },
  {
    id:"290", text:"理想主义者", category:"character",
    desc:"相信某种信念，并愿意为之行动的角色。",
    tags:[ "信念", "坚持"]
  },
  {
    id:"291", text:"嘴硬心软角色", category:"character",
    desc:"表面冷淡强硬，实际上非常关心他人的角色。",
    tags:[ "反差", "温柔"]
  },
  {
    id:"292", text:"观察者角色", category:"character",
    desc:"习惯观察环境和他人，不轻易表达想法的角色。",
    tags:[ "观察", "分析"]
  },
  {
    id:"293", text:"冒险者角色", category:"character",
    desc:"喜欢探索未知领域，追求新鲜经历的角色。",
    tags:[ "探索", "行动"]
  },
  {
    id:"294", text:"守护者角色", category:"character",
    desc:"承担保护责任，总是在关键时刻出现的角色。",
    tags:[ "保护", "责任"]
  },
  {
    id:"295", text:"反派转变角色", category:"character",
    desc:"曾经站在对立面，后来开始改变想法的角色。",
    tags:[ "转变", "成长"]
  },
  {
    id:"296", text:"天生领导者", category:"character",
    desc:"拥有号召力和决策能力，能够带领他人的角色。",
    tags:[ "领导", "责任感"]
  },
  {
    id:"297", text:"神秘旅人", category:"character",
    desc:"身份未知的旅人，总是在关键时刻出现在故事中。",
    tags:[ "未知身份", "旅途"]
  },
  {
    id:"298", text:"失落王族", category:"character",
    desc:"拥有特殊血统，却隐藏真实身份生活的角色。",
    tags:[ "王族", "隐藏身份"]
  },
  {
    id:"299", text:"普通人卷入事件", category:"character",
    desc:"原本过着普通生活，却意外进入特殊事件中心的角色。",
    tags:[ "普通人", "意外卷入"]
  },
  {
    id:"300", text:"天赋觉醒者", category:"character",
    desc:"原本未知的能力在某个契机下突然觉醒的角色。",
    tags:[ "能力觉醒", "成长"]
  },
  {
    id:"301", text:"执着追寻者", category:"character",
    desc:"为了某个目标不断前进，即使遭遇困难也不会放弃。",
    tags:[ "执念", "追寻"]
  },
  {
    id:"302", text:"温柔治愈者", category:"character",
    desc:"擅长安慰和帮助他人，给予周围人温暖的角色。",
    tags:[ "治愈", "温柔"]
  },
  {
    id:"303", text:"危险调查者", category:"character",
    desc:"主动追查未知事件，寻找隐藏真相的角色。",
    tags:[ "调查", "真相"]
  },
  {
    id:"304", text:"孤独天才", category:"character",
    desc:"拥有卓越才能，却习惯独自行动的角色。",
    tags:[ "天才", "孤独"]
  },
  {
    id:"305", text:"背负秘密者", category:"character",
    desc:"隐藏重要过去，无法轻易向他人坦白的角色。",
    tags:[ "秘密", "过去"]
  },
  {
    id:"306", text:"守约之人", category:"character",
    desc:"将承诺看得极重，即使困难也会遵守约定的角色。",
    tags:[ "承诺", "责任"]
  },
  {
    id:"307", text:"禁忌知识研究者", category:"character",
    desc:"研究被禁止领域知识，为寻找真相不断探索的角色。",
    tags:[ "禁忌知识", "研究"]
  },
  {
    id:"308", text:"流浪艺术家", category:"character",
    desc:"四处旅行创作，用作品记录不同地方故事的角色。",
    tags:[ "艺术", "旅行"]
  },
  {
    id:"309", text:"机械改造者", category:"character",
    desc:"通过机械技术改变自身或他人能力的角色。",
    tags:[ "机械", "改造"]
  },
  {
    id:"310", text:"梦境引导者", category:"character",
    desc:"能够进入或引导他人梦境，探索潜意识世界的角色。",
    tags:[ "梦境", "引导"]
  },
  {
    id:"311", text:"古老传承者", category:"character",
    desc:"继承古老力量或知识，肩负延续使命的角色。",
    tags:[ "传承", "使命"]
  },
  {
    id:"312", text:"叛逆继承人", category:"character",
    desc:"拥有继承资格，却拒绝按照传统道路前进的角色。",
    tags:[ "继承", "反抗"]
  },
  {
    id:"313", text:"失踪归来者", category:"character",
    desc:"曾经消失多年，再次出现并带回未知秘密的角色。",
    tags:[ "失踪", "归来"]
  },
  {
    id:"314", text:"双重身份者", category:"character",
    desc:"同时拥有两种身份，需要隐藏其中一面的角色。",
    tags:[ "双重身份", "伪装"]
  },
  {
    id:"315", text:"异世界居民", category:"character",
    desc:"来自不同世界，拥有独特文化背景的角色。",
    tags:[ "异世界", "文化差异"]
  },
  {
    id:"316", text:"规则维护者", category:"character",
    desc:"负责维持某种秩序，却面临规则与现实冲突的角色。",
    tags:[ "秩序", "规则"]
  },
  {
    id:"317", text:"未来预言者", category:"character",
    desc:"能够窥见未来片段，却无法改变所有结果的角色。",
    tags:[ "预言", "未来"]
  },
  {
    id:"318", text:"秘密收藏家", category:"character",
    desc:"收集各种稀有物品，并隐藏其中秘密的角色。",
    tags:[ "收藏", "秘密"]
  },
  {
    id:"319", text:"边境守卫者", category:"character",
    desc:"守护世界边界，阻止未知危险进入的角色。",
    tags:[ "守卫", "边境"]
  },
  {
    id:"320", text:"失控实验体", category:"character",
    desc:"因为实验产生变化，需要寻找自身存在意义的角色。",
    tags:[ "实验", "异变"]
  },
  {
    id:"321", text:"时间旅者", category:"character",
    desc:"穿越不同时间线，寻找某个重要答案的角色。",
    tags:[ "时间", "旅行"]
  },
  {
    id:"322", text:"记忆修复师", category:"character",
    desc:"帮助他人修复破碎记忆，探索过去真相的角色。",
    tags:[ "记忆", "修复"]
  },
  {
    id:"323", text:"古城守护者", category:"character",
    desc:"守护古老城市秘密，等待命运中的继承者。",
    tags:[ "古城", "守护"]
  },
  {
    id:"324", text:"异能使用者", category:"character",
    desc:"拥有特殊能力，需要学习控制力量的角色。",
    tags:[ "异能", "能力"]
  },
  {
    id:"325", text:"亡灵引路人", category:"character",
    desc:"负责引导亡灵前往归处，了解生死边界的角色。",
    tags:[ "亡灵", "引导"]
  },
  {
    id:"326", text:"传说记录者", category:"character",
    desc:"记录世界传说与历史，将故事流传下去的角色。",
    tags:[ "记录", "传说"]
  },
  {
    id:"327", text:"废墟探索者", category:"character",
    desc:"探索失落文明遗迹，寻找被遗忘历史的角色。",
    tags:[ "遗迹", "探索"]
  },
  {
    id:"328", text:"魔法工匠", category:"character",
    desc:"制作魔法物品与特殊工具，拥有独特技艺的角色。",
    tags:[ "魔法制作", "工匠"]
  },
  {
    id:"329", text:"星际航行者", category:"character",
    desc:"穿梭星际之间，寻找未知世界的角色。",
    tags:[ "星际", "冒险"]
  },
  {
    id:"330", text:"情报商人", category:"character",
    desc:"掌握大量秘密信息，以交换情报为生的角色。",
    tags:[ "情报", "交易"]
  },
  {
    id:"331", text:"梦境旅人", category:"character",
    desc:"能够进入他人梦境，在梦中寻找答案的角色。",
    tags:[ "梦境", "探索"]
  },
  {
    id:"332", text:"守护灵", category:"character",
    desc:"陪伴某人存在的特殊灵体，承担保护职责。",
    tags:[ "灵体", "守护"]
  },
  {
    id:"333", text:"被诅咒者", category:"character",
    desc:"身负未知诅咒，在寻找解除方法的角色。",
    tags:[ "诅咒", "命运"]
  },
  {
    id:"334", text:"秘密组织成员", category:"character",
    desc:"隶属于神秘组织，执行特殊任务的角色。",
    tags:[ "组织", "秘密"]
  },
  {
    id:"335", text:"边缘研究者", category:"character",
    desc:"研究少有人涉及领域，追寻未知答案的角色。",
    tags:[ "研究", "未知"]
  },
  {
    id:"336", text:"命运选择者", category:"character",
    desc:"面对重要选择，需要决定未来方向的角色。",
    tags:[ "命运", "选择"]
  },
  {
    id:"337", text:"命运观测者", category:"character",
    desc:"能够观察命运轨迹，却无法轻易改变结果的角色。",
    tags:[ "命运", "观察"]
  },
  {
    id:"338", text:"孤塔守夜人", category:"character",
    desc:"独自在高塔中守护秘密，等待某个重要时刻到来。",
    tags:[ "孤独", "守护"]
  },
  {
    id:"339", text:"异界访客", category:"character",
    desc:"来自未知世界的访客，试图理解陌生环境。",
    tags:[ "异世界", "适应"]
  },
  {
    id:"340", text:"流亡贵族", category:"character",
    desc:"失去原本身份，在陌生地方重新生活的角色。",
    tags:[ "流亡", "贵族"]
  },
  {
    id:"341", text:"秘密医生", category:"character",
    desc:"隐藏真实目的，为特殊对象提供治疗的角色。",
    tags:[ "医疗", "秘密"]
  },
  {
    id:"342", text:"遗迹解读者", category:"character",
    desc:"能够解析古代文字与遗迹信息，寻找历史真相的角色。",
    tags:[ "遗迹", "解读"]
  },
  {
    id:"343", text:"机械生命体", category:"character",
    desc:"拥有自我意识的机械存在，探索自身意义。",
    tags:[ "机械", "生命"]
  },
  {
    id:"344", text:"失落文明后裔", category:"character",
    desc:"继承消失文明血脉，寻找族群过去的角色。",
    tags:[ "文明", "传承"]
  },
  {
    id:"345", text:"秘密信使", category:"character",
    desc:"负责传递重要信息，在危险之间穿梭的角色。",
    tags:[ "信使", "秘密任务"]
  },
  {
    id:"346", text:"旅途记录者", category:"character",
    desc:"记录沿途见闻，将经历整理成故事的角色。",
    tags:[ "旅行", "记录"]
  },
  
  // ================== conflict 冲突矛盾 ==================
  
  {
    id:"347", text:"身份错位", category:"conflict",
    desc:"因为某种原因，两人的身份发生错误交换，需要寻找解决方法。",
    tags:[ "身份交换", "误会"]
  },
  {
    id:"348", text:"记忆冲突", category:"conflict",
    desc:"不同的记忆版本产生矛盾，导致真相无法确认。",
    tags:[ "记忆", "真相"]
  },
  {
    id:"349", text:"立场对立", category:"conflict",
    desc:"双方站在不同阵营，为了各自目标产生冲突。",
    tags:[ "阵营", "对立"]
  },
  {
    id:"350", text:"秘密暴露", category:"conflict",
    desc:"隐藏的重要秘密被发现，引发关系变化。",
    tags:[ "秘密", "危机"]
  },
  {
    id:"351", text:"时间限制", category:"conflict",
    desc:"必须在规定时间内完成目标，否则将面临严重后果。",
    tags:[ "倒计时", "危机"]
  },
  {
    id:"352", text:"能力失控", category:"conflict",
    desc:"拥有的力量无法控制，造成意外事件。",
    tags:[ "失控", "能力"]
  },
  {
    id:"353", text:"被迫选择", category:"conflict",
    desc:"面对无法兼顾的选择，需要放弃其中一项。",
    tags:[ "选择", "牺牲"]
  },
  {
    id:"354", text:"信任危机", category:"conflict",
    desc:"因为误解或事件导致双方信任受到影响。",
    tags:[ "信任", "误会"]
  },
  {
    id:"355", text:"规则限制", category:"conflict",
    desc:"受到某种规则约束，无法自由行动。",
    tags:[ "规则", "限制"]
  },
  {
    id:"356", text:"过去追责", category:"conflict",
    desc:"过去发生的事件重新出现，需要面对曾经的问题。",
    tags:[ "过去", "追查"]
  },
  {
    id:"357", text:"资源争夺", category:"conflict",
    desc:"双方为了争夺有限资源产生竞争与冲突。",
    tags:[ "竞争", "资源"]
  },
  {
    id:"358", text:"秘密任务", category:"conflict",
    desc:"执行隐藏任务过程中，需要面对未知危险。",
    tags:[ "任务", "隐藏"]
  },
  {
    id:"359", text:"错误判断", category:"conflict",
    desc:"因为错误的信息或判断，导致事件走向失控。",
    tags:[ "误判", "危机"]
  },
  {
    id:"360", text:"无法逃避的约定", category:"conflict",
    desc:"过去做出的承诺成为现在必须面对的责任。",
    tags:[ "约定", "责任"]
  },
  {
    id:"361", text:"失控实验", category:"conflict",
    desc:"实验过程中发生异常，引发未知后果。",
    tags:[ "实验", "异常"]
  },
  {
    id:"362", text:"世界危机", category:"conflict",
    desc:"整个世界面临重大威胁，需要共同寻找解决方法。",
    tags:[ "灾难", "拯救"]
  },
  {
    id:"363", text:"追捕逃亡", category:"conflict",
    desc:"一方被追捕，需要寻找逃离和反击的方法。",
    tags:[ "追捕", "逃亡"]
  },
  {
    id:"364", text:"真相隐藏", category:"conflict",
    desc:"事件背后存在隐藏真相，需要逐步调查揭开。",
    tags:[ "谜团", "调查"]
  },
  {
    id:"365", text:"记忆篡改", category:"conflict",
    desc:"有人改变或制造虚假的记忆，影响现实判断。",
    tags:[ "记忆", "操控"]
  },
  {
    id:"366", text:"命运偏差", category:"conflict",
    desc:"原本确定的命运轨迹发生改变，引发连锁影响。",
    tags:[ "命运", "变化"]
  },
  {
    id:"367", text:"环境变化", category:"conflict",
    desc:"原本稳定的环境突然改变，迫使角色适应新的情况。",
    tags:[ "环境", "变化"]
  },
  {
    id:"368", text:"资源枯竭", category:"conflict",
    desc:"重要资源逐渐消失，导致各方产生矛盾。",
    tags:[ "资源", "危机"]
  },
  {
    id:"369", text:"信仰冲突", category:"conflict",
    desc:"不同信念之间产生无法轻易调和的矛盾。",
    tags:[ "信仰", "理念"]
  },
  {
    id:"370", text:"身份曝光", category:"conflict",
    desc:"隐藏身份突然公开，引发新的局势变化。",
    tags:[ "身份", "暴露"]
  },
  {
    id:"371", text:"失去能力", category:"conflict",
    desc:"原本拥有的能力突然消失，需要重新面对困境。",
    tags:[ "能力", "失落"]
  },
  {
    id:"372", text:"孤立无援", category:"conflict",
    desc:"角色被迫独自面对困难，无法获得外界帮助。",
    tags:[ "孤立", "困境"]
  },
  {
    id:"373", text:"目标冲突", category:"conflict",
    desc:"不同角色拥有互相矛盾的目标，需要做出选择。",
    tags:[ "目标", "矛盾"]
  },
  {
    id:"374", text:"错误交易", category:"conflict",
    desc:"一次错误的交易导致无法预料的后果。",
    tags:[ "交易", "意外"]
  },
  {
    id:"375", text:"遗失重要物品", category:"conflict",
    desc:"关键物品失踪，使事件陷入危机。",
    tags:[ "失物", "寻找"]
  },
  {
    id:"376", text:"未知威胁", category:"conflict",
    desc:"无法确认来源的危险逐渐逼近。",
    tags:[ "危险", "未知"]
  },
  
  // ================== scene 特殊场景 ==================
  
  {
    id:"377", text:"迷雾剧院AU", category:"scene",
    desc:"终年被白雾笼罩的老剧院，每晚都会上演不同的故事。",
    tags:[ "神秘空间", "戏剧"]
  },
  {
    id:"378", text:"银盐暗房AU", category:"scene",
    desc:"老式胶卷冲洗店，暗房里的照片总是比现实多出一个身影。",
    tags:[ "摄影", "悬疑"]
  },
  {
    id:"379", text:"孤岛灯塔AU", category:"scene",
    desc:"与世隔绝的灯塔上，两个人守着光也守着彼此。",
    tags:[ "孤岛", "守望"]
  },
  {
    id:"380", text:"深渊观测站AU", category:"scene",
    desc:"建在海底最深处的观测站，两个人记录着深渊中的异常信号。",
    tags:[ "深海", "探索"]
  },
  {
    id:"381", text:"黄昏书店AU", category:"scene",
    desc:"只在黄昏时分营业的书店，每本书里都夹着一片干枯的花瓣。",
    tags:[ "书店", "治愈"]
  },
  {
    id:"382", text:"午夜列车AU", category:"scene",
    desc:"只在午夜出现的列车，乘客无法预知下一站会通向哪里。",
    tags:[ "旅行幻想", "未知目的地"]
  },
  {
    id:"383", text:"旧城区侦探事务所AU", category:"scene",
    desc:"隐藏在老街深处的侦探事务所，接受各种离奇委托。",
    tags:[ "侦探", "都市谜案"]
  },
  {
    id:"384", text:"场景转换", category:"scene",
    desc:"角色被迫进入陌生环境，需要适应新的规则和生活方式。",
    tags:[ "环境变化", "适应"]
  },
  {
    id:"385", text:"废弃城市", category:"scene",
    desc:"曾经繁荣的城市如今无人居住，隐藏着过去的秘密。",
    tags:[ "废墟", "探索"]
  },
  {
    id:"386", text:"地下迷宫", category:"scene",
    desc:"隐藏在地下的复杂空间，等待探索者寻找出口。",
    tags:[ "迷宫", "冒险"]
  },
  {
    id:"387", text:"古老遗迹", category:"scene",
    desc:"保存着过去文明痕迹的遗迹，隐藏未知信息。",
    tags:[ "历史", "探索"]
  },
  {
    id:"388", text:"雨夜街道", category:"scene",
    desc:"下着雨的城市街道，适合发生偶然相遇或秘密事件。",
    tags:[ "城市", "雨夜"]
  },
  {
    id:"389", text:"无人车站", category:"scene",
    desc:"长期无人使用的车站，等待某个特殊乘客出现。",
    tags:[ "车站", "等待"]
  },
  {
    id:"390", text:"旧宅邸", category:"scene",
    desc:"保存着家族历史的老宅，其中隐藏许多未解之谜。",
    tags:[ "宅邸", "秘密"]
  },
  {
    id:"391", text:"雪山基地", category:"scene",
    desc:"位于雪山深处的基地，与外界隔绝。",
    tags:[ "极寒", "研究"]
  },
  {
    id:"392", text:"海底城市", category:"scene",
    desc:"建立在海洋深处的城市，拥有独特文明。",
    tags:[ "海洋", "幻想"]
  },
  {
    id:"393", text:"空中庭园", category:"scene",
    desc:"漂浮于天空中的庭园，只有特殊方法才能进入。",
    tags:[ "天空", "幻想"]
  },
  {
    id:"394", text:"镜像空间", category:"scene",
    desc:"与现实相似却存在细微差异的特殊空间。",
    tags:[ "镜像", "异空间"]
  },
  {
    id:"395", text:"梦境空间", category:"scene",
    desc:"由意识构成的特殊领域，现实规则在这里失效。",
    tags:[ "梦境", "幻想"]
  },
  {
    id:"396", text:"时间停滞区域", category:"scene",
    desc:"时间停止流动的区域，进入者无法正常离开。",
    tags:[ "时间", "异常"]
  },
  {
    id:"397", text:"秘密实验室", category:"scene",
    desc:"隐藏在城市或偏远地区的研究场所。",
    tags:[ "实验", "秘密"]
  },
  {
    id:"398", text:"魔法集市", category:"scene",
    desc:"售卖各种奇妙物品的特殊市场。",
    tags:[ "魔法", "交易"]
  },
  {
    id:"399", text:"星际港口", category:"scene",
    desc:"连接不同星球的交通枢纽，各种旅人聚集于此。",
    tags:[ "星际", "旅行"]
  },
  {
    id:"400", text:"边境小镇", category:"scene",
    desc:"位于两个区域交界处的小镇，隐藏许多故事。",
    tags:[ "边境", "小镇"]
  },
  {
    id:"401", text:"古代王城", category:"scene",
    desc:"曾经辉煌的王国中心，留下大量历史遗迹。",
    tags:[ "王城", "历史"]
  },
  {
    id:"402", text:"漂浮岛屿", category:"scene",
    desc:"悬浮在天空中的岛屿，拥有独特生态环境。",
    tags:[ "天空", "奇幻"]
  },
  {
    id:"403", text:"无人森林", category:"scene",
    desc:"人迹罕至的森林，隐藏未知生物和秘密。",
    tags:[ "森林", "未知"]
  },
  {
    id:"404", text:"荒漠遗迹", category:"scene",
    desc:"隐藏在沙漠中的古老遗迹，等待探索者发现过去秘密。",
    tags:[ "遗迹", "荒漠"]
  },
  {
    id:"405", text:"午夜酒馆", category:"scene",
    desc:"只在深夜营业的酒馆，聚集来自各地的特殊客人。",
    tags:[ "酒馆", "夜晚"]
  },
  {
    id:"406", text:"旧时代剧场", category:"scene",
    desc:"保存着过去时代风格的剧场，经常发生奇妙事件。",
    tags:[ "剧场", "旧时代"]
  },
  {
    id:"407", text:"机械工坊", category:"scene",
    desc:"制造各种机械装置的工坊，隐藏特殊技术。",
    tags:[ "机械", "制作"]
  },
  {
    id:"408", text:"云海之城", category:"scene",
    desc:"建立在云层之上的城市，与地面世界隔绝。",
    tags:[ "天空", "城市"]
  },
  {
    id:"409", text:"幽灵车站", category:"scene",
    desc:"传闻会出现不存在列车的神秘车站。",
    tags:[ "灵异", "车站"]
  },
  {
    id:"410", text:"魔法森林", category:"scene",
    desc:"充满魔法力量的森林，居住着各种奇妙生命。",
    tags:[ "魔法", "森林"]
  },
  {
    id:"411", text:"深海研究所", category:"scene",
    desc:"位于海底的研究设施，探索未知生命与现象。",
    tags:[ "深海", "研究"]
  },
  {
    id:"412", text:"未来都市街区", category:"scene",
    desc:"高度科技化城市中的生活区域。",
    tags:[ "未来", "都市"]
  },
  {
    id:"413", text:"遗忘之地", category:"scene",
    desc:"被世界遗忘的区域，隐藏着失落历史。",
    tags:[ "失落", "秘密"]
  },
  
  // ================== theme 主题氛围 ==================
  
  {
    id:"414", text:"身份互换AU", category:"theme",
    desc:"角色因为特殊原因交换身份，需要适应彼此的生活。",
    tags:[ "身份交换", "反差"]
  },
  {
    id:"415", text:"穿越改写AU", category:"theme",
    desc:"角色来到过去或故事之外，尝试改变原本的发展。",
    tags:[ "穿越", "改变命运"]
  },
  {
    id:"416", text:"双线叙事AU", category:"theme",
    desc:"两个时间线或视角同时展开，逐渐连接真相。",
    tags:[ "双线", "叙事"]
  },
  {
    id:"417", text:"群像冒险AU", category:"theme",
    desc:"多个角色共同行动，每个人都有自己的故事线。",
    tags:[ "群像", "冒险"]
  },
  {
    id:"418", text:"治愈日常AU", category:"theme",
    desc:"围绕平静生活展开，描写角色之间温暖互动。",
    tags:[ "日常", "治愈"]
  },
  {
    id:"419", text:"悬疑解谜AU", category:"theme",
    desc:"围绕谜题展开调查，通过线索寻找真相。",
    tags:[ "悬疑", "解谜"]
  },
  {
    id:"420", text:"命运纠缠AU", category:"theme",
    desc:"角色之间存在特殊联系，无法轻易摆脱彼此影响。",
    tags:[ "命运", "羁绊"]
  },
  {
    id:"421", text:"救赎成长AU", category:"theme",
    desc:"角色在相遇后逐渐改变，面对过去并成长。",
    tags:[ "救赎", "成长"]
  },
  {
    id:"422", text:"秘密揭露AU", category:"theme",
    desc:"隐藏多年的秘密逐渐曝光，引发故事变化。",
    tags:[ "秘密", "真相"]
  },
  {
    id:"423", text:"奇幻冒险AU", category:"theme",
    desc:"角色进入未知领域，经历探索与冒险。",
    tags:[ "幻想", "冒险"]
  },
  {
    id:"424", text:"匿名合租", category:"theme",
    desc:"合租室友从不露面，只靠纸条交流，一年后才发现对方是谁。",
    tags:[ "匿名", "合租"]
  },
  {
    id:"425", text:"共享梦境", category:"theme",
    desc:"两个人每晚做同一个梦，在梦里相识却在现实中互不相识。",
    tags:[ "梦境", "共享"]
  },
  {
    id:"426", text:"替身约会", category:"theme",
    desc:"替朋友去相亲的人，结果和相亲对象产生了真实的感情。",
    tags:[ "替身", "约会"]
  },
  {
    id:"427", text:"倒带告白", category:"theme",
    desc:"告白被拒绝后，对方给了你一次倒带重来的机会。",
    tags:[ "倒带", "告白"]
  },
  {
    id:"428", text:"隔空合奏", category:"theme",
    desc:"在不同的城市弹奏同一首曲子，通过电台听到了对方的琴声。",
    tags:[ "隔空", "合奏"]
  },
  {
    id:"429", text:"借书寻人", category:"theme",
    desc:"在旧书里发现了一封信，按信里的线索开始寻找收信人。",
    tags:[ "借书", "寻人"]
  },
  {
    id:"430", text:"回声寻人", category:"theme",
    desc:"听到山谷里有人喊自己的名字，循着回声寻找喊话的人。",
    tags:[ "回声", "寻人"]
  },
  {
    id:"431", text:"替身婚礼", category:"theme",
    desc:"替新郎/新娘参加婚礼彩排的人，在彩排中动了真情。",
    tags:[ "替身", "婚礼"]
  },
  {
    id:"432", text:"共享伤疤", category:"theme",
    desc:"两个人身上有一模一样的伤疤，追查后发现彼此有神秘的联系。",
    tags:[ "共享", "伤疤"]
  },
  {
    id:"433", text:"匿名投喂", category:"theme",
    desc:"连续收到匿名送来的食物，追查后发现是住在对面楼的人。",
    tags:[ "匿名", "投喂"]
  },
  {
    id:"434", text:"隔空拼图", category:"theme",
    desc:"两个人各有一半拼图，拼在一起后才能看到完整的画面。",
    tags:[ "隔空", "拼图"]
  },
  {
    id:"435", text:"借光夜行", category:"theme",
    desc:"在停电的夜晚用同一支蜡烛照亮回家路，烛灭后成了彼此的光。",
    tags:[ "借光", "夜行"]
  },
  {
    id:"436", text:"替身葬礼", category:"theme",
    desc:"替人参加陌生人的葬礼，在葬礼上遇到了改变一生的人。",
    tags:[ "替身", "葬礼"]
  },
  {
    id:"437", text:"回声告白", category:"theme",
    desc:"对着山谷喊出喜欢的人的名字，结果对方就在山谷的那一边。",
    tags:[ "回声", "告白"]
  },
  {
    id:"438", text:"共享日记", category:"theme",
    desc:"在废弃的房子里捡到一本日记，开始在上面写回信。",
    tags:[ "共享", "日记"]
  },
  {
    id:"439", text:"匿名守护", category:"theme",
    desc:"一直有人在暗中守护自己，查到最后发现是身边最普通的那个人。",
    tags:[ "匿名", "守护"]
  },
  {
    id:"440", text:"借曲传情", category:"theme",
    desc:"把想说的话写成歌，在深夜电台里播放，等对方听到。",
    tags:[ "借曲", "传情"]
  },
  {
    id:"441", text:"替身医生", category:"theme",
    desc:"替朋友去医院复查的人，在候诊室里遇到了真正的缘分。",
    tags:[ "替身", "医生"]
  },
  {
    id:"442", text:"倒带重逢", category:"theme",
    desc:"分手后获得了倒带一次的机会，回到最初决定重新来过。",
    tags:[ "倒带", "重逢"]
  },
  {
    id:"443", text:"隔空对弈", category:"theme",
    desc:"在网络棋局中反复对弈的人，现实中终于约好见面。",
    tags:[ "隔空", "对弈"]
  },
  {
    id:"444", text:"共享秘密", category:"theme",
    desc:"两个人都知道一个不该知道的秘密，从此被这个秘密绑在一起。",
    tags:[ "共享", "秘密"]
  },
  {
    id:"445", text:"匿名画像", category:"theme",
    desc:"收到一幅匿名寄来的画像，画里的人正是自己。",
    tags:[ "匿名", "画像"]
  },
  {
    id:"446", text:"借风传信", category:"theme",
    desc:"在风口写信并放飞，信件随风飘到了另一个人的手里。",
    tags:[ "借风", "传信"]
  },
  {
    id:"447", text:"替身同事", category:"theme",
    desc:"替朋友去公司代班一天，结果遇到了要在意一生的人。",
    tags:[ "替身", "同事"]
  },
  {
    id:"448", text:"回声约定", category:"theme",
    desc:"对着山谷许下的约定，多年后回声里传来了回应。",
    tags:[ "回声", "约定"]
  },
  {
    id:"449", text:"共享余温", category:"theme",
    desc:"两个人在寒冷的夜晚共用一条围巾，温暖过后围巾留给了对方。",
    tags:[ "共享", "余温"]
  },
  {
    id:"450", text:"匿名邻居", category:"theme",
    desc:"住在隔壁却从未见过面，靠墙上的小洞交换信件。",
    tags:[ "匿名", "邻居"]
  },
  {
    id:"451", text:"借光画影", category:"theme",
    desc:"用烛光投影画画的人，和住在对面楼里看到投影的人。",
    tags:[ "借光", "画影"]
  },
  {
    id:"452", text:"替身调酒师", category:"theme",
    desc:"替人调酒的人，调出了一杯改变两个人命运的鸡尾酒。",
    tags:[ "替身", "调酒"]
  },
  {
    id:"453", text:"隔空对话", category:"theme",
    desc:"通过对讲机意外连接到了另一个频率，和陌生人聊了很久。",
    tags:[ "隔空", "对话"]
  },
  {
    id:"454", text:"追妻火葬场", category:"theme",
    desc:"迟来的醒悟需要用行动补偿。",
    tags:[ "追妻", "补偿"]
  },
  {
    id:"455", text:"掉马现场", category:"theme",
    desc:"隐藏身份被揭穿，关系被迫摊牌。",
    tags:[ "掉马", "身份"]
  },
  {
    id:"456", text:"时间循环", category:"theme",
    desc:"困在同一天，必须找到解法，也看清心意。",
    tags:[ "时间", "循环"]
  },
  {
    id:"457", text:"失忆梗", category:"theme",
    desc:"记忆缺口让熟悉的人变陌生，爱意却留下痕迹。",
    tags:[ "失忆", "重逢"]
  },
  {
    id:"458", text:"先婚后爱", category:"theme",
    desc:"关系从制度开始，在生活细节里慢慢生根。",
    tags:[ "先婚", "后爱"]
  },
  {
    id:"459", text:"替身误会", category:"theme",
    desc:"以为自己只是替代品，却发现真相另有隐情。",
    tags:[ "替身", "误会"]
  },
  {
    id:"460", text:"黑化救赎", category:"theme",
    desc:"一个人坠向深处，另一个人选择伸手。",
    tags:[ "黑化", "救赎"]
  },
  {
    id:"461", text:"身份互换", category:"theme",
    desc:"交换身份后，才真正理解对方的处境。",
    tags:[ "身份", "互换"]
  },
  {
    id:"462", text:"公费恋爱", category:"theme",
    desc:"任务、节目或工作名义下的亲密逐渐假戏真做。",
    tags:[ "公费", "恋爱"]
  },
  {
    id:"463", text:"甜虐交织", category:"theme",
    desc:"糖里有刀，刀后有糖，情绪曲线更饱满。",
    tags:[ "甜虐", "交织"]
  },
  {
    id:"464", text:"重生改命", category:"theme",
    desc:"带着记忆重来一次，先救自己，再救关系。",
    tags:[ "重生", "改命"]
  },
  {
    id:"465", text:"穿书改剧情", category:"theme",
    desc:"知道原剧情的人试图打破既定命运。",
    tags:[ "穿书", "改剧情"]
  },
  {
    id:"466", text:"系统任务", category:"theme",
    desc:"任务奖励和真心选择之间不断拉扯。",
    tags:[ "系统", "任务"]
  },
  {
    id:"467", text:"白月光回归", category:"theme",
    desc:"旧人出现，让现有关系必须接受考验。",
    tags:[ "白月光", "回归"]
  },
  {
    id:"468", text:"误会解除", category:"theme",
    desc:"长期错位的信息终于对齐，感情迎来转折。",
    tags:[ "误会", "解除"]
  },
  {
    id:"469", text:"假死归来", category:"theme",
    desc:"以为永别的人重新出现，爱恨同时爆发。",
    tags:[ "假死", "归来"]
  },
  {
    id:"470", text:"互相试探", category:"theme",
    desc:"每一步靠近都像博弈，谁先承认谁先输。",
    tags:[ "试探", "博弈"]
  },
  {
    id:"471", text:"危机共生", category:"theme",
    desc:"危险把两个人绑在一起，信任成为唯一出路。",
    tags:[ "危机", "共生"]
  },
  {
    id:"472", text:"马甲叠加", category:"theme",
    desc:"多重身份不断揭开，每一层都改变关系。",
    tags:[ "马甲", "叠加"]
  },
  {
    id:"473", text:"双线叙事", category:"theme",
    desc:"过去与现在交替推进，真相逐渐合拢。",
    tags:[ "双线", "叙事"]
  },
  {
    id:"474", text:"意外同居", category:"theme",
    desc:"因为巧合住在一起，生活细节暴露真心。",
    tags:[ "意外", "同居"]
  },
  {
    id:"475", text:"委托任务", category:"theme",
    desc:"接受一个共同任务，关系在合作中变化。",
    tags:[ "委托", "任务"]
  },
  {
    id:"476", text:"相亲遇见", category:"theme",
    desc:"从尴尬到心动，最不期待的场合遇到最对的人。",
    tags:[ "相亲", "遇见"]
  },
  {
    id:"477", text:"逃离都市", category:"theme",
    desc:"离开城市，在乡村或旅途中重新认识彼此。",
    tags:[ "逃离", "都市"]
  },
  {
    id:"478", text:"继承遗产", category:"theme",
    desc:"遗产纠纷中，两人被迫合作，发现隐藏的亲情。",
    tags:[ "遗产", "合作"]
  },
  {
    id:"479", text:"古董店奇遇", category:"theme",
    desc:"一件老物件，揭开一段跨越时空的缘分。",
    tags:[ "古董", "奇遇"]
  },
  {
    id:"480", text:"剧本杀桌游", category:"theme",
    desc:"角色扮演中的互动，让真实感情逐渐浮出水面。",
    tags:[ "剧本杀", "角色扮演"]
  },
  {
    id:"481", text:"露营探险", category:"theme",
    desc:"荒野中的依赖，让关系在自然中纯粹。",
    tags:[ "露营", "探险"]
  },
  {
    id:"482", text:"美食探店", category:"theme",
    desc:"一起寻找美味，味蕾的默契成为感情的催化剂。",
    tags:[ "美食", "探店"]
  },
  {
    id:"483", text:"跨年烟花", category:"theme",
    desc:"特殊时刻的共处，成为关系转折的契机。",
    tags:[ "跨年", "烟花"]
  },
  {
    id:"484", text:"匿名信件", category:"theme",
    desc:"未署名的信，连接起两个陌生人的心事。",
    tags:[ "匿名", "信件"]
  },
  {
    id:"485", text:"神秘礼物", category:"theme",
    desc:"收到匿名礼物，展开一段寻找寄件人的旅程。",
    tags:[ "神秘", "礼物"]
  },
  {
    id:"486", text:"共同养宠", category:"theme",
    desc:"一起照顾小动物，责任感中培养出情感。",
    tags:[ "养宠", "日常"]
  },
  {
    id:"487", text:"开车旅行", category:"theme",
    desc:"漫长的公路，封闭空间里交换秘密。",
    tags:[ "开车", "旅行"]
  },
  {
    id:"488", text:"屋顶天台", category:"theme",
    desc:"城市上方的角落，成为两人专属的避风港。",
    tags:[ "屋顶", "天台"]
  },
  {
    id:"489", text:"雨夜共处", category:"theme",
    desc:"一场大雨，把两个人困在同一个屋檐下。",
    tags:[ "雨夜", "共处"]
  },
  {
    id:"490", text:"图书馆偶遇", category:"theme",
    desc:"安静的书架间，指尖同时碰到同一本书。",
    tags:[ "图书馆", "偶遇"]
  },
  {
    id:"491", text:"深夜电台", category:"theme",
    desc:"通过电波连接的心事，在现实中相遇。",
    tags:[ "深夜", "电台"]
  },
  {
    id:"492", text:"旧照片寻踪", category:"theme",
    desc:"一张老照片，引发一段追溯往事的冒险。",
    tags:[ "旧照片", "寻踪"]
  },
  {
    id:"493", text:"重逢之舞", category:"theme",
    desc:"多年后再次共舞，所有回忆都在旋转中复苏。",
    tags:[ "重逢", "共舞"]
  },
  {
    id:"494", text:"秘密基地", category:"theme",
    desc:"童年或少年时的秘密地点，成为再次相认的纽带。",
    tags:[ "秘密", "基地"]
  },
  {
    id:"495", text:"时光胶囊", category:"theme",
    desc:"埋下给未来的信物，多年后开启时改变一切。",
    tags:[ "时光", "胶囊"]
  },
  {
    id:"496", text:"跨时空对话", category:"theme",
    desc:"通过某种方式连接不同时间线，改变彼此命运。",
    tags:[ "时空", "对话"]
  },
  {
    id:"497", text:"七日失忆", category:"theme",
    desc:"每个星期一都会忘记过去七天的一切，只有一个人坚持重新认识对方。",
    tags:[ "失忆", "七日"]
  },
  {
    id:"498", text:"信物归还", category:"theme",
    desc:"带着一件旧信物去找它的主人，却发现主人已经不记得当年的事。",
    tags:[ "信物", "归还"]
  },
  {
    id:"499", text:"假死骗局", category:"theme",
    desc:"为了某个目的假装死亡，却在假死期间发现了对方真正的感情。",
    tags:[ "假死", "骗局"]
  },
  {
    id:"500", text:"替身赴约", category:"theme",
    desc:"替别人去赴一个重要的约，却发现自己才是对方一直在等的人。",
    tags:[ "替身", "赴约"]
  },
  {
    id:"501", text:"倒计时机密", category:"theme",
    desc:"两人共同守护一个倒计时，时间到了真相会揭晓。",
    tags:[ "倒计时", "机密"]
  },
  {
    id:"502", text:"匿名礼物", category:"theme",
    desc:"连续收到匿名礼物，追查送礼人时发现了意想不到的联系。",
    tags:[ "匿名", "礼物"]
  },
  {
    id:"503", text:"隔年回信", category:"theme",
    desc:"收到一封去年寄出的信，回信时才发现收信人已经改变了。",
    tags:[ "隔年", "回信"]
  },
  {
    id:"504", text:"错位身份", category:"theme",
    desc:"两个人被错认了身份，将错就错之后产生了真正的感情。",
    tags:[ "错位", "身份"]
  },
  {
    id:"505", text:"遗物清单", category:"theme",
    desc:"收到一份遗物清单，挨个寻找清单上的物品时拼凑出一个人的一生。",
    tags:[ "遗物", "清单"]
  },
  {
    id:"506", text:"守夜承诺", category:"theme",
    desc:"答应为某人在某个地方守夜，却不知道来赴约的人是谁。",
    tags:[ "守夜", "承诺"]
  },
  {
    id:"507", text:"替身画像", category:"theme",
    desc:"为陌生人画一幅肖像，画的过程中逐渐爱上了画中人的眼神。",
    tags:[ "替身", "画像"]
  },
  {
    id:"508", text:"隔墙喊话", category:"theme",
    desc:"被隔在墙的两边，用敲击声和喊话交流，却从没见过面。",
    tags:[ "隔墙", "喊话"]
  },
  {
    id:"509", text:"最后一个请求", category:"theme",
    desc:"在一切结束之前，向对方提出一个无法拒绝的请求。",
    tags:[ "最后", "请求"]
  },
  {
    id:"510", text:"掉落的日记", category:"theme",
    desc:"捡到一本日记，读完后决定找到日记的主人。",
    tags:[ "日记", "拾获"]
  },
  {
    id:"511", text:"碎片拼凑", category:"theme",
    desc:"只记得对方的一些碎片信息，拼凑出完整的人的过程也是心动的过程。",
    tags:[ "碎片", "拼凑"]
  },
  {
    id:"512", text:"倒数第二班车", category:"theme",
    desc:"总是坐倒数第二班车的人，在车上遇到总是在画站台的人。",
    tags:[ "班车", "遇见"]
  },
  {
    id:"513", text:"信差停职", category:"theme",
    desc:"专门送信的人被停职了，于是决定亲自去送那封最重要的信。",
    tags:[ "信差", "送信"]
  },
  {
    id:"514", text:"答案在风中", category:"theme",
    desc:"所有的疑问都指向风里藏着的一个秘密，两个人一起追风。",
    tags:[ "风", "追查"]
  },
  {
    id:"515", text:"借来的身份", category:"theme",
    desc:"借用了另一个人的身份生活，却在这个过程中找到了真正的自己。",
    tags:[ "借身份", "自我"]
  },
  {
    id:"516", text:"替人告白", category:"theme",
    desc:"替别人去向暗恋对象告白，结果对方却回应了自己的感情。",
    tags:[ "替身", "告白"]
  },
  {
    id:"517", text:"旧梦重现", category:"theme",
    desc:"反复做同一个梦，后来发现梦里的场景真实存在，而那个人也真实存在。",
    tags:[ "旧梦", "重现"]
  },
  {
    id:"518", text:"被遗忘约定", category:"theme",
    desc:"发现一张旧纸条上写着一个约定，却记不起是和谁约定的。",
    tags:[ "遗忘", "约定"]
  },
  {
    id:"519", text:"替身守护", category:"theme",
    desc:"被派去保护一个人，对方却以为自己只是偶遇的普通人。",
    tags:[ "替身", "守护"]
  },
  {
    id:"520", text:"错时相遇", category:"theme",
    desc:"总是在同一个地点以不同时间出现，从未同时现身却留下了许多痕迹。",
    tags:[ "错时", "相遇"]
  },
  {
    id:"521", text:"窃听秘密", category:"theme",
    desc:"无意中窃听到对方的秘密，从此被卷入一段不该知道的故事里。",
    tags:[ "窃听", "秘密"]
  },
  {
    id:"522", text:"替人还债", category:"theme",
    desc:"替陌生人还清债务，对方找到自己时已经产生了不可思议的缘分。",
    tags:[ "替身", "还债"]
  },
  {
    id:"523", text:"信里寻人", category:"theme",
    desc:"在一封信里夹着一张照片，从那天起决定找到照片里的人。",
    tags:[ "信", "寻人"]
  },
  {
    id:"524", text:"画中旧识", category:"theme",
    desc:"在一幅旧画里看到了一个熟悉的面孔，而那个人早已消失多年。",
    tags:[ "画", "旧识"]
  },
  {
    id:"525", text:"错发遗言", category:"theme",
    desc:"本应死后才发送的遗言错发了出去，一切计划都被打乱了。",
    tags:[ "遗言", "错发"]
  },
  {
    id:"526", text:"雨中赴约", category:"theme",
    desc:"在雨中接到了邀约，不知道对方是谁但还是去了。",
    tags:[ "雨中", "赴约"]
  }
  ];
  module.exports = entries;