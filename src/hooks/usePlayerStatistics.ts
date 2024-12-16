import { useQuery } from '@tanstack/react-query';
import { fetchPlayerStatistics } from '../services/playerStatisticsService';


export function usePlayerStatistics() {
    const {data: playerStatistics, isPending, isError}= useQuery({
        queryKey: ['player-statistics'],
        queryFn: fetchPlayerStatistics,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        isLoading: isPending, 
        isError: isError, 
        playerStatistics
    }
}
