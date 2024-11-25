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
        try {
            const authenticated = await keycloak.init({
                onLoad: 'login-required', // Ensures user is redirected to login if not authenticated
                checkLoginIframe: true,   // Check login status using the Keycloak session
            });

            if (authenticated) {
                localStorage.setItem('access_token', keycloak.token || '');
                localStorage.setItem('refresh_token', keycloak.refreshToken || '');
            } else {
                console.log('User is not authenticated.');
            }

            // Set up token refresh interval (Refresh token every 5 minutes)
            setInterval(async () => {
                if (keycloak.token && keycloak.isTokenExpired(5)) {
                    try {
                        const refreshed = await keycloak.updateToken(30); // Refresh if token is expired or close to expiry
                        if (refreshed) {
                            localStorage.setItem('access_token', keycloak.token || '');
                            console.log('Token refreshed');
                        }
                    } catch (error) {
                        console.error('Failed to refresh token', error);
                    }
                }
            }, 60000); // Check every 1 minute

        } catch (error) {
            console.error('Failed to initialize Keycloak:', error);
        }
        isKeycloakInitialized = true;
    }
};

// Function to get the access token from localStorage
export const getAccessToken = (): string | null => {
    return localStorage.getItem('access_token');
};

// Function to get the refresh token from localStorage
export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refresh_token');
};

// Function to log out the user and clear tokens
export const logoutKeycloak = () => {
    keycloak.logout({
        redirectUri: window.location.origin, // Redirect after logout
    }).then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }).catch((error) => {
        console.error('Logout failed', error);
    });
};

export default keycloak;
