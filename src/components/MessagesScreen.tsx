import { useNavigate } from 'react-router-dom';
import { ICONS, MOCK_USERS } from '../types';

const MessagesScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col p-6 pb-28">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Messages</h2>
        <button onClick={() => navigate('/settings')} className="glass p-2 rounded-full"><ICONS.Settings size={20} /></button>
      </div>

      {/* New Matches */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Nouveaux matches</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <div onClick={() => navigate('/likes')} className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-16 h-16 rounded-full gradient-premium p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <ICONS.Likes size={24} className="text-white" />
              </div>
            </div>
            <span className="text-xs font-medium">99+ Likes</span>
          </div>
          {MOCK_USERS.map(user => (
            <div key={user.id} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => navigate(`/chat/${user.id}`)}>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500/50">
                <img src={user.photos[0]} className="w-full h-full object-cover" alt={user.name} referrerPolicy="no-referrer" />
              </div>
              <span className="text-xs font-medium">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversations */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Conversations</h3>
        {MOCK_USERS.map(user => (
          <div 
            key={user.id} 
            onClick={() => navigate(`/chat/${user.id}`)}
            className="flex items-center gap-4 glass p-4 rounded-[24px] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="relative">
              <img src={user.photos[0]} className="w-14 h-14 rounded-full object-cover" alt={user.name} referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{user.name}</span>
                <span className="text-xs text-secondary">14:20</span>
              </div>
              <p className="text-sm text-secondary line-clamp-1">Hey! How are you doing today? I saw your profile and...</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold">2</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesScreen;
