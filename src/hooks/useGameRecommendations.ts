import { useQuery } from "@tanstack/react-query";
import { fetchGameRecommendations } from "../services/gameRecommendationService";

export function useGameRecommendations() {
    const {data: recommendations, isPending, isError}= useQuery({
        queryKey: ['game-recommendations'],
        queryFn: fetchGameRecommendations,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        isLoading: isPending, 
        isError: isError, 
        recommendations
    }
}
