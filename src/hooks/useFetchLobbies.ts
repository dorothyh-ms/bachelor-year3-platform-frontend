import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { fetchLobbies } from '../services/lobbiesService';



export function useFetchLobbies() {
    const {data: lobbies, isPending, isError}= useQuery({
        queryKey: ['lobbies'],
        queryFn: fetchLobbies,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        isLoading: isPending, 
        isError: isError, 
        lobbies
    }
}
