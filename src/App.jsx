import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PublicGlobalPage from './components/PublicGlobalPage';
import HomePage from './components/HomePage/HomePage';
import FriendsPage from './components/FriendsPage/FriendsPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AuthModal from './components/Auth/AuthModal';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authModal, setAuthModal] = useState({
        isOpen: false,
        mode: 'login',
    });

    const navigate = useNavigate();

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
        handleCloseAuth();
        navigate('/home');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div>
            <Routes>
                {/* Публічний маршрут глобальної стрічки */}
                <Route
                    path="/"
                    element={
                        <PublicGlobalPage
                            isLoggedIn={isLoggedIn}
                            onOpenLogin={handleOpenLogin}
                            onOpenRegister={handleOpenRegister}
                            onLogout={handleLogout}
                        />
                    }
                />
                <Route
                    path="/global"
                    element={<Navigate to="/" replace />}
                />

                {/* Захищені приватні маршрути */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute
                            isLoggedIn={isLoggedIn}
                            onRequireAuth={handleOpenLogin}
                        >
                            <HomePage
                                isLoggedIn={isLoggedIn}
                                onLogout={handleLogout}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/friends"
                    element={
                        <ProtectedRoute
                            isLoggedIn={isLoggedIn}
                            onRequireAuth={handleOpenLogin}
                        >
                            <FriendsPage
                                isLoggedIn={isLoggedIn}
                                onLogout={handleLogout}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute
                            isLoggedIn={isLoggedIn}
                            onRequireAuth={handleOpenLogin}
                        >
                            <ProfilePage
                                isLoggedIn={isLoggedIn}
                                onLogout={handleLogout}
                            />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback для неіснуючих маршрутів */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

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