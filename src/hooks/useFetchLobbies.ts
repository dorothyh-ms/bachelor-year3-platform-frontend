import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Lobby } from '../types/Lobby';

// Function to fetch lobbies
const fetchLobbies = async (): Promise<Lobby[]> => {
    const token = localStorage.getItem('access_token')
    const response = await axios.get('http://localhost:8091/api/lobbies', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};

// Hook for fetching lobbies
export function useFetchLobbies() {
    return useQuery({
        queryKey: ['lobbies'],
        queryFn: fetchLobbies,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
}
