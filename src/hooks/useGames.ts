import { useQuery } from '@tanstack/react-query';
import { getGame, getGames } from '../services/gamesService.ts';


export function useFetchGame(id : string) {
    const {data: game, isPending, isError} = useQuery({
        queryKey: ['game', id],
        queryFn: () => {return getGame(id)},
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    })

    return {
        game, 
        isPending, 
        isError
    }
}

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