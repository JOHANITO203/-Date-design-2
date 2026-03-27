import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Users, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PreferencesScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5 border border-white/10">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Preferences</h1>
      </header>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-[#00BFFF]" />
              <h3 className="font-medium">Distance</h3>
            </div>
            <span className="text-sm font-bold">50 km</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#FF1493] to-[#00BFFF] rounded-full" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-black" />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-[#FF1493]" />
              <h3 className="font-medium">Age Range</h3>
            </div>
            <span className="text-sm font-bold">22 - 35</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full relative">
            <div className="absolute left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-[#FF1493] to-[#00BFFF] rounded-full" />
            <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-black" />
            <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-black" />
          </div>
        </section>

        <section>
          <h3 className="font-medium mb-4 flex items-center gap-3">
            <Users size={20} className="text-[#FFD166]" />
            Show Me
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {['Men', 'Women', 'Everyone'].map((option) => (
              <button 
                key={option}
                className={`py-3 rounded-2xl border text-sm font-medium transition-all ${
                  option === 'Women' 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-transparent border-white/10 text-[#8E8E93]'
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
