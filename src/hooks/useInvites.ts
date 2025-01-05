import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptInvite, getInvites, sendGameInvite } from '../services/invitesService';

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




export function useAcceptInvite() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError} =  useMutation({
        mutationFn: acceptInvite,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['invites'] });
            console.log(data);
            if (data.lobby.matchURL) {
             
                const newWindow = window.open(data.lobby.matchURL, '_blank', 'noopener,noreferrer')
                if (newWindow) newWindow.opener = null
            }
        },
    });

    return {
        isLoading: isPending,
        isError,
        acceptInvite: mutate
    }
}


export function useSendInvite(customOnSuccess?: () => void) {
    const {mutate, isPending, isError} =  useMutation({
        mutationFn: sendGameInvite,
        onSuccess: () => {
            customOnSuccess && customOnSuccess();
        },
    });

    return {
        isLoading: isPending,
        isError,
        sendGameInvite: mutate
    }
}