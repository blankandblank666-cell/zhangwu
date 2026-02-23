import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShopOutlined,
  RocketOutlined,
  CarOutlined,
  ArrowDownOutlined,
  CheckCircleFilled,
  HeartFilled,
  FireFilled
} from '@ant-design/icons';

const FloatingHearts = () => {
  const hearts = [1, 2, 3, 4, 5];
  return (
    <div className="absolute bottom-20 right-4 w-20 h-60 pointer-events-none overflow-hidden z-20">
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(100%) scale(0.5); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(-150%) scale(1); opacity: 0; }
          }
          .heart-particle {
            position: absolute;
            bottom: 0;
            left: 50%;
            font-size: 24px;
            animation: floatUp 4s infinite ease-in-out;
            will-change: transform, opacity;
          }
        `}
      </style>
      {hearts.map((_, i) => (
        <div
          key={i}
          className="heart-particle"
          style={{
            color: i % 2 === 0 ? '#ff4d4f' : '#ff7a45',
            animationDelay: i * 0.8 + 's',
            marginLeft: (i % 2 === 0 ? -1 : 1) * 10 + 'px'
          }}
        >
          <HeartFilled />
        </div>
      ))}
    </div>
  );
};

const pick = (arr, idx, fallback = '') => (Array.isArray(arr) && arr[idx] ? arr[idx] : fallback);

const ServiceEconomy = ({ data }) => {
  const navigate = useNavigate();
  const ecommerceRef = useRef(null);
  const logisticsRef = useRef(null);
  const tourismRef = useRef(null);
  const tourismSpotRefs = useRef({});

  const hero = data?.hero || {};
  const stats = data?.stats || [];
  const ecommerce = data?.ecommerce || {};
  const logistics = data?.logistics || {};
  const tourism = data?.tourism || {};

  const ecommerceModes = ecommerce?.modes || [];
  const logisticsHighlights = logistics?.highlights || [];
  const tourismSpots = tourism?.spots || [];

  const tourismCards = useMemo(() => {
    return [
      pick(tourismSpots, 0, {}),
      pick(tourismSpots, 2, {}),
      pick(tourismSpots, 3, {})
    ];
  }, [tourismSpots]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTourismSpot = (spotName) => {
    if (!spotName) return;
    tourismSpotRefs.current[spotName]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const gotoTourismDetail = (spot) => {
    if (spot?.studyId) {
      navigate(`/activity/study/${spot.studyId}`);
      return;
    }
    navigate('/activity/study');
  };

  const navItems = [
    {
      ref: ecommerceRef,
      icon: <ShopOutlined />,
      title: '电商助农',
      color: 'from-orange-400 to-red-500',
      sub: 'Live Streaming'
    },
    {
      ref: logisticsRef,
      icon: <RocketOutlined />,
      title: '智慧物流',
      color: 'from-blue-400 to-cyan-500',
      sub: 'Smart Logistics'
    },
    {
      ref: tourismRef,
      icon: <CarOutlined />,
      title: '文旅融合',
      color: 'from-emerald-400 to-green-600',
      sub: 'Cultural Tourism'
    }
  ];

  const ecommerceMainImage =
    pick(ecommerce?.images, 3) || pick(hero?.images, 0) || '/image/tertiary-33.jpeg';
  const logisticsMainImage =
    pick(logistics?.images, 5) || pick(hero?.images, 1) || '/image/tertiary-42.jpeg';

  return (
    <div className="w-full bg-slate-50 overflow-hidden">
      <div
        className="min-h-[95vh] flex flex-col items-center justify-center px-6 relative"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #fff 0%, #f1f5f9 100%)'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-200/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[100px]" />
        </div>

        <div className="text-center mb-12 max-w-5xl relative z-10">
          <div className="inline-block px-4 py-1 rounded-full border border-slate-200 bg-white/60 backdrop-blur-sm text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Tertiary Industry Upgrade
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif font-black text-slate-900 mb-6 leading-tight"
          >
            电商物流文旅
            <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-blue-600">
              协同发展
            </span>
          </motion.h1>

          <p className="text-lg md:text-2xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            {hero.claim || data?.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-4xl mb-10 relative z-10">
          {stats.slice(0, 3).map((item) => (
            <div key={item.label} className="bg-white/85 border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-xs text-slate-500 tracking-wide">{item.label}</div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {item.value}
                {item.unit}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl relative z-10">
          {navItems.map((item, i) => (
            <div
              key={i}
              onClick={() => scrollToSection(item.ref)}
              className="group cursor-pointer relative bg-white rounded-[2rem] p-1 shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-full bg-white rounded-[1.8rem] p-8 flex flex-col items-center text-center border border-slate-50 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.color}`} />

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
                  {item.sub}
                </p>

                <div className="mt-6 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-transparent transition-colors duration-300">
                  <ArrowDownOutlined className="-rotate-90 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={ecommerceRef} className="py-24 relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 -skew-x-12 translate-x-1/4 z-0" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase mb-6">
              <FireFilled /> Hottest Trend
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">电商助农</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-3">{ecommerce.title}</p>
            <p className="text-base text-slate-600 leading-relaxed mb-8">{ecommerce.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {ecommerceModes.slice(0, 4).map((mode) => (
                <div key={mode.title} className="p-3 rounded-xl bg-white border border-orange-100 shadow-sm">
                  <div className="text-sm font-bold text-orange-600">{mode.title}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              {stats.slice(0, 2).map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-white border border-orange-100 shadow-sm min-w-[160px]">
                  <div className="text-2xl font-black text-orange-500">
                    {item.value}
                    {item.unit}
                  </div>
                  <div className="text-xs text-slate-500 font-bold">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative flex justify-center">
            <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden z-10 transform hover:scale-105 transition-transform duration-500">
              <img src={ecommerceMainImage} className="w-full h-full object-cover opacity-90" alt="电商直播" />
              <FloatingHearts />

              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/85 flex flex-col justify-between p-5 pointer-events-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-orange-500 bg-gray-500 overflow-hidden">
                    <img src={pick(ecommerce?.images, 0) || '/image/tertiary-30.jpeg'} className="w-full h-full object-cover" alt="主播" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">彰武电商</div>
                    <div className="flex items-center gap-1 text-[10px] text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> 直播中
                    </div>
                  </div>
                  <button className="ml-auto bg-orange-500 text-white text-[10px] px-3 py-1 rounded-full font-bold">关注</button>
                </div>

                <div className="space-y-2">
                  <div className="bg-black/30 backdrop-blur-md rounded-lg p-2 text-white text-xs inline-block">
                    <span className="text-orange-300 font-bold">模式:</span>{' '}
                    {pick(ecommerceModes, 0, {}).title || '直播带货+社群分销'}
                  </div>
                  <div className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-full text-center shadow-lg mt-2 text-sm">
                    电商与物流联动履约
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={logisticsRef} className="py-24 bg-[#0f172a] relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <style>
            {`
              @keyframes dash {
                to { stroke-dashoffset: -1000; }
              }
              .path-animation {
                stroke-dasharray: 20 20;
                animation: dash 20s linear infinite;
                will-change: stroke-dashoffset;
              }
            `}
          </style>
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
            <path d="M-100,600 C300,300 800,500 1540,200" stroke="#3b82f6" strokeWidth="2" className="path-animation" />
            <path
              d="M-100,200 C400,600 900,300 1540,600"
              stroke="#0ea5e9"
              strokeWidth="2"
              className="path-animation"
              style={{ animationDuration: '25s' }}
            />
          </svg>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#334155_1px,transparent_1px),linear-gradient(90deg,#334155_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-20" />
              <img src={logisticsMainImage} className="relative rounded-2xl border border-white/10 shadow-2xl z-10" alt="智慧物流" />

              <div className="absolute -right-4 -bottom-4 bg-slate-800/90 backdrop-blur border border-blue-500/30 p-4 rounded-xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-blue-300 uppercase tracking-widest">Connected</span>
                </div>
                <div className="text-sm text-slate-300">{pick(logistics?.keyData, 3, {}).value || '23乡镇+140村级点，覆盖率76%'}</div>
              </div>
            </div>
          </motion.div>

          <div>
            <span className="text-blue-400 font-bold tracking-widest uppercase mb-4 block text-sm">Intelligent Network</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">快递进村</h2>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-4">{logistics.title}</p>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8">{logistics.summary}</p>
            <div className="space-y-3">
              {logisticsHighlights.slice(0, 4).map((item) => (
                <div key={item.title} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                  <CheckCircleFilled className="text-cyan-400" />
                  <span className="font-bold">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={tourismRef} className="py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">文旅融合</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">{tourism.title}</p>
            <p className="text-base text-gray-600 max-w-3xl mx-auto mt-3">{tourism.summary}</p>
          </div>

          <div className="relative h-[520px] w-full flex justify-center items-center mb-10">
            <div className="absolute z-10 transform -rotate-6 -translate-x-32 hover:z-50 hover:scale-110 hover:rotate-0 transition-all duration-500 cursor-pointer">
              <div
                className="bg-white p-3 pb-12 shadow-xl w-64 border border-gray-200 relative"
                role="button"
                tabIndex={0}
                onClick={() => scrollToTourismSpot(pick(tourismCards, 0, {}).name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToTourismSpot(pick(tourismCards, 0, {}).name);
                  }
                }}
              >
                <img
                  src={pick(tourismCards, 0, {}).images?.[0] || '/image/tertiary-44.jpeg'}
                  className="w-full h-48 object-cover"
                  alt="景点1"
                />
                <div className="absolute bottom-4 left-4 font-mono text-slate-500 font-bold text-sm">
                  {pick(tourismCards, 0, {}).name || '章古台'}
                </div>
              </div>
            </div>

            <div className="absolute z-20 transform hover:z-50 hover:scale-110 transition-all duration-500 cursor-pointer">
              <div
                className="bg-white p-4 pb-16 shadow-2xl w-80 border border-gray-200 relative"
                role="button"
                tabIndex={0}
                onClick={() => scrollToTourismSpot(pick(tourismCards, 1, {}).name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToTourismSpot(pick(tourismCards, 1, {}).name);
                  }
                }}
              >
                <img
                  src={pick(tourismCards, 1, {}).images?.[0] || '/image/tertiary-50.jpeg'}
                  className="w-full h-64 object-cover"
                  alt="景点2"
                />
                <div className="absolute bottom-6 left-0 w-full text-center font-serif text-xl text-slate-800 font-bold">
                  {pick(tourismCards, 1, {}).name || '德力格尔草原'}
                </div>
              </div>
            </div>

            <div className="absolute z-10 transform rotate-6 translate-x-32 hover:z-50 hover:scale-110 hover:rotate-0 transition-all duration-500 cursor-pointer">
              <div
                className="bg-white p-3 pb-12 shadow-xl w-64 border border-gray-200 relative"
                role="button"
                tabIndex={0}
                onClick={() => scrollToTourismSpot(pick(tourismCards, 2, {}).name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToTourismSpot(pick(tourismCards, 2, {}).name);
                  }
                }}
              >
                <img
                  src={pick(tourismCards, 2, {}).images?.[0] || '/image/tertiary-52.jpeg'}
                  className="w-full h-48 object-cover"
                  alt="景点3"
                />
                <div className="absolute bottom-4 left-4 font-mono text-slate-500 font-bold text-sm">
                  {pick(tourismCards, 2, {}).name || '高山台森林公园'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tourismSpots.map((spot) => (
              <div
                key={spot.name}
                ref={(node) => {
                  if (node) tourismSpotRefs.current[spot.name] = node;
                }}
                role="button"
                tabIndex={0}
                onClick={() => gotoTourismDetail(spot)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    gotoTourismDetail(spot);
                  }
                }}
                className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{spot.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{spot.subtitle}</p>
                <p className="text-slate-700 leading-relaxed text-sm mb-2">{spot.desc}</p>
                <p className="text-sm text-emerald-700">
                  <span className="font-bold">特色体验：</span>
                  {spot.experience}
                </p>
                <p className="text-xs text-emerald-600 font-bold mt-3">点击查看详细介绍</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceEconomy;
