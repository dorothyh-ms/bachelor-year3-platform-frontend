import { useQuery } from '@tanstack/react-query';
import { getGames } from '../services/gamesService.ts';



// Hook for fetching lobbies
export function useFetchGames() {
    const {data: games, isPending, isError} = useQuery({
        queryKey: ['games'],
        queryFn: getGames,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    })

    return {
        games, 
        isPending, 
        isError
    }
}