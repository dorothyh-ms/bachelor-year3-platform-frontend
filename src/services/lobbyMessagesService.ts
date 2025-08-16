import axiosApi from "./axios";
import { LobbyMessage } from "../types/LobbyMessage.ts";

export async function fetchLobbyMessages(lobbyId: string, limit = 50): Promise<LobbyMessage[]> {
    const res = await axiosApi.get<LobbyMessage[]>(`/lobbies/${lobbyId}/messages`, {
        params: { limit },
    });
    return res.data;
}
