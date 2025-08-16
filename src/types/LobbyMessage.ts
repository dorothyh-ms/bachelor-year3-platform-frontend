export type LobbyMessageType = "CHAT" | "JOIN" | "LEAVE";

export type LobbyMessage = {
    lobbyId: string;
    senderId: string;
    senderName: string;
    content: string;
    type: LobbyMessageType;
    createdAt: string; // ISO string from backend
};
