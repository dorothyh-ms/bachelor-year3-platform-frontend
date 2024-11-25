import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SecurityContext } from '../context/SecurityContextProvider';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useContext(SecurityContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
