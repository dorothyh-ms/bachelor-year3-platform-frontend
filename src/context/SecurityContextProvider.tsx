// src/context/SecurityContextProvider.tsx
import { useState, useEffect, ReactNode } from "react";
import Keycloak, { KeycloakConfig } from "keycloak-js";
import { isExpired } from "react-jwt";
import SecurityContext from "./SecurityContext";
import { useRecordLogin } from "../hooks/useRecordLogin";
import User from "../types/User";

// ---- Types ----
interface IWithChildren {
    children: ReactNode;
}

// Minimal shape for the ID token claims we use
interface KCIdTokenParsed {
    sub?: string;
    preferred_username?: string;
    given_name?: string;
    // allow other claims without using `any`
    [claim: string]: unknown;
}

// Expose kc on window without `any`
declare global {
    interface Window {
        kc?: Keycloak;
    }
}

// ---- Keycloak init ----
const keycloakConfig: KeycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
};

const keycloak = new Keycloak(keycloakConfig);

// ---- Helpers ----
function buildUserFromToken(idTokenParsed: KCIdTokenParsed | undefined, roles: string[] | undefined): User | undefined {
    if (!idTokenParsed) return undefined;
    const username =
        idTokenParsed.preferred_username ??
        idTokenParsed.given_name ??
        ""; // fallback to empty to keep type happy

    return {
        playerId: idTokenParsed.sub ?? "",
        username,
        roles: roles ?? [],
    };
}

export default function SecurityContextProvider({ children }: IWithChildren) {
    const { recordLogin } = useRecordLogin();
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

    // Initial KC bootstrap
    useEffect(() => {
        void keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
            if (!authenticated) return;

            // expose for axios interceptor
            window.kc = keycloak;

            // record login (ignore returned promise intentionally)
            void recordLogin();

            // set initial user
            const roles = keycloak.tokenParsed?.realm_access?.roles as string[] | undefined;
            const user = buildUserFromToken(keycloak.idTokenParsed as KCIdTokenParsed | undefined, roles);
            if (user) setLoggedInUser(user);
        });
    }, [recordLogin]);

    // KC event handlers
    keycloak.onAuthSuccess = () => {
        window.kc = keycloak;
        const roles = keycloak.tokenParsed?.realm_access?.roles as string[] | undefined;
        const user = buildUserFromToken(keycloak.idTokenParsed as KCIdTokenParsed | undefined, roles);
        if (user) setLoggedInUser(user);
    };

    keycloak.onAuthLogout = () => {
        window.kc = undefined;
        setLoggedInUser(undefined);
    };

    keycloak.onAuthError = () => {
        // keep kc but clear user
        setLoggedInUser(undefined);
    };

    keycloak.onTokenExpired = () => {
        // refresh and update user; if it fails, trigger login
        void keycloak
            .updateToken(30)
            .then(() => {
                window.kc = keycloak;
                const roles = keycloak.tokenParsed?.realm_access?.roles as string[] | undefined;
                const user = buildUserFromToken(keycloak.idTokenParsed as KCIdTokenParsed | undefined, roles);
                if (user) setLoggedInUser(user);
            })
            .catch(() => {
                void keycloak.login();
            });
    };

    // API exposed to context
    function login() {
        void keycloak.login();
    }

    function logout() {
        const logoutOptions = { redirectUri: import.meta.env.VITE_REACT_APP_URL as string };
        void keycloak.logout(logoutOptions);
    }

    function isAuthenticated() {
        return keycloak.token ? !isExpired(keycloak.token) : false;
    }

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
}
