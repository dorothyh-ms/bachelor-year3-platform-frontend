import Profile from '../types/Profile';
import axios from './axios';

export async function fetchProfile() : Promise<Profile[]> {
    const response = await axios.get('/player-profiles/me');
    return response.data;
};