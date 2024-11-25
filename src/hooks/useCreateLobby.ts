import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to create a lobby
const createLobby = async (gameId: string): Promise<any> => {
    const response = await axios.post('http://localhost:8091/api/lobbies', { gameId });
    return response.data;
};

// Hook for creating a lobby
export function useCreateLobby() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLobby,
        onSuccess: () => {
            // Invalidate the "lobbies" query to refresh the data
            queryClient.invalidateQueries({ queryKey: ['lobbies'] });
        },
    });
}
