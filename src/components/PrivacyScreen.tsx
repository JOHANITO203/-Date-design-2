import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Eye, Lock, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyScreen: React.FC = () => {
  const navigate = useNavigate();

  const settings = [
    { icon: <Eye size={20} />, title: 'Profile Visibility', desc: 'Control who can see your profile' },
    { icon: <Shield size={20} />, title: 'Incognito Mode', desc: 'Only people you like can see you' },
    { icon: <Lock size={20} />, title: 'Read Receipts', desc: 'Show when you have read messages' },
    { icon: <UserX size={20} />, title: 'Blocked Contacts', desc: 'Manage people you have blocked' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5 border border-white/10">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Privacy</h1>
      </header>

      <div className="space-y-4">
        {settings.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-white/5 text-[#00BFFF]">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-xs text-[#8E8E93]">{item.desc}</p>
              </div>
            </div>
            <div className="w-12 h-6 rounded-full bg-white/10 relative">
              <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyScreen;
