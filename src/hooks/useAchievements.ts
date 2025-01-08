import { useQuery } from "@tanstack/react-query";
import { getAchievements } from "../services/achievementsService";

export function useAchievements() {
    const { data: achievements, isPending: isLoading, isError } = useQuery({
        queryKey: ['achievements'], // Cache key
        queryFn: getAchievements, // API service function
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });

    return {
        achievements,
        isLoading,
        isError,
    };
}