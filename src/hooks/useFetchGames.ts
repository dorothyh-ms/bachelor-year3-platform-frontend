import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {Game} from '../types/Game.ts'

const fetchGames = async (): Promise<Game[]> => {
    const token= localStorage.getItem('access_token') // Adjust this to where you store the token
    console.log("token: "+token)
    if (!token) {
        throw new Error('No access token found');
    }

    const response = await axios.get('http://localhost:8091/api/games', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};

// Hook for fetching lobbies
export function useFetchGames() {
    return useQuery({
        queryKey: ['games'],
        queryFn: fetchGames,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
}