import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data'; // 导入数据库
import { ArrowLeftOutlined } from '@ant-design/icons';

const PersonDetail = () => {
  const { id } = useParams(); // 拿到网址里的 id
  const navigate = useNavigate();
  
  // 在数据库里查找这个人
  const person = database.heroes.find(h => h.id === id);

  if (!person) return <div className="pt-32 text-center">未找到该人物信息</div>;

  return (
    <div className="pt-24 min-h-screen bg-white pb-20">
       <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button onClick={() => navigate(-1)} className="mb-8 text-gray-500 hover:text-black flex items-center gap-2">
             <ArrowLeftOutlined /> 返回列表
          </button>

          <div className="flex flex-col md:flex-row gap-10 items-start">
             <img src={person.avatar} className="w-48 h-48 rounded-2xl object-cover shadow-lg" alt={person.name}/>
             <div>
                <div className="flex gap-2 mb-3">
                   {person.tags.map(tag => <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">{tag}</span>)}
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2">{person.name}</h1>
                <p className="text-lg md:text-xl text-gray-500 mb-6">{person.title}</p>
                <div className="border-l-4 border-yellow-500 pl-4 py-3 bg-yellow-50 italic text-gray-700 text-base md:text-lg leading-relaxed">
                   {person.quote}
                </div>
             </div>
          </div>

          <div className="mt-16 max-w-none text-gray-700 leading-[2] [&>p]:mb-8 [&>p]:text-[1rem] md:[&>p]:text-[1.2rem]">
             <h3 className="text-3xl md:text-4xl font-bold text-black mb-8">人物事迹</h3>
             {/* 渲染 HTML 内容 */}
             <div dangerouslySetInnerHTML={{ __html: person.content }} />
          </div>
       </div>
    </div>
  );
};

export default PersonDetail;
