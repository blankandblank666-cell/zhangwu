import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowRightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

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
  const activities = database.activities || [];
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
          filter: blur(36px);
          opacity: .24;
          pointer-events: none;
          animation: pulseBlob 8s ease-in-out infinite;
        }
        .activity-blob.b2 { animation-delay: -2.6s; }
        .activity-blob.b3 { animation-delay: -4.2s; }
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
      `}</style>
      <div className="activity-grain" />
      <div className="activity-blob b1 w-64 h-64 bg-sky-300 top-16 left-[-40px]" />
      <div className="activity-blob b2 w-72 h-72 bg-emerald-300 top-24 right-[-60px]" />
      <div className="activity-blob b3 w-72 h-72 bg-orange-300 bottom-8 left-[30%]" />
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="metric-card rounded-2xl bg-white/88 border border-white/80 shadow-[0_10px_26px_rgba(15,23,42,0.1)] p-5"
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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="group bg-white/92 backdrop-blur-[2px] rounded-3xl shadow-[0_12px_36px_rgba(15,23,42,0.12)] hover:shadow-[0_24px_54px_rgba(15,23,42,0.16)] transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-auto md:h-[520px] border border-white/70"
                  onClick={() => handleCardClick(item)}
                >
                    <div className="h-60 md:h-72 overflow-hidden relative">
                       <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
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
                               />
                             ))}
                           </div>
                         )}
                       </div>
                       
                       <div className="flex items-center gap-2 text-slate-900 font-bold group-hover:translate-x-2 transition-transform mt-6">
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
