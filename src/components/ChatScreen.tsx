import { useState } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICONS, MOCK_USERS } from '../types';

const ChatScreen = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showTranslation, setShowTranslation] = useState(false);
  
  const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
  
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="absolute inset-0 z-50 bg-black flex flex-col"
    >
      {/* Header */}
      <div className="glass p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2"><ICONS.ChevronLeft /></button>
          <div className="relative">
            <img src={user.photos[0]} className="w-10 h-10 rounded-full object-cover" alt={user.name} referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
          </div>
          <div>
            <h4 className="font-bold">{user.name}</h4>
            <span className="text-[10px] text-green-400 uppercase font-bold tracking-widest">En ligne</span>
          </div>
        </div>
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className={`p-2 rounded-full transition-colors ${showTranslation ? 'bg-pink-500 text-white' : 'glass text-secondary'}`}
        >
          <ICONS.Languages size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="flex justify-center">
          <span className="glass px-4 py-1 rounded-full text-[10px] text-secondary uppercase tracking-widest">Aujourd'hui</span>
        </div>

        <div className="flex gap-3 max-w-[80%]">
          <img src={user.photos[0]} className="w-8 h-8 rounded-full object-cover self-end" alt="" referrerPolicy="no-referrer" />
          <div className="space-y-1">
            <div className="glass p-4 rounded-[24px] rounded-bl-none text-sm">
              Hey! I saw your profile and loved your photography. Where was that last photo taken?
            </div>
            {showTranslation && (
              <div className="text-[10px] text-pink-400 font-medium px-2 flex items-center gap-1">
                <ICONS.Languages size={10} /> Traduction: Salut ! J'ai vu ton profil et j'ai adoré tes photos...
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 ml-auto max-w-[80%]">
          <div className="gradient-premium p-4 rounded-[24px] rounded-br-none text-sm">
            Thanks! It was taken in Iceland last summer. Have you ever been there?
          </div>
          <span className="text-[10px] text-secondary pr-2">Lu 14:25</span>
        </div>

        <div className="flex gap-3 max-w-[80%]">
          <img src={user.photos[0]} className="w-8 h-8 rounded-full object-cover self-end" alt="" referrerPolicy="no-referrer" />
          <div className="glass p-4 rounded-[24px] rounded-bl-none text-sm">
            Not yet, but it's on my bucket list! 🇮🇸
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-6 pb-10">
        <div className="glass rounded-[32px] p-2 flex items-center gap-2">
          <button className="p-3 text-secondary hover:text-white transition-colors">
            <ICONS.Globe size={20} />
          </button>
          <input 
            type="text" 
            placeholder="Écrire un message..." 
            className="flex-1 bg-transparent outline-none text-sm px-2"
          />
          <button className="w-10 h-10 gradient-premium rounded-full flex items-center justify-center shadow-lg shadow-pink-500/20">
            <ICONS.Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatScreen;
