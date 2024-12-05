

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Function to invite a player to a lobby
const invitePlayer = async ({ lobbyId, userId }: { lobbyId: string; userId: string }): Promise<any> => {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token);
    console.log('Payload:', { lobbyId, userId });

    if (!lobbyId || !userId) {
        throw new Error('Invalid lobbyId or userId');
    }

    try {
        const response = await axios.post(
            `http://localhost:8091/api/invites/${lobbyId}/invite`,
            { userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Server responded with:', error.response.data);
            alert(`Error: ${error.response.data}`);
        } else {
            console.error('Error inviting player:', error.message);
            alert('An unexpected error occurred.');
        }
    throw error;
}
};

// React Query hook for inviting players
export function useInvitePlayer() {
    return useMutation({
        mutationFn: invitePlayer,
    });
}
