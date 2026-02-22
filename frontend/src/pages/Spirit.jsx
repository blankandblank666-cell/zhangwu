import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, Carousel, ConfigProvider } from 'antd';
import { database } from '../data';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FlagOutlined, ExperimentOutlined, TeamOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';

// === 1. 极速版流沙组件 (CSS Animation + GPU Acceleration) ===
// 抛弃 Framer Motion，改用原生 CSS 动画，性能提升 10 倍
const SandStorm = () => {
  // 使用 useMemo 生成静态粒子数据，避免重复计算
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      size: Math.random() * 3 + 2, // 2-5px
      top: Math.random() * 100,
      duration: Math.random() * 8 + 12, // 12-20s
      delay: Math.random() * -18, // 负延迟，让动画一开始就是铺满的
      opacity: Math.random() * 0.35 + 0.2,
      color: Math.random() > 0.5 ? '#b45309' : '#a16207', // hex 颜色 (yellow-700 / orange-800)
    }));
  }, []);

  return (
    <div className="hidden md:block absolute inset-0 z-[2] pointer-events-none overflow-hidden h-full">
      {/* 注入全局 Keyframes 样式 */}
      <style>
        {`
          @keyframes sandFly {
            0% { transform: translate3d(10vw, 0, 0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate3d(-110vw, 20px, 0); opacity: 0; }
          }
          .sand-particle {
            position: absolute;
            border-radius: 50%;
            will-change: transform; /* 告诉浏览器提前优化 */
            animation-name: sandFly;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>
      
      {particles.map((p, i) => (
        <div
          key={i}
          className="sand-particle"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: '100%',
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// === 2. Hero 区域 (保持视觉，减少重绘) ===
const SpiritHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // 减少视差移动距离，减轻计算压力
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[76svh] md:h-[90vh] w-full flex items-center justify-center z-10 will-change-transform">
       <motion.div style={{ y: yText, opacity: opacityText }} className="text-center px-6 max-w-6xl">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-6 inline-flex items-center gap-3 border border-green-800/20 bg-white/70 backdrop-blur-md px-6 py-2 rounded-full shadow-sm"
          >
             <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
             <span className="text-green-900 uppercase text-xs font-bold tracking-[0.2em]">Since 1949</span>
          </motion.div>

          <h1 className="flex flex-col items-center justify-center font-serif drop-shadow-sm">
             <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-6xl md:text-8xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-green-900 to-green-700"
             >
                绿进沙退
             </motion.span>
             <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl md:text-7xl font-bold italic tracking-tighter text-yellow-700/80 mix-blend-multiply mt-2"
             >
                誓叫荒漠变林海
             </motion.span>
          </h1>

          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="mt-8 text-xl md:text-2xl text-green-950 font-medium max-w-2xl mx-auto leading-relaxed"
          >
             七十余载时光流转，三代人青春接力。<br/>
             看那郁郁葱葱的松林，是写在大地上的绿色史诗。
          </motion.p>

          <motion.div 
             className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 text-green-900/60 flex flex-col items-center gap-2"
             animate={{ y: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 2 }}
          >
             <span className="text-[10px] tracking-widest uppercase font-bold">Scroll Down</span>
             <DownOutlined />
          </motion.div>
       </motion.div>
    </div>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const desertImg = "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1200";
  const oasisImg = "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200";

  return (
    <div className="mt-6 md:mt-7">
      <div className="text-center mb-4 md:mb-5">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">历史印记 · 岁月见证</h3>
        <p className="text-slate-600 mt-1 text-sm md:text-base">
          左右拖动滑块，见证“死亡之海”到“生态绿洲”的蜕变
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl select-none">
        <img
          src={oasisImg}
          alt="治沙后"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute bottom-3 right-4 md:bottom-4 md:right-6 text-white font-bold text-base md:text-xl drop-shadow-md z-0">
          2025 林海
        </div>

        <img
          src={desertImg}
          alt="治沙前"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute bottom-3 left-4 md:bottom-4 md:left-6 text-white font-bold text-base md:text-xl drop-shadow-md z-10 transition-opacity duration-150"
          style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
        >
          1952 黄沙
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#475569" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L4.5 12l3.75-3m7.5 6l3.75-3-3.75-3" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
          aria-label="治沙前后对比滑块"
        />
      </div>
    </div>
  );
};

// === 3. 主页面组件 ===
const Spirit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const queryTab = searchParams.get('tab');
  const initialTab = queryTab === 'people' ? 'people' : 'history';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const nextTab = queryTab === 'people' ? 'people' : 'history';
    setActiveTab(nextTab);
  }, [queryTab]);

  const partyHeroes = database.heroes.filter(h => h.category === 'party');
  const scienceHeroes = database.heroes.filter(h => h.category === 'science');
  const publicHeroes = database.heroes.filter(h => h.category === 'public');

  const historySections = [
    {
      period: "起步奠基（1949-1955）",
      points: [
        {
          year: "1949年",
          items: [
            "春，彰武县丰田乡杏山村村民王殿臣在党组织支持下，带领村民成立彰武县第一个农民造林互助组，栽下新中国第一片防沙林（75亩），拉开彰武治沙序幕"
          ]
        },
        {
          year: "1950年",
          items: [
            "王殿臣互助组扩大规模，又栽植120亩，成活率超90%"
          ]
        },
        {
          year: "1951年",
          items: [
            "王殿臣被评为辽西省劳动模范，其造林经验在全省推广"
          ]
        },
        {
          year: "1952年",
          items: [
            "新中国第一个防风固沙科研机构——辽西省林业试验站（辽宁省固沙造林研究所前身）在风沙最严重的章古台镇成立，这是我国最早的防沙治沙科研团队",
            "同年，东北人民政府在彰武设立辽西省沙荒造林局，统筹推进治沙工作"
          ]
        },
        {
          year: "1953年",
          items: [
            "春，科研人员从内蒙古呼伦贝尔红花尔基引进樟子松种子进行育苗试验，因冬季干旱风沙大，仅2株被沙埋的树苗幸存，为后续成功提供重要启示",
            "科研团队开始筛选固沙植物，最终选出小黄柳、差巴嘎蒿、胡枝子、小叶锦鸡儿、紫穗槐等五种耐风蚀沙埋的优良固沙灌木"
          ]
        },
        {
          year: "1955年",
          items: [
            "秋，在章古台后坨子实验区成功建造我国第一片樟子松引种固沙林（7407亩），开创樟子松治沙造林先河，该技术后来成为\"三北\"防护林核心造林技术之一",
            "形成\"以灌木固沙为主，人工沙障为辅，前挡后拉、顺风推进、分批治理\"的治沙方法雏形，后被誉为中国三大治沙方法之一"
          ]
        }
      ]
    },
    {
      period: "科研攻关（1958-1978）",
      points: [
        {
          year: "1958年",
          items: [
            "中科院林业土壤研究所林业试验站在彰武设立，进一步强化科研支撑，推动治沙技术系统化研究"
          ]
        },
        {
          year: "1962年",
          items: [
            "樟子松种子育苗技术取得成功，解决了大规模造林的苗木供应难题，为樟子松在全国推广奠定基础"
          ]
        },
        {
          year: "1975年",
          items: [
            "科研人员开始樟子松良种苗木选育工作，建立樟子松种子园，为培育优良品种开辟新途径"
          ]
        },
        {
          year: "1978年",
          items: [
            "3月，樟子松沙荒造林技术获首届全国科学大会奖，标志着彰武治沙技术得到国家层面认可",
            "11月，\"三北\"防护林体系建设工程正式启动，彰武县被确立为全国三北防护林建设重点县，樟子松造林技术随之在\"三北\"地区广泛推广应用"
          ]
        }
      ]
    },
    {
      period: "规模治理（1980-2005）",
      points: [
        {
          year: "1980-1990年",
          items: [
            "全县累计出动干部群众120余万人次，手挖肩扛、马车运苗、往返数十里拉水浇苗，10年完成造林130余万亩",
            "营建国内最早的樟子松人工固沙林带，初步筑牢防风固沙屏障，遏制沙化蔓延趋势",
            "到1980年代末，沙地所在省内外推广人工固沙25万亩，营造人工樟子松林30万亩"
          ]
        },
        {
          year: "1990年代",
          items: [
            "实施\"三北\"防护林二期、三期工程，累计完成治沙造林126.5万亩，封山育林23.8万亩，飞播造林17.2万亩",
            "6座万亩流动沙丘被固定，12.5万亩农田防护林使166万亩农田得到有效保护，粮食产量稳步提升",
            "形成完善的\"带、网、片\"相结合的防护林体系，向科尔沁沙地腹地推进13公里，有效阻止沙地南侵"
          ]
        },
        {
          year: "2001年",
          items: [
            "在沿内蒙古边界营造宽3-5公里、长171公里的辽西北防护林带，构建起阻挡科尔沁沙地南侵的第一道绿色屏障"
          ]
        },
        {
          year: "2005年",
          items: [
            "实施退耕还林、退牧还草工程，累计退耕还林20余万亩，退牧还草15万亩，生态环境持续改善"
          ]
        }
      ]
    },
    {
      period: "提质增效（2010-2025）",
      points: [
        {
          year: "2010年代",
          items: [
            "推进\"三北\"防护林四期、五期工程，创新\"封飞造\"相结合的治理模式，累计治理沙化土地80余万亩",
            "开展樟子松基因资源保护与利用研究，建立樟子松国家林木种质资源库，为治沙提供优质种源保障",
            "2015年，章古台樟子松林被列为全国首批国家沙漠（石漠）公园，成为治沙成果展示窗口"
          ]
        },
        {
          year: "2020年",
          items: [
            "启动柳河综合治理项目（被誉为\"北方都江堰\"），通过修建堤防生态带、景观带和开发水田，形成50余平方公里湿地，让\"荒沙窝子\"变成\"鱼米之乡\"",
            "探索\"以树挡沙、以草固沙、以水含沙、以光锁沙\"的四维治沙新模式，实现生态修复与经济发展双赢"
          ]
        },
        {
          year: "2021年",
          items: [
            "彰武县被生态环境部命名为\"绿水青山就是金山银山\"实践创新基地，治沙模式成为全国典范",
            "人工干预治理沙化林草地103.6万亩，各类社会力量栽种\"工会林\"\"慈善林\"等103万株，建成辽宁第一片碳中和林"
          ]
        },
        {
          year: "2022年",
          items: [
            "柳河综合治理二期工程在大冷镇程沟村和木头营子村开工，治理河道长度约6.3公里，涉及总占地256公顷",
            "全县沙化土地面积降至不足200万亩，林地面积达212万亩，森林覆盖率提高到31.47%"
          ]
        },
        {
          year: "2023年",
          items: [
            "辽宁省印发《辽宁省科尔沁沙地歼灭战和荒漠化综合防治行动方案（2023-2030年）》，彰武成为主战场",
            "承办国家林草局主办的科尔沁、浑善达克沙地歼灭战片区会议，彰武治沙经验向全国推广",
            "柳河综合治理一期工程全面开工，主体工程于2024年10月末完工"
          ]
        },
        {
          year: "2024年",
          items: [
            "发布《彰武县林下经济产业五年发展规划（2025—2029）》，发展中草药种植、林下养殖等产业，实现\"绿富同兴\"",
            "柳河治理区域水稻最高亩产达1400斤，近千户村民户均增收1.8万元，昔日\"风沙窝\"成\"新粮仓\"",
            "12.5万亩\"以草固沙\"示范区植被覆盖度超80%，\"离海最近的草原\"生机勃勃"
          ]
        },
        {
          year: "2025年",
          items: [
            "实施\"一地、两园、百村\"中草药种植项目，发展10万亩中草药，重点打造万亩仿野生中草药种植基地、两个千亩中草药园和百村庭院中药红枸杞种植项目",
            "全县森林覆盖率提升至35.1%，平均风速由50年代每秒3.4米降至每秒1.9米，扬沙天气由1953年的43天降至每年5天"
          ]
        }
      ]
    }
  ];

  // 历史脉络卡片
  const HistorySection = () => (
    <div className="py-12 max-w-6xl mx-auto">
      <div className="relative">
        <div className="absolute left-[38px] md:left-[110px] top-0 bottom-0 w-px bg-gradient-to-b from-green-900/10 via-green-700/40 to-green-900/10"></div>

        {historySections.map((section, sIdx) => (
          <div key={section.period} className={sIdx === historySections.length - 1 ? "" : "mb-12"}>
              <div className="flex items-center mb-6">
              <div className="w-[78px] md:w-[220px] shrink-0"></div>
              <div className="ml-4 px-4 py-2 rounded-full bg-green-900/90 text-white text-xs md:text-sm tracking-[0.08em] font-bold shadow-md">
                {section.period}
              </div>
            </div>

            <div className="space-y-6">
              {section.points.map((point) => (
                <article
                  key={point.year}
                  className="group/point flex gap-4 md:gap-6"
                >
                  <div className="w-[78px] md:w-[220px] shrink-0 relative">
                    <span className="absolute right-[-5px] md:right-[-7px] top-3 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-green-700 rounded-full border-[3px] md:border-4 border-[#eef5ed] shadow-md z-10 transition-all duration-300 group-hover/point:bg-amber-500 group-hover/point:scale-125"></span>
                    <div className="pr-5 md:pr-8 text-right">
                      <p className="text-base md:text-3xl font-serif font-bold text-green-900 leading-tight transition-colors duration-300 group-hover/point:text-amber-700">{point.year}</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-white/90 border border-green-900/10 rounded-2xl p-5 md:p-7 shadow-sm transition-all duration-300 group-hover/point:border-amber-400/70 group-hover/point:shadow-lg">
                    <ul className="list-disc pl-5 md:pl-6 space-y-3 marker:text-green-700">
                      {point.items.map((line, lineIdx) => (
                        <li key={`${point.year}-${lineIdx}`} className="text-green-950/90 leading-relaxed text-[0.95rem] md:text-[1.08rem] text-justify">
                          {line}
                        </li>
                      ))}
                    </ul>
                    {point.year === '2005年' && <BeforeAfterSlider />}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HeroCard = ({ hero, colorClass, icon }) => (
    <div 
      onClick={() => navigate(`/spirit/people/${hero.id}`)}
      className="group cursor-pointer bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6 flex items-start gap-5 transform translate-z-0"
    >
       <div className="w-16 h-16 flex-shrink-0">
          <img src={hero.avatar} className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform" alt={hero.name}/>
       </div>
       <div className="flex-grow">
         <div className="flex justify-between items-start mb-2">
             <div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-green-700 transition-colors tracking-wide">{hero.name}</h3>
                <p className={`text-xs font-bold uppercase tracking-wider ${colorClass}`}>{hero.title}</p>
             </div>
             <div className="text-gray-400 text-xl group-hover:text-green-600 transition-colors">{icon}</div>
         </div>
         <p className="text-gray-500 text-sm italic line-clamp-2">“{hero.quote}”</p>
         <div className="mt-4 flex items-center gap-1 text-xs text-gray-400 group-hover:text-green-800 transition-colors justify-end font-bold">
            查看详情 <RightOutlined className="text-[10px]"/>
         </div>
       </div>
    </div>
  );

  const SectionContainer = ({ title, sub, icon, color, heroes }) => (
    <div className="mb-20">
       <div className="flex items-center gap-4 mb-8 border-b border-green-900/10 pb-4">
          <div className={`text-2xl ${color.replace('bg-', 'text-')}`}>{icon}</div>
          <div>
             <h2 className="text-2xl font-serif font-bold text-slate-900">{title}</h2>
             <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">{sub}</p>
          </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.length > 0 ? (
             heroes.map(hero => (
               <HeroCard key={hero.id} hero={hero} colorClass={color.replace('bg-', 'text-')} icon={icon} />
             ))
          ) : (
             <p className="text-gray-400">暂无数据...</p>
          )}
       </div>
    </div>
  );

  const PeopleSection = () => (
    <div className="pb-12">
      <div className="mb-20 rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white transform translate-z-0">
        <Carousel autoplay effect="fade">
          {[
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200", 
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200"
          ].map((src, i) => (
             <div key={i} className="relative h-[400px]">
                <img src={src} className="w-full h-full object-cover" alt={`slide-${i}`}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-serif font-bold mb-2">{i===0 ? "英雄群像" : "薪火相传"}</h2>
                    <p className="opacity-90">{i===0 ? "铭记每一位为这片绿洲奉献青春的人" : "从第一代治沙人到新时代护林员"}</p>
                </div>
             </div>
          ))}
        </Carousel>
      </div>
      <div className="max-w-6xl mx-auto">
        <SectionContainer title="党员先锋" sub="The Vanguard" icon={<FlagOutlined />} color="bg-red-600" heroes={partyHeroes}/>
        <SectionContainer title="科研脊梁" sub="Scientific Backbone" icon={<ExperimentOutlined />} color="bg-blue-600" heroes={scienceHeroes}/>
        <SectionContainer title="民众力量" sub="Power of People" icon={<TeamOutlined />} color="bg-orange-500" heroes={publicHeroes}/>
      </div>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#166534',
          fontFamily: 'serif',
        },
      }}
    >
      {/* 优化要点：
         1. 移除了 bg-fixed (导致重绘)。
         2. 改用 position: fixed 的 div 来放背景图，z-index: -1。
         3. 这种方式兼容性最好，且性能最高 (GPU层)。
      */}
      <div className="min-h-screen relative font-sans selection:bg-green-200 selection:text-green-900">
        
        {/* 固定背景层 (GPU Accelerated) */}
        <div className="fixed inset-0 z-[-1] will-change-transform transform translate-z-0">
            <img 
              src="/shenlin.jpg"
              className="w-full h-full object-cover opacity-100"
              alt="Lush Forest"
            />
            {/* 透光遮罩 */}
            <div className="absolute inset-0 bg-white/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-[#eef5ed]/90"></div>
        </div>

        {/* 优化的流沙层 */}
        {!shouldReduceMotion && <SandStorm />}

        {/* 滚动内容区 */}
        <div className="relative z-10 pb-20">
           <SpiritHero />

           <div className="max-w-7xl mx-auto px-6">
              <Tabs 
                activeKey={activeTab} 
                onChange={(key) => {
                  setActiveTab(key);
                  setSearchParams({ tab: key }, { replace: true });
                }}
                centered 
                size="large"
                className="custom-tabs"
                items={[
                  { key: 'history', label: '历史脉络', children: <HistorySection /> },
                  { key: 'people', label: '杰出代表', children: <PeopleSection /> },
                ]}
              />
           </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Spirit;
