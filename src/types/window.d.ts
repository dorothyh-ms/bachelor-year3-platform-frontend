// src/types/window.d.ts
import type Keycloak from "keycloak-js";

declare global {
    interface Window {
        kc?: Keycloak;
    }
}

export {};
