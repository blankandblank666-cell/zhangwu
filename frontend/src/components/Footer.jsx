import React from 'react';
import { Link } from 'react-router-dom';
import { WechatOutlined, MailOutlined, EnvironmentOutlined, ArrowRightOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 上部分：三列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 1. 品牌与学校信息 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/team-logo.jpg" className="w-12 h-12 rounded-full border-2 border-white/20" alt="Logo" />
              <div>
                <h3 className="text-xl font-serif font-bold text-white tracking-wider">大连理工大学</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Dalian University of Technology</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-loose max-w-sm">
              “瀚海筑梦 · 守绿传薪”社会实践团。<br/>
              以数字技术赋能乡村振兴，记录彰武治沙七十载的绿色奇迹，传承大漠深处的精神火炬。
            </p>
            <div className="flex gap-4">
               {/* 装饰性的社交图标 */}
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all cursor-pointer">
                  <WechatOutlined />
               </div>
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all cursor-pointer">
                  <MailOutlined />
               </div>
            </div>
          </div>

          {/* 2. 快速导航 (两列) */}
          <div className="grid grid-cols-2 gap-8 md:pl-10">
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-2 border-green-600 pl-3">探索</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/spirit" className="hover:text-green-400 transition-colors flex items-center gap-2"><ArrowRightOutlined className="text-xs opacity-50"/> 治沙精神</Link></li>
                <li><Link to="/industry" className="hover:text-green-400 transition-colors flex items-center gap-2"><ArrowRightOutlined className="text-xs opacity-50"/> 绿色产业</Link></li>
                <li><Link to="/activity/study" className="hover:text-green-400 transition-colors flex items-center gap-2"><ArrowRightOutlined className="text-xs opacity-50"/> 研学路线</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-2 border-green-600 pl-3">关于</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-green-400 transition-colors">团队介绍</Link></li>
                <li><Link to="/about" className="hover:text-green-400 transition-colors">项目成果</Link></li>
                <li><Link to="/" className="hover:text-green-400 transition-colors">回到首页</Link></li>
              </ul>
            </div>
          </div>

          {/* 3. 联系与落款 */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-2 border-green-600 pl-3">联系我们</h4>
            <div className="space-y-4 text-sm text-slate-400">
              <p className="flex items-start gap-3">
                <EnvironmentOutlined className="mt-1 text-green-500"/>
                <span>辽宁省盘锦市大洼区<br/>大连理工大学盘锦校区</span>
              </p>
              <p className="flex items-center gap-3">
                <MailOutlined className="text-green-500"/>
                <span>zhangwu_project@dlut.edu.cn</span>
              </p>
            </div>
            
            {/* 模拟一个简单的订阅框 */}
            <div className="mt-8">
               <p className="text-xs text-slate-500 mb-2">订阅我们的最新动态</p>
               <div className="flex">
                  <input type="text" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-l px-4 py-2 text-sm w-full focus:outline-none focus:border-green-500 transition-colors"/>
                  <button className="bg-green-700 text-white px-4 py-2 rounded-r text-sm hover:bg-green-600 transition-colors">订阅</button>
               </div>
            </div>
          </div>
        </div>

        {/* 下部分：版权信息 */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
           <p>© 2025 DUT "Zhangwu Dream" Practice Team. All Rights Reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
              <span>仅用于学术展示</span>
              <span>非商业用途</span>
              <span>隐私政策</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
