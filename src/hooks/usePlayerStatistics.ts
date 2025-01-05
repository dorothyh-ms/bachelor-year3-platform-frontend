import { useQuery } from '@tanstack/react-query';
import { getPlayerStatistics } from '../services/playerStatisticsService';


export function usePlayerStatistics() {
    const {data: playerStatistics, isPending, isError}= useQuery({
        queryKey: ['player-statistics'],
        queryFn: getPlayerStatistics,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        isLoading: isPending, 
        isError: isError, 
        playerStatistics
    }
}
