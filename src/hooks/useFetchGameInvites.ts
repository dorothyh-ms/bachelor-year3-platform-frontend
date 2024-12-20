import { useQuery } from '@tanstack/react-query';
import { getInvites } from '../services/inviteService';

export function useFetchGameInvites() {
    return useQuery({
        queryKey: ['invites'],
        queryFn: getInvites,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}
