import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLobby } from '../services/lobbiesService';



// Hook for creating a lobby
export function useCreateLobby() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError} =  useMutation({
        mutationFn: createLobby,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lobbies'] });
        },
    });

    return {createLobby : mutate, isLoading: isPending, isError}
}
