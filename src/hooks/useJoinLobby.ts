import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to join a lobby
const joinLobby = async (lobbyId: string): Promise<any> => {
    const token = localStorage.getItem('access_token'); // Fetch token from local storage
    const response = await axios.patch(
        `http://localhost:8091/api/lobbies/${lobbyId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

// Hook for joining a lobby
export function useJoinLobby() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError} =  useMutation({
        mutationFn: joinLobby,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lobbies'] });
        },
    });

    return {
        isLoading : isPending, 
        isError, 
        joinLobby: mutate
    }
}
