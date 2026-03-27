import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, MessageSquare, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();

  const options = [
    { icon: <Heart size={20} />, title: 'New Likes', desc: 'When someone likes you' },
    { icon: <Star size={20} />, title: 'New Matches', desc: 'When you get a new match' },
    { icon: <MessageSquare size={20} />, title: 'Messages', desc: 'When you receive a message' },
    { icon: <Bell size={20} />, title: 'App Updates', desc: 'News and feature updates' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5 border border-white/10">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Notifications</h1>
      </header>

      <div className="space-y-4">
        {options.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-white/5 text-[#FF1493]">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-xs text-[#8E8E93]">{item.desc}</p>
              </div>
            </div>
            <div className="w-12 h-6 rounded-full bg-gradient-to-r from-[#FF1493] to-[#00BFFF] relative">
              <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;
