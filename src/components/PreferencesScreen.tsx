import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Calendar, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PreferencesScreenProps {
  embedded?: boolean;
}

const PreferencesScreen: React.FC<PreferencesScreenProps> = ({ embedded }) => {
  const navigate = useNavigate();

  const containerClasses = embedded 
    ? "h-full p-8 space-y-10" 
    : "min-h-full bg-black text-white p-6 pb-28";

  return (
    <div className={containerClasses}>
      {!embedded && (
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full glass hover-effect">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Préférences</h1>
        </header>
      )}

      {embedded && <h2 className="text-2xl font-bold mb-8">Préférences</h2>}

      <div className="space-y-10">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 text-pink-500">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-sm">Distance maximale</h3>
            </div>
            <span className="text-sm font-black text-pink-500">50 km</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-xl border-4 border-black cursor-pointer" />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 text-pink-500">
                <Calendar size={20} />
              </div>
              <h3 className="font-bold text-sm">Tranche d'âge</h3>
            </div>
            <span className="text-sm font-black text-pink-500">22 - 35</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full relative">
            <div className="absolute left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full" />
            <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-xl border-4 border-black cursor-pointer" />
            <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-xl border-4 border-black cursor-pointer" />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="font-bold text-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 text-pink-500">
              <Users size={20} />
            </div>
            Afficher
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {['Hommes', 'Femmes', 'Tous'].map((option) => (
              <button 
                key={option}
                className={`py-4 rounded-[20px] border text-xs font-black uppercase tracking-widest transition-all ${
                  option === 'Femmes' 
                    ? 'bg-white/10 border-white/20 text-white shadow-lg' 
                    : 'bg-transparent border-white/5 text-secondary hover:border-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PreferencesScreen;
