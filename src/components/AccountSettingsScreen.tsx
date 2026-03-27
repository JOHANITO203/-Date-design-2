import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../types';
import GlassButton from './ui/GlassButton';

const AccountSettingsScreen = () => {
  const navigate = useNavigate();
  
  const sections = [
    { title: 'Compte', items: ['Numéro de téléphone', 'Email', 'Mot de passe'], path: '/settings' },
    { title: 'Confidentialité', items: ['Visibilité du profil', 'Bloquer des contacts', 'Mode incognito'], path: '/settings/privacy' },
    { title: 'Notifications', items: ['Nouveaux matches', 'Messages', 'Boosts & Offres'], path: '/settings/notifications' },
    { title: 'Préférences', items: ['Distance', 'Âge', 'Genre'], path: '/settings/preferences' },
  ];

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="absolute inset-0 z-50 bg-black flex flex-col p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2"><ICONS.ChevronLeft /></button>
          <h2 className="text-2xl font-bold">Paramètres</h2>
        </div>
        <GlassButton className="py-2 px-4 rounded-full text-xs">Enregistrer</GlassButton>
      </div>

      <div className="space-y-8 overflow-y-auto no-scrollbar pb-10">
        {sections.map(section => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest px-2">{section.title}</h3>
            <div className="glass rounded-[32px] overflow-hidden">
              {section.items.map((item, i) => (
                <button 
                  key={item} 
                  onClick={() => navigate(section.path)}
                  className={`w-full p-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <span className="text-sm font-medium">{item}</span>
                  <ICONS.ChevronLeft className="rotate-180 text-white/20" size={16} />
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <button onClick={() => navigate('/')} className="w-full p-5 glass rounded-[24px] text-red-500 font-bold text-sm">
          Déconnexion
        </button>
      </div>
    </motion.div>
  );
};

export default AccountSettingsScreen;
