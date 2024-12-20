import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosApi from '../services/axios';

export const acceptInvite = async ({ inviteId, action }: { inviteId: string; action: string }) => {
    return axiosApi.patch(`/invites/${inviteId}`, { action });
};

export function useAcceptInvite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptInvite,
        onSuccess: () => {
            queryClient.invalidateQueries(['invites']); // Refresh invites list after success
        },
    });
}
