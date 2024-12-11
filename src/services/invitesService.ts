import Invite from "../types/Invite";
import axiosApi from "./axios";


export async function getInvites() : Promise<Invite[]>   {
    const {data: invites} = await axiosApi.get<Invite[]>(`/invites`);
    return invites;
}