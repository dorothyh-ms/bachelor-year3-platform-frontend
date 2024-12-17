import axios from './axios';
import { Friend } from '../types/Friend';

export async function fetchFriends(): Promise<Friend[]> {
    const response = await axios.get('/friends');
    return response.data;
}

export async function searchPlayers(username: string): Promise<Friend[]> {
    console.log(`Searching players with username: ${username}`); // Debug log
    const response = await axios.get(`/players?username=${username}`); // Adjusted endpoint
    console.log('Backend response:', response.data); // Debug log
    return response.data;
}


export async function addFriend(friendId: string): Promise<void> {
    console.log(`Adding friend with friendId: ${friendId}`); // Debug log
    await axios.post(`/friends?friendId=${friendId}`); // Pass friendId as a query parameter
}
