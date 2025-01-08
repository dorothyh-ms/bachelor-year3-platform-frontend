import { useQuery } from '@tanstack/react-query';

import { createLobby, fetchLobbies } from '../services/lobbiesService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { joinLobby } from '../services/lobbiesService';
import { useNavigate } from 'react-router-dom';


export function useGetLobbies() {
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



export function useJoinLobby() {

    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: joinLobby,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['lobbies'] });
            queryClient.invalidateQueries({ queryKey: ['matches'] });
        },
    });

    return {
        isLoading: isPending,
        isError,
        joinLobby: mutate
    }
}
