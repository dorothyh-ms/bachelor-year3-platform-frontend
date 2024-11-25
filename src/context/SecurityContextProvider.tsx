import React, { createContext, useState, useEffect, ReactNode } from 'react';
import keycloak, { initializeKeycloak } from '../keycloak';
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '../services/auth';

interface ISecurityContext {
    isAuthenticated: boolean;
    loggedInUser: string | undefined;
    login: () => void;
    logout: () => void;
}

export const SecurityContext = createContext<ISecurityContext>({
    isAuthenticated: false,
    loggedInUser: undefined,
    login: () => {},
    logout: () => {},
});

const SecurityContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined);

    useEffect(() => {
        const initialize = async () => {
            try {
                await initializeKeycloak();
                setIsAuthenticated(keycloak.authenticated || false);
                if (keycloak.authenticated) {
                    addAccessTokenToAuthHeader(keycloak.token);
                    setLoggedInUser(keycloak.idTokenParsed?.given_name);
                }
            } catch (error) {
                console.error('Failed to initialize Keycloak:', error);
            }
        };

        initialize();
    }, []);

    const login = () => keycloak.login();
    const logout = () => {
        keycloak.logout({ redirectUri: import.meta.env.VITE_REACT_APP_URL });
        removeAccessTokenFromAuthHeader();
        setIsAuthenticated(false);
    };

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated,
                loggedInUser,
                login,
                logout,
            }}
        >
            {children}
        </SecurityContext.Provider>
    );
};

export default SecurityContextProvider;
