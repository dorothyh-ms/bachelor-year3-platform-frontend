import  {  useState, useEffect, ReactNode } from 'react';
import Keycloak from 'keycloak-js'
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '../services/auth';
import {isExpired} from 'react-jwt';
import SecurityContext from "./SecurityContext"
import { useRecordLogin } from '../hooks/useRecordLogin';
import User from '../types/User';
interface IWithChildren {
    children: ReactNode
}

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
}

const keycloak: Keycloak = new Keycloak(keycloakConfig)


export default function SecurityContextProvider({children}: IWithChildren) {
    const {recordLogin} = useRecordLogin();
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

    useEffect(() => {

        keycloak.init({onLoad: 'login-required'}).then((authenticated) => {
            if (authenticated){
                recordLogin();
            }
        })
    }, [])

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token)
        if(keycloak.idTokenParsed){
            console.log(keycloak)
        setLoggedInUser({
            playerId: keycloak.idTokenParsed.sub ?? "",
            username: keycloak.idTokenParsed.given_name,
            roles : keycloak.tokenParsed?.realm_access?.roles ?? []
        });
       
    }
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.given_name)
        })
    }

    function login() {
        keycloak.login()
    }

    function logout() {
        const logoutOptions = {redirectUri: import.meta.env.VITE_REACT_APP_URL}
        keycloak.logout(logoutOptions)
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token)
        else return false
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
};


