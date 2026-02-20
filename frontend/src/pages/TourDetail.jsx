import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const spot = database.tours ? database.tours.find((t) => t.id === id) : null;
  const gallery = useMemo(() => {
    if (!spot) return [];
    if (spot.gallery && spot.gallery.length > 0) return spot.gallery;
    return spot.img ? [spot.img] : [];
  }, [spot]);

  if (!spot) return <div className="pt-32 text-center">景点未找到</div>;

  return (
    <div className="bg-[linear-gradient(155deg,#f8fafc_0%,#eefcf6_55%,#f0f9ff_100%)] min-h-screen pb-20 relative overflow-hidden">
      <style>{`
        .tour-detail-grain {
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
      <div className="tour-detail-grain" />

      <div className="relative h-[50vh] md:h-[56vh] w-full overflow-hidden">
        <img src={spot.img} className="w-full h-full object-cover scale-[1.04]" alt={spot.name} />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white w-full max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-white/20 px-4 py-2 rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm"
          >
            <ArrowLeftOutlined /> 返回地图
          </button>
          <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider mb-2 inline-block">
            {spot.type}
          </span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-2"
          >
            {spot.name}
          </motion.h1>
          <p className="text-white/85 text-lg max-w-2xl">
            <EnvironmentOutlined className="mr-2" />辽宁 · 彰武
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 -mt-14 relative z-10">
        <div className="bg-white/92 border border-white/70 rounded-3xl shadow-[0_22px_56px_rgba(15,23,42,0.14)] p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div>
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-4">景点介绍</h2>
                <p className="text-gray-600 leading-loose text-lg text-justify">{spot.intro}</p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-emerald-500 pl-4">核心看点</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {spot.features &&
                    spot.features.map((feature, idx) => (
                      <motion.div
                        key={`${spot.id}-feature-${idx}`}
                        whileHover={{ y: -3 }}
                        className="bg-emerald-50/80 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-800 font-bold"
                      >
                        <CheckCircleOutlined /> {feature}
                      </motion.div>
                    ))}
                </div>
              </div>

              <div className="bg-slate-50/85 border border-slate-100 p-6 md:p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <ClockCircleOutlined /> 研学推荐行程
                </h2>
                <div className="space-y-8 relative border-l-2 border-gray-200 ml-3 pl-8">
                  {spot.itinerary &&
                    spot.itinerary.map((item, idx) => (
                      <div key={`${spot.id}-itinerary-${idx}`} className="relative">
                        <span className="absolute -left-[41px] top-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                        <span className="text-emerald-700 font-bold block mb-1">{item.time}</span>
                        <p className="text-gray-600">{item.activity}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {gallery.length > 0 && (
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.12)]">
                  <img
                    src={gallery[activeImage]}
                    alt={`${spot.name}-main`}
                    className="w-full h-56 md:h-72 object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={`${spot.id}-gallery-${idx}`}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`overflow-hidden rounded-xl border transition-all ${
                        activeImage === idx
                          ? 'border-emerald-500 shadow-[0_8px_20px_rgba(16,185,129,0.25)]'
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <img src={img} alt={`${spot.name}-${idx + 1}`} className="w-full h-20 object-cover" loading="lazy" />
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

export default TourDetail;
