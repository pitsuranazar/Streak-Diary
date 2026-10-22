import { useState } from 'react';
import PublicGlobalPage from './components/PublicGlobalPage';
import HomePage from './components/HomePage/HomePage';
import FriendsPage from './components/FriendsPage/FriendsPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import AuthModal from './components/Auth/AuthModal';

export default function App() {
    // Стан авторизації (за замовчуванням false - гість)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Поточна сторінка ('global', 'home', 'friends', 'profile')
    const [currentPage, setCurrentPage] = useState('global');

    // Стан модального вікна авторизації
    const [authModal, setAuthModal] = useState({
        isOpen: false,
        mode: 'login', // 'login' | 'register'
    });

    // Дані поточного користувача
    const [currentUser, setCurrentUser] = useState({
        name: 'Назар Піцура',
        initials: 'НП',
        email: 'pitsura.nazar@student.uzhnu.edu.ua',
        streak: 28,
    });

    // Обробники відкриття авторизації
    const handleOpenLogin = () => {
        setAuthModal({ isOpen: true, mode: 'login' });
    };

    const handleOpenRegister = () => {
        setAuthModal({ isOpen: true, mode: 'register' });
    };

    const handleCloseAuth = () => {
        setAuthModal({ isOpen: false, mode: 'login' });
    };

    // Успішний вхід / реєстрація
    const handleSuccessLogin = (userData) => {
        setIsLoggedIn(true);
        if (userData) {
            setCurrentUser((prev) => ({ ...prev, ...userData }));
        }
        setCurrentPage('home');
        handleCloseAuth();
    };

    // Вихід із системи
    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentPage('global');
    };

    // Навігація між сторінками
    const handleNavigate = (page) => {
        if (!isLoggedIn && page !== 'global') {
            handleOpenLogin();
            return;
        }
        setCurrentPage(page);
    };

    // Рендеринг активної сторінки
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
                    user={currentUser}
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
                        user={currentUser}
                    />
                );
            case 'friends':
                return (
                    <FriendsPage
                        currentPage={currentPage}
                        onNavigate={handleNavigate}
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                        user={currentUser}
                    />
                );
            case 'profile':
                return (
                    <ProfilePage
                        currentPage={currentPage}
                        onNavigate={handleNavigate}
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                        user={currentUser}
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
                        user={currentUser}
                    />
                );
        }
    };

    return (
        <div>
            {renderPage()}

            {/* Модальне вікно авторизації */}
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