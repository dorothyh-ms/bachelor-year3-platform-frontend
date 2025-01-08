import { useQuery } from "@tanstack/react-query";
import { getMatches } from "../services/matchesService";

export function useMatches() {
    const { data: matches, isPending: isLoading, isError } = useQuery({
        queryKey: ['matches'], // Cache key
        queryFn: getMatches, // API service function
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });

    return {
        matches,
        isLoading,
        isError,
    };
}