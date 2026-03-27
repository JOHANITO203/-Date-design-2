import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoginMethodsPage from './pages/LoginMethodsPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import DiscoverPage from './pages/DiscoverPage';
import LikesPage from './pages/LikesPage';
import MessagesPage from './pages/MessagesPage';
import ChatPage from './pages/ChatPage';
import BoostPage from './pages/BoostPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotificationsPage from './pages/NotificationsPage';
import PreferencesPage from './pages/PreferencesPage';
import AppShell from './pages/AppShell';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <div className="h-screen w-full max-w-md mx-auto relative bg-black overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/methods" element={<LoginMethodsPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/setup" element={<ProfileSetupPage />} />

            {/* App Shell with BottomNav */}
            <Route element={<AppShell />}>
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/likes" element={<LikesPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/boost" element={<BoostPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Sub-screens / Full-screen views */}
            <Route path="/chat/:userId" element={<ChatPage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/settings" element={<AccountSettingsPage />} />
            <Route path="/settings/privacy" element={<PrivacyPage />} />
            <Route path="/settings/notifications" element={<NotificationsPage />} />
            <Route path="/settings/preferences" element={<PreferencesPage />} />

            {/* Fallback */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
