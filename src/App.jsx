import { useState } from 'react';
import PublicGlobalPage from './components/PublicGlobalPage';
import HomePage from './components/HomePage/HomePage';
import FriendsPage from './components/FriendsPage/FriendsPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import AuthModal from './components/Auth/AuthModal';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('global');
    const [authModal, setAuthModal] = useState({
        isOpen: false,
        mode: 'login',
    });

    const handleOpenLogin = () => {
        setAuthModal({ isOpen: true, mode: 'login' });
    };

    const handleOpenRegister = () => {
        setAuthModal({ isOpen: true, mode: 'register' });
    };

    const handleCloseAuth = () => {
        setAuthModal({ isOpen: false, mode: 'login' });
    };

    const handleSuccessLogin = () => {
        setIsLoggedIn(true);
        setCurrentPage('home');
        handleCloseAuth();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentPage('global');
    };

    const handleNavigate = (page) => {
        if (!isLoggedIn && page !== 'global') {
            handleOpenLogin();
            return;
        }
        setCurrentPage(page);
    };

    const renderPage = () => {
        if (!isLoggedIn || currentPage === 'global') {
            return (
                <PublicGlobalPage
                    isLoggedIn={isLoggedIn}
                    currentPage={currentPage}
                    onNavigate={handleNavigate}
                    onOpenLogin={handleOpenLogin}
                    onOpenRegister={handleOpenRegister}
                    onLogout={handleLogout}
                />
            );
        }

        switch (currentPage) {
            case 'home':
                return (
                    <HomePage
                        currentPage={currentPage}
                        onNavigate={handleNavigate}
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                    />
                );
            case 'friends':
                return (
                    <FriendsPage
                        currentPage={currentPage}
                        onNavigate={handleNavigate}
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                    />
                );
            case 'profile':
                return (
                    <ProfilePage
                        currentPage={currentPage}
                        onNavigate={handleNavigate}
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                    />
                );
            default:
                return (
                    <PublicGlobalPage
                        isLoggedIn={isLoggedIn}
                        currentPage={currentPage}
                        onNavigate={handleNavigate}
                        onOpenLogin={handleOpenLogin}
                        onOpenRegister={handleOpenRegister}
                        onLogout={handleLogout}
                    />
                );
        }
    };

    return (
        <div>
            {renderPage()}

            {authModal.isOpen && (
                <AuthModal
                    initialMode={authModal.mode}
                    onClose={handleCloseAuth}
                    onSuccessLogin={handleSuccessLogin}
                />
            )}
        </div>
    );
}