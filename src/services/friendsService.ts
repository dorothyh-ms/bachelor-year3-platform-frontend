import axios from './axios';
import { Friend } from '../types/Friend';

export async function fetchFriends(): Promise<Friend[]> {
    const response = await axios.get('/friends'); // Endpoint for fetching friends
    return response.data;
}
