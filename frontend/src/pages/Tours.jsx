import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { database } from '../data';
import { EnvironmentOutlined, ArrowRightOutlined } from '@ant-design/icons';

const Tours = () => {
  const [activeSpot, setActiveSpot] = useState(null);
  const navigate = useNavigate();
  const mapSpots = database.tours || [];

  const selectedSpot = useMemo(
    () => mapSpots.find((spot) => spot.id === activeSpot) || mapSpots[0],
    [activeSpot, mapSpots]
  );

  useEffect(() => {
    if (!activeSpot && mapSpots.length > 0) setActiveSpot(mapSpots[0].id);
  }, [activeSpot, mapSpots]);

  return (
    <div className="pt-24 min-h-screen bg-[linear-gradient(160deg,#f8fafc_0%,#f0fdf9_45%,#fffaf0_100%)] pb-20 relative overflow-hidden">
      <style>{`
        .tour-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.05;
          background-image:
            radial-gradient(rgba(15,23,42,.82) .6px, transparent .6px),
            radial-gradient(rgba(15,23,42,.5) .5px, transparent .5px);
          background-position: 0 0, 13px 9px;
          background-size: 22px 22px;
        }
      `}</style>
      <div className="tour-grain" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex px-4 py-1.5 rounded-full bg-white/85 border border-slate-200 text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-5">
            Study Route
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">全域旅游 · 研学导览</h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            以“林场-草原-湿地-观景台-文化景区”五节点构建沉浸式研学动线。<br />
            点击地图点位，进入该点位详情页面。
          </p>
        </motion.div>

        <div className="relative w-full max-w-5xl mx-auto bg-white/92 rounded-3xl shadow-[0_22px_56px_rgba(15,23,42,0.14)] overflow-hidden border border-white/70">
          <div className="relative aspect-[4/3] md:aspect-[16/9] bg-[linear-gradient(160deg,#eef5f9_0%,#effcf6_100%)]">
            <img
              src="/zhangwu-map.png"
              className="w-full h-full object-contain mix-blend-multiply opacity-90 p-4 md:p-10"
              alt="Map"
            />

            {mapSpots.map((spot) => (
              <button
                key={spot.id}
                type="button"
                className="absolute w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onMouseEnter={() => setActiveSpot(spot.id)}
                onClick={() => navigate(`/activity/study/${spot.id}`)}
              >
                <span className={`absolute inline-flex h-full w-full rounded-full ${activeSpot === spot.id ? 'bg-emerald-500' : 'bg-red-500'} opacity-75 animate-ping`} />
                <span className={`relative inline-flex rounded-full h-full w-full border-2 border-white shadow-lg items-center justify-center text-white transition-transform group-hover:scale-125 ${activeSpot === spot.id ? 'bg-emerald-600' : 'bg-red-600'}`}>
                  <EnvironmentOutlined className="text-[10px] md:text-xs" />
                </span>

                <span className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm border pointer-events-none ${activeSpot === spot.id ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white/90 border-gray-100 text-slate-800'}`}>
                  {spot.name}
                </span>
              </button>
            ))}

            <AnimatePresence>
              {selectedSpot && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:w-96 md:right-auto bg-white rounded-2xl shadow-[0_18px_44px_rgba(15,23,42,0.25)] p-4 z-50 border border-gray-100 hover:border-emerald-400 transition-colors text-left"
                  onClick={() => navigate(`/activity/study/${selectedSpot.id}`)}
                >
                  <div className="flex gap-4 items-center">
                    <img src={selectedSpot.img} className="w-16 h-16 rounded-lg object-cover bg-gray-100" alt={selectedSpot.name} />
                    <div>
                      <h3 className="font-bold text-slate-900">{selectedSpot.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-2">{selectedSpot.desc}</p>
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        点击查看详情 <ArrowRightOutlined />
                      </span>
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">提示：地图点击与右侧卡片都可进入对应点位详情。</p>
        </div>
      </div>
    </div>
  );
};

export default Tours;
