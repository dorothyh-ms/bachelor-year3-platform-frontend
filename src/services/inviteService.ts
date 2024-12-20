import axiosApi from './axios';
import {Invite} from '../types/Invite';

export async function getInvites(): Promise<Invite[]> {
    const {data} = await axiosApi.get<Invite[]>('/invites');
    return data;
}

export async function sendGameInvite({
                                         lobbyId,
                                         userId,
                                     }: {
    lobbyId: string;
    userId: string;
}): Promise<void> {
    await axiosApi.post(`/invites/${lobbyId}/invite`, {userId});
}
