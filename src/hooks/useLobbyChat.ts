// src/hooks/useLobbyChat.ts
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { LobbyMessage, LobbyMessageType } from "../types/LobbyMessage";
import SecurityContext from "../context/SecurityContext";

type OnMessage = (m: LobbyMessage) => void;

export function useLobbyChat(lobbyId?: string, onMessage?: OnMessage) {
    const { loggedInUser } = useContext(SecurityContext);
    const [connected, setConnected] = useState(false);
    const clientRef = useRef<Client | null>(null);
    const subRef = useRef<StompSubscription | null>(null);

    // Memoize the callback so it's stable
    const stableOnMessage = useCallback(onMessage, [onMessage]);

    useEffect(() => {
        if (!lobbyId) return;

        // Use backend URL from .env
        const sockUrl = `${import.meta.env.VITE_API_URL?.replace(/\/+$/, "")}/ws`;

        const client = new Client({
            webSocketFactory: () => new SockJS(sockUrl),
            reconnectDelay: 3000,
            onConnect: () => {
                setConnected(true);
                subRef.current = client.subscribe(`/topic/lobbies/${lobbyId}`, (msg: IMessage) => {
                    try {
                        const data = JSON.parse(msg.body);
                        if (stableOnMessage) stableOnMessage(data);
                    } catch {
                        // handle error
                    }
                });
            },
            onStompError: () => setConnected(false),
            onWebSocketClose: () => setConnected(false),
        });

        client.activate();
        clientRef.current = client;

        return () => {
            if (subRef.current) subRef.current.unsubscribe();
            client.deactivate();
            clientRef.current = null;
            setConnected(false);
        };
    }, [lobbyId, stableOnMessage]);

    function sendChat(content: string, type: LobbyMessageType = "CHAT") {
        if (!clientRef.current || !connected || !lobbyId || !loggedInUser) return;
        const payload: LobbyMessage = {
            lobbyId,
            senderId: loggedInUser.playerId,
            senderName: loggedInUser.username,
            content,
            type,
            createdAt: new Date().toISOString(),
        };
        clientRef.current.publish({
            destination: `/app/lobbies/${lobbyId}/chat`,
            body: JSON.stringify(payload),
        });
    }

    return { connected, sendChat };
}