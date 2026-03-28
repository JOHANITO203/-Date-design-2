import React from 'react';
import { motion } from 'motion/react';
import { ICONS, MOCK_USERS } from '../types';
import GlassButton from './ui/GlassButton';
import { useDevice } from '../hooks/useDevice';
import { useNavigate } from 'react-router-dom';

const MatchesScreen: React.FC = () => {
  const { isDesktop, isTablet } = useDevice();
  const isLarge = isDesktop || isTablet;
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-black text-white p-6 pb-24 overflow-y-auto no-scrollbar font-sans">
      {/* 1) Header */}
      <header className="flex items-center justify-between mb-10 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 leading-none mb-1">Activité</span>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">Tes Likes</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center gap-2">
            <ICONS.Likes size={12} className="text-pink-500" fill="currentColor" />
            <span className="text-[10px] font-black text-pink-500">24 Nouveaux</span>
          </div>
        </div>
      </header>

      {/* 2) Grid of Blurred Cards */}
      <div className={`grid gap-4 ${isLarge ? 'grid-cols-3 lg:grid-cols-4' : 'grid-cols-2'}`}>
        {MOCK_USERS.slice(0, 6).map((user, i) => (
          <motion.div 
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="aspect-[3/4] rounded-[32px] bg-zinc-900 border border-white/5 overflow-hidden relative group cursor-pointer"
          >
            {/* Blurred Image */}
            <img 
              src={user.photos[0]} 
              className="w-full h-full object-cover blur-xl grayscale-[0.3] opacity-40 scale-110 transition-transform duration-700 group-hover:scale-125" 
              alt="Blurred profile" 
              referrerPolicy="no-referrer"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
              <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-3 shadow-2xl group-hover:scale-110 transition-transform">
                <ICONS.Likes size={24} className="text-pink-500" fill="currentColor" />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-16 bg-white/20 rounded-full mx-auto animate-pulse" />
                <div className="h-2 w-10 bg-white/10 rounded-full mx-auto" />
              </div>
            </div>

            {/* Compatibility Badge (Blurred) */}
            <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/40">
              ??% Match
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3) Premium Call-to-Action */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 relative overflow-hidden rounded-[40px] border border-white/10 shadow-2xl group"
      >
        {/* Atmospheric Background */}
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/20 blur-[80px] rounded-full group-hover:bg-pink-500/30 transition-colors duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full group-hover:bg-blue-500/30 transition-colors duration-700" />

        <div className="relative z-10 p-10 text-center space-y-8">
          <div className="inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 shadow-xl">
            <ICONS.Sparkles className="text-amber-400" size={32} />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
              Découvre qui t'aime
            </h2>
            <p className="text-white/40 text-sm max-w-[280px] mx-auto leading-relaxed font-medium">
              Ne perds plus de temps à swiper. Découvre instantanément tous tes admirateurs secrets.
            </p>
          </div>

          <div className="space-y-4">
            <GlassButton 
              variant="premium" 
              className="w-full py-5 text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-pink-500/20"
              onClick={() => navigate('/boost')}
            >
              Passer à VIBE Gold
            </GlassButton>
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
              À partir de 19,99 € / mois • Annulable à tout moment
            </p>
          </div>
        </div>
      </motion.div>

      {/* 4) Recent Matches Section */}
      <section className="mt-16 space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black italic uppercase tracking-tight">Matches Récents</h3>
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Voir tout</span>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {MOCK_USERS.slice(0, 5).map((user, i) => (
            <motion.div 
              key={`match-${user.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 flex flex-col items-center gap-3"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-[28px] border-2 border-white/10 overflow-hidden shadow-xl p-0.5 bg-gradient-to-br from-pink-500/20 to-blue-500/20">
                  <img src={user.photos[0]} className="w-full h-full object-cover rounded-[24px]" alt={user.name} referrerPolicy="no-referrer" />
                </div>
                {i === 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-black shadow-lg" />
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{user.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MatchesScreen;
