import axiosApi from "./axios";
import { Lobby } from "../types/Lobby";

export async function fetchLobbies(): Promise<Lobby[]> {
    const res = await axiosApi.get<Lobby[]>("/lobbies");
    if (res.status === 204) return [];
    return res.data;
}

export async function fetchLobby(lobbyId: string): Promise<Lobby> {
    const res = await axiosApi.get<Lobby>(`/lobbies/${lobbyId}`);
    return res.data;
}

export async function deleteLobby(lobbyId: string): Promise<void> {
    await axiosApi.delete(`/lobbies/${lobbyId}`);
}

export async function leaveLobby(lobbyId: string): Promise<void> {
    await axiosApi.post(`/lobbies/${lobbyId}/leave`);
}

export async function createLobby(gameId: string): Promise<Lobby> {
    const res = await axiosApi.post<Lobby>(`/games/${gameId}/lobbies`);
    return res.data;
}

export async function joinLobby(lobbyId: string): Promise<Lobby> {
    const res = await axiosApi.patch<Lobby>(`/lobbies/${lobbyId}`);
    return res.data;
}