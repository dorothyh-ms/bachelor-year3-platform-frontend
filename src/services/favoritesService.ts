import axiosApi from "./axios";
import { Game } from "../types/Game";

// Add a game to favorites
export const addToFavorites = async (
    playerId: string,
    gameId: string
): Promise<void> => {
    await axiosApi.post(`/favorites/${playerId}/${gameId}`);
};

// Remove a game from favorites
export const removeFromFavorites = async (
    playerId: string,
    gameId: string
): Promise<void> => {
    await axiosApi.delete(`/favorites/${playerId}/${gameId}`);
};

// Fetch the list of favorite games for a player
export const fetchFavorites = async (playerId: string): Promise<Game[]> => {
    const response = await axiosApi.get(`/favorites/${playerId}`);
    return response.data; // Ensure this returns an array of Game objects
};
