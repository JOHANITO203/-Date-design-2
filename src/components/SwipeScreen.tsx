import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { ICONS, MOCK_USERS } from '../types';
import GlassButton from './ui/GlassButton';
import { useDevice } from '../hooks/useDevice';
import Logo from './ui/Logo';

const QUICK_FILTERS = [
// ... (rest of the file remains the same)
  { id: 'all', label: 'Tout' },
  { id: 'nearby', label: 'À proximité' },
  { id: 'new', label: 'Nouveaux' },
  { id: 'online', label: 'En ligne' },
  { id: 'verified', label: 'Vérifiés' },
];

const SwipeScreen = () => {
  const { isDesktop, isTablet } = useDevice();
  const isLarge = isDesktop || isTablet;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const user = MOCK_USERS[currentIndex % MOCK_USERS.length];
  const nextUser = MOCK_USERS[(currentIndex + 1) % MOCK_USERS.length];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.8, 1, 1, 1, 0.8]);
  
  const likeOpacity = useTransform(x, [40, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-40, -120], [0, 1]);
  const superLikeOpacity = useTransform(y, [-40, -120], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 80;
    if (info.offset.x > threshold) {
      swipe('right');
    } else if (info.offset.x < -threshold) {
      swipe('left');
    } else if (info.offset.y < -threshold) {
      swipe('up');
    }
  };

  const swipe = (dir: 'left' | 'right' | 'up') => {
    setTimeout(() => {
      if (dir === 'right' || dir === 'up') {
        if (Math.random() > 0.8) setShowMatch(true);
      }
      setCurrentIndex(prev => prev + 1);
      setPhotoIndex(0);
      x.set(0);
      y.set(0);
    }, 100);
  };

  const handlePhotoNav = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 3) {
      if (photoIndex > 0) setPhotoIndex(prev => prev - 1);
    } else if (clickX > (rect.width * 2) / 3) {
      if (photoIndex < user.photos.length - 1) setPhotoIndex(prev => prev + 1);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden relative font-sans">
      {/* 1) Header */}
      <header className="flex items-center justify-between px-6 pt-6 pb-2 shrink-0 z-20">
        <Logo size={28} />
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 shadow-[0_0_15px_rgba(249,115,22,0.1)] active:scale-95 transition-all group">
          <ICONS.Boost size={14} className="text-orange-400 group-hover:animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-400/90">Boost</span>
        </button>
      </header>

      {/* 2) Filtres Rapides - More discrete */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar shrink-0 z-20">
        {QUICK_FILTERS.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              activeFilter === filter.id 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-white/30 border border-white/5 hover:bg-white/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* 3) Main Swipe Area */}
      <main className="flex-1 relative flex justify-center items-center px-4 pb-4">
        <div className={`relative w-full h-full max-h-[85vh] ${isLarge ? 'max-w-[420px]' : ''}`}>
          <AnimatePresence>
            {/* Background Card (Next User) */}
            <motion.div
              key={`next-${nextUser.id}`}
              className="absolute inset-0 rounded-[40px] overflow-hidden bg-zinc-900"
              style={{ scale: 0.94, y: 12, opacity: 0.3, zIndex: 0 }}
            >
              <img src={nextUser.photos[0]} className="w-full h-full object-cover grayscale-[0.5]" alt="next" referrerPolicy="no-referrer" />
            </motion.div>

            {/* Current Card */}
            <motion.div
              key={user.id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x, y, rotate, opacity, zIndex: 10 }}
              className="absolute inset-0 rounded-[40px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing border border-white/10 bg-zinc-900"
            >
              {/* Tap Zones for Photo Nav */}
              <div className="absolute inset-0 z-20 flex" onClick={handlePhotoNav}>
                <div className="flex-1 h-full" />
                <div className="flex-1 h-full" />
                <div className="flex-1 h-full" />
              </div>

              {/* Photos */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={photoIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={user.photos[photoIndex]}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  alt={user.name}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Feedback Stamps */}
              <motion.div 
                style={{ opacity: likeOpacity, scale: useTransform(x, [0, 150], [0.5, 1.2]) }} 
                className="absolute top-24 left-10 border-4 border-blue-400 text-blue-400 font-black text-4xl px-6 py-2 rounded-xl rotate-[-20deg] pointer-events-none z-30 uppercase tracking-tighter shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                LIKE
              </motion.div>
              <motion.div 
                style={{ opacity: nopeOpacity, scale: useTransform(x, [0, -150], [0.5, 1.2]) }} 
                className="absolute top-24 right-10 border-4 border-red-500 text-red-500 font-black text-4xl px-6 py-2 rounded-xl rotate-[20deg] pointer-events-none z-30 uppercase tracking-tighter shadow-[0_0_30px_rgba(239,68,68,0.4)]"
              >
                NOPE
              </motion.div>
              <motion.div 
                style={{ opacity: superLikeOpacity, scale: useTransform(y, [0, -150], [0.5, 1.2]) }} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-pink-500 text-pink-500 font-black text-4xl px-6 py-2 rounded-xl pointer-events-none z-30 uppercase tracking-tighter shadow-[0_0_30px_rgba(236,72,153,0.4)]"
              >
                SUPER
              </motion.div>

              {/* Progress Bar */}
              <div className="absolute top-4 left-6 right-6 flex gap-1.5 z-30">
                {user.photos.map((_, i) => (
                  <div key={i} className="h-[2px] flex-1 rounded-full bg-white/20 overflow-hidden">
                    <motion.div 
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: i === photoIndex ? '100%' : i < photoIndex ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                ))}
              </div>

              {/* Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 z-30 pointer-events-none">
                <div className="space-y-4">
                  {/* Nom, Âge, Verified */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-black text-white tracking-tight leading-none">{user.name}, {user.age}</h2>
                      {user.verified && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <ICONS.CheckCircle2 size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Compatibility Ring */}
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/10" />
                        <motion.circle 
                          cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="3" 
                          strokeDasharray="150.8"
                          initial={{ strokeDashoffset: 150.8 }}
                          animate={{ strokeDashoffset: 150.8 - (150.8 * user.compatibility) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="text-pink-500"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[10px] font-black text-white leading-none">{user.compatibility}%</span>
                        <span className="text-[5px] font-bold uppercase tracking-widest text-white/40">Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <ICONS.MapPin size={12} className="text-pink-500" />
                      {user.distance}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="flex items-center gap-1.5">
                      <ICONS.Languages size={12} className="text-blue-400" />
                      {user.languages.join(', ')}
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-1.5">
                    {user.interests.map(interest => (
                      <span key={interest} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/80">
                        {interest}
                      </span>
                    ))}
                  </div>

                  {/* Integrated Actions - Visually Linked */}
                  <div className="pt-4 flex items-center justify-center gap-6 pointer-events-auto">
                    <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                      {/* NOPE */}
                      <motion.button 
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); swipe('left'); }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <ICONS.X size={24} />
                      </motion.button>
                      
                      {/* SUPER LIKE */}
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); swipe('up'); }}
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white gradient-premium shadow-lg shadow-pink-500/20"
                      >
                        <ICONS.Star size={24} fill="currentColor" />
                      </motion.button>

                      {/* LIKE */}
                      <motion.button 
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); swipe('right'); }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-blue-400/80 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                      >
                        <ICONS.Likes size={24} fill="currentColor" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm text-center space-y-10"
            >
              <div className="relative h-56 flex justify-center items-center">
                <div className="flex -space-x-8 relative z-10">
                  <motion.div 
                    initial={{ x: -50, rotate: -15 }}
                    animate={{ x: 0, rotate: -10 }}
                    className="w-36 h-36 rounded-[32px] border-4 border-white/10 overflow-hidden shadow-2xl"
                  >
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Me" />
                  </motion.div>
                  <motion.div 
                    initial={{ x: 50, rotate: 15 }}
                    animate={{ x: 0, rotate: 10 }}
                    className="w-36 h-36 rounded-[32px] border-4 border-white/10 overflow-hidden shadow-2xl"
                  >
                    <img src={user.photos[0]} className="w-full h-full object-cover" alt="Match" />
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute bottom-0 z-20 bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-2xl"
                >
                  C'est un Match !
                </motion.div>
              </div>

              <div className="space-y-3">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Vous et {user.name}</h2>
                <p className="text-white/40 text-sm max-w-[240px] mx-auto leading-relaxed">Envoyez un message pour briser la glace dès maintenant.</p>
              </div>

              <div className="space-y-4">
                <GlassButton variant="premium" className="w-full py-5 text-sm font-bold uppercase tracking-widest">
                  Envoyer un message
                </GlassButton>
                <button 
                  onClick={() => setShowMatch(false)}
                  className="w-full py-2 text-white/30 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                >
                  Continuer à swiper
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeScreen;
