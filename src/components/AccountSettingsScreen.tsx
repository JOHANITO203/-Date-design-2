import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICONS } from '../types';
import GlassButton from './ui/GlassButton';
import { useDevice } from '../hooks/useDevice';
import PrivacyScreen from './PrivacyScreen';
import NotificationsScreen from './NotificationsScreen';
import PreferencesScreen from './PreferencesScreen';

const AccountSettingsScreen = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { isDesktop, isTablet } = useDevice();
  const isLarge = isDesktop || isTablet;
  
  const sections = [
    { id: 'account', title: 'Compte', icon: <ICONS.Profile size={18} />, items: ['Numéro de téléphone', 'Email', 'Mot de passe'], path: '/settings/account' },
    { id: 'privacy', title: 'Confidentialité', icon: <ICONS.Shield size={18} />, items: ['Visibilité', 'Bloquer', 'Incognito'], path: '/settings/privacy' },
    { id: 'notifications', title: 'Notifications', icon: <ICONS.Bell size={18} />, items: ['Matches', 'Messages', 'Offres'], path: '/settings/notifications' },
    { id: 'preferences', title: 'Préférences', icon: <ICONS.Settings size={18} />, items: ['Distance', 'Âge', 'Genre'], path: '/settings/preferences' },
  ];

  const renderDetail = () => {
    switch (category) {
      case 'privacy': return <PrivacyScreen embedded />;
      case 'notifications': return <NotificationsScreen embedded />;
      case 'preferences': return <PreferencesScreen embedded />;
      case 'account':
      default:
        return (
          <div className="p-8 space-y-8">
            <h2 className="text-2xl font-bold">Paramètres du Compte</h2>
            <div className="glass rounded-[32px] overflow-hidden">
              {['Numéro de téléphone', 'Email', 'Mot de passe'].map((item, i, arr) => (
                <div key={item} className={`p-6 flex items-center justify-between ${i !== arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <span className="text-sm font-medium text-secondary">{item}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">Modifier</span>
                    <ICONS.ChevronLeft className="rotate-180 text-white/20" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  if (isLarge) {
    return (
      <div className="h-full flex overflow-hidden">
        {/* Master: Settings Sidebar */}
        <div className="w-[320px] border-r border-white/5 flex flex-col p-8 shrink-0">
          <div className="flex items-center gap-4 mb-10">
            <button onClick={() => navigate('/profile')} className="p-2 hover-effect rounded-full glass">
              <ICONS.ChevronLeft />
            </button>
            <h2 className="text-2xl font-bold">Paramètres</h2>
          </div>

          <div className="space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => navigate(section.path)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                  category === section.id || (!category && section.id === 'account')
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${category === section.id || (!category && section.id === 'account') ? 'bg-pink-500/20 text-pink-500' : 'bg-white/5'}`}>
                  {section.icon}
                </div>
                <span className="text-sm font-bold">{section.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <button 
              onClick={() => navigate('/')} 
              className="w-full p-4 glass rounded-2xl text-red-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors"
            >
              <ICONS.LogOut size={18} />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Detail: Settings Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white/[0.02]">
          {renderDetail()}
        </div>
      </div>
    );
  }

  // Mobile View
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col p-6 pb-28 overflow-y-auto no-scrollbar"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="p-2 hover-effect rounded-full glass">
            <ICONS.ChevronLeft />
          </button>
          <h2 className="text-2xl font-bold">Paramètres</h2>
        </div>
        <GlassButton className="py-2 px-4 rounded-full text-xs">Enregistrer</GlassButton>
      </div>

      <div className="space-y-8">
        {sections.map(section => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] px-2">{section.title}</h3>
            <div className="glass rounded-[32px] overflow-hidden">
              {section.items.map((item, i) => (
                <button 
                  key={item} 
                  onClick={() => navigate(section.path)}
                  className={`w-full p-5 text-left flex items-center justify-between hover:bg-white/5 active:bg-white/10 transition-colors ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <span className="text-sm font-medium">{item}</span>
                  <ICONS.ChevronLeft className="rotate-180 text-white/20" size={16} />
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <button onClick={() => navigate('/')} className="w-full p-5 glass rounded-[24px] text-red-500 font-black text-xs uppercase tracking-widest">
          Déconnexion
        </button>
      </div>
    </motion.div>
  );
};

export default AccountSettingsScreen;
