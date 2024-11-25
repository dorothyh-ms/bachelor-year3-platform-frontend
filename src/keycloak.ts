import Keycloak from 'keycloak-js';

// Create the Keycloak instance
const keycloak = new Keycloak({
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
});

let isKeycloakInitialized = false;

export const initializeKeycloak = async (): Promise<void> => {
    if (!isKeycloakInitialized) {
        await keycloak.init({ onLoad: 'login-required' });
        isKeycloakInitialized = true;
    }
};

export default keycloak;
