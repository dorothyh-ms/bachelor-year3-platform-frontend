import axiosApi from "./axios";
import {Favorite} from "../types/Favorite";


export const fetchFavorites = async (): Promise<Favorite[]> => {
    const response = await axiosApi.get<Favorite[]>("/favorites");
    if (!Array.isArray(response.data)) {
        throw new Error("Invalid response: Expected an array");
    }
    return response.data;
};


export const addToFavorites = async (gameId: string): Promise<void> => {
    await axiosApi.post("/favorites", {gameId});
};


export const removeFromFavorites = async (favoriteId: string): Promise<void> => {
    await axiosApi.delete(`/favorites/${favoriteId}`);
};
