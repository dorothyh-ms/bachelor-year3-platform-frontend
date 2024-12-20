import { useMutation } from '@tanstack/react-query';
import axiosApi from '../services/axios';

export const sendLobbyInvite = async ({ friendId, lobbyId }: { friendId: string; lobbyId: string }) => {
    const response = await axiosApi.post(`/invites/${lobbyId}/invite`, { userId: friendId });
    return response.data;
};

export function useSendLobbyInvite() {
    return useMutation({
        mutationFn: sendLobbyInvite,
    });
}
