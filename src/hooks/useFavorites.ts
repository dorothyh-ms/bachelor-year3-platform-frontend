import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
} from "../services/favoritesService";
import { Game } from "../types/Game";

// Define the query key explicitly
const favoritesQueryKey = (playerId: string): [string, string] => ["favorites", playerId];

// Fetch the list of favorite games for a player
export function useFavorites(playerId: string) {
    return useQuery<Game[], Error>({
        queryKey: favoritesQueryKey(playerId),
        queryFn: () => fetchFavorites(playerId),
        retry: 1, // Retry once on failure
        refetchOnWindowFocus: false, // Do not refetch on window focus
    });
}

// Add a game to favorites
export function useAddToFavorites() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, { playerId: string; gameId: string }>({
        mutationFn: ({ playerId, gameId }) => addToFavorites(playerId, gameId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: favoritesQueryKey(variables.playerId),
            }); // Correct usage of queryKey with queryClient.invalidateQueries
        },
    });
}

// Remove a game from favorites
export function useRemoveFromFavorites() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, { playerId: string; gameId: string }>({
        mutationFn: ({ playerId, gameId }) => removeFromFavorites(playerId, gameId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: favoritesQueryKey(variables.playerId),
            }); // Correct usage of queryKey with queryClient.invalidateQueries
        },
    });
}
