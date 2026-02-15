import React from 'react'; // 删掉了 useState, useEffect，因为首页不需要自己控制加载了
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // 删掉了 AnimatePresence
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons';

const bgImage = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop";

const Home = () => {
  // 注意：这里已经没有 loading 状态和 useEffect 了，因为全交给 App.jsx 处理了

  return (
    <div className="bg-white">
      
      {/* === 1. Hero 首屏展示 === */}
      <header className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div 
          initial={{ scale: 1.1 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 10 }}
          className="absolute inset-0"
        >
           <img src={bgImage} className="w-full h-full object-cover opacity-60" alt="Hero Background"/>
           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 2.2 }} // 这里保持延迟，等 App.jsx 的幕布拉起后再显示
            >
              <p className="text-blue-200 tracking-[0.5em] md:tracking-[1em] text-xs uppercase mb-6 font-medium border-b border-blue-500/30 pb-4 inline-block">
                中国 · 辽宁 · 彰武
              </p>
              
              {/* === 这里保留了你刚才要的酷炫标题 === */}
              <div className="overflow-hidden py-2">
                <motion.h1 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 2.3, ease: "easeOut" }}
                  className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-lg"
                >
                  瀚海筑梦 <br/> <span className="italic font-light opacity-90">守绿传薪</span>
                </motion.h1>
              </div>
              {/* =================================== */}
              
              <div className="flex justify-center gap-3 md:gap-6 mt-8 flex-wrap">
                 <Link to="/spirit" className="px-5 md:px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                    探索治沙精神 <ArrowRightOutlined />
                 </Link>
                 <button className="px-5 md:px-8 py-3 text-white border border-white/30 rounded-full font-medium hover:bg-white/10 backdrop-blur-sm transition-colors flex items-center gap-2">
                    <PlayCircleOutlined /> 观看宣传片
                 </button>
              </div>
            </motion.div>
        </div>
      </header>

      {/* === 2. 核心数据看板 === */}
      <section className="py-20 bg-slate-50 border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="p-4">
                    <div className="text-5xl font-serif text-slate-900 font-bold mb-2">34.5%</div>
                    <div className="text-gray-500 uppercase tracking-widest text-xs">森林覆盖率 </div>
                </div>
                <div className="p-4">
                    <div className="text-5xl font-serif text-slate-900 font-bold mb-2">600<span className="text-2xl">万亩</span></div>
                    <div className="text-gray-500 uppercase tracking-widest text-xs">固沙造林面积 </div>
                </div>
                <div className="p-4">
                    <div className="text-5xl font-serif text-slate-900 font-bold mb-2">70<span className="text-2xl">年</span></div>
                    <div className="text-gray-500 uppercase tracking-widest text-xs">几代人坚守 </div>
                </div>
            </div>
         </div>
      </section>

      {/* === 3. 版块导流 === */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">热点资讯</h2>
            <p className="text-gray-500 tracking-widest uppercase text-sm">Discover The Miracle</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[600px]">
             {/* 左侧大图 */}
             <Link to="/spirit" className="group relative overflow-hidden rounded-2xl md:row-span-2 shadow-lg block">
                 <img src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Spirit"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white">
                     <div className="text-xs font-bold bg-red-600 inline-block px-2 py-1 mb-2 rounded">核心灵魂</div>
                     <h3 className="text-3xl font-serif font-bold mb-2">治沙精神</h3>
                     <p className="text-white/80 line-clamp-2">记录从“沙进人退”到“绿进沙退”的历史跨越，致敬每一位平凡英雄。</p>
                 </div>
             </Link>

             {/* 右上 */}
             <Link to="/industry" className="group relative overflow-hidden rounded-2xl shadow-lg block min-h-[250px]">
                 <img src="/greenchanye.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Industry"/>
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white">
                     <h3 className="text-2xl font-serif font-bold mb-1">绿色产业体系</h3>
                     <p className="text-sm opacity-90">精品农业 · 现代工业 · 生态畜牧</p>
                 </div>
             </Link>

             {/* 右下 */}
             <Link to="/tours" className="group relative overflow-hidden rounded-2xl shadow-lg block min-h-[250px]">
                 <img src="/tour.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Tours"/>
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white">
                     <h3 className="text-2xl font-serif font-bold mb-1">研学文旅</h3>
                     <p className="text-sm opacity-90">全域旅游地图与精品路线导览</p>
                 </div>
             </Link>
         </div>
      </section>

    </div>
  );
};

export default Home;
