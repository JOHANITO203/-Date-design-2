import { motion } from 'motion/react';
import { ICONS } from '../types';
import GlassButton from './ui/GlassButton';
import { useState } from 'react';

const TIERS = [
  {
    id: 'essential',
    name: 'VIBE Essential',
    price: '9.99',
    color: 'from-slate-400 to-slate-600',
    shadow: 'shadow-slate-500/20',
    features: [
      'Voir qui vous a liké',
      '5 Super Likes par jour',
      'Likes illimités',
      'Zéro publicité'
    ],
    badge: 'Basique'
  },
  {
    id: 'gold',
    name: 'VIBE Gold',
    price: '19.99',
    color: 'from-amber-400 via-yellow-500 to-amber-600',
    shadow: 'shadow-amber-500/30',
    features: [
      'Tout de Essential',
      'Passeport (Monde entier)',
      'Rewind illimité',
      '1 Boost gratuit par mois',
      'Cacher son âge/distance'
    ],
    badge: 'Populaire',
    popular: true
  },
  {
    id: 'platinum',
    name: 'VIBE Platinum',
    price: '34.99',
    color: 'from-indigo-400 via-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/30',
    features: [
      'Tout de Gold',
      'Priorité sur les Likes',
      'Message avant le match',
      'Voir qui est en ligne',
      '2 Boosts gratuits par mois'
    ],
    badge: 'Elite'
  }
];

const BoostScreen = () => {
  const [activeTier, setActiveTier] = useState(1); // Gold by default

  return (
    <div className="h-full flex flex-col bg-black overflow-y-auto no-scrollbar pb-32">
      {/* Hero Section with Atmospheric Background */}
      <div className="relative pt-12 pb-8 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] bg-[radial-gradient(circle_at_50%_30%,#3a1510_0%,transparent_60%),radial-gradient(circle_at_10%_80%,#f27d26_0%,transparent_50%)] blur-[60px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 mb-2">
            <ICONS.Sparkles size={12} className="text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Offres Premium</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
            Libérez votre <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Potentiel</span>
          </h1>
          <p className="text-secondary text-sm max-w-[280px] mx-auto font-medium">
            Multipliez vos chances de rencontres par 10 avec nos outils exclusifs.
          </p>
        </motion.div>
      </div>

      {/* Tiers Horizontal Scroll */}
      <div className="px-6 space-y-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.id}
              onClick={() => setActiveTier(idx)}
              className={`min-w-[280px] snap-center glass rounded-[40px] p-8 border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                activeTier === idx 
                  ? 'border-white/20 bg-white/5 scale-100' 
                  : 'border-white/5 bg-white/[0.02] scale-95 opacity-60'
              }`}
            >
              {/* Decorative Background Glow */}
              {activeTier === idx && (
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${tier.color} blur-[60px] opacity-20`} />
              )}

              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r ${tier.color} text-black`}>
                      {tier.badge}
                    </span>
                    <h3 className="text-2xl font-black italic tracking-tight">{tier.name}</h3>
                  </div>
                  {tier.popular && (
                    <div className="p-2 glass rounded-xl text-amber-400">
                      <ICONS.Star size={16} fill="currentColor" />
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tighter">{tier.price}€</span>
                  <span className="text-secondary text-xs font-bold uppercase tracking-widest">/ mois</span>
                </div>

                <div className="space-y-3">
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tier.color}`} />
                      <span className="text-xs font-medium text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <GlassButton 
            className={`w-full py-6 rounded-[24px] text-sm font-black uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 ${TIERS[activeTier].shadow}`}
            style={{ 
              background: activeTier === 1 ? 'linear-gradient(to right, #f59e0b, #d97706)' : undefined,
              color: activeTier === 1 ? 'black' : 'white'
            }}
          >
            S'abonner à {TIERS[activeTier].name.split(' ')[1]}
          </GlassButton>
          <p className="text-[10px] text-center text-white/30 uppercase tracking-widest font-bold">
            Annulation possible à tout moment • Paiement sécurisé
          </p>
        </motion.div>

        {/* Standalone Boost Section */}
        <div className="pt-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black italic uppercase tracking-tight">Boosts Flash</h3>
            <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Voir tout</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-[32px] border-orange-500/20 bg-orange-500/5 group hover:border-orange-500/40 transition-all">
              <div className="w-10 h-10 gradient-boost rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                <ICONS.Boost size={20} className="text-black" />
              </div>
              <div className="space-y-1">
                <span className="block text-sm font-black italic">10 Boosts</span>
                <span className="block text-[10px] text-orange-400 font-bold uppercase tracking-widest">19,99 €</span>
              </div>
            </div>

            <div className="glass p-6 rounded-[32px] border-white/5 hover:border-white/20 transition-all">
              <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center mb-4">
                <ICONS.Boost size={20} className="text-white" />
              </div>
              <div className="space-y-1">
                <span className="block text-sm font-black italic">1 Boost</span>
                <span className="block text-[10px] text-secondary font-bold uppercase tracking-widest">3,99 €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Premium? Section */}
        <div className="pt-8 pb-12 space-y-6">
          <h3 className="text-lg font-black italic uppercase tracking-tight px-2">Pourquoi passer Premium ?</h3>
          <div className="space-y-4">
            {[
              { icon: <ICONS.Heart className="text-pink-500" />, title: "Plus de Matches", desc: "Les profils Premium reçoivent en moyenne 3x plus de matches." },
              { icon: <ICONS.Shield className="text-blue-500" />, title: "Sécurité Maximale", desc: "Vérification de profil prioritaire et filtres de sécurité avancés." },
              { icon: <ICONS.Zap className="text-amber-500" />, title: "Gain de Temps", desc: "Ne perdez plus de temps à swiper, voyez directement qui vous aime." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 glass rounded-[24px] border-white/5">
                <div className="shrink-0 w-10 h-10 glass rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  <p className="text-xs text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostScreen;
