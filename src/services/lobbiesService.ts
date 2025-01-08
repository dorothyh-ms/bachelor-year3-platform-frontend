import { Lobby } from '../types/Lobby';
import axios from './axios';

export const fetchLobbies = async ():Promise<Lobby[]> => {
    const response = await axios.get('/lobbies');
    return response.data;
};

export const createLobby = async (gameId: string) => {
    const response = await axios.post(`/games/${gameId}/lobbies`);
    return response.data;
};


export async function joinLobby(lobbyId: string) : Promise<Lobby>   {
    const {data: lobby} = await axios.patch<Lobby>(`/lobbies/${lobbyId}`);
    return lobby;
}