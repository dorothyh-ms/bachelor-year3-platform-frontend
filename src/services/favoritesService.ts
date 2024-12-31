import axiosApi from "./axios";
import {Favorite} from "../types/Favorite";


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
    } catch (error) {
        console.error("Error adding to favorites:", error.response || error.message);
        throw new Error("Failed to add to favorites");
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
    } catch (error) {
        console.error("Error removing from favorites:", error.response || error.message);
        throw new Error("Failed to remove from favorites");
    }
};
