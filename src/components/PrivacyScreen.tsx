import React from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Lock, UserX, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PrivacyScreenProps {
  embedded?: boolean;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ embedded }) => {
  const navigate = useNavigate();

  const settings = [
    { icon: <Eye size={20} />, title: 'Visibilité du profil', desc: 'Contrôlez qui peut voir votre profil' },
    { icon: <Shield size={20} />, title: 'Mode Incognito', desc: 'Seules les personnes que vous aimez peuvent vous voir' },
    { icon: <Lock size={20} />, title: 'Confirmations de lecture', desc: 'Afficher quand vous avez lu les messages' },
    { icon: <UserX size={20} />, title: 'Contacts bloqués', desc: 'Gérer les personnes que vous avez bloquées' },
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
          <h1 className="text-2xl font-bold">Confidentialité</h1>
        </header>
      )}

      {embedded && <h2 className="text-2xl font-bold mb-8">Confidentialité</h2>}

      <div className="space-y-4">
        {settings.map((item, i) => (
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
            <div className="w-12 h-6 rounded-full bg-white/10 relative cursor-pointer active:scale-95 transition-transform">
              <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-lg" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyScreen;
