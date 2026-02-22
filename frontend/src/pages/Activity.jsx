import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowRightOutlined } from '@ant-design/icons';
import { motion, useReducedMotion } from 'framer-motion';

const AnimatedMetric = ({ value, suffix = '', duration = 1400 }) => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    let rafId = 0;
    const startAt = performance.now();
    const frame = (time) => {
      const progress = Math.min((time - startAt) / duration, 1);
      setCurrent(Math.floor(value * progress));
      if (progress < 1) rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [visible, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {current.toLocaleString()}
      {suffix}
    </span>
  );
};

const Activity = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const activities = useMemo(
    () =>
      (database.activities || []).map(({ id, title, subtitle, summary, img, gallery }) => ({
        id,
        title,
        subtitle,
        summary,
        img,
        gallery
      })),
    []
  );
  const metrics = [
    { label: '章古台林场建场', value: 1958, suffix: '年' },
    { label: '森林覆盖率', value: 87, suffix: '%' },
    { label: '营商林参与人数', value: 1222, suffix: '人' }
  ];

  const handleCardClick = (item) => {
    if (item.id === 'study') {
      navigate('/activity/study');
    } else {
      navigate(`/activity/${item.id}`);
    }
  };

  return (
    <div className="pt-24 min-h-screen pb-20 relative overflow-hidden bg-[linear-gradient(165deg,#f8fafc_0%,#eefcf6_50%,#f0f9ff_100%)]">
      <style>{`
        @keyframes pulseBlob {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-14px,0) scale(1.08); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .activity-blob {
          position: absolute;
          border-radius: 9999px;
          opacity: .16;
          pointer-events: none;
          will-change: transform;
        }
        .activity-blob.b1 { background: radial-gradient(circle at center, rgba(125,211,252,0.45) 0%, rgba(125,211,252,0.08) 62%, transparent 100%); }
        .activity-blob.b2 { background: radial-gradient(circle at center, rgba(110,231,183,0.45) 0%, rgba(110,231,183,0.08) 62%, transparent 100%); }
        .activity-blob.b3 { background: radial-gradient(circle at center, rgba(253,186,116,0.45) 0%, rgba(253,186,116,0.08) 62%, transparent 100%); }
        .activity-blob.motion-on { animation: pulseBlob 10s ease-in-out infinite; }
        .activity-blob.b2.motion-on { animation-delay: -2.6s; }
        .activity-blob.b3.motion-on { animation-delay: -4.2s; }
        .activity-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.06;
          background-image:
            radial-gradient(rgba(15,23,42,0.8) 0.6px, transparent 0.6px),
            radial-gradient(rgba(15,23,42,0.55) 0.5px, transparent 0.5px);
          background-position: 0 0, 12px 14px;
          background-size: 22px 22px;
        }
        .metric-card {
          animation: floatCard 4.5s ease-in-out infinite;
        }
        .metric-card:nth-child(2) { animation-delay: -1.5s; }
        .metric-card:nth-child(3) { animation-delay: -2.8s; }
        .activity-card {
          content-visibility: auto;
          contain-intrinsic-size: 520px;
        }
      `}</style>
      <div className="activity-grain" />
      <div className={`activity-blob b1 w-64 h-64 top-16 left-[-40px] ${prefersReducedMotion ? '' : 'motion-on'}`} />
      <div className={`activity-blob b2 w-72 h-72 top-24 right-[-60px] ${prefersReducedMotion ? '' : 'motion-on'}`} />
      <div className={`activity-blob b3 w-72 h-72 bottom-8 left-[30%] ${prefersReducedMotion ? '' : 'motion-on'}`} />
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={prefersReducedMotion ? undefined : { once: true }}
          className="text-center mb-14 relative z-10"
        >
          <div className="inline-flex px-4 py-1.5 rounded-full bg-white/85 border border-slate-200 text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-5">
            Zhangwu Activities
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-4">彰武活动</h1>
          <p className="max-w-3xl mx-auto text-slate-600 leading-relaxed text-base md:text-lg">
            从实地研学到公益认养，从民族文化体验到影像记录。<br />
            用更年轻的方式，走进治沙一线，参与生态共创。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10 relative z-10">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true }}
              className={`${prefersReducedMotion ? '' : 'metric-card'} rounded-2xl bg-white/88 border border-white/80 shadow-[0_10px_26px_rgba(15,23,42,0.1)] p-5`}
            >
              <div className="text-slate-400 text-xs tracking-widest uppercase mb-2">{metric.label}</div>
              <div className="text-3xl md:text-4xl font-black text-slate-900">
                <AnimatedMetric value={metric.value} suffix={metric.suffix} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {activities.map((item) => (
                <motion.div
                  key={item.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  transition={prefersReducedMotion ? undefined : { duration: 0.3 }}
                  className="activity-card group bg-white/95 rounded-3xl shadow-[0_12px_30px_rgba(15,23,42,0.1)] hover:shadow-[0_20px_44px_rgba(15,23,42,0.14)] transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col h-auto md:h-[520px] border border-white/75"
                  onClick={() => handleCardClick(item)}
                >
                    <div className="h-60 md:h-72 overflow-hidden relative">
                       <img
                         src={item.img}
                         className={`w-full h-full object-cover ${prefersReducedMotion ? '' : 'transition-transform duration-500 group-hover:scale-105'}`}
                         alt={item.title}
                         loading="lazy"
                         decoding="async"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                       <div className="absolute top-4 left-4 bg-white/92 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {item.id === 'study' ? 'Interactive' : 'Event'}
                       </div>
                       <div className="absolute bottom-4 left-4 text-white">
                         <h2 className="text-2xl md:text-3xl font-serif font-bold">{item.title}</h2>
                       </div>
                    </div>

                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                       <div>
                         <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">{item.subtitle}</p>
                         <p className="text-gray-600 line-clamp-3 leading-relaxed">
                            {item.summary}
                         </p>
                         {item.gallery && item.gallery.length > 1 && (
                           <div className="mt-5 flex items-center -space-x-2">
                             {item.gallery.slice(1, 4).map((src, idx) => (
                               <img
                                 key={`${item.id}-thumb-${idx}`}
                                 src={src}
                                 alt={`${item.title}-${idx + 1}`}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                  loading="lazy"
                                  decoding="async"
                               />
                             ))}
                           </div>
                         )}
                       </div>
                       
                       <div className={`flex items-center gap-2 text-slate-900 font-bold mt-6 ${prefersReducedMotion ? '' : 'group-hover:translate-x-1.5 transition-transform'}`}>
                          {item.id === 'study' ? '进入地图' : '查看详情'} <ArrowRightOutlined />
                       </div>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Activity;
