import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <main className="pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppShell;
