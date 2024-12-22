import Invite from "../types/Invite";
import axiosApi from "./axios";


export async function getInvites(): Promise<Invite[]> {
    const { data: invites } = await axiosApi.get<Invite[]>(`/invites`);
    return invites;
}
type AcceptInviteArgs= {
    inviteId: string, 
    action: ""
}

export async function acceptInvite(args: AcceptInviteArgs) : Promise<Invite>   {
    const {data: lobby} = await axiosApi.patch<Invite>(`/invites/${args.inviteId}`, {
        action: "ACCEPT"
    });
    return lobby;
}

export async function sendGameInvite({
    lobbyId,
    userId,
}: {
    lobbyId: string;
    userId: string;
}): Promise<void> {
    await axiosApi.post(`/lobbies/${lobbyId}/invites`, { userId });
}