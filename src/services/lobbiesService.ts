import axios from './axios';

export const fetchLobbies = async () => {
    const response = await axios.get('/lobbies');
    return response.data;
};

export const createLobby = async (gameId: string) => {
    const response = await axios.post('/lobbies', { gameId });
    return response.data;
};

export const joinLobby = async (lobbyId: string) => {
    const response = await axios.patch(`/lobbies/${lobbyId}`);
    return response.data;
};
