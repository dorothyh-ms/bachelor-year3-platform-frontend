import { useState, useEffect } from "react";
import axios from "axios";
import { Game } from "../types/Game";

const useFavorites = () => {
    const [favorites, setFavorites] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchFavorites = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/favorites");
            setFavorites(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const addFavorite = async (game: Game) => {
        const token = localStorage.getItem('access_token');
        try {
            if (!token) {
                throw new Error('No access token found');
            }

            console.log(`Adding favorite: ${game.id}`);
            await axios.post(`http://localhost:8091/api/favorites/${game.id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            setFavorites((prev) => [...prev, game]);
        } catch (error) {
            console.error("Failed to add favorite:", error);
        }
    };


    const removeFavorite = async (gameId: string) => {
        try {
            await axios.delete(`/favorites/${gameId}`);
            setFavorites((prev) => prev.filter((fav) => fav.id !== gameId));
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return { favorites, isLoading, isError, addFavorite, removeFavorite };
};

export default useFavorites;
