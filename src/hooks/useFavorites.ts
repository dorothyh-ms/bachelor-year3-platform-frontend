import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addToFavorites, fetchFavorites, removeFromFavorites} from "../services/favoritesService";
import {Favorite} from "../types/Favorite";

export const useFavorites = () =>
    useQuery<Favorite[], Error>({
        queryKey: ["favorites"],
        queryFn: fetchFavorites,
        refetchOnWindowFocus: false,
    });

export const useAddToFavorites = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: addToFavorites,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["favorites"]});
        },
    });
};

export const useRemoveFromFavorites = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: removeFromFavorites,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["favorites"]});
        },
    });
};
