import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to create a lobby
const createLobby = async (gameId: string): Promise<any> => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        throw new Error('Access token not found.');
    }

    const response = await axios.post(
        `http://localhost:8091/api/games/${gameId}/lobbies`,
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};

// Hook for creating a lobby
export function useCreateLobby() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLobby,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lobbies'] });
        },
    });
}
