import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLobby } from '../services/lobbiesService';



// Hook for creating a lobby
export function useCreateLobby(customOnSuccess?: () => void) {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError} =  useMutation({
        mutationFn: createLobby,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lobbies'] });
            if (customOnSuccess) {
                customOnSuccess();
            }
        },
    });

    return {createLobby : mutate, isLoading: isPending, isError}
}
