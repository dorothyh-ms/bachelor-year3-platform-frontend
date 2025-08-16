import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function createStompClient(onConnect?: () => void) {
    const client = new Client({
        webSocketFactory: () => new SockJS(`${import.meta.env.VITE_API_BASE ?? ''}/ws`), // /api/ws
        reconnectDelay: 3000,
        onConnect,
    });
    return client;
}
