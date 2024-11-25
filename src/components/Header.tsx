import { createContext } from 'react';

export interface ISecurityContext {
    isAuthenticated: () => boolean;
    loggedInUser: string | undefined;
    login: () => void;
    logout: () => void;
}

const SecurityContext = createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    login: () => {},
    logout: () => {},
});

export default SecurityContext;
