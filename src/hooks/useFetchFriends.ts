import { useQuery } from '@tanstack/react-query';
import axiosApi from '../services/axios';
import { Friend } from '../types/Friend';

// Fetch friends
const fetchFriends = async (): Promise<Friend[]> => {
    const response = await axiosApi.get('/friends');
    return response.data;
};

export function useFetchFriends() {
    const { data: friends, isPending, isError } = useQuery({
        queryKey: ['friends'],
        queryFn: fetchFriends,
        refetchOnWindowFocus: false,
    });

    return { friends, isLoading: isPending, isError };
}
