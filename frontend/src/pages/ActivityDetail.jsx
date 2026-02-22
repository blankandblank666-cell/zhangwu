import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const creativeData = {
  tree: {
    metrics: [
      { label: '累计参与', value: '1222人' },
      { label: '栽植树苗', value: '3000余棵' },
      { label: '碳中和能力', value: '6000吨+' }
    ],
    steps: ['选择树种', '确认认养信息', '领取电子证书', '持续成长回访'],
    species: [
      {
        name: '樟子松',
        desc: '1955年成功营造新中国第一片樟子松引种固沙林，现已成为“三北”地区防风固沙主力树种。'
      },
      {
        name: '彰武松',
        desc: '1990年代发现的新树种（赤松与油松天然杂交种），具备速生、抗旱、抗寒、耐盐碱等特性。'
      },
      {
        name: '元宝枫',
        desc: '2024年“辽宁营商林”主要栽种树种，兼具生态与经济价值。'
      }
    ]
  },
  show: {
    tags: ['蒙古勒津马头琴音乐（国家级非遗）', '阜新东蒙短调民歌（国家级非遗）', '安代舞', '顶碗舞'],
    booking: [
      '适合20人以上研学团或旅游团',
      '建议至少提前3天预约',
      '可按团队需求定制节目编排',
      '可衔接篝火晚会互动环节'
    ],
    scenes: ['德力格尔风景区蒙古大营', '马头琴与安代舞文化体验', '后新秋镇主题文化活动联动']
  },
  video: {
    themes: [
      {
        key: 'spirit',
        title: '治沙精神',
        desc: '聚焦彰武70年科学治沙历程，展示“矢志不移、永不退缩、默默无闻、甘于奉献”的精神内核。',
        points: ['沙化土地面积占比由20世纪50年代初的96%降至36.56%', '扬沙天气由1953年的43天下降到近十年平均每年5天']
      },
      {
        key: 'eco',
        title: '生态美景',
        desc: '拍摄德力格尔草原、欧李山观景台、柳河湿地、巨龙湖等景观，突出生态治理后的视觉变化。',
        points: ['德力格尔风景区2022年游客接待量30万人次', '今年上半年彰武全域接待旅游人数70万人次']
      },
      {
        key: 'village',
        title: '乡村振兴',
        desc: '记录“以水含沙”工程与产业联动成效。',
        points: ['柳河沿岸1225户3907口人受益', '农民人均增收1000元以上']
      }
    ],
    awards: ['一等奖（1名）：10000元 + 证书', '二等奖（3名）：5000元 + 证书', '三等奖（10名）：彰武特产大礼包']
  }
};

const CreativeSection = ({ itemId, activeTheme, setActiveTheme }) => {
  if (itemId === 'tree') {
    const config = creativeData.tree;
    return (
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {config.metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-emerald-100 bg-[linear-gradient(145deg,#ecfdf5_0%,#f8fafc_100%)] p-4">
              <p className="text-xs text-emerald-700/80 tracking-widest uppercase">{metric.label}</p>
              <p className="text-2xl font-black text-emerald-800 mt-1">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-4">认养流程</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {config.steps.map((step, idx) => (
              <div key={step} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center mb-2">{idx + 1}</div>
                <p className="text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {config.species.map((species) => (
            <motion.div
              key={species.name}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
            >
              <p className="font-bold text-slate-900 mb-2">{species.name}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{species.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (itemId === 'show') {
    const config = creativeData.show;
    return (
      <div className="space-y-6 mb-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-4">非遗资源标签墙</h3>
          <div className="flex flex-wrap gap-2">
            {config.tags.map((tag) => (
              <button
                type="button"
                key={tag}
                className="px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-sm hover:bg-orange-100 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900 mb-4">预约节奏</h3>
            <div className="space-y-3">
              {config.booking.map((line, idx) => (
                <div key={line} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                  <p className="text-sm text-slate-600 leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900 mb-4">推荐场景组合</h3>
            <div className="space-y-2">
              {config.scenes.map((scene) => (
                <div key={scene} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-sm text-slate-700">
                  {scene}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (itemId === 'video') {
    const config = creativeData.video;
    const active = config.themes.find((theme) => theme.key === activeTheme) || config.themes[0];

    return (
      <div className="space-y-6 mb-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-4">创作主题切换</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {config.themes.map((theme) => (
              <button
                key={theme.key}
                type="button"
                onClick={() => setActiveTheme(theme.key)}
                className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
                  activeTheme === theme.key
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                }`}
              >
                {theme.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="font-bold text-slate-900 mb-2">{active.title}</p>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">{active.desc}</p>
              <div className="space-y-1">
                {active.points.map((point) => (
                  <p key={point} className="text-xs text-slate-600">• {point}</p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-4">奖项设置</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {config.awards.map((award, idx) => (
              <div key={award} className="rounded-xl border border-slate-200 bg-[linear-gradient(140deg,#f8fafc_0%,#eff6ff_100%)] p-4">
                <p className="text-xs tracking-widest text-sky-700 uppercase mb-2">No.{idx + 1}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTheme, setActiveTheme] = useState('spirit');

  const item = database.activities ? database.activities.find((i) => i.id === id) : null;
  const gallery = useMemo(() => {
    if (!item) return [];
    if (item.gallery && item.gallery.length > 0) return item.gallery;
    return item.img ? [item.img] : [];
  }, [item]);

  const cleanedContent = useMemo(() => {
    if (!item?.content) return '';
    return item.content
      .replace(/<h3>来源<\/h3>[\s\S]*$/i, '')
      .replace(/https?:\/\/[^\s<]+/g, '')
      .trim();
  }, [item]);

  if (!item) return <div className="pt-32 text-center">活动未找到</div>;

  return (
    <div className="bg-[linear-gradient(160deg,#f8fafc_0%,#f1f5f9_55%,#eefbf4_100%)] min-h-screen pb-20 relative overflow-hidden">
      <style>{`
        .activity-detail-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.05;
          background-image:
            radial-gradient(rgba(15,23,42,0.82) .6px, transparent .6px),
            radial-gradient(rgba(15,23,42,0.5) .5px, transparent .5px);
          background-position: 0 0, 13px 9px;
          background-size: 22px 22px;
        }
      `}</style>
      <div className="activity-detail-grain" />

      <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden">
        <img src={item.img} className="w-full h-full object-cover scale-[1.02]" alt={item.title} decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.5 }}
            className="text-3xl md:text-6xl font-serif font-bold mb-4"
          >
            {item.title}
          </motion.h1>
          <p className="text-lg opacity-90 font-light tracking-widest uppercase">{item.subtitle}</p>
        </div>
        <button
          onClick={() => navigate('/activity')}
          className="absolute top-24 left-6 md:left-12 text-white/80 hover:text-white flex items-center gap-2 transition-colors z-10 bg-black/35 px-4 py-2 rounded-full"
        >
          <ArrowLeftOutlined /> 返回活动总览
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white/94 rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.14)] p-6 md:p-10 min-h-[400px] border border-white/70">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs tracking-[0.16em] uppercase">
              Activity Brief
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <CalendarOutlined /> 立即报名 / 预约
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div>
              <CreativeSection itemId={item.id} activeTheme={activeTheme} setActiveTheme={setActiveTheme} />

              {cleanedContent && (
                <details className="group rounded-2xl border border-slate-200 bg-white px-5 py-4">
                  <summary className="cursor-pointer text-slate-900 font-bold">查看完整文案</summary>
                  <div className="prose prose-lg max-w-none text-gray-600 leading-loose prose-headings:text-slate-900 prose-headings:font-bold break-words mt-4">
                    <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
                  </div>
                </details>
              )}
            </div>

            {gallery.length > 0 && (
              <motion.aside
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={prefersReducedMotion ? undefined : { once: true }}
                className="space-y-3"
              >
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                  <img
                    src={gallery[activeIndex]}
                    alt={`${item.title}-cover`}
                    className="w-full h-56 md:h-72 object-cover"
                    decoding="async"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((src, idx) => (
                    <button
                      key={`${item.id}-gallery-${idx}`}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`overflow-hidden rounded-xl border transition-all ${
                        idx === activeIndex
                          ? 'border-emerald-500 shadow-[0_8px_20px_rgba(16,185,129,0.25)]'
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${item.title}-${idx + 1}`}
                        className="w-full h-20 object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              </motion.aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
