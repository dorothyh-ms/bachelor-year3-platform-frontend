

import { useQuery } from '@tanstack/react-query';

import { getPlayersByUsername } from '../services/playersService';



export const useSearchPlayers = (username: string) => {
    const {data: players, isError, isPending} = useQuery({
        queryKey: ['players', username], 
        queryFn: () => getPlayersByUsername(username), 
        enabled: Boolean(username),
    })

    return {
        players, 
        isError, 
        isPending
    }
};
