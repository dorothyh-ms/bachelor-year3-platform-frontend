import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Function to send invite
const invitePlayer = async ({ lobbyId, userId }: { lobbyId: string; userId: string }): Promise<any> => {
    const token = localStorage.getItem('access_token'); // Fetch token from localStorage
    const response = await axios.post(
        `http://localhost:8091/api/invites/${lobbyId}/invite`, // Match the backend endpoint
        { userId }, // Payload
        {
            headers: {
                Authorization: `Bearer ${token}`, // Include Bearer token
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

// React Query Hook for inviting players
export function useInvitePlayer() {
    return useMutation({
        mutationFn: invitePlayer,
    });
}
