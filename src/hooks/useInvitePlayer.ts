import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const invitePlayer = async ({ lobbyId, userId }: { lobbyId: string; userId: string }): Promise<any> => {
    const token = localStorage.getItem('access_token');

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
            alert(`Error: ${error.response.data}`);
        } else {
            alert('An unexpected error occurred.');
        }
        throw error;
    }
};

export function useInvitePlayer() {
    return useMutation({
        mutationFn: invitePlayer,
    });
}
