import { useQuery } from '@tanstack/react-query';

import { getInvites } from '../services/inviteService.ts';

export function useFetchInvites() {
    const {data: invites, isPending, isError}= useQuery({
        queryKey: ['invites'],
        queryFn: getInvites,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        isLoading: isPending, 
        isError: isError, 
        invites
    }
}
