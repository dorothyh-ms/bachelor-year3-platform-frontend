import { useQuery } from '@tanstack/react-query';
import axiosApi from '../services/axios';
import { Invite } from '../types/Invite';

const fetchInvites = async (): Promise<Invite[]> => {
    const response = await axiosApi.get('/invites');
    return response.data;
};

export function useFetchInvites() {
    const { data: invites, isPending, isError } = useQuery({
        queryKey: ['invites'],
        queryFn: fetchInvites,
        refetchOnWindowFocus: false,
    });

    return { invites, isLoading: isPending, isError };
}
