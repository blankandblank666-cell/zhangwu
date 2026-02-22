import React from 'react'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons';

const bgImage = "/shouye.jpg";
const HOT_NEWS_LINKS = {
  left: 'http://www.jicengwang.cn/jy/2026-02-12/292581.html',
  topRight: 'https://life.china.com/2026-02/12/content_542768.html',
  bottomRight: 'https://mp.weixin.qq.com/s/fIFfl1_Lxja94R2iz_xWDA'
};

const Home = () => {

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
                 <a
                   href="https://tv.cctv.com/2023/11/27/VIDE6LY4QDQbAD9YTABVHh8w231127.shtml?spm=C55924871139.PT8hUEEDkoTi.0.0"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="px-5 md:px-8 py-3 text-white border border-white/30 rounded-full font-medium hover:bg-white/10 backdrop-blur-sm transition-colors flex items-center gap-2"
                 >
                    <PlayCircleOutlined /> 观看宣传片
                 </a>
              </div>
            </motion.div>
        </div>
      </header>

      {/* === 2. 核心数据看板 === */}
      <section className="py-20 bg-slate-50 border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="p-4">
                    <div className="text-5xl font-serif text-slate-900 font-bold mb-2">35.1%</div>
                    <div className="text-gray-500 uppercase tracking-widest text-xs">森林覆盖率 </div>
                </div>
                <div className="p-4">
                    <div className="text-5xl font-serif text-slate-900 font-bold mb-2">2050<span className="text-2xl">万亩</span></div>
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
             <a
               href={HOT_NEWS_LINKS.left}
               target="_blank"
               rel="noopener noreferrer"
               className="group relative overflow-hidden rounded-2xl md:row-span-2 shadow-lg block"
             >
                 <img src="/news1.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="中国基层网报道"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white">
                     <div className="inline-flex items-center px-3 py-1 mb-2 rounded-full text-[11px] font-black tracking-[0.12em] uppercase text-white bg-[linear-gradient(135deg,#ef4444_0%,#f97316_55%,#fb923c_100%)] shadow-[0_8px_20px_rgba(239,68,68,0.45)] border border-white/30">热门 HOT</div>
                     <h3 className="text-3xl font-serif font-bold mb-2">中国基层网报道“瀚海筑梦.守绿传薪”社会实践活动</h3>
                     <p className="text-white/80 line-clamp-2">点击查看中国基层网专题报道。</p>
                 </div>
             </a>

             {/* 右上 */}
             <a
               href={HOT_NEWS_LINKS.topRight}
               target="_blank"
               rel="noopener noreferrer"
               className="group relative overflow-hidden rounded-2xl shadow-lg block min-h-[250px]"
             >
                 <img src="/news2.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="中华网报道"/>
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white">
                     <h3 className="text-2xl font-serif font-bold mb-1">中华网发表实践团总结心得</h3>
                     <p className="text-sm opacity-90">点击查看中华网专题内容。</p>
                 </div>
             </a>

             {/* 右下 */}
             <a
               href={HOT_NEWS_LINKS.bottomRight}
               target="_blank"
               rel="noopener noreferrer"
               className="group relative overflow-hidden rounded-2xl shadow-lg block min-h-[250px]"
             >
                 <img src="/news3.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="社会实践总结"/>
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white">
                     <h3 className="text-2xl font-serif font-bold mb-1">“瀚海筑梦.守绿传薪”社会实践总结</h3>
                     <p className="text-sm opacity-90">点击查看微信专题内容。</p>
                 </div>
             </a>
         </div>
      </section>

    </div>
  );
};

export default Home;
