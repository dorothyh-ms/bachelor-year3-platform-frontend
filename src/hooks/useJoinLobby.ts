import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to join a lobby
const joinLobby = async (lobbyId: string): Promise<any> => {
    const response = await axios.patch(`http://localhost:8092/api/lobbies/${lobbyId}`);
    return response.data;
};

// Hook for joining a lobby
export function useJoinLobby() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: joinLobby,
        onSuccess: () => {
            // Invalidate the "lobbies" query to refresh the data
            queryClient.invalidateQueries({ queryKey: ['lobbies'] });
        },
    });
}
