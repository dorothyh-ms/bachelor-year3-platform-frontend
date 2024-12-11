import { useQuery } from '@tanstack/react-query';
import { getGames } from '../services/gamesService';



// Hook for fetching lobbies
export function useFetchGames() {
    return useQuery({
        queryKey: ['games'],
        queryFn: getGames,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
}