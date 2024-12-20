import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendGameInvite } from '../services/inviteService';

export function useSendGameInvite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendGameInvite,
        onSuccess: () => {
            queryClient.invalidateQueries(['invites']); // Refresh invites after success
        },
    });
}
