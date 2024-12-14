import { useMutation, useQueryClient } from '@tanstack/react-query';

import { joinLobby } from '../services/lobbiesService';




// Hook for joining a lobby
export function useJoinLobby() {
    const queryClient = useQueryClient();


    const { mutate, isPending, isError } = useMutation({
        mutationFn: joinLobby,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['lobbies'] });
            console.log("data", data)
            if (data.matchURL) {
                const newWindow = window.open(data.matchURL, '_blank', 'noopener,noreferrer')
                if (newWindow) newWindow.opener = null
            }
        },
    });

    return {
        isLoading: isPending,
        isError,
        joinLobby: mutate
    }
}
