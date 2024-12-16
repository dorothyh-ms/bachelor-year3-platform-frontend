import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {Game} from '../types/Game.ts'
import keycloak from "../keycloak.ts";

const fetchGames = async (): Promise<Game[]> => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error('No access token found');
        throw new Error('No access token found');
    }

    console.log('Token:', token);

    try {
        const response = await axios.get('http://localhost:8091/api/games', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log('Games fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};



export function useFetchGames() {
    return useQuery({
        queryKey: ['games'],
        queryFn: fetchGames,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
}