import { Player } from "../types/Player";
import axios from "./axios";

export const getPlayers = async (): Promise<Player[]> => {
    const response = await axios.get('/players');
    return response.data;
};

export const getPlayersByUsername = async (username: string): Promise<Player[]> => {
    const response = await axios.get(`/players?username=${username}`);
    return response.data;
};