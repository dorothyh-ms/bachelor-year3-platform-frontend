import { useQuery } from '@tanstack/react-query';
import axiosApi from '../services/axios';
import { Lobby } from '../types/Lobby';

const fetchLobbies = async (): Promise<Lobby[]> => {
    const response = await axiosApi.get('/lobbies');
    return response.data;
};

export function useFetchLobbies() {
    const { data: lobbies, isPending, isError } = useQuery({
        queryKey: ['lobbies'],
        queryFn: fetchLobbies,
        refetchOnWindowFocus: false,
    });

    return { lobbies, isLoading: isPending, isError };
}
