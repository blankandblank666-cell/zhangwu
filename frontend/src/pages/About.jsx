import React, { useMemo, useState } from 'react';
import { database } from '../data';
import { motion } from 'framer-motion';
import { UserOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';

const About = () => {
  const { team } = database;
  // 手风琴状态：默认选中第一个人 (id: 1)
  const [activeMember, setActiveMember] = useState(1);
  const activityCount = team?.activities?.length || 0;
  const timelineCurve = useMemo(() => {
    if (activityCount <= 1) return 'M 50 4 L 50 96';
    const step = 92 / (activityCount - 1);
    const points = Array.from({ length: activityCount }, (_, idx) => {
      const t = activityCount === 1 ? 0 : idx / (activityCount - 1);
      const envelope = Math.pow(Math.sin(Math.PI * t), 0.9); // 首尾收敛，避免起止拐点突兀
      const sway = Math.sin(Math.PI * 3.2 * t) * 0.72 + Math.sin(Math.PI * 6.4 * t) * 0.28;
      return {
        x: 50 + 13 * envelope * sway,
        y: 4 + step * idx
      };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    const tension = 0.26;

    for (let i = 0; i < points.length - 1; i += 1) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || points[i + 1];

      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
    }
    return path;
  }, [activityCount]);

  // 兜底防止数据为空
  if (!team) return <div>Loading...</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* === Section 1: 团队旗帜与介绍 (Hero) === */}
      <div className="relative pt-32 pb-20 px-6 bg-slate-900 overflow-hidden">
        {/* 背景装饰：深色底纹 */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
           
           {/* 左侧：旗帜展示 (做成飘动的效果或者挂在墙上的感觉) */}
           <motion.div 
             initial={{ x: -50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ duration: 1 }}
             className="w-full md:w-1/2 flex justify-center"
           >
              <div className="relative group">
                  {/* 旗帜图片容器 */}
                  <div className="w-[300px] h-[200px] md:w-[500px] md:h-[333px] bg-white rounded shadow-2xl overflow-hidden relative border-4 border-yellow-600/30 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                      {/* 这里放你们真实的旗帜图片，暂时用 Logo 代替 */}
                      <img src="./team-flang.jpg" className="w-full h-full object-cover" alt="Team Flag" />
                      
                      {/* 旗帜上的光泽感 */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none"></div>
                  </div>
                  {/* 阴影 */}
                  <div className="absolute -bottom-10 left-10 right-10 h-4 bg-black/50 blur-xl rounded-full transform rotate-[-2deg]"></div>
              </div>
           </motion.div>

           {/* 右侧：文案介绍 */}
           <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="w-full md:w-1/2 text-white"
           >
              <div className="flex items-center gap-3 mb-6">
                 <span className="w-12 h-1 bg-green-500"></span>
                 <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide">瀚海筑梦 · 守绿传薪</h1>
              </div>
              
              <h2 className="text-xl font-bold text-green-400 mb-6">{team.intro.title}</h2>
              
              <p className="text-slate-300 leading-loose text-justify text-lg">
                 {team.intro.content}
              </p>
              
              <div className="mt-8 flex gap-4 text-sm text-slate-500 font-mono">
                 <span>EST. 2024</span>
                 <span>|</span>
                 <span>DLUT PANJIN CAMPUS</span>
              </div>
           </motion.div>
        </div>
      </div>

      {/* === Section 2: 成员介绍 (手风琴特效) === */}
      <div className="py-24 bg-slate-50 overflow-hidden">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">核心成员</h2>
            <p className="text-gray-400 uppercase tracking-widest text-xs">Our Brilliant Team</p>
         </div>

         {/* 手风琴容器 */}
         <div className="max-w-[1400px] mx-auto h-[500px] px-4 flex gap-2 md:gap-4">
            {team.members.map((member) => (
               <motion.div
                 key={member.id}
                 layout // 开启布局动画
                 onClick={() => setActiveMember(member.id)}
                 className={`relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out shadow-lg ${
                    activeMember === member.id ? 'flex-[10]' : 'flex-[1]'
                 }`}
               >
                  {/* 背景图 */}
                  <img src={member.img} className="absolute inset-0 w-full h-full object-cover transition-all duration-700" alt={member.name} />
                  
                  {/* 遮罩 (未选中时变暗) */}
                  <div className={`absolute inset-0 bg-black/40 transition-opacity ${activeMember === member.id ? 'opacity-0' : 'opacity-60 hover:opacity-20'}`}></div>

                  {/* 文字内容 */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/90 to-transparent">
                     {/* 只有选中时显示详细描述 */}
                     {activeMember === member.id ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                           <h3 className="text-3xl font-bold mb-1">{member.name}</h3>
                           <p className="text-green-400 font-bold uppercase text-sm mb-2">{member.role}</p>
                           <p className="text-gray-300 italic">“{member.desc}”</p>
                        </motion.div>
                     ) : (
                        // 未选中时，只显示竖排的名字 (在很窄的时候) 或者 简写
                        <div className="text-center">
                           <p className="text-lg font-bold rotate-0 md:hidden">{member.name.charAt(0)}</p> {/* 手机版只显示姓 */}
                           <p className="hidden md:block text-xl font-bold writing-mode-vertical">{member.name}</p>
                        </div>
                     )}
                  </div>
               </motion.div>
            ))}
         </div>
      </div>

      {/* === Section 3: 过往活动 (交错布局) === */}
      <div className="py-24 max-w-5xl mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">筑梦足迹</h2>
            <p className="text-gray-400 uppercase tracking-widest text-xs">Past Activities</p>
         </div>

         <div className="relative">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[34%] pointer-events-none z-20">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                     <linearGradient id="dreamTrailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.82)" />
                        <stop offset="52%" stopColor="rgba(34,197,94,0.82)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.78)" />
                     </linearGradient>
                  </defs>
                  <path d={timelineCurve} fill="none" stroke="url(#dreamTrailGradient)" strokeWidth="1.05" strokeLinecap="round" />
               </svg>
            </div>

            <div className="space-y-8 md:space-y-12">
               {team.activities.map((item, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative min-h-[unset] md:min-h-[340px] flex items-center"
                  >
                    <span className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-green-600 shadow-[0_0_0_6px_rgba(34,197,94,0.15)] z-30" />

                    <div className={`relative z-10 w-full md:w-[40%] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                      <div className="bg-white rounded-2xl border border-green-100 shadow-[0_18px_38px_rgba(15,23,42,0.09)] overflow-hidden group">
                        <div className="overflow-hidden">
                           <img src={item.img} className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                        </div>
                        <div className="p-5 md:p-6">
                           <div className="flex items-center gap-2 text-green-700 font-bold mb-2 text-sm md:text-base">
                              <ClockCircleOutlined /> <span>{item.date}</span>
                           </div>
                           <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                           <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                              {item.desc}
                           </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
               ))}
            </div>
         </div>

         {/* 底部结语 */}
         <div className="mt-24 text-center p-10 bg-green-50 rounded-3xl border border-green-100">
            <TeamOutlined className="text-4xl text-green-600 mb-4"/>
            <p className="text-xl font-serif text-green-900">
               “我们的故事才刚刚开始，欢迎加入我们，续写绿色篇章。”
            </p>
         </div>
      </div>

    </div>
  );
};

export default About;
