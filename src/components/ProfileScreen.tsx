import { useNavigate } from 'react-router-dom';
import { ICONS } from '../types';
import GlassButton from './ui/GlassButton';

const ProfileScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col p-6 pb-28 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Mon Profil</h2>
        <GlassButton onClick={() => navigate('/settings')} className="py-2 px-4 rounded-full text-xs">Paramètres</GlassButton>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full p-1 gradient-premium">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full rounded-full object-cover border-4 border-black" 
              alt="Me" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center border-2 border-black">
            <ICONS.CheckCircle2 size={16} className="text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold">Alex, 26</h3>
        <p className="text-secondary">Paris, France</p>
        <button onClick={() => navigate('/profile/edit')} className="mt-4 text-sm text-[#00BFFF] font-medium">Modifier le profil</button>
      </div>

      {/* Progress */}
      <div className="glass p-6 rounded-[32px] mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Complétion du profil</span>
          <span className="text-pink-400 font-bold">85%</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-[85%] gradient-premium" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass p-4 rounded-[24px] flex flex-col items-center gap-2">
          <span className="text-2xl font-bold">1.2k</span>
          <span className="text-xs text-secondary uppercase tracking-widest">Vues</span>
        </div>
        <div className="glass p-4 rounded-[24px] flex flex-col items-center gap-2">
          <span className="text-2xl font-bold">48</span>
          <span className="text-xs text-secondary uppercase tracking-widest">Matches</span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="glass p-6 rounded-[32px]">
          <h4 className="font-bold mb-2">Bio</h4>
          <p className="text-secondary text-sm leading-relaxed">
            Passionné par le design et les voyages. J'aime découvrir de nouveaux endroits et partager des moments authentiques.
          </p>
        </div>
        
        <div className="glass p-6 rounded-[32px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ICONS.Languages className="text-pink-400" />
            <span className="font-semibold">Traduction auto</span>
          </div>
          <div className="w-12 h-6 bg-pink-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
