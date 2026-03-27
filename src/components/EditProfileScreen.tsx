import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5 border border-white/10">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Edit Profile</h1>
        <button className="text-[#00BFFF] font-medium">Save</button>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="col-span-2 row-span-2 aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative">
          <img src="https://picsum.photos/seed/user1/400/400" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <button className="absolute bottom-3 right-3 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Camera size={16} />
          </button>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
            <Plus size={24} className="text-white/10" />
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <section>
          <label className="text-xs uppercase tracking-widest text-[#8E8E93] font-bold mb-2 block">About Me</label>
          <textarea 
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-white/20 min-h-[120px]"
            placeholder="Tell them something interesting..."
            defaultValue="Digital nomad, coffee lover, and amateur photographer. Looking for someone to explore hidden gems with."
          />
        </section>

        <section>
          <label className="text-xs uppercase tracking-widest text-[#8E8E93] font-bold mb-2 block">Interests</label>
          <div className="flex flex-wrap gap-2">
            {['Travel', 'Photography', 'Coffee', 'Music', 'Hiking'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                {tag}
              </span>
            ))}
            <button className="px-4 py-2 rounded-full border border-dashed border-white/20 text-sm text-white/40">
              + Add
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditProfileScreen;
