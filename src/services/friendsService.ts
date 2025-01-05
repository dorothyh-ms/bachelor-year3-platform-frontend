import axios from './axios';
import { Friend } from '../types/Friend';

export async function fetchFriends(): Promise<Friend[]> {
    const response = await axios.get('/friends');
    return response.data;
}

export async function searchPlayers(username: string): Promise<Friend[]> {

    const response = await axios.get(`/players?username=${username}`); // Adjusted endpoint

    return response.data;
}


export async function addFriend(friendId: string): Promise<void> {

    await axios.post(`/friends`, {
        friendId: friendId
    }); 
}
