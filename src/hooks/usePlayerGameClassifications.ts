import { useQuery } from '@tanstack/react-query';
import { fetchPlayerGameClassifications } from '../services/playerClassificationsService';

export function useFetchPlayerGameClassifications(username: string = '') {
    const {data: classifications, isPending: isLoading, isError} = useQuery({
        queryKey: ['players', username],
        queryFn: fetchPlayerGameClassifications,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        classifications, 
        isLoading, 
        isError
    }
}
