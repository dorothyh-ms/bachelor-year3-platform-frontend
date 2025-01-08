import axiosApi from "./axios";
import {Favorite} from "../types/Favorite";
import {AxiosError} from "axios";


export const fetchFavorites = async (): Promise<Favorite[]> => {
    const response = await axiosApi.get("/favorites");
    console.log("Favorites API Response:", response.data);


    return response.data.map((fav: any) => ({
        favoriteId: fav.favoriteId,
        game: {
            id: fav.gameId,
            name: fav.gameName,
            genre: fav.genre,
            difficulty: fav.difficultyLevel,
            price: fav.price,
            description: fav.description,
            image: fav.image,
        },
    }));
};

export const addToFavorites = async (gameId: string): Promise<void> => {
    if (!gameId) {
        console.error("Invalid gameId:", gameId);
        throw new Error("Invalid gameId");
    }

    try {
        const response = await axiosApi.post("/favorites", {gameId});
        console.log("Added to favorites:", response.data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Error adding to favorites:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to add to favorites");
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};


export const removeFromFavorites = async (favoriteId: string): Promise<void> => {
    if (!favoriteId) {
        console.error("Invalid favoriteId:", favoriteId);
        throw new Error("Invalid favoriteId");
    }

    try {
        const response = await axiosApi.delete(`/favorites/${favoriteId}`);
        console.log("Removed from favorites:", response.data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Error removing from favorites:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to remove from favorites");
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};

