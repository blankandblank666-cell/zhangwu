import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import ServiceEconomy from '../components/ServiceEconomy';
import SilicaIndustry from '../components/SilicaIndustry';

const DocImageSlot = ({ label, className = '' }) => (
  <div className={`relative w-full overflow-hidden rounded-2xl border border-dashed border-green-500/50 bg-gradient-to-br from-green-50 to-emerald-100/60 ${className}`}>
    {/* 当文档中没有对应图片时使用占位样式 */}
    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#86efac_0%,transparent_70%)] pointer-events-none"></div>
    <div className="relative h-full min-h-[140px] flex items-center justify-center px-4 text-center text-green-900/80 text-sm leading-relaxed">
      图片占位：{label}
    </div>
  </div>
);

const DocImageGroup = ({ images = [], label, className = '', singleHeight = 'h-56' }) => {
  if (!images || images.length === 0) {
    return <DocImageSlot label={label} className={className} />;
  }

  if (images.length === 1) {
    return (
      <div className={`w-full overflow-hidden rounded-2xl border border-green-100 bg-white ${className}`}>
        <img src={images[0]} alt={label} className={`w-full ${singleHeight} object-cover`} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {images.map((src, idx) => (
        <div key={`${label}-${idx}`} className="overflow-hidden rounded-xl border border-green-100 bg-white">
          <img src={src} alt={`${label}-${idx + 1}`} className="w-full h-36 md:h-44 object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
};

const IndustryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = database.industries ? database.industries.find(i => i.id === id) : null;

  if (!item) return <div className="pt-32 text-center">内容未找到</div>;

  // === 特殊逻辑 0：如果是【精品农业】，进入农业模块专题页 ===
  if (id === 'primary') {
    const primaryModule = item.module || {};
    const agricultureOverviewImages = primaryModule.agricultureOverviewImages || [];
    const forestryOverviewImages = primaryModule.forestryOverviewImages || [];
    const featuredProducts = primaryModule.featuredProducts || [];
    const agricultureFeatureImages = primaryModule.agricultureFeatureImages || [];
    const agricultureFeatures = primaryModule.agricultureFeatures || [];
    const forestryProducts = primaryModule.forestryProducts || [];
    const forestryFeatureImages = primaryModule.forestryFeatureImages || [];
    const forestryFeatures = primaryModule.forestryFeatures || [];

    return (
      <div className="bg-[#f5f9f1] min-h-screen pb-20">
        <div className="relative h-[320px] md:h-[440px] w-full overflow-hidden">
          <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>

          <button
            onClick={() => navigate('/industry')}
            className="absolute top-24 left-4 md:left-10 text-white/90 hover:text-white flex items-center gap-2 transition-colors z-10"
          >
            <ArrowLeftOutlined /> 返回产业全览
          </button>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <p className="text-[11px] uppercase tracking-[0.35em] opacity-90 mb-4">Primary Industry Module</p>
            <h1 className="text-3xl md:text-6xl font-serif font-bold mb-4 tracking-wide">{item.title}</h1>
            <p className="max-w-3xl text-sm md:text-lg opacity-90 leading-relaxed">{item.summary}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-14 relative z-10 space-y-8">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 relative overflow-hidden rounded-3xl border-2 border-emerald-200/80 bg-[linear-gradient(145deg,#ffffff_0%,#f6fef7_55%,#ecfdf5_100%)] shadow-[0_16px_42px_rgba(16,185,129,0.16)]"
            >
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-emerald-300/20 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-green-200/20 blur-2xl pointer-events-none" />
              <div className="relative z-10 p-6 md:p-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] tracking-[0.16em] uppercase font-bold mb-4">
                  Core Overview
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4">彰武农业总述</h2>
                <p className="text-slate-700 leading-[1.95] text-justify">{primaryModule.agricultureOverview}</p>
              </div>
            </motion.div>
            <div className="lg:col-span-4">
              <div className="h-full rounded-3xl border-2 border-emerald-200/80 bg-white/90 p-2 shadow-[0_12px_30px_rgba(16,185,129,0.14)]">
                <DocImageGroup
                  images={agricultureOverviewImages}
                  label="彰武农业总述配图"
                  className="h-full"
                  singleHeight="h-full min-h-[220px]"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-md border border-green-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">彰武特色农产品</h2>
                <p className="text-xs md:text-sm text-slate-500 mt-1">基于产业模块文档整理，保留原始核心描述</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProducts.map((product, idx) => (
                <article key={product.name} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 md:p-5">
                  <DocImageGroup
                    images={product.images}
                    label={`${product.name}产品图`}
                    className="mb-4"
                    singleHeight="h-40"
                  />
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{`${idx + 1}. ${product.name}`}</h3>
                  <p className="text-slate-700 leading-relaxed text-justify">{product.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-md border border-green-100 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4">彰武农业特色</h2>
            <p className="text-slate-700 leading-relaxed mb-6">{primaryModule.agricultureFeatureIntro}</p>
            <DocImageGroup
              images={agricultureFeatureImages}
              label="彰武农业特色配图"
              className="mb-6"
              singleHeight="h-48"
            />
            <div className="space-y-4">
              {agricultureFeatures.map((feature) => (
                <article key={feature.title} className="rounded-2xl border border-green-100 bg-green-50/40 p-5">
                  <h3 className="text-lg md:text-xl font-bold text-green-900 mb-3">{feature.title}</h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-green-700">
                    {feature.bullets.map((line, lineIdx) => (
                      <li key={`${feature.title}-${lineIdx}`} className="text-slate-700 leading-relaxed text-justify">
                        {line}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="h-full rounded-3xl border-2 border-teal-200/80 bg-white/90 p-2 shadow-[0_12px_30px_rgba(20,184,166,0.15)]">
                <DocImageGroup
                  images={forestryOverviewImages}
                  label="彰武林业总述配图"
                  className="h-full"
                  singleHeight="h-full min-h-[220px]"
                />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 order-1 lg:order-2 relative overflow-hidden rounded-3xl border-2 border-teal-200/80 bg-[linear-gradient(145deg,#ffffff_0%,#f4fbfb_56%,#ecfeff_100%)] shadow-[0_16px_42px_rgba(13,148,136,0.16)]"
            >
              <div className="absolute -top-20 -left-20 w-52 h-52 rounded-full bg-teal-200/20 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-cyan-200/20 blur-2xl pointer-events-none" />
              <div className="relative z-10 p-6 md:p-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-600 text-white text-[11px] tracking-[0.16em] uppercase font-bold mb-4">
                  Core Overview
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4">彰武林业总述</h2>
                <p className="text-slate-700 leading-[1.95] text-justify">{primaryModule.forestryOverview}</p>
              </div>
            </motion.div>
          </section>

          <section className="bg-white rounded-3xl shadow-md border border-green-100 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">彰武林业产品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {forestryProducts.map((product, idx) => (
                <article key={product.name} className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                  <DocImageGroup
                    images={product.images}
                    label={`${product.name}展示图`}
                    className="mb-4"
                    singleHeight="h-36"
                  />
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{`${idx + 1}. ${product.name}`}</h3>
                  <p className="text-slate-700 leading-relaxed text-justify">{product.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-md border border-green-100 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4">彰武林业特色</h2>
            <p className="text-slate-700 leading-relaxed mb-6">{primaryModule.forestryFeatureIntro}</p>
            <DocImageGroup
              images={forestryFeatureImages}
              label="彰武林业特色配图"
              className="mb-6"
              singleHeight="h-52"
            />
            <div className="space-y-4">
              {forestryFeatures.map((feature) => (
                <article key={feature.title} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                  <h3 className="text-lg md:text-xl font-bold text-emerald-900 mb-3">{feature.title}</h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-emerald-700">
                    {feature.bullets.map((line, lineIdx) => (
                      <li key={`${feature.title}-${lineIdx}`} className="text-slate-700 leading-relaxed text-justify">
                        {line}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {item.products && (
            <section className="bg-white rounded-3xl shadow-md border border-green-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl">
                  <ShoppingCartOutlined />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">特色产品推荐</h2>
                  <p className="text-xs text-slate-500">Support Locals · 助力乡村振兴</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {item.products.map((product, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div className="h-36 md:h-40 overflow-hidden relative">
                      <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-red-600 font-bold">{product.price}</span>
                        <a href={product.link} className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full hover:bg-green-600 transition-colors">购买</a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

// === 特殊逻辑 1：如果是【硅砂工业】，进入 PPT 沉浸模式 (庄严科技版) ===
if (id === 'secondary') {
   return (
     <div className="h-[100svh] md:h-screen w-full bg-[#0b0f19] overflow-hidden relative flex flex-col font-sans">
        
        {/* 1. 背景：深邃的科技蓝黑渐变 */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-[#0f172a] to-black"></div>
        
        {/* 2. 装饰：精细的网格纹理 */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`, backgroundSize: '50px 50px' }}>
        </div>

        {/* 3. 顶部导航 (极简版：去掉了右侧标题) */}
        <div className="absolute top-24 md:top-28 left-0 w-full z-50 px-4 md:px-10 flex justify-start items-center pointer-events-none">
           <button 
              onClick={() => navigate('/industry')}
              // 按钮开启点击
              className="pointer-events-auto text-slate-300 hover:text-white flex items-center gap-2 transition-all bg-slate-800/50 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-slate-700 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
           >
              <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform"/> 
              <span className="font-bold tracking-wide">返回产业全览</span>
           </button>
           
           {/* 右侧原本的标题块已删除 */}
        </div>

        {/* 4. 核心交互区 */}
        <div className="relative z-10 flex-1 min-h-0 w-full"> 
           {item.companies ? (
              <SilicaIndustry companies={item.companies} />
           ) : (
              <div className="flex items-center justify-center h-full text-slate-500">NO DATA AVAILABLE</div>
           )}
        </div>
     </div>
   );
 }
  // === 特殊逻辑 2：如果是【第三产业】，进入 现代服务业 杂志模式 ===
  if (id === 'tertiary') {
   return (
     <div className="min-h-screen bg-slate-50 relative flex flex-col font-sans">
        
        {/* === 修复点：调整位置和层级 === */}
        {/* 1. top-24: 下移，避开全局 Navbar */}
        {/* 2. pointer-events-none: 让这一行透明容器不挡鼠标，只有按钮能点 */}
        <div className="absolute top-24 left-0 w-full z-40 px-6 flex justify-between items-center pointer-events-none">
           <button 
              onClick={() => navigate('/industry')}
              // pointer-events-auto: 恢复按钮点击
              className="pointer-events-auto text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-slate-200 hover:shadow-md"
           >
              <ArrowLeftOutlined /> 返回产业全览
           </button>
           
           <div className="hidden md:block text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
              Integrated Development
           </div>
        </div>
        
        {/* 渲染服务业组件 */}
        <ServiceEconomy data={item} />
        
        {/* 暂时隐藏：全域旅游“特色体验 & 产品”区块 */}
        {/*
          {item.products && (
             <div className="bg-white py-16 px-6 border-t border-gray-100 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
                          <ShoppingCartOutlined />
                       </div>
                       <div>
                          <h2 className="text-2xl font-bold text-slate-900">特色体验 & 产品</h2>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                       {item.products.map((product, idx) => (
                          <div key={idx} className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden cursor-pointer">
                             <div className="h-40 overflow-hidden relative">
                                <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={product.name}/>
                             </div>
                             <div className="p-4">
                                <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
                                <div className="flex justify-between items-center mt-3">
                                   <span className="text-red-600 font-bold">{product.price}</span>
                                   <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full hover:bg-green-600 transition-colors">查看</button>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                </div>
             </div>
          )}
        */}
     </div>
   );
 }
  // === 常规逻辑 (保持不变) ===
  const colorMap = {
    green: "text-green-700 bg-green-50 border-green-200",
    blue: "text-blue-700 bg-blue-50 border-blue-200",
    orange: "text-orange-700 bg-orange-50 border-orange-200",
  };
  const themeClass = colorMap[item.color] || colorMap.green;

  return (
    <div className="bg-white min-h-screen pb-20">
       <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
          <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
             <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wider">{item.title}</h1>
             <p className="text-lg md:text-xl opacity-90 font-light tracking-widest uppercase">{item.subtitle}</p>
          </div>
          <button onClick={() => navigate('/industry')} className="absolute top-24 left-6 md:left-12 text-white/80 hover:text-white flex items-center gap-2 transition-colors z-10">
             <ArrowLeftOutlined /> 返回列表
          </button>
       </div>

       <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
          <div className="bg-white rounded-t-3xl shadow-xl p-8 md:p-12 min-h-[400px]">
             <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
             </div>
          </div>

          <div className="mt-12">
             <div className="flex items-center gap-3 mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${themeClass}`}>
                   <ShoppingCartOutlined />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-slate-900">特色产品推荐</h2>
                   <p className="text-xs text-gray-400">Support Locals · 助力乡村振兴</p>
                </div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {item.products && item.products.map((product, idx) => (
                   <motion.div 
                     key={idx} 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
                   >
                      <div className="h-40 overflow-hidden relative">
                         <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name}/>
                      </div>
                      <div className="p-4">
                         <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
                         <div className="flex justify-between items-center mt-3">
                            <span className="text-red-600 font-bold">{product.price}</span>
                            <a href={product.link} className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full hover:bg-green-600 transition-colors">购买</a>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default IndustryDetail;
