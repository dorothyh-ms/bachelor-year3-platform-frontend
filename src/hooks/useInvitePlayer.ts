import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Function to invite a player to a lobby
const invitePlayer = async ({ lobbyId, userId }: { lobbyId: string; userId: string }): Promise<any> => {
    const response = await axios.post(`http://localhost:8091/api/lobbies/${lobbyId}/invite`, { userId });
    return response.data;
};

// Hook for inviting a player
export function useInvitePlayer() {
    return useMutation({
        mutationFn: invitePlayer,
    });
}
