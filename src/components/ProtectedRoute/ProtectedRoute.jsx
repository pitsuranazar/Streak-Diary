import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isLoggedIn, onRequireAuth, children }) {
    useEffect(() => {
        if (!isLoggedIn && onRequireAuth) {
            onRequireAuth();
        }
    }, [isLoggedIn, onRequireAuth]);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}
