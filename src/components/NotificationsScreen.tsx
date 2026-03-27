import React from 'react';
import { motion } from 'motion/react';
import { Bell, MessageSquare, Heart, Star, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationsScreenProps {
  embedded?: boolean;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ embedded }) => {
  const navigate = useNavigate();

  const options = [
    { icon: <Heart size={20} />, title: 'Nouveaux Likes', desc: 'Quand quelqu\'un vous aime' },
    { icon: <Star size={20} />, title: 'Nouveaux Matches', desc: 'Quand vous avez un nouveau match' },
    { icon: <MessageSquare size={20} />, title: 'Messages', desc: 'Quand vous recevez un message' },
    { icon: <Bell size={20} />, title: 'Mises à jour', desc: 'Actualités et nouvelles fonctionnalités' },
  ];

  const containerClasses = embedded 
    ? "h-full p-8 space-y-8" 
    : "min-h-full bg-black text-white p-6 pb-28";

  return (
    <div className={containerClasses}>
      {!embedded && (
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full glass hover-effect">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </header>
      )}

      {embedded && <h2 className="text-2xl font-bold mb-8">Notifications</h2>}

      <div className="space-y-4">
        {options.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-[24px] glass border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/5 text-pink-500 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="text-[11px] text-secondary font-medium">{item.desc}</p>
              </div>
            </div>
            <div className="w-12 h-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 relative cursor-pointer active:scale-95 transition-transform">
              <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-lg" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;
